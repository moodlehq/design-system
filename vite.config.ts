/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { PluginContext } from 'rollup';
const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// Automatically discover one entry per component directory so new components
// are included in the build without any manual configuration changes.
const componentEntries = Object.fromEntries(
  fs
    .readdirSync(path.join(dirname, 'components'), { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => [
      `components/${d.name}/index`,
      `./components/${d.name}/index.tsx`,
    ]),
);

interface ComponentCssAsset {
  componentName: string;
  source: string;
}

/**
 * Inline local image URLs in CSS so emitted per-component CSS stays self-contained.
 * Leaves remote, absolute, hash, and already-inlined URLs untouched.
 */
function inlineCssImageUrls(cssSource: string, cssDir: string): string {
  const mimeByExtension: Record<string, string> = {
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.avif': 'image/avif',
  };

  return cssSource.replace(
    /url\((['"]?)([^'")]+)\1\)/g,
    (match, quote: string, rawUrl: string) => {
      const url = rawUrl.trim();

      if (
        url.startsWith('data:') ||
        url.startsWith('/') ||
        url.startsWith('#') ||
        url.startsWith('//') ||
        /^[a-z]+:/i.test(url)
      ) {
        return match;
      }

      const pathWithoutSuffix = url.split(/[?#]/, 1)[0];
      const extension = path.extname(pathWithoutSuffix).toLowerCase();
      const mimeType = mimeByExtension[extension];

      if (!mimeType) {
        return match;
      }

      const assetPath = path.resolve(cssDir, pathWithoutSuffix);

      if (!fs.existsSync(assetPath) || !fs.statSync(assetPath).isFile()) {
        return match;
      }

      const raw = fs.readFileSync(assetPath);
      const dataUrl =
        extension === '.svg'
          ? `data:${mimeType},${encodeURIComponent(raw.toString('utf8').replace(/\s+/g, ' ').trim())}`
          : `data:${mimeType};base64,${raw.toString('base64')}`;

      const q = quote || '"';
      return `url(${q}${dataUrl}${q})`;
    },
  );
}

function getComponentCssAssets(): ComponentCssAsset[] {
  const componentsIndexPath = path.join(dirname, 'components', 'index.css');
  const indexCss = fs.readFileSync(componentsIndexPath, 'utf8');

  const importRegex = /@import\s+['"](.+?)['"];?/g;
  const assets: ComponentCssAsset[] = [];
  let match: RegExpExecArray | null;

  while ((match = importRegex.exec(indexCss)) !== null) {
    const relativeImportPath = match[1];
    const absoluteImportPath = path.resolve(
      path.dirname(componentsIndexPath),
      relativeImportPath,
    );

    const componentName = path.posix
      .normalize(path.dirname(relativeImportPath))
      .replace(/^\.\//, '');

    assets.push({
      componentName,
      source: inlineCssImageUrls(
        fs.readFileSync(absoluteImportPath, 'utf8').trim(),
        path.dirname(absoluteImportPath),
      ).trim(),
    });
  }

  return assets;
}

function buildComponentsCssManifest(assets: ComponentCssAsset[]): string {
  const imports = assets.map(
    (asset) => `@import './${asset.componentName}/index.css';`,
  );

  return `${imports.join('\n')}\n`;
}

function buildComponentsLegacyScssManifest(
  assets: ComponentCssAsset[],
): string {
  const sections = assets.map(
    (asset) => `/* ${asset.componentName}/index.css */\n${asset.source}`,
  );

  return `${sections.join('\n\n')}\n`;
}

function emitComponentAssets(ctx: PluginContext): void {
  const assets = getComponentCssAssets();
  const componentsManifest = buildComponentsCssManifest(assets);
  const legacyComponentsManifest = buildComponentsLegacyScssManifest(assets);

  // Component aggregate manifests
  ctx.emitFile({
    type: 'asset',
    fileName: 'components/index.css',
    source: componentsManifest,
  });

  // Legacy Sass entrypoint: monolithic inlineable stylesheet for consumers that
  // compile Sass with legacy import behavior.
  ctx.emitFile({
    type: 'asset',
    fileName: 'components/_index.legacy.scss',
    source: legacyComponentsManifest,
  });

  // Per-component CSS files
  for (const componentAsset of assets) {
    ctx.emitFile({
      type: 'asset',
      fileName: `components/${componentAsset.componentName}/index.css`,
      source: `${componentAsset.source}\n`,
    });
  }
}

function emitTokenAssets(ctx: PluginContext): void {
  const tokensCssDir = path.join(dirname, 'tokens', 'css');
  const tokensScssDir = path.join(dirname, 'tokens', 'scss');

  // Emit every file in tokens/css/ into dist/tokens/css/
  for (const file of fs.readdirSync(tokensCssDir)) {
    ctx.emitFile({
      type: 'asset',
      fileName: `tokens/css/${file}`,
      source: fs.readFileSync(path.join(tokensCssDir, file), 'utf8'),
    });
  }

  // Emit every file in tokens/scss/ into dist/tokens/scss/
  for (const file of fs.readdirSync(tokensScssDir)) {
    ctx.emitFile({
      type: 'asset',
      fileName: `tokens/scss/${file}`,
      source: fs.readFileSync(path.join(tokensScssDir, file), 'utf8'),
    });
  }
}

function emitCssAssets() {
  return {
    name: 'emit-css-assets',
    apply: 'build' as const,
    generateBundle() {
      emitComponentAssets(this);
      emitTokenAssets(this);
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    emitCssAssets(),
    dts({
      // Exclude dev-only files from the generated type declarations, matching tsconfig.json.
      exclude: ['**/*.stories.tsx', '**/*.test.tsx', '**/*.figma.tsx'],
    }),
  ],
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  build: {
    lib: {
      // Multiple entry points: one for the full package, one per component subpath.
      // Each key becomes the output file path under dist/ (e.g. dist/components/button/index.js).
      entry: {
        index: './index.ts',
        ...componentEntries,
      },
      name: 'moodle-design-system',
      fileName: (_, entryName) => `${entryName}.js`, // Preserve entry path as output filename.
      formats: ['es'], // Specifies the output format (ES modules only).
    },
    cssCodeSplit: false, // Bundle all CSS into a single inlined dist/index.css for full-build direct URL loading.
    rollupOptions: {
      external: (id) =>
        [
          'react',
          'react-dom',
          'react-dom/client',
          'react/jsx-runtime',
        ].includes(id) ||
        id.startsWith('@floating-ui/') ||
        id === 'tabbable',
      output: {
        assetFileNames: 'index.css', // Name the full-build inlined CSS bundle.
        // Transpile every source file into its own output file with a stable, predictable
        // path — no chunk splitting, no content hashes. This matches Moodle's loading model
        // where files are served directly by URL without a consumer-side build step.
        preserveModules: true,
        preserveModulesRoot: '.',
        entryFileNames: '[name].js',
      },
    },
    sourcemap: true, // Generates source maps for debugging.
    emptyOutDir: true, // Clears the output directory before building.
    minify: false, // Disable minification for JS/CSS/assets
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: [],
        },
      },
    ],
  },
});

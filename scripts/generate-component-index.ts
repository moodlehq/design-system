import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

interface ComponentIndexItem {
  name: string;
  slug: string;
  purpose: string;
  exportPath: string;
  /** Declaration file inside the published package. */
  typesPath: string;
  /** Per-component guidance page inside the published package, when generated. */
  guidancePath?: string;
  /** Components the guidance says to use instead, and ones it is easily confused with. */
  useInstead?: string[];
  lookAlikes?: string[];
  /** Built JavaScript entry inside the published package. */
  implementationPath: string;
  /** Built component CSS inside the published package. */
  cssPath?: string;
  subcomponents?: ComponentSubcomponentIndexItem[];
}

interface ComponentSubcomponentIndexItem {
  name: string;
  purpose: string;
  exportName: string;
  implementationPath: string;
}

interface ComponentIndex {
  generatedAt: string;
  sourceDir: string;
  componentCount: number;
  components: ComponentIndexItem[];
}

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(SCRIPT_DIR, '..');
const COMPONENTS_DIR = path.join(ROOT_DIR, 'components');
const OUTPUT_DIR = path.join(ROOT_DIR, 'dist');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'component-index.json');

const GUIDANCE_DIR = path.join(ROOT_DIR, 'docs', 'guidance', 'components');

const RESERVED_DIR_NAMES = new Set(['assets']);

const SUBCOMPONENTS: Record<string, ComponentSubcomponentIndexItem[]> = {
  input: [
    {
      name: 'PasswordInput',
      purpose:
        'Password-specific input with a built-in visibility toggle and shared form-field states.',
      exportName: 'PasswordInput',
      implementationPath: 'dist/components/input/PasswordInput.js',
    },
    {
      name: 'SearchInput',
      purpose:
        'Search field (<input type="search">) for finding or filtering content shown elsewhere, with a fixed magnifier, clear button, and debounced onDebouncedChange. Use instead of Input with a magnifier icon. If the user picks a row from a list that is saved with the form, it is a combobox, not SearchInput. Pass landmark only for page- or site-level search.',
      exportName: 'SearchInput',
      implementationPath: 'components/input/SearchInput.tsx',
      storyPath: 'components/input/SearchInput.stories.tsx',
    },
  ],
  dropdown: [
    {
      name: 'DropdownTrigger',
      purpose: 'Trigger button that opens/closes the menu panel.',
      exportName: 'DropdownTrigger',
      implementationPath: 'dist/components/dropdown/DropdownTrigger.js',
    },
    {
      name: 'DropdownMenu',
      purpose: 'Menu container that hosts dropdown items.',
      exportName: 'DropdownMenu',
      implementationPath: 'dist/components/dropdown/Dropdown.js',
    },
    {
      name: 'DropdownItemAction',
      purpose: 'Standard clickable action item (button or link behavior).',
      exportName: 'DropdownItemAction',
      implementationPath: 'dist/components/dropdown/DropdownItemAction.js',
    },
    {
      name: 'DropdownItemSelect',
      purpose:
        'Single-select item with selected state (menuitemradio semantics).',
      exportName: 'DropdownItemSelect',
      implementationPath: 'dist/components/dropdown/DropdownItemSelect.js',
    },
    {
      name: 'DropdownItemMultiselect',
      purpose:
        'Multi-select item with checked state (menuitemcheckbox semantics).',
      exportName: 'DropdownItemMultiselect',
      implementationPath: 'dist/components/dropdown/DropdownItemMultiselect.js',
    },
    {
      name: 'DropdownItemExpandable',
      purpose: 'Item that opens a nested submenu.',
      exportName: 'DropdownItemExpandable',
      implementationPath: 'dist/components/dropdown/DropdownItemExpandable.js',
    },
    {
      name: 'DropdownItemHeader',
      purpose: 'Non-interactive section heading within the menu.',
      exportName: 'DropdownItemHeader',
      implementationPath: 'dist/components/dropdown/DropdownItemHeader.js',
    },
    {
      name: 'DropdownItemDivider',
      purpose: 'Visual separator between groups of items.',
      exportName: 'DropdownItemDivider',
      implementationPath: 'dist/components/dropdown/DropdownItemDivider.js',
    },
    {
      name: 'DropdownItemCustom',
      purpose:
        'Wrapper for custom menu content when built-in item variants are not enough.',
      exportName: 'DropdownItemCustom',
      implementationPath: 'dist/components/dropdown/DropdownItemCustom.js',
    },
    {
      name: 'DropdownItemGroup',
      purpose: 'Semantic grouping container for related menu items.',
      exportName: 'DropdownItemGroup',
      implementationPath: 'dist/components/dropdown/DropdownItemGroup.js',
    },
  ],
};

function toPosix(filePath: string): string {
  return filePath.split(path.sep).join('/');
}

function titleCaseFromSlug(slug: string): string {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function findFirstExisting(filePaths: string[]): string | undefined {
  return filePaths.find((filePath) => fs.existsSync(filePath));
}

interface GuidanceInfo {
  intro?: string;
  useInstead?: string[];
  lookAlikes?: string[];
}

/** Reads the generated guidance page (docs/guidance) for a component, if present. */
function readGuidance(slug: string): GuidanceInfo | undefined {
  const file = path.join(GUIDANCE_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return undefined;
  const md = fs.readFileSync(file, 'utf-8');
  const intro = md.match(/^# .+\n\n(?!#|##)(.+)\n/m)?.[1];
  const useInstead = md.match(/^- Use instead: (.+)$/m)?.[1];
  const lookAlikes = md.match(/^- Look-alikes: (.+)$/m)?.[1];
  return {
    intro,
    useInstead: useInstead?.split(';').map((v) => v.trim()),
    lookAlikes: lookAlikes?.split('·').map((v) => v.trim()),
  };
}

/** First sentence(s) of the JSDoc block directly above the component's export. */
function readJsDoc(file: string, name: string): string | undefined {
  const src = fs.readFileSync(file, 'utf-8');
  const block = src.match(
    new RegExp(
      `/\\*\\*((?:(?!\\*/)[\\s\\S])*?)\\*/\\s*export (?:const|function) ${name}\\b`,
    ),
  )?.[1];
  const text = block
    ?.split('\n')
    .map((l) => l.replace(/^\s*\*\s?/, '').trim())
    .filter((l) => l && !l.startsWith('@'))
    .join(' ');
  return text || undefined;
}

function collectComponent(slug: string): ComponentIndexItem | null {
  const dir = path.join(COMPONENTS_DIR, slug);
  if (!fs.statSync(dir).isDirectory()) {
    return null;
  }

  const componentName = titleCaseFromSlug(slug);
  const implementation = findFirstExisting([
    path.join(dir, `${componentName}.tsx`),
    path.join(dir, 'index.tsx'),
  ]);

  if (!implementation) {
    return null;
  }

  const css = findFirstExisting([path.join(dir, `${slug}.css`)]);

  // Purpose comes from the generated guidance, falling back to the component's
  // JSDoc, so a new component needs no hand-kept entry.
  const guidance = readGuidance(slug);
  const purpose = guidance?.intro ?? readJsDoc(implementation, componentName);
  if (!purpose) {
    throw new Error(
      `No purpose for component "${slug}": add a JSDoc description to ${componentName} or generate guidance (npm run build-guidance).`,
    );
  }

  return {
    name: componentName,
    slug,
    purpose,
    exportPath: `@moodlehq/design-system/components/${slug}`,
    typesPath: `dist/components/${slug}/index.d.ts`,
    guidancePath: guidance ? `dist/guidance/components/${slug}.md` : undefined,
    useInstead: guidance?.useInstead,
    lookAlikes: guidance?.lookAlikes,
    implementationPath: `dist/components/${slug}/index.js`,
    cssPath: css ? `dist/components/${slug}/index.css` : undefined,
    subcomponents: SUBCOMPONENTS[slug],
  };
}

function buildIndex(): ComponentIndex {
  const entries = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true });

  const components = entries
    .filter(
      (entry) => entry.isDirectory() && !RESERVED_DIR_NAMES.has(entry.name),
    )
    .map((entry) => collectComponent(entry.name))
    .filter((value): value is ComponentIndexItem => value !== null)
    .sort((a, b) => a.slug.localeCompare(b.slug));

  return {
    generatedAt: new Date().toISOString(),
    sourceDir: toPosix(path.relative(ROOT_DIR, COMPONENTS_DIR)),
    componentCount: components.length,
    components,
  };
}

function main(): void {
  const index = buildIndex();
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, `${JSON.stringify(index, null, 2)}\n`, 'utf-8');
  console.log(
    `Generated ${toPosix(path.relative(ROOT_DIR, OUTPUT_FILE))} (${index.componentCount} components)`,
  );
}

main();

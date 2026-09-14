import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

interface ComponentIndexItem {
  name: string;
  slug: string;
  purpose: string;
  exportPath: string;
  implementationPath: string;
  storyPath?: string;
  testPath?: string;
  figmaPath?: string;
  cssPath?: string;
  subcomponents?: ComponentSubcomponentIndexItem[];
}

interface ComponentSubcomponentIndexItem {
  name: string;
  purpose: string;
  exportName: string;
  implementationPath: string;
  storyPath?: string;
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

const RESERVED_DIR_NAMES = new Set(['assets']);

const SUBCOMPONENTS: Record<string, ComponentSubcomponentIndexItem[]> = {
  input: [
    {
      name: 'PasswordInput',
      purpose:
        'Password-specific input with a built-in visibility toggle and shared form-field states.',
      exportName: 'PasswordInput',
      implementationPath: 'components/input/PasswordInput.tsx',
      storyPath: 'components/input/PasswordInput.stories.tsx',
    },
  ],
  dropdown: [
    {
      name: 'DropdownTrigger',
      purpose: 'Trigger button that opens/closes the menu panel.',
      exportName: 'DropdownTrigger',
      implementationPath: 'components/dropdown/DropdownTrigger.tsx',
      storyPath: 'components/dropdown/DropdownTrigger.stories.tsx',
    },
    {
      name: 'DropdownMenu',
      purpose: 'Menu container that hosts dropdown items.',
      exportName: 'DropdownMenu',
      implementationPath: 'components/dropdown/Dropdown.tsx',
    },
    {
      name: 'DropdownItemAction',
      purpose: 'Standard clickable action item (button or link behavior).',
      exportName: 'DropdownItemAction',
      implementationPath: 'components/dropdown/DropdownItemAction.tsx',
      storyPath: 'components/dropdown/DropdownItemAction.stories.tsx',
    },
    {
      name: 'DropdownItemSelect',
      purpose:
        'Single-select item with selected state (menuitemradio semantics).',
      exportName: 'DropdownItemSelect',
      implementationPath: 'components/dropdown/DropdownItemSelect.tsx',
      storyPath: 'components/dropdown/DropdownItemSelect.stories.tsx',
    },
    {
      name: 'DropdownItemMultiselect',
      purpose:
        'Multi-select item with checked state (menuitemcheckbox semantics).',
      exportName: 'DropdownItemMultiselect',
      implementationPath: 'components/dropdown/DropdownItemMultiselect.tsx',
      storyPath: 'components/dropdown/DropdownItemMultiselect.stories.tsx',
    },
    {
      name: 'DropdownItemExpandable',
      purpose: 'Item that opens a nested submenu.',
      exportName: 'DropdownItemExpandable',
      implementationPath: 'components/dropdown/DropdownItemExpandable.tsx',
      storyPath: 'components/dropdown/DropdownItemExpandable.stories.tsx',
    },
    {
      name: 'DropdownItemHeader',
      purpose: 'Non-interactive section heading within the menu.',
      exportName: 'DropdownItemHeader',
      implementationPath: 'components/dropdown/DropdownItemHeader.tsx',
      storyPath: 'components/dropdown/DropdownItemHeader.stories.tsx',
    },
    {
      name: 'DropdownItemDivider',
      purpose: 'Visual separator between groups of items.',
      exportName: 'DropdownItemDivider',
      implementationPath: 'components/dropdown/DropdownItemDivider.tsx',
      storyPath: 'components/dropdown/DropdownItemDivider.stories.tsx',
    },
    {
      name: 'DropdownItemCustom',
      purpose:
        'Wrapper for custom menu content when built-in item variants are not enough.',
      exportName: 'DropdownItemCustom',
      implementationPath: 'components/dropdown/DropdownItemCustom.tsx',
      storyPath: 'components/dropdown/DropdownItemCustom.stories.tsx',
    },
    {
      name: 'DropdownItemGroup',
      purpose: 'Semantic grouping container for related menu items.',
      exportName: 'DropdownItemGroup',
      implementationPath: 'components/dropdown/DropdownItemGroup.tsx',
      storyPath: 'components/dropdown/DropdownItemGroup.stories.tsx',
    },
  ],
};

// One-line "when to use" guidance per component, kept in sync with
// .github/instructions/component-index.instructions.md. Ships in the published
// package so agents that only install @moodlehq/design-system (without the source
// repo's instruction files) still get decision guidance, not just file paths.
const PURPOSES: Record<string, string> = {
  'activity-icon':
    'Activity/resource/file icon with semantic category styling.',
  alert:
    'Persistent inline status banner with semantic variants and optional actions/dismiss.',
  avatar: 'Circular user/entity identity display — photo or initials.',
  badge: 'Short status, metadata, or count labels.',
  breadcrumb:
    'Hierarchical navigation path with optional truncation and overflow support.',
  button: 'Primary and secondary actions.',
  checkbox:
    'Independent multi-select controls. No group wrapper is provided — see the Group story for consumer-supplied layout.',
  choicebox:
    'Single-select options as larger, card-style choices (icon + label + supporting text). Not interchangeable with Radio — use for options that benefit from extra visual weight or a supporting description.',
  'close-button': 'Icon-only dismiss action for temporary UI surfaces.',
  dropdown:
    'Composable trigger + menu container for action, select, expandable, and multiselect dropdown items.',
  'favourite-button': 'Icon button to mark/unmark items as favourites.',
  input:
    'Single-line text input with label, supporting text, and validation feedback for non-password text-like values.',
  link: 'Anchor element with variant and optional icon support.',
  'nav-pill': 'Compact pill-style navigation link for section switching.',
  pagination: 'Page navigation control.',
  'progress-bar': 'Visual progress indicator with status and label variants.',
  radio:
    'Single-select options in a compact list (native radio input, label only). No group wrapper is provided — see the Group story for consumer-supplied layout.',
  switch: 'Binary toggle control for on/off settings.',
  textarea:
    'Multi-line text input with label, placeholder, supporting text, character counter, and validation feedback.',
  tooltip: 'Contextual label anchored to a trigger element.',
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

  const story = findFirstExisting([
    path.join(dir, `${componentName}.stories.tsx`),
  ]);
  const test = findFirstExisting([path.join(dir, `${componentName}.test.tsx`)]);
  const figma = findFirstExisting([
    path.join(dir, `${componentName}.figma.tsx`),
  ]);
  const css = findFirstExisting([path.join(dir, `${slug}.css`)]);

  const rel = (fullPath: string) => toPosix(path.relative(ROOT_DIR, fullPath));

  const purpose = PURPOSES[slug];
  if (!purpose) {
    throw new Error(
      `No purpose text defined for component "${slug}" in PURPOSES — add one in scripts/generate-component-index.ts.`,
    );
  }

  return {
    name: componentName,
    slug,
    purpose,
    exportPath: `@moodlehq/design-system/components/${slug}`,
    implementationPath: rel(implementation),
    storyPath: story ? rel(story) : undefined,
    testPath: test ? rel(test) : undefined,
    figmaPath: figma ? rel(figma) : undefined,
    cssPath: css ? rel(css) : undefined,
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

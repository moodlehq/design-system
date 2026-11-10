import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import { splitSections } from '../build-guidance';
import {
  builtFrom,
  compactGallery,
  extractAccessibility,
  isComponentSpecific,
  readProps,
  renderBuiltFrom,
  renderProps,
} from './guidance-extras';

const PAGE = `# Code
## Accessibility implementation

### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| \`Tab\` | Moves focus to the switch |
| \`Space\` | Toggles the switch between on and off |

### ARIA

* **Role:**
    * Uses \`<input type="checkbox" role="switch">\`.
* **Required attributes:**
    * Provide an accessible name via a visible \`<label>\`.

### Dynamic announcements

* Screen readers announce the state through \`aria-checked\`.

---

## GitHub

# Usage
## Overview
`;

describe('extractAccessibility', () => {
  it('fills fixed fields from the accessibility implementation section', () => {
    const out = extractAccessibility(splitSections(PAGE));
    expect(out).toContain('## Accessibility');
    expect(out).toContain('`Space`: Toggles the switch between on and off');
    expect(out).toContain('Uses `<input type="checkbox" role="switch">`.');
    expect(out).toContain('Provide an accessible name');
    expect(out).toContain('`Tab`: Moves focus to the switch');
    expect(out).toMatch(/Announced:\n {2}- Screen readers announce/);
  });

  it('states what is not documented instead of guessing', () => {
    const out = extractAccessibility(
      splitSections(
        '# Code\n## Accessibility implementation\n\n### ARIA\n\n* **Role:**\n    * button\n',
      ),
    );
    expect(out).toContain('Keyboard: Not documented');
    expect(out).toContain('Announced: Not documented');
  });

  it('returns nothing when the page has no accessibility section', () => {
    expect(extractAccessibility(splitSections('# Usage\n## Overview\n'))).toBe(
      '',
    );
  });
});

describe('component-specific tokens', () => {
  const slugs = ['switch', 'link', 'activity-icon', 'tag'];
  it('flags tokens named after a component', () => {
    expect(isComponentSpecific('--mds-bg-switch-track', slugs)).toBe(true);
    expect(isComponentSpecific('--mds-switch-track-padding', slugs)).toBe(true);
    expect(isComponentSpecific('--mds-activity-icon-file-bg', slugs)).toBe(
      true,
    );
  });
  it('keeps shared semantic tokens', () => {
    expect(isComponentSpecific('--mds-bg-surface-default', slugs)).toBe(false);
    expect(isComponentSpecific('--mds-text-link-primary-default', slugs)).toBe(
      false,
    );
  });
});

describe('builtFrom', () => {
  it('reads component imports and shared tokens from real code', () => {
    const tokens = new Map([
      ['--mds-spacing-xs', '0.5rem'],
      ['--mds-border-feedback-secondary', '#fff'],
    ]);
    const b = builtFrom(
      'tag',
      'components',
      ['tag', 'avatar', 'close-button', 'switch'],
      tokens,
    );
    expect(b.components).toEqual(['close-button']);
    expect(b.tokens).toContain('--mds-spacing-xs');
    expect(renderBuiltFrom(b)).toContain('## Built from');
  });
});

describe('compactGallery', () => {
  it('turns icon tiles into a name list', () => {
    const md =
      'Intro\n\n<design>\n\n_[image: anchor]_\n\n**anchor**\n\n</design>\n\n<design>\n\n_[image: arrow-down]_\n\n**arrow-down**\n\n</design>\n';
    const out = compactGallery(md);
    expect(out).toContain('- anchor\n- arrow-down');
    expect(out).not.toContain('<design>');
  });
});

describe('readProps', () => {
  const dir = mkdtempSync(join(tmpdir(), 'props-'));
  mkdirSync(join(dir, 'demo'));
  writeFileSync(
    join(dir, 'demo', 'Demo.tsx'),
    `export type DemoSize = 'sm' | 'lg';
export interface DemoProps {
  /** Shown text. */
  label: string;
  /** Size of the demo. */
  size?: DemoSize;
  tone?: 'a' | 'b';
}
export const Demo = ({ size = 'sm', tone = 'a' }: DemoProps) => null;`,
  );

  it('reads types, defaults, optionality and allowed values from the source', () => {
    const [doc] = readProps('demo', dir);
    expect(doc.name).toBe('DemoProps');
    const byName = Object.fromEntries(doc.props.map((p) => [p.name, p]));
    expect(byName.label).toMatchObject({
      optional: false,
      description: 'Shown text.',
    });
    expect(byName.size).toMatchObject({
      default: "'sm'",
      values: ['sm', 'lg'],
    });
    expect(byName.tone.values).toEqual(['a', 'b']);
  });

  it('renders a props table with allowed values', () => {
    const out = renderProps(readProps('demo', dir));
    expect(out).toContain('| `label` (required) | `string` |');
    expect(out).toContain('- `size`: `sm`, `lg`');
  });

  it('returns nothing for a missing component', () => {
    expect(readProps('nope', dir)).toEqual([]);
    expect(renderProps([])).toBe('');
  });
});

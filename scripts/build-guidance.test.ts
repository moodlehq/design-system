import { describe, expect, it } from 'vitest';

import {
  collectComponentPages,
  deriveForAgents,
  renderComponent,
  slugFor,
  splitSections,
} from './build-guidance';
import {
  formatPage,
  parsePage,
  stripExpiringImages,
} from './lib/zeroheight-format';

const SWITCH = `---
title: Switch
url: https://design.moodle.com/p/switch
status: Ready
introduction: A binary input.
---

# Design
## Anatomy

![](zeroheight://image/1/abc)

# Usage
## When to use

* When a setting can be turned on or off.

<callout background="4">

### ❌ When not to use

* Don't use a Switch when the selection is submitted in a form. Use a Checkbox instead.
* Don't use a Switch for exclusive choices. Use a Radio button instead.

</callout>

* Always provide a label that describes the setting.
`;

describe('zeroheight-format', () => {
  it('strips zeroheight:// and https://zeroheight image references', () => {
    const out = stripExpiringImages(
      '![a](zeroheight://image/1/x) ![](https://zeroheight.s3/x.png) ![k](https://example.com/k.png)',
    );
    expect(out).toContain('_[image: a]_');
    expect(out).not.toContain('zeroheight');
    expect(out).toContain('https://example.com/k.png');
  });

  it('parses front matter and body', () => {
    const { meta, body } = parsePage(SWITCH);
    expect(meta.get('title')).toBe('Switch');
    expect(meta.get('status')).toBe('Ready');
    expect(body.startsWith('# Design')).toBe(true);
  });

  it('writes a title heading and demotes page headings, skipping code fences', () => {
    const out = formatPage(
      '---\ntitle: T\n---\n\n# A\n```\n# keep\n```\n',
      'F',
    );
    expect(out.startsWith('# T')).toBe(true);
    expect(out).toContain('## A');
    expect(out).toContain('\n# keep\n');
  });

  it('returns empty for a page with no body', () => {
    expect(formatPage('---\ntitle: T\n---\n', 'F')).toBe('');
  });
});

describe('collectComponentPages', () => {
  const tree = {
    'Get started': { Intro: { id: 1, url: 'https://design.moodle.com/a' } },
    Components: {
      'Forms and input': {
        Switch: { id: 2, url: 'https://design.moodle.com/b' },
        Draft: { id: 3, url: 'https://draft.zeroheight.com/c' },
        Input: {
          categoryId: 9,
          Input: { id: 4, url: 'https://design.moodle.com/d' },
        },
      },
    },
  };

  it('returns only public pages under Components, including nested ones', () => {
    expect(collectComponentPages(tree).map((p) => p.name)).toEqual([
      'Switch',
      'Input',
    ]);
  });
});

describe('slugFor', () => {
  it.each([
    ['Switch', 'switch'],
    ['Nav pill', 'nav-pill'],
    ['Text area', 'textarea'],
    ['Radio button', 'radio'],
    ['Activity icons', 'activity-icon'],
  ])('%s -> %s', (name, slug) => {
    expect(slugFor(name)).toBe(slug);
  });
});

describe('deriveForAgents', () => {
  const usage = splitSections(parsePage(SWITCH).body).get('Usage') ?? '';
  const f = deriveForAgents('Switch', usage, [
    'Switch',
    'Checkbox',
    'Radio button',
  ]);

  it('derives must / must not from bullets', () => {
    expect(f.must).toEqual([
      'Always provide a label that describes the setting.',
    ]);
    expect(f.mustNot).toHaveLength(2);
  });

  it('derives use-instead and look-alikes, excluding itself', () => {
    expect(f.useInstead).toEqual(['Checkbox', 'Radio button']);
    expect(f.lookAlikes).toEqual(['Checkbox', 'Radio button']);
  });
});

describe('deriveForAgents use-instead', () => {
  it('takes the alternative after the last "use", not the whole clause', () => {
    const f = deriveForAgents(
      'Alert',
      "* Don't use for brief confirmations that don't need to stay on the page — use toast instead.\n* Don't use for blocking messages — use a Modal/Dialog instead.",
      ['Alert'],
    );
    expect(f.useInstead).toEqual(['toast', 'Modal/Dialog']);
  });
});

describe('renderComponent', () => {
  const page = { id: 2, name: 'Switch', url: 'https://design.moodle.com/b' };
  const md = renderComponent(page, SWITCH, '9.9.9', [
    'Switch',
    'Checkbox',
  ]).markdown;

  it('writes frontmatter with version, status and import path', () => {
    expect(md).toContain('package: "@moodlehq/design-system@9.9.9"');
    expect(md).toContain('status: Ready');
    expect(md).toContain('import: @moodlehq/design-system/components/switch');
  });

  it('puts For agents before Usage, and Usage before Design', () => {
    const order = ['## For agents', '## Usage', '## Design'].map((h) =>
      md.indexOf(h),
    );
    expect(order.every((i) => i >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });

  it('removes callout markup and zeroheight placeholders', () => {
    expect(md).not.toContain('<callout');
    expect(md).not.toContain('zeroheight://');
  });
});

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentType } from 'react';
import { useEffect, useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import type { ComboboxOption, ComboboxProps } from './Combobox';
import { Combobox } from './Combobox';

// ComboboxProps is a union (single vs multiple value shapes). Stories flip
// `multiple` through a control, so they are typed against a flat version.
type ComboboxStoryArgs = Omit<
  ComboboxProps,
  'multiple' | 'value' | 'defaultValue' | 'onValueChange'
> & {
  multiple?: boolean;
  value?: string | string[] | null;
  defaultValue?: string | string[] | null;
  onValueChange?: (value: never) => void;
};

const timezones: ComboboxOption[] = [
  { value: 'utc', label: 'UTC' },
  { value: 'london', label: 'Europe/London' },
  { value: 'madrid', label: 'Europe/Madrid' },
  { value: 'paris', label: 'Europe/Paris' },
  { value: 'new-york', label: 'America/New York' },
  { value: 'sao-paulo', label: 'America/São Paulo' },
  { value: 'perth', label: 'Australia/Perth' },
  { value: 'tokyo', label: 'Asia/Tokyo' },
];

const people: ComboboxOption[] = [
  {
    value: 'jessica',
    label: 'Jessica Parker',
    username: 'jparker',
    email: 'jessica@example.com',
    institution: 'Moodle HQ',
    avatar: { alt: 'Jessica Parker' },
  },
  {
    value: 'jose',
    label: 'José Alvarez',
    username: 'jalvarez',
    email: 'jose@example.com',
    institution: 'Moodle HQ',
    avatar: { alt: 'José Alvarez' },
  },
  {
    value: 'sarah-1',
    label: 'Sarah Chen',
    username: 'schen',
    email: 'sarah.chen@example.com',
    institution: 'Perth campus',
    avatar: { alt: 'Sarah Chen' },
  },
  {
    value: 'sarah-2',
    label: 'Sarah Chen',
    username: 'schen2',
    email: 'sarah.c@example.org',
    institution: 'Barcelona campus',
    avatar: { alt: 'Sarah Chen' },
  },
  {
    value: 'sam',
    label: 'Sam Lee',
    username: 'slee',
    email: 'sam@example.com',
    institution: 'Moodle HQ',
    avatar: { alt: 'Sam Lee' },
    disabled: true,
  },
];

// Time zones with one unavailable row, for the open-menu example.
const timezonesWithLockedRow: ComboboxOption[] = [
  ...timezones.slice(0, 4),
  { value: 'locked', label: 'Antarctica/Troll', disabled: true },
  ...timezones.slice(4),
];

// The docs code examples print each story's args as JSX, which would repeat the
// whole options array in every example. The first story to use each shared
// array shows it in full; later examples print `text` in its place.
const sharedOptions = [
  {
    options: timezones,
    shownIn: 'components-combobox--default',
    text: 'timezones',
  },
  {
    options: people,
    shownIn: 'components-combobox--with-identity-details',
    text: 'people',
  },
  {
    options: timezonesWithLockedRow,
    shownIn: undefined,
    text: `[
  ...timezones.slice(0, 4),
  { value: 'locked', label: 'Antarctica/Troll', disabled: true },
  ...timezones.slice(4),
]`,
  },
];

const abbreviateSharedOptions = (
  code: string,
  { id, args }: { id: string; args: Record<string, unknown> },
) => {
  const given = JSON.stringify(args.options);
  const shared = sharedOptions.find(
    ({ options }) => JSON.stringify(options) === given,
  );
  if (!shared || shared.shownIn === id) return code;
  // The array runs from `options={[` to the `]}` at the same indentation.
  return code.replace(
    /^(\s*)options=\{\[[\s\S]*?^\1\]\}/m,
    (_match, indent: string) =>
      `${indent}options={${shared.text.split('\n').join(`\n${indent}`)}}`,
  );
};

const meta = {
  title: 'Components/Combobox',
  component: Combobox as ComponentType<ComboboxStoryArgs>,
  parameters: {
    layout: 'centered',
    docs: { source: { transform: abbreviateSharedOptions } },
  },
  tags: ['autodocs', 'test', 'beta'],
  decorators: [
    (Story, context) => {
      const width =
        context.name === 'State matrix'
          ? 'min(56rem, 95vw)'
          : 'min(397px, 95vw)';
      return (
        <div
          style={{
            width,
            minHeight: context.name === 'State matrix' ? undefined : '22rem',
          }}
        >
          <Story />
        </div>
      );
    },
  ],
  args: {
    label: 'Time zone',
    placeholder: 'Search by city or region',
    options: timezones,
    clearLabel: 'Clear all',
    showOptionsLabel: 'Show options',
    removeLabel: (name: string) => `Remove ${name}`,
    loadingLabel: 'Loading results…',
    noResultsLabel: (query: string) =>
      `No matches for '${query}'. Check the spelling or try a shorter search.`,
    resultsAnnouncement: (count: number) => `${count} results available`,
    multiple: false,
    hideLabel: false,
    invalid: false,
    required: false,
    disabled: false,
    loading: false,
  },
  argTypes: {
    label: {
      description:
        'Visible label. Required — every combobox is named, even when hidden with `hideLabel`.',
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
    },
    options: {
      description:
        'Options that can be chosen. Each has a `value`, a `label` and optional `username`, `email`, `institution`, `avatar` and `disabled`. Already-chosen options are left out of the menu.',
      control: { type: 'object' },
      table: { type: { summary: 'ComboboxOption[]' } },
    },
    multiple: {
      description:
        'Allow several values. Choosing keeps the menu open so more can be picked. When false, choosing replaces the value and closes the menu.',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
    value: {
      description: 'Controlled chosen values (option `value`s).',
      control: false,
      table: { type: { summary: 'string[]' } },
    },
    defaultValue: {
      description: 'Initial chosen values when uncontrolled.',
      control: { type: 'object' },
      table: { type: { summary: 'string[]' } },
    },
    onValueChange: {
      description:
        'Called with the full list of chosen values on every change.',
      table: { type: { summary: '(value: string[]) => void' } },
    },
    inputValue: {
      description: 'Controlled text typed into the field.',
      control: false,
      table: { type: { summary: 'string' } },
    },
    onInputChange: {
      description:
        'Called when the typed text changes, including when it is cleared after a choice or on blur. Use it to fetch options as the user types.',
      table: { type: { summary: '(inputValue: string) => void' } },
    },
    filterOptions: {
      description:
        'Replaces the built-in filter, so you decide what matches and in what order. The built-in filter ignores case and accents and matches anywhere in the label, username, email or institution (label matches first). It receives the options not yet chosen and the typed text, and returns the options to show. Pass `(options) => options` when the server already filtered the list.',
      control: false,
      table: {
        type: {
          summary:
            '(options: ComboboxOption[], inputValue: string) => ComboboxOption[]',
        },
        defaultValue: { summary: 'built-in filter' },
      },
    },
    loading: {
      description:
        'Shows `loadingLabel` in the menu while options are fetched.',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
    name: {
      description:
        'Field name. Each chosen value is submitted as its own hidden input; the typed text is never submitted.',
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
    },
    placement: {
      description:
        'Menu placement relative to the field. The menu still flips and shifts to stay on screen.',
      control: { type: 'text' },
      table: {
        type: { summary: 'Placement' },
        defaultValue: { summary: "'bottom-start'" },
      },
    },
    placeholder: {
      description:
        'Hint at what can be searched (e.g. "Search by name or email"). Never a substitute for the label.',
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
    },
    hideLabel: {
      description:
        'Hides the visible label. The label is still the accessible name.',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      description:
        'Shows the required asterisk and blocks submission natively until a value is chosen.',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
    invalid: {
      description: 'Applies the invalid treatment and `aria-invalid`.',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
    invalidFeedback: {
      description: 'Error text shown below the field when `invalid` is true.',
      control: { type: 'text' },
      if: { arg: 'invalid', truthy: true },
      table: { type: { summary: 'string' } },
    },
    supportingText: {
      description: 'Helper text shown below the field.',
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
    },
    infoTooltipLabel: {
      description:
        'Accessible label for the info button shown beside the visible label.',
      control: { type: 'text' },
      if: { arg: 'hideLabel', eq: false },
      table: { type: { summary: 'string' } },
    },
    disabled: {
      description:
        'Use when the field is unavailable. Pair with `supportingText` to explain why.',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
    clearLabel: {
      description:
        'Accessible label for the clear button that replaces the chevron once values are chosen.',
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
    },
    showOptionsLabel: {
      description:
        'Accessible label for the chevron button, e.g. "Show options".',
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
    },
    removeLabel: {
      description:
        'Builds the accessible label for a tag\'s remove button from the option label, e.g. "Remove Jessica Parker".',
      table: { type: { summary: '(optionLabel: string) => string' } },
    },
    loadingLabel: {
      description: 'Message shown while `loading`, e.g. "Loading results…".',
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
    },
    noResultsLabel: {
      description:
        'Builds the empty-result message. Repeat the search term and suggest a next step.',
      table: { type: { summary: '(inputValue: string) => string' } },
    },
    resultsAnnouncement: {
      description:
        'Builds the live-region announcement of the result count as the list filters.',
      table: { type: { summary: '(count: number) => string' } },
    },
  },
} satisfies Meta<ComboboxStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

// The menu is portaled to document.body, so queries for it can't use the
// canvas, which is scoped to the story root.
const bodyOf = (canvasElement: HTMLElement) =>
  within(canvasElement.ownerDocument.body);

/**
 * Later examples on this page refer to the `timezones` and `people` option
 * arrays by name instead of repeating them. Both are shown in full here and in
 * "With identity details".
 */
export const Default: Story = {};

export const WithIdentityDetails: Story = {
  args: {
    label: 'Enrol users',
    placeholder: 'Search by name or email',
    options: people,
    multiple: true,
    supportingText:
      'Two people can share a name — the extra lines tell them apart.',
  },
  play: async ({ canvas, canvasElement }) => {
    await userEvent.type(canvas.getByRole('combobox'), 'sarah');
    const body = bodyOf(canvasElement);
    const rows = await body.findAllByRole('option');
    await expect(rows).toHaveLength(2);
    await expect(rows[0]).toHaveTextContent('schen');
    await expect(rows[1]).toHaveTextContent('Barcelona campus');

    // The supporting lines are searched too, not only the name.
    const input = canvas.getByRole('combobox');
    await userEvent.clear(input);
    await userEvent.type(input, 'barcelona');
    await waitFor(() => expect(body.getAllByRole('option')).toHaveLength(1));
    await expect(body.getByRole('option')).toHaveTextContent('Sarah Chen');
  },
};

export const OpenMenu: Story = {
  args: { options: timezonesWithLockedRow },
  parameters: {
    docs: {
      description: {
        story:
          'Menu opened with the keyboard: the highlighted row shows where the user is while focus stays on the field. The disabled row stays visible and is skipped.',
      },
    },
  },
  play: async ({ canvas, canvasElement }) => {
    const input = canvas.getByRole('combobox');
    await userEvent.click(input);
    await userEvent.keyboard('{ArrowDown}{ArrowDown}');

    const body = bodyOf(canvasElement);
    const listbox = await body.findByRole('listbox', { name: 'Time zone' });
    const options = within(listbox).getAllByRole('option');
    await expect(input).toHaveAttribute('aria-expanded', 'true');
    await expect(input).toHaveAttribute('aria-controls', listbox.id);
    await expect(input).toHaveAttribute('aria-activedescendant', options[1].id);
    await expect(input).toHaveFocus();
    await expect(options[4]).toHaveAttribute('aria-disabled', 'true');
  },
};

export const Filtering: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The built-in filter ignores case and accents and matches anywhere in the item (label, username, email, institution): "sao" finds "São Paulo". Pass `filterOptions` to decide the matching yourself (see Custom filter).',
      },
    },
  },
  play: async ({ canvas, canvasElement }) => {
    await userEvent.type(canvas.getByRole('combobox'), 'sao');
    const body = bodyOf(canvasElement);
    const rows = await body.findAllByRole('option');
    await expect(rows).toHaveLength(1);
    await expect(rows[0]).toHaveTextContent('America/São Paulo');
    await waitFor(() =>
      expect(body.getByRole('status')).toHaveTextContent('1 results available'),
    );
  },
};

/**
 * Typing, choosing with the keyboard and removing a tag, in one flow. The menu
 * filters as the user types (accents ignored: "jose" finds "José"), a chosen
 * option becomes a removable tag and leaves the menu, and removing a tag
 * returns focus to the field.
 */
export const KeyboardAndTags: Story = {
  args: {
    label: 'Members',
    placeholder: 'Search by name or email',
    options: people,
    multiple: true,
    name: 'members',
  },
  play: async ({ canvas, canvasElement }) => {
    const body = bodyOf(canvasElement);
    const input = canvas.getByRole('combobox');

    await userEvent.type(input, 'jose');
    await expect(await body.findAllByRole('option')).toHaveLength(1);
    await userEvent.keyboard('{ArrowDown}{Enter}');

    await expect(
      canvas.getByRole('button', { name: 'Remove José Alvarez' }),
    ).toBeVisible();
    await expect(input).toHaveValue('');
    await expect(input).toHaveFocus();
    // Multiple keeps the menu open, without the option just chosen.
    const listbox = await body.findByRole('listbox');
    await expect(
      within(listbox).queryByRole('option', { name: /José/ }),
    ).not.toBeInTheDocument();

    await userEvent.click(
      canvas.getByRole('button', { name: 'Remove José Alvarez' }),
    );
    await expect(
      canvas.queryByRole('button', { name: 'Remove José Alvarez' }),
    ).not.toBeInTheDocument();
    await expect(input).toHaveFocus();
  },
};

export const NoResults: Story = {
  play: async ({ canvas, canvasElement }) => {
    await userEvent.type(canvas.getByRole('combobox'), 'Jsoe');
    const body = bodyOf(canvasElement);
    await expect(
      (await body.findAllByText(/No matches for 'Jsoe'/))[0],
    ).toBeVisible();
    // Never leaves an empty listbox behind for screen readers.
    await expect(body.queryByRole('listbox')).not.toBeInTheDocument();
  },
};

export const Loading: Story = {
  args: { loading: true, options: [] },
  play: async ({ canvas, canvasElement }) => {
    await userEvent.type(canvas.getByRole('combobox'), 'sar');
    const body = bodyOf(canvasElement);
    await expect(
      (await body.findAllByText('Loading results…'))[0],
    ).toBeVisible();
  },
};

const serverPeople = people.filter((person) => !person.disabled);

const AsyncSearchDemo = (args: ComboboxStoryArgs) => {
  const [query, setQuery] = useState('');
  const [resolved, setResolved] = useState<{
    query: string;
    results: ComboboxOption[];
  }>({ query: '', results: [] });

  useEffect(() => {
    if (!query.trim()) return;
    const timer = setTimeout(() => {
      setResolved({
        query,
        results: serverPeople.filter((person) =>
          person.label.toLowerCase().includes(query.trim().toLowerCase()),
        ),
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const hasQuery = query.trim() !== '';
  // Loading until the "server" has answered for the current text.
  const loading = hasQuery && resolved.query !== query;
  const results = hasQuery ? resolved.results : [];

  return (
    <Combobox
      {...(args as ComboboxProps)}
      options={results}
      loading={loading}
      inputValue={query}
      onInputChange={setQuery}
      // The "server" has already filtered.
      filterOptions={(all) => all}
    />
  );
};

/**
 * The built-in filter matches the label, username, email and institution. Pass
 * `filterOptions` to decide the matching yourself. Here only the start of the
 * label matches, so "paris" finds "Europe/Paris" but "eur" finds nothing.
 */
export const CustomFilter: Story = {
  args: {
    label: 'City',
    placeholder: 'Type the start of a city name',
    options: [
      { value: 'paris', label: 'Paris' },
      { value: 'perth', label: 'Perth' },
      { value: 'lisbon', label: 'Lisbon' },
    ],
    filterOptions: (options, inputValue) =>
      options.filter((option) =>
        option.label.toLowerCase().startsWith(inputValue.trim().toLowerCase()),
      ),
  },
  play: async ({ canvas, canvasElement }) => {
    await userEvent.type(canvas.getByRole('combobox'), 'p');
    const body = bodyOf(canvasElement);
    const rows = await body.findAllByRole('option');
    await expect(rows.map((row) => row.textContent)).toEqual([
      'Paris',
      'Perth',
    ]);
  },
};

/**
 * A long list renders a page of rows at a time (100), and adds another each
 * time the list is scrolled near its end or arrowed towards it, so thousands of
 * options stay responsive. Assistive tech still hears the full count
 * (`aria-setsize`, `aria-posinset`). For server-sized sets, search on the
 * server instead (see Async search).
 */
export const LargeList: Story = {
  args: {
    label: 'Members',
    placeholder: 'Search by name',
    multiple: true,
    options: Array.from({ length: 3000 }, (_, i) => ({
      value: `person-${i}`,
      label: `Person ${i + 1}`,
      username: `user${i + 1}`,
    })),
  },
  parameters: {
    // The 3,000 generated options would make the code example enormous.
    docs: { canvas: { sourceState: 'none' } },
  },
  play: async ({ canvas, canvasElement }) => {
    const body = bodyOf(canvasElement);
    await userEvent.click(canvas.getByRole('combobox'));
    await userEvent.keyboard('{ArrowDown}');

    const listbox = await body.findByRole('listbox');
    await expect(within(listbox).getAllByRole('option')).toHaveLength(100);
    await expect(within(listbox).getAllByRole('option')[0]).toHaveAttribute(
      'aria-setsize',
      '3000',
    );

    // Scrolling to the end adds the next page.
    listbox.scrollTop = listbox.scrollHeight;
    await waitFor(() =>
      expect(within(listbox).getAllByRole('option')).toHaveLength(200),
    );
  },
};

/** Options fetched as the user types: fixed list or server, one setup. */
export const AsyncSearch: Story = {
  args: { label: 'Find a user', multiple: true },
  render: (args) => <AsyncSearchDemo {...args} />,
  play: async ({ canvas, canvasElement }) => {
    await userEvent.type(canvas.getByRole('combobox'), 'sar');
    const body = bodyOf(canvasElement);
    await expect(
      (await body.findAllByText('Loading results…'))[0],
    ).toBeVisible();
    await waitFor(() => expect(body.getAllByRole('option')).toHaveLength(2));
  },
};

export const RightToLeft: Story = {
  tags: ['test', 'beta'],
  args: {
    label: 'الأعضاء',
    placeholder: 'ابحث بالاسم',
    options: people,
    multiple: true,
    defaultValue: ['jessica', 'jose'],
  },
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
  play: async ({ canvas, canvasElement }) => {
    await userEvent.type(canvas.getByRole('combobox'), 'sar');
    const listbox = await bodyOf(canvasElement).findByRole('listbox');
    // The portaled menu mirrors the field's direction.
    await expect(listbox.parentElement).toHaveAttribute('dir', 'rtl');
  },
};

/**
 * In a modal dialog the menu is portaled into the dialog, not the page body, so
 * it stays above a Bootstrap modal (z-index 1055) and inside the part of the
 * page that assistive tech can reach. The dialog here is a stand-in: fixed,
 * above the menu's own z-index, `aria-modal`.
 */
export const InsideDialog: Story = {
  args: { label: 'Enrol users', options: people, multiple: true },
  decorators: [
    (Story) => (
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Enrol users"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1055,
          display: 'grid',
          placeItems: 'center',
          background: 'var(--mds-bg-surface-default)',
        }}
      >
        <div style={{ inlineSize: 'min(397px, 95vw)' }}>
          <Story />
        </div>
      </div>
    ),
  ],
  play: async ({ canvas, canvasElement }) => {
    await userEvent.click(canvas.getByRole('combobox'));
    await userEvent.keyboard('{ArrowDown}');

    const listbox = await bodyOf(canvasElement).findByRole('listbox');
    const dialog = canvas.getByRole('dialog');
    await expect(dialog).toContainElement(listbox);

    // Nothing in the dialog's layer may cover the menu.
    const { x, y, width, height } = listbox.getBoundingClientRect();
    const hit = canvasElement.ownerDocument.elementFromPoint(
      x + width / 2,
      y + height / 2,
    );
    await expect(listbox).toContainElement(hit as HTMLElement);
  },
};

const matrixHeaderStyle = {
  padding: 'var(--mds-spacing-xs) var(--mds-spacing-sm)',
  textAlign: 'center' as const,
  color: 'var(--mds-text-subtle)',
  fontSize: 'var(--mds-font-size-paragraph-small)',
  fontFamily: 'var(--mds-font-family-base)',
  fontWeight: 'var(--mds-font-weight-medium)',
};
const matrixRowHeaderStyle = {
  ...matrixHeaderStyle,
  textAlign: 'start' as const,
  inlineSize: '8rem',
};
const matrixCellStyle = {
  padding: 'var(--mds-spacing-xs) var(--mds-spacing-sm)',
  verticalAlign: 'top' as const,
};

// Merges the story args, a row's overrides and per-cell props. Always several
// values, so `multiple` is forced on.
const matrixProps = (
  ...sources: Partial<ComboboxStoryArgs>[]
): Partial<ComboboxStoryArgs> =>
  Object.assign({}, ...sources, { multiple: true });

const matrixTableStyle = {
  borderCollapse: 'collapse' as const,
  tableLayout: 'fixed' as const,
  inlineSize: '100%',
};

/**
 * Field options that change how the field is labelled or described, with no
 * interaction: a required marker, the info button, a hidden label and
 * supporting text. Invalid and disabled are in the State matrix.
 */
export const FieldOptions: Story = {
  name: 'Field options',
  args: { options: timezones },
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  decorators: [
    (Story) => (
      <div style={{ inlineSize: 'min(40rem, 95vw)' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => {
    const rows: {
      key: string;
      title: string;
      props: Partial<ComboboxStoryArgs>;
    }[] = [
      {
        key: 'required',
        title: 'Required',
        props: {
          label: 'Time zone, required',
          required: true,
          supportingText: 'Choose at least one time zone.',
        },
      },
      {
        key: 'info',
        title: 'Info button',
        props: {
          label: 'Time zone, with info',
          infoTooltipLabel: 'Times are shown in the zone you choose.',
        },
      },
      {
        key: 'hidden-label',
        title: 'Hidden label',
        props: { label: 'Time zone, hidden label', hideLabel: true },
      },
      {
        key: 'supporting',
        title: 'Supporting text',
        props: {
          label: 'Time zone, with supporting text',
          supportingText: 'Used for course dates and deadlines.',
        },
      },
    ];
    return (
      <table style={matrixTableStyle}>
        <thead>
          <tr>
            <th
              style={{ ...matrixHeaderStyle, inlineSize: '8rem' }}
              scope="col"
            >
              Option
            </th>
            <th style={matrixHeaderStyle} scope="col">
              Field
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ key, title, props }) => (
            <tr key={key} data-combobox-option={key}>
              <th style={matrixRowHeaderStyle} scope="row">
                {title}
              </th>
              <td style={matrixCellStyle}>
                <Combobox
                  {...(Object.assign({}, args, props, {
                    placeholder: 'Search by city or region',
                    multiple: false,
                  }) as ComboboxProps)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText(/Time zone, required/)).toBeRequired();
    await expect(canvas.getByText('*')).toBeVisible();
    await expect(
      canvas.getByRole('button', {
        name: 'Times are shown in the zone you choose.',
      }),
    ).toBeVisible();
    // A hidden label still names the field, but is not shown.
    await expect(
      canvas.getByRole('combobox', { name: 'Time zone, hidden label' }),
    ).toBeVisible();
    await expect(
      canvas.queryByText('Time zone, hidden label'),
    ).not.toBeInTheDocument();
    await expect(
      canvas.getByText('Used for course dates and deadlines.'),
    ).toBeVisible();
  },
};

/**
 * Chosen values at different sizes: a one-line tag, identity tags with an
 * avatar and supporting lines (submitted with `name`), and enough tags to wrap
 * onto several rows. With a one-line tag, the tag and the typed text share one
 * vertical centre line; the field grows to hold extra rows.
 */
export const ChosenValues: Story = {
  name: 'Chosen values',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  decorators: [
    (Story) => (
      <div style={{ inlineSize: 'min(40rem, 95vw)' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => {
    const rows: {
      key: string;
      title: string;
      props: Partial<ComboboxStoryArgs>;
    }[] = [
      {
        key: 'one-line',
        title: 'One-line tag',
        props: {
          label: 'Time zones, one tag',
          options: timezones,
          defaultValue: ['tokyo'],
          placeholder: 'Search by city or region',
        },
      },
      {
        key: 'identity',
        title: 'Identity tags',
        props: {
          label: 'Members, identity tags',
          options: people,
          defaultValue: ['jessica', 'jose'],
          placeholder: 'Search by name or email',
          name: 'members',
        },
      },
      {
        key: 'wrapping',
        title: 'Wrapping tags',
        props: {
          label: 'Time zones, many tags',
          options: timezones,
          defaultValue: timezones.map((zone) => zone.value),
          placeholder: 'Search by city or region',
        },
      },
    ];
    return (
      <table style={matrixTableStyle}>
        <thead>
          <tr>
            <th
              style={{ ...matrixHeaderStyle, inlineSize: '8rem' }}
              scope="col"
            >
              Content
            </th>
            <th style={matrixHeaderStyle} scope="col">
              Field
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ key, title, props }) => (
            <tr key={key} data-combobox-values={key}>
              <th style={matrixRowHeaderStyle} scope="row">
                {title}
              </th>
              <td style={matrixCellStyle}>
                <Combobox
                  {...(Object.assign({}, args, { hideLabel: true }, props, {
                    multiple: true,
                  }) as ComboboxProps)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
  play: async ({ canvas }) => {
    const centre = (el: Element) => {
      const { top, height } = el.getBoundingClientRect();
      return top + height / 2;
    };
    const tagsOf = (input: HTMLElement) =>
      Array.from(
        input.closest('.mds-combobox__field')?.querySelectorAll('.mds-tag') ??
          [],
      );

    // With a one-line tag, the tag and the input share one centre line.
    const oneLine = canvas.getByLabelText('Time zones, one tag');
    for (const tag of tagsOf(oneLine)) {
      await expect(Math.abs(centre(tag) - centre(oneLine))).toBeLessThanOrEqual(
        1,
      );
    }

    // Identity tags are taller and may push the input to its own row, so only
    // check that each chosen person is shown as a removable tag.
    const identity = canvas.getByLabelText('Members, identity tags');
    await expect(tagsOf(identity)).toHaveLength(2);

    // Many tags wrap, so that field grows taller than a one-row field.
    const wrapping = canvas.getByLabelText('Time zones, many tags');
    await expect(tagsOf(wrapping)).toHaveLength(timezones.length);
    const heightOf = (input: HTMLElement) =>
      (
        input.closest('.mds-input-field-wrapper') as HTMLElement
      ).getBoundingClientRect().height;
    await expect(heightOf(wrapping)).toBeGreaterThan(
      heightOf(canvas.getByLabelText('Time zones, one tag')),
    );
  },
};

/**
 * Field states for visual regression review: Figma's `Tags` property (no
 * values chosen / values chosen) crossed with the default, invalid and
 * disabled field states. Hover and focus come from Input's field and are
 * driven by the pseudo-states addon. The open menu and its row states
 * (default, hover/highlighted, disabled, keyboard focus) are covered by
 * `OpenMenu`, since the menu is a single portaled surface.
 */
export const StateMatrix: Story = {
  name: 'State matrix',
  args: { options: people, multiple: true },
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
    pseudo: {
      hover: "[data-combobox-state='hover'] .mds-input-field-wrapper",
      focusVisible: "[data-combobox-state='focus-visible'] .mds-input-field",
    },
  },
  render: (args) => {
    const rows: {
      key: string;
      title: string;
      props: Partial<ComboboxStoryArgs>;
    }[] = [
      { key: 'default', title: 'Default', props: {} },
      { key: 'hover', title: 'Hover', props: {} },
      { key: 'focus-visible', title: 'Focus', props: {} },
      {
        key: 'invalid',
        title: 'Invalid',
        props: { invalid: true, invalidFeedback: 'Choose a member.' },
      },
      {
        key: 'disabled',
        title: 'Disabled',
        props: { disabled: true, supportingText: 'Members are locked.' },
      },
    ];
    return (
      <table
        style={{
          borderCollapse: 'collapse',
          tableLayout: 'fixed',
          inlineSize: '100%',
        }}
      >
        <thead>
          <tr>
            <th
              style={{ ...matrixHeaderStyle, inlineSize: '8rem' }}
              scope="col"
            >
              State
            </th>
            <th style={matrixHeaderStyle} scope="col">
              No values chosen
            </th>
            <th style={matrixHeaderStyle} scope="col">
              Values chosen
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ key, title, props }) => (
            <tr key={key} data-combobox-state={key}>
              <th style={matrixRowHeaderStyle} scope="row">
                {title}
              </th>
              <td style={matrixCellStyle}>
                <Combobox
                  {...(matrixProps(args, props, {
                    label: `${title}, none chosen`,
                    hideLabel: true,
                    placeholder: 'Search by name or email',
                  }) as ComboboxProps)}
                />
              </td>
              <td style={matrixCellStyle}>
                <Combobox
                  {...(matrixProps(args, props, {
                    label: `${title}, chosen`,
                    hideLabel: true,
                    defaultValue: ['jessica', 'jose'],
                  }) as ComboboxProps)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Default, none chosen')).toBeVisible();
    await expect(
      canvas.getAllByRole('button', { name: 'Remove Jessica Parker' }),
    ).toHaveLength(5);
    await expect(canvas.getByLabelText('Disabled, chosen')).toBeDisabled();
    await expect(canvas.getByLabelText('Invalid, none chosen')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    // Invalid shows its feedback beside the field, in both columns.
    await expect(canvas.getAllByText('Choose a member.')).toHaveLength(2);
    // Disabled also disables the chosen tags' remove buttons.
    const disabledRow = canvas
      .getByText('Disabled', { selector: 'th' })
      .closest('tr') as HTMLElement;
    for (const button of within(disabledRow).getAllByRole('button', {
      name: /^Remove /,
    })) {
      await expect(button).toBeDisabled();
    }
  },
};

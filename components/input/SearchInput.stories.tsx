import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { SearchInput } from './SearchInput';

const meta = {
  title: 'Components/Input/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'test', 'stable'],
  decorators: [
    (Story, context) => (
      <div
        style={{
          width:
            context.name === 'States' ? 'min(48rem, 95vw)' : 'min(395px, 95vw)',
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    label: 'Search',
    placeholder: 'Search for courses',
    hideLabel: false,
    invalid: false,
    required: false,
    disabled: false,
    clearLabel: 'Clear search',
  },
  argTypes: {
    label: {
      description: 'Visible label text above the search field.',
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
    },
    placeholder: {
      description:
        'Optional hint text shown when the field is empty. Hint at what can be searched (e.g. "Search courses") — never as a substitute for the label.',
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
    },
    hideLabel: {
      description:
        'When true, hides the visible label. Provide aria-label or label for accessible naming.',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
    invalid: {
      description:
        'Applies invalid styling and aria-invalid while the field is Empty (e.g. a required field submitted or blurred with nothing chosen). Once the field is Filled, the invalid treatment is automatically suppressed, even if this prop is still true.',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      description:
        'Marks the field as required and enables native HTML5 validation.',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      description:
        'Use when input is unavailable. Pair with supportingText to explain why the field is disabled.',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
    clearLabel: {
      description:
        'Accessible label for the button that clears the current value. Only rendered once the field has a value.',
      control: { type: 'text' },
    },
    invalidFeedback: {
      description: 'Error text shown below the field when invalid is true.',
      control: { type: 'text' },
      if: { arg: 'invalid', truthy: true },
      table: { type: { summary: 'string' } },
    },
    supportingText: {
      description:
        'Helper text shown below the field when no invalid feedback is shown.',
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
    },
    infoTooltipLabel: {
      description:
        'Accessible label for the info tooltip button shown beside the visible label.',
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
      if: { arg: 'hideLabel', eq: false },
    },
    onDebouncedChange: {
      description:
        'Called with the current value debounceMs after the user stops typing. Use this — not onChange — to trigger the actual search/filter request, so instant search has a defined firing rate instead of running per keystroke. Fires immediately (bypassing the debounce) when the value is cleared.',
      table: { type: { summary: '(value: string) => void' } },
    },
    debounceMs: {
      description: 'Debounce interval, in milliseconds, for onDebouncedChange.',
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '300' },
      },
    },
    landmark: {
      description:
        'Renders the root as a `role="search"` landmark named by the label. Use for page- or site-level search; leave off for filters in tables, toolbars, or panels, and when already wrapped in `<search>` or `<form role="search">`.',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const showcaseParameters = {
  controls: { disable: true },
  docs: {
    canvas: { sourceState: 'none' },
  },
} as const;

const showcaseTableStyle = {
  borderCollapse: 'collapse' as const,
  tableLayout: 'fixed' as const,
  inlineSize: '100%',
  minInlineSize: '32rem',
};

const showcaseHeaderCellStyle = {
  padding: 'var(--mds-spacing-xs) var(--mds-spacing-sm)',
  textAlign: 'center' as const,
  color: 'var(--mds-text-subtle)',
  fontSize: 'var(--mds-font-size-paragraph-small)',
  fontFamily: 'var(--mds-font-family-base)',
  fontWeight: 'var(--mds-font-weight-medium)',
};

const showcaseRowHeaderCellStyle = {
  padding: 'var(--mds-spacing-xs) var(--mds-spacing-sm)',
  textAlign: 'start' as const,
  fontFamily: 'var(--mds-font-family-base)',
  fontWeight: 'var(--mds-font-weight-medium)',
  inlineSize: '6rem',
};

const showcaseCellStyle = {
  padding: 'var(--mds-spacing-xs) var(--mds-spacing-sm)',
  verticalAlign: 'middle' as const,
};

export const Default: Story = {};

export const States: Story = {
  parameters: {
    ...showcaseParameters,
    docs: {
      ...showcaseParameters.docs,
      description: {
        story:
          'State table for visual regression review. Hover, active, and focus-visible cells are driven by the Storybook pseudo-states addon.',
      },
    },
    pseudo: {
      hover: "[data-search-input-state='hover'] .mds-input-field",
      active: "[data-search-input-state='active'] .mds-input-field",
      focusVisible:
        "[data-search-input-state='focus-visible'] .mds-input-field",
    },
  },
  render: (args) => (
    <table style={showcaseTableStyle}>
      <thead>
        <tr>
          <th
            style={{ ...showcaseHeaderCellStyle, inlineSize: '6rem' }}
            scope="col"
          >
            State
          </th>
          <th style={showcaseHeaderCellStyle} scope="col">
            Empty
          </th>
          <th style={showcaseHeaderCellStyle} scope="col">
            Filled
          </th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <th style={showcaseRowHeaderCellStyle} scope="row">
            Default
          </th>
          <td style={showcaseCellStyle}>
            <SearchInput {...args} label="Default empty" hideLabel />
          </td>
          <td style={showcaseCellStyle}>
            <SearchInput
              {...args}
              label="Default filled"
              hideLabel
              defaultValue="Introduction to biology"
            />
          </td>
        </tr>

        <tr data-search-input-state="hover">
          <th style={showcaseRowHeaderCellStyle} scope="row">
            Hover
          </th>
          <td style={showcaseCellStyle}>
            <SearchInput {...args} label="Hover empty" hideLabel />
          </td>
          <td style={showcaseCellStyle}>
            <SearchInput
              {...args}
              label="Hover filled"
              hideLabel
              defaultValue="Introduction to biology"
            />
          </td>
        </tr>

        <tr data-search-input-state="active">
          <th style={showcaseRowHeaderCellStyle} scope="row">
            Active
          </th>
          <td style={showcaseCellStyle}>
            <SearchInput {...args} label="Active empty" hideLabel />
          </td>
          <td style={showcaseCellStyle}>
            <SearchInput
              {...args}
              label="Active filled"
              hideLabel
              defaultValue="Introduction to biology"
            />
          </td>
        </tr>

        <tr data-search-input-state="focus-visible">
          <th style={showcaseRowHeaderCellStyle} scope="row">
            Focus
          </th>
          <td style={showcaseCellStyle}>
            <SearchInput {...args} label="Focus empty" hideLabel />
          </td>
          <td style={showcaseCellStyle}>
            <SearchInput
              {...args}
              label="Focus filled"
              hideLabel
              defaultValue="Introduction to biology"
            />
          </td>
        </tr>
      </tbody>
    </table>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Default empty')).toBeVisible();
    await expect(canvas.getByLabelText('Default filled')).toHaveValue(
      'Introduction to biology',
    );
    await expect(canvas.getByLabelText('Hover empty')).toBeVisible();
    await expect(canvas.getByLabelText('Active empty')).toBeVisible();
    await expect(canvas.getByLabelText('Focus empty')).toBeVisible();
  },
};

export const Filled: Story = {
  args: {
    defaultValue: 'Introduction to biology',
  },
};

export const WithInfoButton: Story = {
  args: {
    infoTooltipLabel: 'Search matches course titles and codes.',
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
    invalidFeedback: 'No courses match this search.',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    supportingText: 'Search is disabled until a category is selected.',
  },
};

export const HiddenLabel: Story = {
  args: {
    hideLabel: true,
    label: 'Search',
    supportingText: 'Supporting text still shows when the label is hidden.',
  },
};

export const Landmark: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Pass `landmark` for a page- or site-level search so assistive technology can jump straight to it. The root becomes a `role="search"` landmark named by the label. Leave it off for filters inside a table, toolbar, or panel.',
      },
    },
  },
  args: {
    label: 'Search this site',
    placeholder: 'Search courses, people, and resources',
    landmark: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const landmark = canvas.getByRole('search', { name: 'Search this site' });
    await expect(landmark).toContainElement(canvas.getByRole('searchbox'));
  },
};

export const ClearValue: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    defaultValue: 'Introduction to biology',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Search');
    const clearButton = canvas.getByRole('button', { name: 'Clear search' });

    await expect(input).toHaveValue('Introduction to biology');

    await userEvent.click(clearButton);

    await expect(input).toHaveValue('');
    await waitFor(() =>
      expect(
        canvas.queryByRole('button', { name: 'Clear search' }),
      ).not.toBeInTheDocument(),
    );
    await expect(input).toHaveFocus();
  },
};

export const ClearValueWithEscape: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story:
          'Pressing Escape clears the field, matching the clear button — including returning focus and cancelling any pending debounced change.',
      },
    },
  },
  args: {
    defaultValue: 'Introduction to biology',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Search');

    await expect(input).toHaveValue('Introduction to biology');

    input.focus();
    await userEvent.keyboard('{Escape}');

    await expect(input).toHaveValue('');
    await waitFor(() =>
      expect(
        canvas.queryByRole('button', { name: 'Clear search' }),
      ).not.toBeInTheDocument(),
    );
    await expect(input).toHaveFocus();
  },
};

export const DebouncedSearch: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story:
          'Pass `onDebouncedChange` (not `onChange`) to trigger the actual search request — it fires 300ms (or `debounceMs`) after the user stops typing, and immediately when the value is cleared.',
      },
    },
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- storybook render function acts as a component
    const [lastSearched, setLastSearched] = useState('');
    return (
      <div>
        <SearchInput {...args} onDebouncedChange={setLastSearched} />
        <p style={{ marginTop: '0.5rem' }}>
          Last searched: <strong>{lastSearched || '(none yet)'}</strong>
        </p>
      </div>
    );
  },
};

// Regression test: BaseInput's native constraint validation (via
// `checkValidity()` on blur) must NOT set `aria-invalid="true"` while the
// field is Filled — `pattern` (and other native validation attrs) pass
// through `...props` straight to the native <input>, outside SearchInput's
// `showInvalid` gate, so SearchInput passes `suppressNativeInvalid` down to
// BaseInput to keep native validation subject to the same "invalid only
// while Empty" rule.
export const NativeValidationRespectsEmptyOnlyRule: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    pattern: '[0-9]+',
    defaultValue: 'not-a-number',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Search');

    await expect(input).toHaveValue('not-a-number');
    await expect(input).not.toHaveAttribute('aria-invalid', 'true'); // Filled — should stay valid

    input.focus();
    await userEvent.tab(); // blur — triggers BaseInput's checkValidity()

    await expect(input).not.toHaveAttribute('aria-invalid', 'true'); // still Filled — stays valid
    await expect(input).toHaveValue('not-a-number');
  },
};

export const RightToLeftInvalid: Story = {
  tags: ['test', 'stable'],
  decorators: [
    (Story) => (
      <div dir="rtl" style={{ width: 'min(395px, 95vw)' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    label: 'بحث',
    placeholder: 'ابحث عن المقررات',
    clearLabel: 'مسح البحث',
    required: true,
    invalid: true,
    invalidFeedback: 'لا توجد مقررات مطابقة لهذا البحث.',
    infoTooltipLabel: 'يطابق البحث عناوين المقررات ورموزها.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/^بحث\s*\*?\s*$/);
    await expect(input).toHaveValue('');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(
      canvas.getByText('لا توجد مقررات مطابقة لهذا البحث.'),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('button', {
        name: 'يطابق البحث عناوين المقررات ورموزها.',
      }),
    ).toBeInTheDocument();
    await expect(
      canvas.queryByRole('button', { name: 'مسح البحث' }),
    ).not.toBeInTheDocument();
  },
};

export const RightToLeftFilled: Story = {
  tags: ['test', 'stable'],
  decorators: [
    (Story) => (
      <div dir="rtl" style={{ width: 'min(395px, 95vw)' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    label: 'بحث',
    placeholder: 'ابحث عن المقررات',
    clearLabel: 'مسح البحث',
    defaultValue: 'مقدمة في الأحياء',
    required: true,
    infoTooltipLabel: 'يطابق البحث عناوين المقررات ورموزها.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/^بحث\s*\*?\s*$/);
    await expect(input).toHaveValue('مقدمة في الأحياء');
    await expect(input).not.toHaveAttribute('aria-invalid');
    await expect(
      canvas.getByRole('button', {
        name: 'يطابق البحث عناوين المقررات ورموزها.',
      }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: 'مسح البحث' }),
    ).toBeInTheDocument();
  },
};

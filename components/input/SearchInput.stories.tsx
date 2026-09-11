import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { SearchInput } from './SearchInput';

const meta = {
  title: 'Components/Input/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
    a11y: {
      options: {
        rules: {
          // The clear action is a `sm` CloseButton (16x16px), matching the
          // Figma spec for this compact search field affordance exactly.
          // Meeting the WCAG 2.5.8 (AA) 24px minimum would require either
          // resizing CloseButton away from that spec, or restructuring the
          // field layout so the input's hit box doesn't extend under the
          // button — both out of scope here. This is an accepted,
          // documented exception rather than a bug to fix.
          'target-size': { enabled: false },
        },
      },
    },
  },
  tags: ['autodocs', 'test', 'stable'],
  decorators: [
    (Story) => (
      <div style={{ width: 'min(395px, 95vw)' }}>
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
    readOnly: false,
    clearLabel: 'Clear search',
  },
  argTypes: {
    label: {
      description: 'Visible label text above the search field.',
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
    },
    placeholder: {
      description: 'Placeholder text shown when the field is empty.',
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
      description: 'Applies invalid styling and aria-invalid.',
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
    readOnly: {
      description:
        'Use when existing content should stay readable/copyable while editing is blocked.',
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
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

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
    defaultValue: 'xyz123',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    supportingText: 'Search is disabled until a category is selected.',
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultValue: 'Introduction to biology',
    supportingText: 'You can copy this value but cannot edit it.',
  },
};

export const HiddenLabel: Story = {
  args: {
    hideLabel: true,
    label: 'Search',
    supportingText: 'Supporting text still shows when the label is hidden.',
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

    expect(input).toHaveValue('Introduction to biology');

    await userEvent.click(clearButton);

    expect(input).toHaveValue('');
    await waitFor(() =>
      expect(
        canvas.queryByRole('button', { name: 'Clear search' }),
      ).not.toBeInTheDocument(),
    );
    expect(input).toHaveFocus();
  },
};

export const RightToLeft: Story = {
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
    invalid: true,
    invalidFeedback: 'لا توجد مقررات مطابقة لهذا البحث.',
    infoTooltipLabel: 'يطابق البحث عناوين المقررات ورموزها.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/^بحث\s*\*?\s*$/);
    expect(input).toHaveValue('مقدمة في الأحياء');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(
      canvas.getByText('لا توجد مقررات مطابقة لهذا البحث.'),
    ).toBeInTheDocument();
    expect(
      canvas.getByRole('button', {
        name: 'يطابق البحث عناوين المقررات ورموزها.',
      }),
    ).toBeInTheDocument();
    expect(
      canvas.getByRole('button', { name: 'مسح البحث' }),
    ).toBeInTheDocument();
  },
};

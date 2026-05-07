import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Button } from './Button';

const iconMapping = {
  None: undefined,
  Download: <i className="fa-solid fa-download" aria-hidden="true" />,
  Sort: <i className="fa-solid fa-sort" aria-hidden="true" />,
  Trash: <i className="fa-solid fa-trash" aria-hidden="true" />,
  'Arrow Right': <i className="fa-solid fa-arrow-right" aria-hidden="true" />,
  'Arrow Left': <i className="fa-solid fa-arrow-left" aria-hidden="true" />,
  Plus: <i className="fa-solid fa-plus" aria-hidden="true" />,
  Check: <i className="fa-solid fa-check" aria-hidden="true" />,
};

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  play: async ({ canvas, userEvent }) => {
    const buttons = canvas.getAllByRole('button');
    await userEvent.click(buttons[0]);
    // Wait for any updates to complete
    await new Promise((resolve) => setTimeout(resolve, 0));
    await expect(buttons[0]).toBeVisible();
  },
  tags: ['autodocs', 'test', 'stable'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    label: {
      description: 'Button label.',
      table: {
        defaultValue: { summary: '' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'danger',
        'ghost',
        'outline-primary',
        'outline-secondary',
        'outline-danger',
      ],
      description: 'Button variant.',
      table: {
        type: {
          summary:
            'primary | secondary | danger | ghost | outline-primary | outline-secondary | outline-danger',
        },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Button size. Defaults to "md" when not set.',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    startIcon: {
      description:
        'Icon rendered before the label. Accepts only intrinsic `<i>` or `<svg>` elements. Mark decorative icons with `aria-hidden="true"`. For icon-only buttons pass `aria-label` directly.',
      options: Object.keys(iconMapping),
      mapping: iconMapping,
      control: { type: 'select' },
    },
    endIcon: {
      description:
        'Icon rendered after the label. Accepts only intrinsic `<i>` or `<svg>` elements. Mark decorative icons with `aria-hidden="true"`. For icon-only buttons pass `aria-label` directly.',
      options: Object.keys(iconMapping),
      mapping: iconMapping,
      control: { type: 'select' },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Button disabled state.',
      table: {
        type: {
          summary: 'true | false',
        },
        defaultValue: { summary: 'false' },
      },
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: 'Native button type.',
      table: {
        type: {
          summary: 'button | submit | reset',
        },
        defaultValue: { summary: 'button' },
      },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    label: 'Button',
    variant: undefined,
    disabled: false,
  },
} satisfies Meta<typeof Button>;
export default meta;

const showcaseInlineStyle = {
  display: 'flex' as const,
  gap: 'var(--mds-spacing-sm)',
  flexWrap: 'wrap' as const,
  alignItems: 'center' as const,
};

const showcaseParameters = {
  controls: {
    disable: true,
  },
  docs: {
    canvas: { sourceState: 'none' },
  },
} as const;

type Story = StoryObj<typeof meta>;

export const DefaultPrimary: Story = {};

export const Variants: Story = {
  parameters: showcaseParameters,
  render: () => (
    <div style={showcaseInlineStyle}>
      <Button variant="primary" label="Primary" />
      <Button variant="secondary" label="Secondary" />
      <Button variant="danger" label="Danger" />
      <Button variant="outline-primary" label="Outline Primary" />
      <Button variant="outline-secondary" label="Outline Secondary" />
      <Button variant="outline-danger" label="Outline Danger" />
      <Button variant="ghost" label="Ghost" />
    </div>
  ),
};

export const Sizes: Story = {
  parameters: showcaseParameters,
  render: () => (
    <div style={showcaseInlineStyle}>
      <Button size="sm" label="Small" />
      <Button size="md" label="Medium" />
      <Button size="lg" label="Large" />
    </div>
  ),
};

export const States: Story = {
  parameters: showcaseParameters,
  render: () => (
    <div style={showcaseInlineStyle}>
      <Button label="Default" />
      <Button label="Disabled" disabled />
    </div>
  ),
};

export const WithIcons: Story = {
  parameters: showcaseParameters,
  render: () => (
    <div style={showcaseInlineStyle}>
      <Button label="Download" startIcon={iconMapping.Download} />
      <Button label="Continue" endIcon={iconMapping['Arrow Right']} />
    </div>
  ),
};

export const IconOnly: Story = {
  parameters: showcaseParameters,
  render: () => (
    <div style={showcaseInlineStyle}>
      <Button
        size="sm"
        label=""
        startIcon={iconMapping.Trash}
        aria-label="Delete small"
      />
      <Button
        size="md"
        label=""
        startIcon={iconMapping.Trash}
        aria-label="Delete medium"
      />
      <Button
        size="lg"
        label=""
        startIcon={iconMapping.Trash}
        aria-label="Delete large"
      />
    </div>
  ),
};

export const RightToLeft: Story = {
  args: {
    label: 'حالة',
    startIcon: iconMapping['Arrow Right'],
  },
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
  tags: ['test'],
};

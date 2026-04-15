import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Button } from './Button';

const iconMapping = {
  None: undefined,
  Download: <i className="fa-solid fa-download" aria-hidden="true" />,
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
    await userEvent.click(canvas.getByRole('button'));
    // Wait for any updates to complete
    await new Promise((resolve) => setTimeout(resolve, 0));
    await expect(canvas.getByRole('button')).toBeVisible();
  },
  tags: ['autodocs', 'test', 'beta'],
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
        'outline-primary',
        'outline-secondary',
        'outline-danger',
      ],
      description: 'Button variant.',
      table: {
        type: {
          summary:
            'primary | secondary | danger | outline-primary | outline-secondary | outline-danger',
        },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: [undefined, 'sm', 'lg'],
      description: 'Button size. Default is "md" if not set.',
      table: {
        type: { summary: 'sm | lg' },
        defaultValue: { summary: 'undefined' },
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
    variant: 'primary',
    disabled: false,
  },
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    label: 'Button',
  },
} satisfies Story;

export const Secondary = {
  args: {
    variant: 'secondary',
    label: 'Button',
  },
} satisfies Story;

export const Danger = {
  args: {
    variant: 'danger',
    label: 'Button',
  },
} satisfies Story;

export const OutlinePrimary = {
  args: {
    variant: 'outline-primary',
    label: 'Button',
  },
} satisfies Story;

export const OutlineSecondary = {
  args: {
    variant: 'outline-secondary',
    label: 'Button',
  },
} satisfies Story;

export const OutlineDanger = {
  args: {
    variant: 'outline-danger',
    label: 'Button',
  },
} satisfies Story;

export const Disabled = {
  args: {
    label: 'Button',
    disabled: true,
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { label: 'Button' });
    await expect(button).toBeDisabled();
  },
} satisfies Story;

export const Large = {
  args: {
    size: 'lg',
    label: 'Button',
  },
} satisfies Story;

export const Small = {
  args: {
    size: 'sm',
    label: 'Button',
  },
} satisfies Story;

export const WithLeadingIcon: Story = {
  args: {
    label: 'Download',
    startIcon: <i className="fa-solid fa-download" aria-hidden="true" />,
  },
} satisfies Story;

export const WithTrailingIcon: Story = {
  args: {
    label: 'Continue',
    endIcon: <i className="fa-solid fa-arrow-right" aria-hidden="true" />,
  },
} satisfies Story;

export const IconOnly: Story = {
  args: {
    label: '',
    startIcon: <i className="fa-solid fa-trash" aria-hidden="true" />,
    'aria-label': 'Delete',
  },
} satisfies Story;

export const RightToLeft: Story = {
  tags: ['test'],
  args: {
    label: 'Continue',
    startIcon: <i className="fa-solid fa-arrow-right" aria-hidden="true" />,
    endIcon: <i className="fa-solid fa-arrow-left" aria-hidden="true" />,
  },
  render: (args) => (
    <div dir="rtl">
      <Button {...args} />
    </div>
  ),
} satisfies Story;

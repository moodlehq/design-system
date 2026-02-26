import figma from '@figma/code-connect';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from 'react-bootstrap';
import { expect } from 'storybook/test';
import { Button } from './Button';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-danger';

const buttonLabel = 'Button';

const buttonVariants = [
  'primary',
  'secondary',
  'danger',
  'outline-primary',
  'outline-secondary',
  'outline-danger',
] as const satisfies readonly ButtonVariant[];

interface CodeConnectExampleProps {
  disabled?: boolean;
  size?: 'sm' | 'lg';
  active?: boolean;
  type?: 'primary' | 'secondary' | 'danger';
}

function PrimaryCodeConnectExample(props: CodeConnectExampleProps) {
  return (
    <Button
      label="Button"
      disabled={props.disabled}
      size={props.size}
      active={props.active}
      variant={props.type ?? 'primary'}
    />
  );
}

function SecondaryCodeConnectExample(props: CodeConnectExampleProps) {
  return (
    <Button
      label="Button"
      disabled={props.disabled}
      size={props.size}
      active={props.active}
      variant={props.type ?? 'secondary'}
    />
  );
}

function DangerCodeConnectExample(props: CodeConnectExampleProps) {
  return (
    <Button
      label="Button"
      disabled={props.disabled}
      size={props.size}
      active={props.active}
      variant={props.type ?? 'danger'}
    />
  );
}

function OutlinePrimaryCodeConnectExample(props: CodeConnectExampleProps) {
  return (
    <Button
      label="Button"
      disabled={props.disabled}
      size={props.size}
      active={props.active}
      variant="outline-primary"
    />
  );
}

function OutlineSecondaryCodeConnectExample(props: CodeConnectExampleProps) {
  return (
    <Button
      label="Button"
      disabled={props.disabled}
      size={props.size}
      active={props.active}
      variant="outline-secondary"
    />
  );
}

function OutlineDangerCodeConnectExample(props: CodeConnectExampleProps) {
  return (
    <Button
      label="Button"
      disabled={props.disabled}
      size={props.size}
      active={props.active}
      variant="outline-danger"
    />
  );
}

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
⚠️ **This component is under development and not production ready.** API may change without notice.

Use Font Awesome icons by passing an \`IconDefinition\` to the \`icon\` prop.

Example:

\`\`\`tsx
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

<Button
  label="Continue"
  variant="primary"
  icon={faArrowRight}
  iconPosition="end"
/>;
\`\`\`
        `,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/bPRkRtSszcbWw9f9p9rXvA?node-id=2828%3A1585',
      imports: ['import { Button } from "./Button"'],
      examples: [
        {
          example: PrimaryCodeConnectExample,
          variant: {
            Type: 'primary',
            Style: 'fill',
            State: 'default',
            Size: 'default',
          },
        },
        {
          example: SecondaryCodeConnectExample,
          variant: {
            Type: 'secondary',
            Style: 'fill',
            State: 'default',
            Size: 'default',
          },
        },
        {
          example: DangerCodeConnectExample,
          variant: {
            Type: 'danger',
            Style: 'fill',
            State: 'default',
            Size: 'default',
          },
        },
        {
          example: OutlinePrimaryCodeConnectExample,
          variant: {
            Type: 'primary',
            Style: 'outline',
            State: 'default',
            Size: 'default',
          },
        },
        {
          example: OutlineSecondaryCodeConnectExample,
          variant: {
            Type: 'secondary',
            Style: 'outline',
            State: 'default',
            Size: 'default',
          },
        },
        {
          example: OutlineDangerCodeConnectExample,
          variant: {
            Type: 'danger',
            Style: 'outline',
            State: 'default',
            Size: 'default',
          },
        },
      ],
      props: {
        type: figma.enum('Type', {
          primary: 'primary',
          secondary: 'secondary',
          danger: 'danger',
        }),
        disabled: figma.enum('State', {
          disabled: true,
        }),
        size: figma.enum('Size', {
          small: 'sm',
          large: 'lg',
        }),
        active: figma.enum('State', {
          active: true,
        }),
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: buttonLabel }));
    // Wait for any updates to complete
    await new Promise((resolve) => setTimeout(resolve, 0));
    await expect(canvas.getByText(buttonLabel)).toBeVisible();
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
      options: buttonVariants,
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
    icon: {
      control: false,
      description: 'Optional Font Awesome icon definition.',
      table: {
        type: {
          summary: 'IconDefinition',
        },
      },
    },
    iconPosition: {
      control: { type: 'radio' },
      options: ['start', 'end'],
      description: 'Icon placement relative to the label.',
      table: {
        type: {
          summary: 'start | end',
        },
        defaultValue: { summary: 'start' },
      },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    label: buttonLabel,
    variant: 'primary',
    disabled: false,
  },
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    label: buttonLabel,
  },
} satisfies Story;

export const Secondary = {
  args: {
    variant: 'secondary',
    label: buttonLabel,
  },
} satisfies Story;

export const Danger = {
  args: {
    variant: 'danger',
    label: buttonLabel,
  },
} satisfies Story;

export const OutlinePrimary = {
  args: {
    variant: 'outline-primary',
    label: buttonLabel,
  },
} satisfies Story;

export const OutlineSecondary = {
  args: {
    variant: 'outline-secondary',
    label: buttonLabel,
  },
} satisfies Story;

export const OutlineDanger = {
  args: {
    variant: 'outline-danger',
    label: buttonLabel,
  },
} satisfies Story;

export const Disabled = {
  args: {
    label: buttonLabel,
    disabled: true,
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: buttonLabel });
    await expect(button).toBeDisabled();
  },
} satisfies Story;

export const Large = {
  args: {
    size: 'lg',
    label: buttonLabel,
  },
} satisfies Story;

export const Small = {
  args: {
    size: 'sm',
    label: buttonLabel,
  },
} satisfies Story;

export const WithLeadingIcon = {
  args: {
    label: buttonLabel,
    icon: faArrowLeft,
    iconPosition: 'start',
  },
} satisfies Story;

export const WithTrailingIcon = {
  args: {
    label: buttonLabel,
    icon: faArrowRight,
    iconPosition: 'end',
  },
} satisfies Story;

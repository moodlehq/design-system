import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { expect } from 'storybook/test';
import { type SwitchVariant, Switch } from './Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'test', 'stable'],
  argTypes: {
    label: {
      description:
        'Visible label text. Also used as the aria-label fallback when hideLabel is true and no explicit aria-label is provided.',
      table: {
        defaultValue: { summary: '' },
      },
    },
    hideLabel: {
      control: { type: 'boolean' },
      description:
        'When true, hides the visible label element. Always provide an accessible name via aria-label or label.',
      table: {
        type: {
          summary: 'true | false',
        },
        defaultValue: { summary: 'false' },
      },
    },
    ['aria-label']: {
      control: { type: 'text' },
      description:
        'Accessible label for the input. Takes precedence over label when hideLabel is true.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['enablement', 'visibility', 'lock'],
      description: 'Semantic icon variant displayed in the thumb.',
      table: {
        type: { summary: "'enablement' | 'visibility' | 'lock'" },
        defaultValue: { summary: 'enablement' },
      },
    },
    labelSide: {
      control: { type: 'select' },
      options: ['end', 'start'],
      description: 'Whether the label appears after or before the indicator.',
      table: {
        type: { summary: "'end' | 'start'" },
        defaultValue: { summary: 'end' },
      },
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Whether the switch is checked in controlled mode.',
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables interaction and applies disabled styling.',
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    label: 'Label text',
    hideLabel: false,
    labelSide: undefined,
    variant: undefined,
    checked: false,
    disabled: false,
  },
} satisfies Meta<typeof Switch>;

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
};

const showcaseHeaderCellStyle = {
  padding: 'var(--mds-spacing-xs) var(--mds-spacing-sm)',
  textAlign: 'center' as const,
  color: 'var(--mds-text-subtle)',
  fontSize: 'var(--mds-font-size-paragraph-small)',
  fontFamily: 'var(--mds-font-family-base)',
  fontWeight: 'var(--mds-font-weight-medium)',
  whiteSpace: 'normal' as const,
  maxInlineSize: '7.5rem',
};

const showcaseRowHeaderCellStyle = {
  padding: 'var(--mds-spacing-xs) var(--mds-spacing-sm)',
  textAlign: 'start' as const,
  fontFamily: 'var(--mds-font-family-base)',
  fontWeight: 'var(--mds-font-weight-medium)',
};

const showcaseCellStyle = {
  padding: 'var(--mds-spacing-xs) var(--mds-spacing-sm)',
  textAlign: 'center' as const,
};

const showcaseStackStyle = {
  display: 'grid',
  rowGap: 'var(--mds-spacing-sm)',
};

const showcaseStatesTableStyle = {
  ...showcaseTableStyle,
  tableLayout: 'fixed' as const,
  minInlineSize: '36rem',
};

const showcaseStatesCellStyle = {
  ...showcaseCellStyle,
  textAlign: 'start' as const,
  verticalAlign: 'middle' as const,
};

const sanitizeSwitchArgs = <
  T extends { checked?: unknown; defaultChecked?: unknown },
>(
  args: T,
) => {
  const switchArgs = { ...args };

  delete switchArgs.checked;
  delete switchArgs.defaultChecked;

  return switchArgs;
};

export const Default: Story = {
  render: function Render(args) {
    const switchArgs = sanitizeSwitchArgs(args);

    const [{ checked }, updateArgs] = useArgs<typeof args>();

    return (
      <Switch
        {...switchArgs}
        checked={!!checked}
        onChange={(event) =>
          updateArgs({ checked: event.currentTarget.checked })
        }
      />
    );
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('checkbox', { name: 'Label text' });
    await userEvent.click(input);
    await new Promise((resolve) => setTimeout(resolve, 0));
    await expect(input).toBeVisible();
  },
};

export const Variants: Story = {
  parameters: showcaseParameters,
  render: function Render(args) {
    const switchArgs = sanitizeSwitchArgs(args);
    const variants: SwitchVariant[] = ['enablement', 'visibility', 'lock'];

    return (
      <table style={showcaseTableStyle}>
        <thead>
          <tr>
            <th style={showcaseHeaderCellStyle} scope="col">
              <span className="visually-hidden">Variant</span>
            </th>
            <th style={showcaseHeaderCellStyle} scope="col">
              Unchecked
            </th>
            <th style={showcaseHeaderCellStyle} scope="col">
              Checked
            </th>
          </tr>
        </thead>
        <tbody>
          {variants.map((variant) => {
            const variantLabel =
              variant.charAt(0).toUpperCase() + variant.slice(1);

            return (
              <tr key={variant}>
                <th style={showcaseRowHeaderCellStyle} scope="row">
                  {variantLabel}
                </th>
                <td style={showcaseCellStyle}>
                  <Switch
                    {...switchArgs}
                    variant={variant}
                    checked={false}
                    readOnly
                    label={`${variantLabel} enabled unchecked`}
                    hideLabel
                  />
                </td>
                <td style={showcaseCellStyle}>
                  <Switch
                    {...switchArgs}
                    variant={variant}
                    checked
                    readOnly
                    label={`${variantLabel} enabled checked`}
                    hideLabel
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('checkbox', { name: 'Enablement enabled checked' }),
    ).toBeChecked();
    await expect(
      canvas.getByRole('checkbox', { name: 'Visibility enabled unchecked' }),
    ).not.toBeChecked();
    await expect(
      canvas.getByRole('checkbox', { name: 'Lock enabled checked' }),
    ).toBeChecked();
  },
};

export const LabelSides: Story = {
  parameters: showcaseParameters,
  render: function Render(args) {
    const switchArgs = sanitizeSwitchArgs(args);

    return (
      <div style={showcaseStackStyle}>
        <Switch {...switchArgs} label="Label End" labelSide="end" />
        <Switch {...switchArgs} label="Label Start" labelSide="start" />
      </div>
    );
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('checkbox', { name: 'Label End' }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('checkbox', { name: 'Label Start' }),
    ).toBeVisible();
    await expect(canvas.getByText('Label End')).toBeVisible();
  },
};

export const States: Story = {
  parameters: {
    ...showcaseParameters,
    docs: {
      ...showcaseParameters.docs,
      description: {
        story:
          'State table for visual regression review. Hover and focus-visible cells are driven by the Storybook pseudo-states addon.',
      },
    },
    pseudo: {
      hover: "[data-switch-state='hover'] .mds-switch-control",
      focusVisible: "[data-switch-state='focus-visible'] .mds-switch-input",
    },
  },
  render: function Render(args) {
    const switchArgs = sanitizeSwitchArgs(args);
    return (
      <table style={showcaseStatesTableStyle}>
        <thead>
          <tr>
            <th style={showcaseHeaderCellStyle} scope="col">
              State
            </th>
            <th style={showcaseHeaderCellStyle} scope="col">
              Unchecked
            </th>
            <th style={showcaseHeaderCellStyle} scope="col">
              Checked
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th style={showcaseRowHeaderCellStyle} scope="row">
              Default
            </th>
            <td style={showcaseStatesCellStyle}>
              <Switch
                {...switchArgs}
                label="Default state"
                checked={false}
                readOnly
              />
            </td>
            <td style={showcaseStatesCellStyle}>
              <Switch
                {...switchArgs}
                label="Default checked state"
                checked
                readOnly
              />
            </td>
          </tr>

          <tr data-switch-state="hover">
            <th style={showcaseRowHeaderCellStyle} scope="row">
              Hover
            </th>
            <td style={showcaseStatesCellStyle}>
              <Switch
                {...switchArgs}
                label="Hover state"
                checked={false}
                readOnly
              />
            </td>
            <td style={showcaseStatesCellStyle}>
              <Switch
                {...switchArgs}
                label="Hover checked state"
                checked
                readOnly
              />
            </td>
          </tr>

          <tr data-switch-state="focus-visible">
            <th style={showcaseRowHeaderCellStyle} scope="row">
              Focus
            </th>
            <td style={showcaseStatesCellStyle}>
              <Switch
                {...switchArgs}
                label="Focus state"
                checked={false}
                readOnly
              />
            </td>
            <td style={showcaseStatesCellStyle}>
              <Switch
                {...switchArgs}
                label="Focus checked state"
                checked
                readOnly
              />
            </td>
          </tr>

          <tr>
            <th style={showcaseRowHeaderCellStyle} scope="row">
              Disabled
            </th>
            <td style={showcaseStatesCellStyle}>
              <Switch
                {...switchArgs}
                label="Disabled state"
                checked={false}
                disabled
                readOnly
              />
            </td>
            <td style={showcaseStatesCellStyle}>
              <Switch
                {...switchArgs}
                label="Disabled checked state"
                checked
                disabled
                readOnly
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('checkbox', { name: 'Default state' }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('checkbox', { name: 'Hover state' }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('checkbox', { name: 'Focus state' }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('checkbox', { name: 'Disabled state' }),
    ).toBeDisabled();
    await expect(
      canvas.getByRole('checkbox', { name: 'Default checked state' }),
    ).toBeChecked();
    await expect(
      canvas.getByRole('checkbox', { name: 'Hover checked state' }),
    ).toBeChecked();
    await expect(
      canvas.getByRole('checkbox', { name: 'Focus checked state' }),
    ).toBeChecked();
    await expect(
      canvas.getByRole('checkbox', { name: 'Disabled checked state' }),
    ).toBeDisabled();
    await expect(
      canvas.getByRole('checkbox', { name: 'Disabled checked state' }),
    ).toBeChecked();
  },
};

export const RightToLeft: Story = {
  tags: ['test', 'stable'],
  args: {
    label: 'نص التسمية',
    labelSide: 'start',
    defaultChecked: false,
  },
  render: function Render(args) {
    const switchArgs = sanitizeSwitchArgs(args);

    return <Switch {...switchArgs} defaultChecked={false} />;
  },
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('checkbox', { name: 'نص التسمية' }),
    ).toBeVisible();
  },
};

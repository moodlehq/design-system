import type { Meta, StoryObj } from '@storybook/react-vite';
import type React from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Button } from '../button';
import { Tooltip } from './Tooltip';

const placements = ['left', 'top', 'bottom', 'right'] as const;
const variants = ['dark', 'light'] as const;

const showcaseRowCompactStyle: React.CSSProperties = {
  display: 'flex',
  gap: '24px',
  flexWrap: 'wrap',
};

const showcaseRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '144px',
  flexWrap: 'wrap',
};

const showcaseCellStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const showcaseParameters = {
  controls: { disable: true },
  docs: {
    canvas: { sourceState: 'none' as const },
  },
};

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'test', 'stable'],
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Tooltip text. Must be a caller-supplied translated string.',
      table: {
        type: { summary: 'string' },
      },
    },
    placement: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description:
        'Preferred physical side of the trigger. Auto-flips to avoid viewport edges. In RTL, left and right still mean viewport-left and viewport-right.',
      table: {
        type: { summary: 'top | bottom | left | right' },
        defaultValue: { summary: 'top' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['dark', 'light'],
      description: 'Colour mode.',
      table: {
        type: { summary: 'dark | light' },
        defaultValue: { summary: 'dark' },
      },
    },
  },
  args: {
    label: 'This is a tooltip',
    placement: undefined,
    variant: undefined,
    children: <Button label="Hover me" variant="secondary" />,
  },
  decorators: [
    (Story) => (
      // Extra padding ensures the tooltip bubble is fully visible in the story canvas.
      <div style={{ padding: '64px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('button', { name: 'Hover me' });
    expect(trigger).toBeInTheDocument();

    await userEvent.hover(trigger);

    const tooltip = page.getByRole('tooltip', { hidden: true });
    await waitFor(() => expect(tooltip).toHaveAttribute('data-open'));
    expect(tooltip).toHaveTextContent('This is a tooltip');
  },
};

/**
 * Icon-only controls are a common tooltip trigger. Keep the trigger's
 * accessible name and expose the tooltip as additional description.
 */
export const IconOnlyTrigger: Story = {
  args: {
    label: 'More actions for this item',
  },
  render: (args) => (
    <Tooltip label={args.label}>
      <Button
        label=""
        aria-label="More options"
        variant="secondary"
        startIcon={<i className="fa-solid fa-ellipsis" aria-hidden="true" />}
      />
    </Tooltip>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('button', { name: 'More options' });

    await userEvent.hover(trigger);

    const tooltip = page.getByRole('tooltip', { hidden: true });
    await waitFor(() => expect(tooltip).toHaveAttribute('data-open'));
    expect(tooltip).toHaveTextContent(args.label as string);

    const describedBy = trigger.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    expect(describedBy?.split(/\s+/).filter(Boolean)).toContain(tooltip.id);
    expect(trigger).toHaveAccessibleName('More options');
  },
};

/**
 * Shows all supported visual variants with a fixed placement.
 */
export const Variants: Story = {
  parameters: showcaseParameters,
  play: async ({ canvasElement }) => {
    const page = within(canvasElement.ownerDocument.body);

    await waitFor(() =>
      expect(page.getAllByRole('tooltip', { hidden: true })).toHaveLength(
        variants.length,
      ),
    );

    const tooltips = page.getAllByRole('tooltip', { hidden: true });
    const openTooltips = tooltips.filter((tooltip) =>
      tooltip.hasAttribute('data-open'),
    );

    expect(tooltips).toHaveLength(variants.length);
    expect(openTooltips).toHaveLength(variants.length);

    for (const [index, variant] of variants.entries()) {
      expect(tooltips[index]).toHaveTextContent(
        `Tooltip with ${variant} variant`,
      );
    }
  },
  render: () => (
    <div style={showcaseRowStyle}>
      {variants.map((variant) => (
        <div key={variant} style={showcaseCellStyle}>
          <Tooltip
            label={`Tooltip with ${variant} variant`}
            variant={variant}
            data-forced-open=""
          >
            <Button
              label={`${variant[0].toUpperCase()}${variant.slice(1)}`}
              variant="secondary"
            />
          </Tooltip>
        </div>
      ))}
    </div>
  ),
};

/**
 * Shows all supported placements with a fixed visual variant.
 */
export const Placements: Story = {
  parameters: showcaseParameters,
  play: async ({ canvasElement }) => {
    const page = within(canvasElement.ownerDocument.body);

    await waitFor(() =>
      expect(page.getAllByRole('tooltip', { hidden: true })).toHaveLength(
        placements.length,
      ),
    );

    const tooltips = page.getAllByRole('tooltip', { hidden: true });
    const openTooltips = tooltips.filter((tooltip) =>
      tooltip.hasAttribute('data-open'),
    );

    expect(tooltips).toHaveLength(placements.length);
    expect(openTooltips).toHaveLength(placements.length);

    for (const [index, placement] of placements.entries()) {
      expect(tooltips[index]).toHaveTextContent(`Tooltip on the ${placement}`);
    }
  },
  render: () => (
    <div style={showcaseRowCompactStyle}>
      {placements.map((placement) => (
        <div key={placement} style={showcaseCellStyle}>
          <Tooltip
            label={`Tooltip on the ${placement}`}
            placement={placement}
            data-forced-open=""
          >
            <Button
              label={`${placement[0].toUpperCase()}${placement.slice(1)}`}
              variant="secondary"
            />
          </Tooltip>
        </div>
      ))}
    </div>
  ),
};

/** Pressing Escape while open should dismiss the tooltip (WCAG 2.1 SC 1.4.13). */
export const EscapeDismiss: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('button', { name: 'Hover me' });
    const tooltip = page.getByRole('tooltip', { hidden: true });

    await userEvent.hover(trigger);
    await waitFor(() => expect(tooltip).toHaveAttribute('data-open'));

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(tooltip).not.toHaveAttribute('data-open'));
  },
};

/**
 * Floating UI placement values are physical, not logical. In RTL, `left` still
 * means viewport-left, so `right` is used to place on inline-start.
 */
export const RightToLeft: Story = {
  tags: ['test', 'stable'],
  decorators: [
    (Story) => (
      <div dir="rtl" lang="ar" style={{ padding: '64px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    label: 'هذه تلميحة',
    placement: 'right',
    children: <Button label="مرر هنا" variant="secondary" />,
  },
};

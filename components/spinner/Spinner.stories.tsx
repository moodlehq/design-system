import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { expect } from 'storybook/test';
import { Spinner } from './Spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    // Chromatic freezes CSS animations on their first frame, where the
    // indicator is a zero-length dash (a dot) and only the track shows.
    // Snapshotting with reduced motion renders the fixed arc from spinner.css
    // instead, so every baseline shows both the track and indicator colours.
    chromatic: { prefersReducedMotion: 'reduce' },
    docs: {
      description: {
        component:
          'When the device is set to reduce motion, the ring turns more slowly with a fixed-length arc instead of stopping, so it still reads as activity. Keep the label so the wait is clear without relying on movement. To preview it, emulate prefers-reduced-motion in your browser (DevTools > Rendering).',
      },
    },
  },
  tags: ['autodocs', 'test', 'stable'],
  argTypes: {
    labelText: {
      control: { type: 'text' },
      description:
        'Pre-translated text saying what is happening, e.g. "Saving changes...". Always required: it is the accessible name, and is shown on screen only when showLabel is true.',
      table: { type: { summary: 'string' } },
    },
    showLabel: {
      control: { type: 'boolean' },
      description:
        'Shows labelText as visible text. When false, the text stays available to screen readers only.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'large'],
      description:
        'Small (20px) sits inside or beside a control with the label beside it. Large (64px) is for a page or main content area with the label beneath it.',
      table: {
        type: { summary: 'small | large' },
        defaultValue: { summary: 'small' },
      },
    },
    appearance: {
      control: { type: 'select' },
      options: ['primary', 'inverse'],
      description:
        'Primary for light and neutral surfaces. Inverse for dark or strongly coloured surfaces, such as a filled primary button.',
      table: {
        type: { summary: 'primary | inverse' },
        defaultValue: { summary: 'primary' },
      },
    },
    delay: {
      control: { type: 'boolean' },
      description:
        'Waits about 300ms before showing the spinner, so quick loads do not flash. Use for content loading in a region or page; leave off for a response to something the person has just done.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    labelText: 'Loading...',
    showLabel: false,
    size: 'small',
    appearance: 'primary',
    delay: false,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole('status').length).toBeGreaterThan(0);
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

const showcaseParameters = {
  controls: { disable: true },
  docs: {
    canvas: { sourceState: 'none' },
  },
} as const;

const rowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 'var(--mds-spacing-xl)',
};

const columnStyle: CSSProperties = {
  display: 'grid',
  gap: 'var(--mds-spacing-lg)',
};

// Inverse is meant for dark or filled surfaces; render it on the primary
// interactive fill so its contrast matches real use (e.g. a primary button).
const inverseSurfaceStyle: CSSProperties = {
  ...rowStyle,
  padding: 'var(--mds-spacing-lg)',
  borderRadius: 'var(--mds-border-radius-lg)',
  backgroundColor: 'var(--mds-bg-interactive-primary-default)',
};

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    labelText: 'Saving changes...',
    showLabel: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('status')).toHaveTextContent(
      'Saving changes...',
    );
    await expect(canvas.getByText('Saving changes...')).toBeVisible();
  },
};

export const Sizes: Story = {
  parameters: showcaseParameters,
  play: async ({ canvas }) => {
    const statuses = canvas.getAllByRole('status');
    await expect(statuses).toHaveLength(2);

    // A single-line label must still take Figma's 12px label slot, even
    // though lines are spaced wider so wrapped labels don't overlap. Small
    // is a row, so its height stays the 20px ring.
    const [small, large] = statuses;
    await expect(small.getBoundingClientRect().height).toBe(20);

    const glyph = large.querySelector('svg') as SVGElement;
    const labelSlot =
      large.getBoundingClientRect().height -
      glyph.getBoundingClientRect().height -
      parseFloat(getComputedStyle(large).rowGap);
    await expect(labelSlot).toBe(12);
  },
  render: () => (
    <div style={rowStyle}>
      <Spinner size="small" labelText="Loading..." showLabel />
      <Spinner size="large" labelText="Checking your access..." showLabel />
    </div>
  ),
};

export const Appearances: Story = {
  parameters: showcaseParameters,
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole('status')).toHaveLength(2);
  },
  render: () => (
    <div style={rowStyle}>
      <Spinner appearance="primary" labelText="Loading..." showLabel />
      <div style={inverseSurfaceStyle}>
        <Spinner appearance="inverse" labelText="Loading..." showLabel />
      </div>
    </div>
  ),
};

// Narrow frame standing in for a small container or 320px viewport. The width
// is a demo constraint, not a design value.
const narrowFrameStyle: CSSProperties = {
  inlineSize: '12rem',
  outline: '1px dashed var(--mds-border-default)',
};

const longLabels = [
  'Checking access to Safe Exam Browser...',
  'Zugriff auf Safe Exam Browser wird überprüft...',
];

export const LongLabel: Story = {
  tags: ['autodocs', 'test', 'stable'],
  parameters: {
    ...showcaseParameters,
    docs: {
      ...showcaseParameters.docs,
      description: {
        story:
          'Labels wrap inside a narrow container, so long translations reflow instead of overflowing (WCAG 1.4.10). Small wraps beside the ring; large wraps centred beneath it.',
      },
    },
  },
  play: async ({ canvas }) => {
    const labels = longLabels.flatMap((text) => canvas.getAllByText(text));
    await expect(labels).toHaveLength(longLabels.length * 2);

    for (const label of labels) {
      const frame = (
        label.closest('[data-frame]') as HTMLElement
      ).getBoundingClientRect();
      const box = label.getBoundingClientRect();
      // Overflow would push the label past either edge of its frame.
      await expect(box.left).toBeGreaterThanOrEqual(frame.left);
      await expect(box.right).toBeLessThanOrEqual(frame.right);
    }
  },
  render: () => (
    <div style={columnStyle}>
      {(['small', 'large'] as const).map((size) => (
        <div key={size} style={rowStyle}>
          {longLabels.map((text) => (
            <div key={text} data-frame style={narrowFrameStyle}>
              <Spinner size={size} labelText={text} showLabel />
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

// Stand-in for a page's main content area. The size is a demo constraint, not
// a design value.
const contentRegionStyle: CSSProperties = {
  display: 'grid',
  placeItems: 'center',
  inlineSize: '24rem',
  maxInlineSize: '100%',
  minBlockSize: '16rem',
  outline: '1px dashed var(--mds-border-default)',
};

export const CentredInRegion: Story = {
  parameters: {
    ...showcaseParameters,
    // Same large labelled spinner as VariantMatrix inside a demo box.
    chromatic: { disableSnapshot: true },
    docs: {
      ...showcaseParameters.docs,
      description: {
        story:
          'When a page or its main content area is waiting, centre a Large spinner with its label in the area that is waiting.',
      },
    },
  },
  render: () => (
    <div style={contentRegionStyle}>
      <Spinner size="large" labelText="Checking your access..." showLabel />
    </div>
  ),
};

export const Delayed: Story = {
  args: {
    size: 'large',
    labelText: 'Loading your courses...',
    showLabel: true,
    delay: true,
  },
  parameters: {
    // Timer-driven, and once shown it matches the large labelled spinner
    // already snapshotted in VariantMatrix.
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story:
          'For content loading in a region or on a page, set delay so the spinner waits about 300ms before it shows. If the content arrives first, unmount the spinner and nothing appears. The component does not keep itself on screen for a minimum time once shown: if your loads often finish just after the delay, hold the spinner briefly in your own code so it does not flash.',
      },
    },
  },
  play: async ({ canvas }) => {
    // The status region is there from the start, but empty until the delay
    // ends; then the label is inserted and announced.
    const status = canvas.getByRole('status');
    await expect(status).toBeEmptyDOMElement();
    await expect(
      await canvas.findByText('Loading your courses...'),
    ).toBeVisible();
  },
};

export const RightToLeft: Story = {
  tags: ['test', 'stable'],
  parameters: showcaseParameters,
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole('status')).toHaveLength(2);
    await expect(canvas.getByText('جارٍ حفظ التغييرات...')).toBeVisible();
  },
  render: () => (
    <div dir="rtl" style={rowStyle}>
      <Spinner labelText="جارٍ حفظ التغييرات..." showLabel />
      <Spinner size="large" labelText="جارٍ التحقق من الوصول..." showLabel />
    </div>
  ),
};

// Every Figma variant: Size x Appearance x Show label.
export const VariantMatrix: Story = {
  parameters: showcaseParameters,
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole('status')).toHaveLength(8);
  },
  render: () => (
    <div style={columnStyle}>
      {(['primary', 'inverse'] as const).map((appearance) => (
        <div
          key={appearance}
          style={appearance === 'inverse' ? inverseSurfaceStyle : rowStyle}
        >
          {(['small', 'large'] as const).map((size) =>
            [false, true].map((showLabel) => (
              <Spinner
                key={`${size}-${showLabel}`}
                appearance={appearance}
                size={size}
                labelText="Loading..."
                showLabel={showLabel}
              />
            )),
          )}
        </div>
      ))}
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { ProgressBar } from './ProgressBar';

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs', 'test', 'stable'],
  argTypes: {
    value: {
      control: { type: 'number' },
      description:
        'Current progress value in the range defined by min and max. Fill is normalised from min to max.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    min: {
      control: { type: 'number' },
      description: 'Lower bound for the progress range.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    max: {
      control: { type: 'number' },
      description: 'Upper bound for the progress range.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
    status: {
      control: { type: 'select' },
      options: ['in-progress', 'loading', 'error', 'warning'],
      description:
        'Visual state — controls fill and track colours only when value is between 1 and 99.',
      table: {
        type: {
          summary: 'in-progress | loading | error | warning',
        },
        defaultValue: { summary: 'in-progress' },
      },
    },
    animated: {
      control: { type: 'boolean' },
      if: { arg: 'status', eq: 'loading' },
      description:
        'Controls striped animation when status is loading. Ignored for non-loading statuses.',
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
    labelVariant: {
      control: { type: 'select' },
      options: ['title-and-count', 'title', 'inline', 'none'],
      description: 'Controls label layout.',
      table: {
        type: { summary: 'title-and-count | title | inline | none' },
        defaultValue: { summary: 'title-and-count' },
      },
    },
    title: {
      description:
        'Pre-translated title text rendered above the bar, or used as the accessible name when no visible label is present.',
      table: { defaultValue: { summary: '' } },
    },
    count: {
      description:
        'Pre-translated count or percentage text, e.g. "3 of 10" or "50%". The consuming app owns this string so locale-specific word order, plural rules, and number formatting can come from its i18n layer.',
      table: { defaultValue: { summary: '' } },
    },
  },
  args: {
    value: 50,
    min: 0,
    max: 100,
    status: undefined,
    animated: false,
    labelVariant: undefined,
    title: 'Uploading files',
    count: '5 of 10',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('progressbar')).toBeVisible();
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

const showcaseParameters = {
  controls: { disable: true },
  docs: {
    canvas: { sourceState: 'none' },
  },
} as const;

const showcaseGridStyle = {
  display: 'grid' as const,
  gap: 'var(--mds-spacing-md)',
};

const showcaseRowStyle = {
  display: 'grid' as const,
  gridTemplateColumns: 'minmax(10rem, 12rem) minmax(0, 1fr)',
  gap: 'var(--mds-spacing-md)',
  alignItems: 'center' as const,
  minHeight: 'var(--mds-spacing-xxl)',
};

const showcaseLabelStyle = {
  color: 'var(--mds-text-subtle)',
  fontSize: 'var(--mds-font-size-paragraph-small)',
  fontFamily: 'var(--mds-font-family-base)',
  fontWeight: 'var(--mds-font-weight-medium)',
};

export const Default: Story = {};

export const LabelVariants: Story = {
  parameters: showcaseParameters,
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole('progressbar')).toHaveLength(4);
  },
  render: () => (
    <div style={showcaseGridStyle}>
      <div style={showcaseRowStyle}>
        <span style={showcaseLabelStyle}>Title and count</span>
        <ProgressBar
          value={50}
          status="in-progress"
          labelVariant="title-and-count"
          title="Uploading files"
          count="5 of 10"
        />
      </div>
      <div style={showcaseRowStyle}>
        <span style={showcaseLabelStyle}>Title only</span>
        <ProgressBar
          value={50}
          status="in-progress"
          labelVariant="title"
          title="Uploading files"
        />
      </div>
      <div style={showcaseRowStyle}>
        <span style={showcaseLabelStyle}>Inline count</span>
        <ProgressBar
          value={50}
          status="in-progress"
          labelVariant="inline"
          title="Uploading files"
          count="5 of 10"
        />
      </div>
      <div style={showcaseRowStyle}>
        <span style={showcaseLabelStyle}>No visible label</span>
        <ProgressBar
          value={50}
          status="in-progress"
          labelVariant="none"
          title="Uploading files"
        />
      </div>
    </div>
  ),
};

export const Statuses: Story = {
  parameters: showcaseParameters,
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole('progressbar')).toHaveLength(6);
  },
  render: () => (
    <div style={showcaseGridStyle}>
      <div style={showcaseRowStyle}>
        <span style={showcaseLabelStyle}>Empty (0%)</span>
        <ProgressBar
          value={0}
          status="warning"
          labelVariant="title-and-count"
          title="Not started"
          count="0 of 10"
        />
      </div>
      <div style={showcaseRowStyle}>
        <span style={showcaseLabelStyle}>In progress</span>
        <ProgressBar
          value={50}
          status="in-progress"
          labelVariant="title-and-count"
          title="Uploading files"
          count="5 of 10"
        />
      </div>
      <div style={showcaseRowStyle}>
        <span style={showcaseLabelStyle}>Loading</span>
        <ProgressBar
          value={30}
          status="loading"
          labelVariant="title-and-count"
          title="Loading"
          count="3 of 10"
        />
      </div>
      <div style={showcaseRowStyle}>
        <span style={showcaseLabelStyle}>Error</span>
        <ProgressBar
          value={40}
          status="error"
          labelVariant="title-and-count"
          title="Upload failed"
          count="4 of 10"
        />
      </div>
      <div style={showcaseRowStyle}>
        <span style={showcaseLabelStyle}>Warning</span>
        <ProgressBar
          value={60}
          status="warning"
          labelVariant="title-and-count"
          title="Upload paused"
          count="6 of 10"
        />
      </div>
      <div style={showcaseRowStyle}>
        <span style={showcaseLabelStyle}>Completed (100%)</span>
        <ProgressBar
          value={100}
          status="error"
          labelVariant="title-and-count"
          title="Upload complete"
          count="10 of 10"
        />
      </div>
    </div>
  ),
};

export const Animated: Story = {
  parameters: showcaseParameters,
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole('progressbar')).toHaveLength(2);
  },
  render: () => (
    <div style={showcaseGridStyle}>
      <div style={showcaseRowStyle}>
        <span style={showcaseLabelStyle}>Loading (animated)</span>
        <ProgressBar
          value={30}
          status="loading"
          animated
          labelVariant="title-and-count"
          title="Loading"
          count="3 of 10"
        />
      </div>
      <div style={showcaseRowStyle}>
        <span style={showcaseLabelStyle}>Loading (static)</span>
        <ProgressBar
          value={30}
          status="loading"
          animated={false}
          labelVariant="title-and-count"
          title="Loading"
          count="3 of 10"
        />
      </div>
    </div>
  ),
};

export const RightToLeft: Story = {
  tags: ['test', 'stable'],
  parameters: showcaseParameters,
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getAllByRole('progressbar')).toHaveLength(2);
    await expect(
      canvasElement.querySelector('.progress-bar-animated'),
    ).toBeTruthy();
  },
  render: () => (
    <div dir="rtl" style={showcaseGridStyle}>
      <div style={showcaseRowStyle}>
        <span style={showcaseLabelStyle}>جاري رفع الملفات</span>
        <ProgressBar
          value={50}
          status="in-progress"
          labelVariant="title-and-count"
          title="جاري رفع الملفات"
          count="٥ من ١٠"
        />
      </div>
      <div style={showcaseRowStyle}>
        <span style={showcaseLabelStyle}>جاري التحميل (متحرك)</span>
        <ProgressBar
          value={30}
          status="loading"
          animated
          labelVariant="title-and-count"
          title="جاري التحميل"
          count="٣ من ١٠"
        />
      </div>
    </div>
  ),
};

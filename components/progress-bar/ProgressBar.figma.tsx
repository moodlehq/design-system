import figma from '@figma/code-connect';
import { ProgressBar } from './ProgressBar';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=8847-672';
const statusUrl =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=8838-290';

const titlePropProps = {
  title: figma.string('Title'),
};
const countPropProps = {
  count: figma.string('Count'),
};

const baseLabelExampleProps = {
  value: 50,
  status: 'in-progress' as const,
  animated: false,
};

const baseStatusExampleProps = {
  labelVariant: 'title-and-count' as const,
  animated: false,
};

// Default state — title-and-count layout.
figma.connect(ProgressBar, url, {
  variant: { 'Label variant': 'Title and count' },
  props: {
    ...titlePropProps,
    ...countPropProps,
  },
  example: ({ title, count }) => (
    <ProgressBar
      {...baseLabelExampleProps}
      labelVariant="title-and-count"
      title={title}
      count={count}
    />
  ),
});

// Title-only layout.
figma.connect(ProgressBar, url, {
  variant: { 'Label variant': 'Title' },
  props: {
    ...titlePropProps,
  },
  example: ({ title }) => (
    <ProgressBar
      {...baseLabelExampleProps}
      labelVariant="title"
      title={title}
    />
  ),
});

// Inline layout — bar and count in a row.
figma.connect(ProgressBar, url, {
  variant: { 'Label variant': 'Inline' },
  props: {
    ...titlePropProps,
    ...countPropProps,
  },
  example: ({ title, count }) => (
    <ProgressBar
      {...baseLabelExampleProps}
      labelVariant="inline"
      title={title}
      count={count}
    />
  ),
});

// No label — bar only.
figma.connect(ProgressBar, url, {
  variant: { 'Label variant': 'None' },
  props: {
    ...titlePropProps,
  },
  example: ({ title }) => (
    <ProgressBar {...baseLabelExampleProps} labelVariant="none" title={title} />
  ),
});

// 0% value override -> neutral/grey visual.
figma.connect(ProgressBar, statusUrl, {
  variant: { Status: 'Empty' },
  example: () => (
    <ProgressBar
      {...baseStatusExampleProps}
      title="Title"
      count="0%"
      value={0}
      status="warning"
    />
  ),
});

// In-progress status.
figma.connect(ProgressBar, statusUrl, {
  variant: { Status: 'In progress' },
  example: () => (
    <ProgressBar
      {...baseStatusExampleProps}
      title="Title"
      count="50%"
      value={50}
      status="in-progress"
    />
  ),
});

// Loading status.
figma.connect(ProgressBar, statusUrl, {
  variant: { Status: 'Loading' },
  example: () => (
    <ProgressBar
      {...baseStatusExampleProps}
      title="Title"
      count="30%"
      value={30}
      status="loading"
    />
  ),
});

// Error status.
figma.connect(ProgressBar, statusUrl, {
  variant: { Status: 'Error' },
  example: () => (
    <ProgressBar
      {...baseStatusExampleProps}
      title="Title"
      count="40%"
      value={40}
      status="error"
    />
  ),
});

// Warning status.
figma.connect(ProgressBar, statusUrl, {
  variant: { Status: 'Warning' },
  example: () => (
    <ProgressBar
      {...baseStatusExampleProps}
      title="Title"
      count="60%"
      value={60}
      status="warning"
    />
  ),
});

// 100% value override -> success/green visual.
figma.connect(ProgressBar, statusUrl, {
  variant: { Status: 'Completed' },
  example: () => (
    <ProgressBar
      {...baseStatusExampleProps}
      title="Title"
      count="100%"
      value={100}
      status="in-progress"
    />
  ),
});

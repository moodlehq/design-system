import figma from '@figma/code-connect';
import { ProgressBar } from './ProgressBar';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=8847-672';
const statusUrl =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=8838-290';

const titleProp = figma.string('Title');
const countProp = figma.string('Count');

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
    title: titleProp,
    count: countProp,
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
    title: titleProp,
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
    title: titleProp,
    count: countProp,
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
    title: titleProp,
  },
  example: ({ title }) => (
    <ProgressBar {...baseLabelExampleProps} labelVariant="none" title={title} />
  ),
});

// 0% value override -> neutral/grey visual.
figma.connect(ProgressBar, statusUrl, {
  variant: { Status: 'Empty' },
  props: {
    title: titleProp,
    count: countProp,
  },
  example: ({ title, count }) => (
    <ProgressBar
      {...baseStatusExampleProps}
      title={title}
      count={count}
      value={0}
      status="warning"
    />
  ),
});

// In-progress status.
figma.connect(ProgressBar, statusUrl, {
  variant: { Status: 'In progress' },
  props: {
    title: titleProp,
    count: countProp,
  },
  example: ({ title, count }) => (
    <ProgressBar
      {...baseStatusExampleProps}
      title={title}
      count={count}
      value={50}
      status="in-progress"
    />
  ),
});

// Loading status.
figma.connect(ProgressBar, statusUrl, {
  variant: { Status: 'Loading' },
  props: {
    title: titleProp,
    count: countProp,
  },
  example: ({ title, count }) => (
    <ProgressBar
      {...baseStatusExampleProps}
      title={title}
      count={count}
      value={30}
      status="loading"
    />
  ),
});

// Error status.
figma.connect(ProgressBar, statusUrl, {
  variant: { Status: 'Error' },
  props: {
    title: titleProp,
    count: countProp,
  },
  example: ({ title, count }) => (
    <ProgressBar
      {...baseStatusExampleProps}
      title={title}
      count={count}
      value={40}
      status="error"
    />
  ),
});

// Warning status.
figma.connect(ProgressBar, statusUrl, {
  variant: { Status: 'Warning' },
  props: {
    title: titleProp,
    count: countProp,
  },
  example: ({ title, count }) => (
    <ProgressBar
      {...baseStatusExampleProps}
      title={title}
      count={count}
      value={60}
      status="warning"
    />
  ),
});

// 100% value override -> success/green visual.
figma.connect(ProgressBar, statusUrl, {
  variant: { Status: 'Completed' },
  props: {
    title: titleProp,
    count: countProp,
  },
  example: ({ title, count }) => (
    <ProgressBar
      {...baseStatusExampleProps}
      title={title}
      count={count}
      value={100}
      status="error"
    />
  ),
});

import figma from '@figma/code-connect';
import { Alert } from './Alert';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=13661-871';

// Shared props that apply to every variant combination.
const sharedProps = {
  message: figma.string('Paragraph text'),
  isDismissible: figma.boolean('isDismissible'),
  isActionable: figma.boolean('isActionable'),
};

// --- Info ---

figma.connect(Alert, url, {
  variant: { Type: 'Info', 'Show Title': false, 'Customs slot': false },
  props: sharedProps,
  example: ({ message, isDismissible, isActionable }) => (
    <Alert
      type="info"
      message={message}
      isDismissible={isDismissible}
      dismissAriaLabel={isDismissible ? 'Dismiss alert' : undefined}
      isActionable={isActionable}
      actionLabel={isActionable ? 'Action label' : undefined}
    />
  ),
});

figma.connect(Alert, url, {
  variant: { Type: 'Info', 'Show Title': true, 'Customs slot': false },
  props: { ...sharedProps, title: figma.string('Title text') },
  example: ({ title, message, isDismissible, isActionable }) => (
    <Alert
      type="info"
      title={title}
      message={message}
      isDismissible={isDismissible}
      dismissAriaLabel={isDismissible ? 'Dismiss alert' : undefined}
      isActionable={isActionable}
      actionLabel={isActionable ? 'Action label' : undefined}
    />
  ),
});

figma.connect(Alert, url, {
  variant: { Type: 'Info', 'Show Title': true, 'Customs slot': true },
  props: {
    ...sharedProps,
    title: figma.string('Title text'),
    children: figma.children(['Custom elements']),
  },
  example: ({ title, message, isDismissible, isActionable, children }) => (
    <Alert
      type="info"
      title={title}
      message={message}
      isDismissible={isDismissible}
      dismissAriaLabel={isDismissible ? 'Dismiss alert' : undefined}
      isActionable={isActionable}
      actionLabel={isActionable ? 'Action label' : undefined}
    >
      {children}
    </Alert>
  ),
});

// --- Success ---

figma.connect(Alert, url, {
  variant: { Type: 'Success', 'Show Title': false, 'Customs slot': false },
  props: sharedProps,
  example: ({ message, isDismissible, isActionable }) => (
    <Alert
      type="success"
      message={message}
      isDismissible={isDismissible}
      dismissAriaLabel={isDismissible ? 'Dismiss alert' : undefined}
      isActionable={isActionable}
      actionLabel={isActionable ? 'Action label' : undefined}
    />
  ),
});

figma.connect(Alert, url, {
  variant: { Type: 'Success', 'Show Title': true, 'Customs slot': false },
  props: { ...sharedProps, title: figma.string('Title text') },
  example: ({ title, message, isDismissible, isActionable }) => (
    <Alert
      type="success"
      title={title}
      message={message}
      isDismissible={isDismissible}
      dismissAriaLabel={isDismissible ? 'Dismiss alert' : undefined}
      isActionable={isActionable}
      actionLabel={isActionable ? 'Action label' : undefined}
    />
  ),
});

figma.connect(Alert, url, {
  variant: { Type: 'Success', 'Show Title': true, 'Customs slot': true },
  props: {
    ...sharedProps,
    title: figma.string('Title text'),
    children: figma.children(['Custom elements']),
  },
  example: ({ title, message, isDismissible, isActionable, children }) => (
    <Alert
      type="success"
      title={title}
      message={message}
      isDismissible={isDismissible}
      dismissAriaLabel={isDismissible ? 'Dismiss alert' : undefined}
      isActionable={isActionable}
      actionLabel={isActionable ? 'Action label' : undefined}
    >
      {children}
    </Alert>
  ),
});

// --- Warning ---

figma.connect(Alert, url, {
  variant: { Type: 'Warning', 'Show Title': false, 'Customs slot': false },
  props: sharedProps,
  example: ({ message, isDismissible, isActionable }) => (
    <Alert
      type="warning"
      message={message}
      isDismissible={isDismissible}
      dismissAriaLabel={isDismissible ? 'Dismiss alert' : undefined}
      isActionable={isActionable}
      actionLabel={isActionable ? 'Action label' : undefined}
    />
  ),
});

figma.connect(Alert, url, {
  variant: { Type: 'Warning', 'Show Title': true, 'Customs slot': false },
  props: { ...sharedProps, title: figma.string('Title text') },
  example: ({ title, message, isDismissible, isActionable }) => (
    <Alert
      type="warning"
      title={title}
      message={message}
      isDismissible={isDismissible}
      dismissAriaLabel={isDismissible ? 'Dismiss alert' : undefined}
      isActionable={isActionable}
      actionLabel={isActionable ? 'Action label' : undefined}
    />
  ),
});

figma.connect(Alert, url, {
  variant: { Type: 'Warning', 'Show Title': true, 'Customs slot': true },
  props: {
    ...sharedProps,
    title: figma.string('Title text'),
    children: figma.children(['Custom elements']),
  },
  example: ({ title, message, isDismissible, isActionable, children }) => (
    <Alert
      type="warning"
      title={title}
      message={message}
      isDismissible={isDismissible}
      dismissAriaLabel={isDismissible ? 'Dismiss alert' : undefined}
      isActionable={isActionable}
      actionLabel={isActionable ? 'Action label' : undefined}
    >
      {children}
    </Alert>
  ),
});

// --- Danger ---

figma.connect(Alert, url, {
  variant: { Type: 'Danger', 'Show Title': false, 'Customs slot': false },
  props: sharedProps,
  example: ({ message, isDismissible, isActionable }) => (
    <Alert
      type="danger"
      message={message}
      isDismissible={isDismissible}
      dismissAriaLabel={isDismissible ? 'Dismiss alert' : undefined}
      isActionable={isActionable}
      actionLabel={isActionable ? 'Action label' : undefined}
    />
  ),
});

figma.connect(Alert, url, {
  variant: { Type: 'Danger', 'Show Title': true, 'Customs slot': false },
  props: { ...sharedProps, title: figma.string('Title text') },
  example: ({ title, message, isDismissible, isActionable }) => (
    <Alert
      type="danger"
      title={title}
      message={message}
      isDismissible={isDismissible}
      dismissAriaLabel={isDismissible ? 'Dismiss alert' : undefined}
      isActionable={isActionable}
      actionLabel={isActionable ? 'Action label' : undefined}
    />
  ),
});

figma.connect(Alert, url, {
  variant: { Type: 'Danger', 'Show Title': true, 'Customs slot': true },
  props: {
    ...sharedProps,
    title: figma.string('Title text'),
    children: figma.children(['Custom elements']),
  },
  example: ({ title, message, isDismissible, isActionable, children }) => (
    <Alert
      type="danger"
      title={title}
      message={message}
      isDismissible={isDismissible}
      dismissAriaLabel={isDismissible ? 'Dismiss alert' : undefined}
      isActionable={isActionable}
      actionLabel={isActionable ? 'Action label' : undefined}
    >
      {children}
    </Alert>
  ),
});

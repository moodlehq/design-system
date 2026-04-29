import figma from '@figma/code-connect';
import { Radio } from './Radio';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=6576-368';

// Default state — label visible or hidden, checked or unchecked.
figma.connect(Radio, url, {
  variant: { State: 'Default' },
  props: {
    label: figma.string('Label'),
    // Figma "Show Label" true means the label is visible; hideLabel is its inverse.
    hideLabel: figma.boolean('Show Label', { true: false, false: true }),
    checked: figma.enum('Selected', { Yes: true }),
  },
  example: ({ label, hideLabel, checked }) => (
    <Radio label={label} hideLabel={hideLabel} checked={checked} />
  ),
});

// Invalid state without feedback text.
figma.connect(Radio, url, {
  variant: { State: 'Invalid', 'Show feedback text': false },
  props: {
    label: figma.string('Label'),
    hideLabel: figma.boolean('Show Label', { true: false, false: true }),
    checked: figma.enum('Selected', { Yes: true }),
  },
  example: ({ label, hideLabel, checked }) => (
    <Radio label={label} hideLabel={hideLabel} checked={checked} invalid />
  ),
});

// Invalid state with feedback text — both invalid and invalidFeedback are always set here.
figma.connect(Radio, url, {
  variant: { State: 'Invalid', 'Show feedback text': true },
  props: {
    label: figma.string('Label'),
    hideLabel: figma.boolean('Show Label', { true: false, false: true }),
    checked: figma.enum('Selected', { Yes: true }),
  },
  example: ({ label, hideLabel, checked }) => (
    <Radio
      label={label}
      hideLabel={hideLabel}
      checked={checked}
      invalid
      invalidFeedback="Error message"
    />
  ),
});

// Disabled state — disabled is always true here.
figma.connect(Radio, url, {
  variant: { State: 'Disabled' },
  props: {
    label: figma.string('Label'),
    hideLabel: figma.boolean('Show Label', { true: false, false: true }),
    checked: figma.enum('Selected', { Yes: true }),
  },
  example: ({ label, hideLabel, checked }) => (
    <Radio label={label} hideLabel={hideLabel} checked={checked} disabled />
  ),
});

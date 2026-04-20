import figma from '@figma/code-connect';
import { Radio } from './Radio';

figma.connect(
  Radio,
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=6576-368',
  {
    props: {
      label: figma.string('Label'),
      // Figma "Show Label" true means the label is visible; hideLabel is its inverse.
      hideLabel: figma.boolean('Show Label', { true: false, false: true }),
      // The State variant drives both invalid and disabled — only one can be active at a time.
      invalid: figma.enum('State', { Invalid: true }),
      disabled: figma.enum('State', { Disabled: true }),
      checked: figma.enum('Selected', { Yes: true }),
      // "Show feedback text" is only available in Figma when State=Invalid.
      invalidFeedback: figma.boolean('Show feedback text', {
        true: 'Error message',
        false: undefined,
      }),
    },
    example: ({
      label,
      hideLabel,
      invalid,
      disabled,
      checked,
      invalidFeedback,
    }) => (
      <Radio
        label={label}
        hideLabel={hideLabel}
        invalid={invalid}
        disabled={disabled}
        checked={checked}
        invalidFeedback={invalidFeedback}
      />
    ),
  },
);

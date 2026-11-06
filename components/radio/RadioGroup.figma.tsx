import figma from '@figma/code-connect';
import { RadioGroup } from './RadioGroup';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=16404-476';

// Every mapping covers all of its values ('' where a prop should be absent)
// so no snippet ever receives undefined.
const baseProps = {
  label: figma.string('Label text'),
  hideLabel: figma.boolean('Show label', { true: false, false: true }),
  required: figma.boolean('Required'),
  // ZeroHeight: the info button's name includes the field label. Code Connect
  // can't combine it with 'Label text', so the snippet shows a placeholder.
  infoTooltipLabel: figma.boolean('Info', {
    true: 'More information about [field label]',
    false: '',
  }),
};

const supportingTextProps = {
  ...baseProps,
  supportingText: figma.boolean('Support text', {
    true: figma.string('Supporting text'),
    false: '',
  }),
};

// In the invalid state the support-text row carries the error message.
const invalidProps = {
  ...baseProps,
  invalidFeedback: figma.boolean('Support text', {
    true: figma.string('Supporting text'),
    false: '',
  }),
};

// One connection per State × Orientation, with state and orientation props
// written into the JSX rather than derived. Vertical is the default
// orientation, so it is left out of the vertical snippets.
//
// The Options slot holds Radio Button instances, which Code Connect can't
// turn into an options array, so each snippet inlines the slot's default
// content (three items) as placeholder options. The array is written inline
// because the parser emits a shared const as a bare, undefined identifier.
figma.connect(RadioGroup, url, {
  variant: { State: 'default', Orientation: 'Vertical' },
  props: { ...supportingTextProps },
  example: (props) => (
    <RadioGroup
      {...props}
      options={[
        { value: 'item-1', label: 'Item 1' },
        { value: 'item-2', label: 'Item 2' },
        { value: 'item-3', label: 'Item 3' },
      ]}
    />
  ),
});

figma.connect(RadioGroup, url, {
  variant: { State: 'default', Orientation: 'Horizontal' },
  props: { ...supportingTextProps },
  example: (props) => (
    <RadioGroup
      {...props}
      options={[
        { value: 'item-1', label: 'Item 1' },
        { value: 'item-2', label: 'Item 2' },
        { value: 'item-3', label: 'Item 3' },
      ]}
      orientation="horizontal"
    />
  ),
});

figma.connect(RadioGroup, url, {
  variant: { State: 'invalid', Orientation: 'Vertical' },
  props: { ...invalidProps },
  example: (props) => (
    <RadioGroup
      {...props}
      options={[
        { value: 'item-1', label: 'Item 1' },
        { value: 'item-2', label: 'Item 2' },
        { value: 'item-3', label: 'Item 3' },
      ]}
      invalid
    />
  ),
});

figma.connect(RadioGroup, url, {
  variant: { State: 'invalid', Orientation: 'Horizontal' },
  props: { ...invalidProps },
  example: (props) => (
    <RadioGroup
      {...props}
      options={[
        { value: 'item-1', label: 'Item 1' },
        { value: 'item-2', label: 'Item 2' },
        { value: 'item-3', label: 'Item 3' },
      ]}
      orientation="horizontal"
      invalid
    />
  ),
});

figma.connect(RadioGroup, url, {
  variant: { State: 'disabled', Orientation: 'Vertical' },
  props: { ...supportingTextProps },
  example: (props) => (
    <RadioGroup
      {...props}
      options={[
        { value: 'item-1', label: 'Item 1' },
        { value: 'item-2', label: 'Item 2' },
        { value: 'item-3', label: 'Item 3' },
      ]}
      disabled
    />
  ),
});

figma.connect(RadioGroup, url, {
  variant: { State: 'disabled', Orientation: 'Horizontal' },
  props: { ...supportingTextProps },
  example: (props) => (
    <RadioGroup
      {...props}
      options={[
        { value: 'item-1', label: 'Item 1' },
        { value: 'item-2', label: 'Item 2' },
        { value: 'item-3', label: 'Item 3' },
      ]}
      orientation="horizontal"
      disabled
    />
  ),
});

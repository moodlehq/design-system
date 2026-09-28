import figma from '@figma/code-connect';
import { SearchInput } from './SearchInput';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=14649-2248';

// The magnifier and clear button are fixed in SearchInput. The nested
// "Tags=Yes" content (tag/chip content with a chevron) models a searchable
// multiselect combobox, so Tags, Tags + content, and Chevron are left
// unmapped. Figma has no read-only state for search.
// Every mapping covers all of its values ('' where a prop should be absent)
// so no snippet ever receives undefined.
const baseProps = {
  label: figma.string('Label text'),
  hideLabel: figma.boolean('Show label', { true: false, false: true }),
  required: figma.boolean('Required'),
  infoTooltipLabel: figma.boolean('Info', {
    true: 'More information about this field',
    false: '',
  }),
  field: figma.nestedProps('Input/input.search', {
    placeholder: figma.enum('Content', {
      Empty: '',
      Placeholder: figma.string('Placeholder text'),
      Filled: '',
    }),
    defaultValue: figma.enum('Content', {
      Empty: '',
      Placeholder: '',
      Filled: figma.string('Fill text'),
    }),
  }),
};

// One connection per State (and isInvalid where Figma defines it), with
// state props written into the JSX rather than derived, per the Code Connect
// guidelines. Hover, active, and focus are interaction states with no code
// prop, so they share the default snippet. In the invalid state the
// supporting text slot carries the validation message (invalidFeedback).
figma.connect(SearchInput, url, {
  variant: { Type: 'Search', State: 'default', isInvalid: 'No' },
  props: {
    ...baseProps,
    supportingText: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: '',
    }),
  },
  example: ({ field, ...props }) => (
    <SearchInput
      {...props}
      placeholder={field.placeholder}
      defaultValue={field.defaultValue}
      clearLabel="Clear search"
    />
  ),
});

figma.connect(SearchInput, url, {
  variant: { Type: 'Search', State: 'default', isInvalid: 'Yes' },
  props: {
    ...baseProps,
    invalidFeedback: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: '',
    }),
  },
  example: ({ field, ...props }) => (
    <SearchInput
      {...props}
      placeholder={field.placeholder}
      defaultValue={field.defaultValue}
      invalid
      clearLabel="Clear search"
    />
  ),
});

figma.connect(SearchInput, url, {
  variant: { Type: 'Search', State: 'hover', isInvalid: 'No' },
  props: {
    ...baseProps,
    supportingText: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: '',
    }),
  },
  example: ({ field, ...props }) => (
    <SearchInput
      {...props}
      placeholder={field.placeholder}
      defaultValue={field.defaultValue}
      clearLabel="Clear search"
    />
  ),
});

figma.connect(SearchInput, url, {
  variant: { Type: 'Search', State: 'hover', isInvalid: 'Yes' },
  props: {
    ...baseProps,
    invalidFeedback: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: '',
    }),
  },
  example: ({ field, ...props }) => (
    <SearchInput
      {...props}
      placeholder={field.placeholder}
      defaultValue={field.defaultValue}
      invalid
      clearLabel="Clear search"
    />
  ),
});

figma.connect(SearchInput, url, {
  variant: { Type: 'Search', State: 'active', isInvalid: 'No' },
  props: {
    ...baseProps,
    supportingText: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: '',
    }),
  },
  example: ({ field, ...props }) => (
    <SearchInput
      {...props}
      placeholder={field.placeholder}
      defaultValue={field.defaultValue}
      clearLabel="Clear search"
    />
  ),
});

figma.connect(SearchInput, url, {
  variant: { Type: 'Search', State: 'active', isInvalid: 'Yes' },
  props: {
    ...baseProps,
    invalidFeedback: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: '',
    }),
  },
  example: ({ field, ...props }) => (
    <SearchInput
      {...props}
      placeholder={field.placeholder}
      defaultValue={field.defaultValue}
      invalid
      clearLabel="Clear search"
    />
  ),
});

figma.connect(SearchInput, url, {
  variant: { Type: 'Search', State: 'focus', isInvalid: 'No' },
  props: {
    ...baseProps,
    supportingText: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: '',
    }),
  },
  example: ({ field, ...props }) => (
    <SearchInput
      {...props}
      placeholder={field.placeholder}
      defaultValue={field.defaultValue}
      clearLabel="Clear search"
    />
  ),
});

figma.connect(SearchInput, url, {
  variant: { Type: 'Search', State: 'focus', isInvalid: 'Yes' },
  props: {
    ...baseProps,
    invalidFeedback: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: '',
    }),
  },
  example: ({ field, ...props }) => (
    <SearchInput
      {...props}
      placeholder={field.placeholder}
      defaultValue={field.defaultValue}
      invalid
      clearLabel="Clear search"
    />
  ),
});

figma.connect(SearchInput, url, {
  variant: { Type: 'Search', State: 'disabled' },
  props: {
    ...baseProps,
    supportingText: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: '',
    }),
  },
  example: ({ field, ...props }) => (
    <SearchInput
      {...props}
      placeholder={field.placeholder}
      defaultValue={field.defaultValue}
      disabled
      clearLabel="Clear search"
    />
  ),
});

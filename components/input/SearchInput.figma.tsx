import figma from '@figma/code-connect';
import { SearchInput } from './SearchInput';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=14649-2248';

// The magnifier and clear button are fixed in SearchInput, so they have no
// Figma property to map. The nested "Tags=Yes" content (tag/chip content
// with a chevron) models a searchable multiselect combobox rather than this
// single-value SearchInput, so its Tags, Tags + content, and Chevron
// properties are left unmapped. Hover, active, and focus are interaction
// states with no code prop, and Figma has no read-only state for search.
const baseProps = {
  label: figma.string('Label text'),
  hideLabel: figma.boolean('Show label', { true: false, false: true }),
  required: figma.boolean('Required'),
  infoTooltipLabel: figma.boolean('Info', {
    true: 'More information about this field',
    false: undefined,
  }),
  disabled: figma.enum('State', { disabled: true }),
  field: figma.nestedProps('Input/input.search', {
    placeholder: figma.enum('Content', {
      Placeholder: figma.string('Placeholder text'),
    }),
    defaultValue: figma.enum('Content', {
      Filled: figma.string('Fill text'),
    }),
  }),
};

figma.connect(SearchInput, url, {
  variant: { Type: 'Search', isInvalid: 'No' },
  props: {
    ...baseProps,
    supportingText: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: undefined,
    }),
  },
  example: ({ field, supportingText, ...props }) => (
    <SearchInput
      {...props}
      placeholder={field.placeholder}
      defaultValue={field.defaultValue}
      supportingText={supportingText}
      clearLabel="Clear search"
    />
  ),
});

// In the invalid state the supporting text slot carries the validation
// message, which maps to invalidFeedback in code. Figma only draws invalid
// on an empty field, matching SearchInput's "invalid only while empty" rule.
figma.connect(SearchInput, url, {
  variant: { Type: 'Search', isInvalid: 'Yes' },
  props: {
    ...baseProps,
    invalidFeedback: figma.boolean('Support text', {
      true: figma.string('Supporting text'),
      false: undefined,
    }),
  },
  example: ({ field, invalidFeedback, ...props }) => (
    <SearchInput
      {...props}
      placeholder={field.placeholder}
      defaultValue={field.defaultValue}
      invalid
      invalidFeedback={invalidFeedback}
      clearLabel="Clear search"
    />
  ),
});

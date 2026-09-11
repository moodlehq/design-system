import figma from '@figma/code-connect';
import { SearchInput } from './SearchInput';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=15029-1542';

// The "Tags=Yes" variant (tag/chip content with a chevron) models a
// searchable multiselect combobox, not this single-value SearchInput — only
// the "Tags=No" variants are mapped here. See the generation report for
// details.

figma.connect(SearchInput, url, {
  variant: { Content: 'Empty', Tags: 'No' },
  example: () => <SearchInput label="Search" clearLabel="Clear search" />,
});

figma.connect(SearchInput, url, {
  variant: { Content: 'Placeholder', Tags: 'No' },
  props: {
    placeholder: figma.string('Placeholder text'),
  },
  example: ({ placeholder }) => (
    <SearchInput
      label="Search"
      clearLabel="Clear search"
      placeholder={placeholder}
    />
  ),
});

figma.connect(SearchInput, url, {
  variant: { Content: 'Filled', Tags: 'No' },
  props: {
    value: figma.string('Fill text'),
  },
  example: ({ value }) => (
    <SearchInput
      label="Search"
      clearLabel="Clear search"
      defaultValue={value}
    />
  ),
});

import figma from '@figma/code-connect';
import { SearchInput } from './SearchInput';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/branch/CZFqyV4YnE4ZfeQ2yuZ5IS/Moodle-Design-System?node-id=15029-1542';

// The "Badges=Yes" variant (tag/chip content with a chevron) models a
// searchable multiselect combobox, not this single-value SearchInput — only
// the "Badges=No" variants are mapped here. See the generation report for
// details.

figma.connect(SearchInput, url, {
  variant: { Content: 'Empty', Badges: 'No' },
  example: () => <SearchInput label="Search" clearLabel="Clear search" />,
});

figma.connect(SearchInput, url, {
  variant: { Content: 'Placeholder', Badges: 'No' },
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
  variant: { Content: 'Filled', Badges: 'No' },
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

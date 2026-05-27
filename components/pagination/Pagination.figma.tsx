import figma from '@figma/code-connect';
import { Pagination } from './Pagination';

// Use the Pagination component set node (not a docs frame instance) so Dev Mode
// can apply this mapping consistently across all shown examples.
const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=8367-5141';

// Full variant: pagination with page numbers.
figma.connect(Pagination, url, {
  variant: { 'Current page': 'Middle page', 'Total pages': '9 or more' },
  example: () => (
    <Pagination
      totalPages={10}
      currentPage={5}
      ariaLabel="Pagination"
      onPageChange={() => {}}
    />
  ),
});

// Grouped variant: previous and next controls only.
// In the current Figma component set this is represented by Total pages=None.
figma.connect(Pagination, url, {
  variant: { 'Current page': 'Middle page', 'Total pages': 'None' },
  example: () => (
    <Pagination
      totalPages={10}
      currentPage={5}
      variant="grouped"
      ariaLabel="Pagination"
      onPageChange={() => {}}
    />
  ),
});

// First page variant: previous button disabled.
figma.connect(Pagination, url, {
  variant: { 'Current page': 'First page', 'Total pages': '9 or more' },
  example: () => (
    <Pagination
      totalPages={10}
      currentPage={1}
      ariaLabel="Pagination"
      onPageChange={() => {}}
    />
  ),
});

// Last page variant: next button disabled.
figma.connect(Pagination, url, {
  variant: { 'Current page': 'Last page', 'Total pages': '9 or more' },
  example: () => (
    <Pagination
      totalPages={10}
      currentPage={10}
      ariaLabel="Pagination"
      onPageChange={() => {}}
    />
  ),
});

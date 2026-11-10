// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=8367-5141
// source=https://github.com/moodlehq/design-system/blob/main/components/pagination/Pagination.tsx
// component=Pagination

import figma from 'figma';

const currentPage = figma.selectedInstance.getEnum('Current page', {
  'First page': 1,
  'Middle page': 5,
  'Last page': 10,
});
const variant = figma.selectedInstance.getEnum('Total pages', {
  None: 'grouped',
});

const template = {
  id: 'Pagination',
  imports: ["import { Pagination } from './Pagination';"],
  example: figma.code`<Pagination totalPages={10}${figma.helpers.react.renderProp(
    'currentPage',
    currentPage,
  )}${figma.helpers.react.renderProp(
    'variant',
    variant,
  )} ariaLabel="Pagination" onPageChange={() => { }}/>`,
};

export default template;

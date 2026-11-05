// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=13587-2085&m=dev
// source=https://github.com/moodlehq/design-system/blob/main/components/dropdown/DropdownItemList.tsx
// component=DropdownItemList

import figma from 'figma';

const variant = figma.selectedInstance.getEnum('Variant', {
  'to do': 'todo',
  done: 'done',
});

const template = {
  id: 'DropdownItemList',
  imports: ["import { DropdownItemList } from './DropdownItemList';"],
  example: figma.code`<DropdownItemList label={itemLabel}${figma.helpers.react.renderProp(
    'variant',
    variant,
  )}/>`,
};

export default template;

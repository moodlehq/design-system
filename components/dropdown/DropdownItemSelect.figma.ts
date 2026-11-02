// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=12515-3057&m=dev
// source=https://github.com/moodlehq/design-system/blob/main/components/dropdown/DropdownItemSelect.tsx
// component=DropdownItemSelect

import figma from 'figma';

const selected = figma.selectedInstance.getEnum('Selected', { true: true });
const disabled = figma.selectedInstance.getEnum('State', { disabled: true });

const template = {
  id: 'DropdownItemSelect',
  imports: ["import { DropdownItemSelect } from './DropdownItemSelect';"],
  example: figma.code`<DropdownItemSelect label={selectLabel}${figma.helpers.react.renderProp(
    'selected',
    selected,
  )}${figma.helpers.react.renderProp('disabled', disabled)}/>`,
};

export default template;

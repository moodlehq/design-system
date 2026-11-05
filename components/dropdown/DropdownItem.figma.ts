// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=12563-2532&m=dev
// source=https://github.com/moodlehq/design-system/blob/main/components/dropdown/DropdownItemAction.tsx
// component=DropdownItemAction

import figma from 'figma';

let template;
if (figma.selectedInstance.getPropertyValue('Variant') === 'action') {
  template = {
    id: 'DropdownItemAction',
    imports: ["import { DropdownItemAction } from './DropdownItemAction';"],
    example: figma.code`<DropdownItemAction label={itemLabel}/>`,
  };
} else if (
  figma.selectedInstance.getPropertyValue('Variant') === 'selectable'
) {
  template = {
    id: 'DropdownItemSelect',
    imports: ["import { DropdownItemSelect } from './DropdownItemSelect';"],
    example: figma.code`<DropdownItemSelect label={selectLabel}/>`,
  };
} else if (
  figma.selectedInstance.getPropertyValue('Variant') === 'expandable'
) {
  template = {
    id: 'DropdownItemExpandable',
    imports: [
      "import { DropdownItemAction } from './DropdownItemAction';",
      "import { DropdownItemExpandable } from './DropdownItemExpandable';",
    ],
    example: figma.code`<DropdownItemExpandable label="Expand">
        <DropdownItemAction label={itemLabel}/>
      </DropdownItemExpandable>`,
  };
} else if (
  figma.selectedInstance.getPropertyValue('Variant') === 'multi-select'
) {
  template = {
    id: 'DropdownItemMultiselect',
    imports: [
      "import { DropdownItemMultiselect } from './DropdownItemMultiselect';",
    ],
    example: figma.code`<DropdownItemMultiselect label="Label text"/>`,
  };
} else if (figma.selectedInstance.getPropertyValue('Variant') === 'header') {
  template = {
    id: 'DropdownItemHeader',
    imports: ["import { DropdownItemHeader } from './DropdownItemHeader';"],
    example: figma.code`<DropdownItemHeader label="Dropdown header"/>`,
  };
} else if (figma.selectedInstance.getPropertyValue('Variant') === 'divider') {
  template = {
    id: 'DropdownItemDivider',
    imports: ["import { DropdownItemDivider } from './DropdownItemDivider';"],
    example: figma.code`<DropdownItemDivider />`,
  };
} else if (figma.selectedInstance.getPropertyValue('Variant') === 'custom') {
  template = {
    id: 'DropdownItemCustom',
    imports: ["import { DropdownItemCustom } from './DropdownItemCustom';"],
    example: figma.code`<DropdownItemCustom>
        <span>Custom content</span>
      </DropdownItemCustom>`,
  };
} else {
  template = {
    id: 'DropdownItemCustom',
    imports: ["import { DropdownItemCustom } from './DropdownItemCustom';"],
    example: figma.code`<DropdownItemCustom>
        <span>Custom content</span>
      </DropdownItemCustom>`,
  };
}

export default template;

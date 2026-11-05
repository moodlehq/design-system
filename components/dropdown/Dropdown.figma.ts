// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=12573-5470&m=dev
// source=https://github.com/moodlehq/design-system/blob/main/components/dropdown/Dropdown.tsx
// component=Dropdown

import figma from 'figma';

const defaultOpen = figma.selectedInstance.getEnum('Open', { true: true });

const template = {
  id: 'Dropdown',
  imports: [
    "import { Dropdown } from './Dropdown';",
    "import { DropdownItemAction } from './DropdownItemAction';",
    "import { DropdownItemDivider } from './DropdownItemDivider';",
    "import { DropdownItemHeader } from './DropdownItemHeader';",
  ],
  example: figma.code`<Dropdown label={triggerLabel}${figma.helpers.react.renderProp(
    'defaultOpen',
    defaultOpen,
  )}>
        <DropdownItemHeader label="Dropdown header"/>
        <DropdownItemDivider />
        <DropdownItemAction label={itemLabel}/>
        <DropdownItemAction label={itemLabel}/>
      </Dropdown>`,
};

export default template;

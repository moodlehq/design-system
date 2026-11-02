// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=12573-1290&m=dev
// source=https://github.com/moodlehq/design-system/blob/main/components/dropdown/Dropdown.tsx
// component=DropdownMenu

import figma from 'figma';

export default {
  id: 'DropdownMenu',
  imports: [
    "import { DropdownMenu } from './Dropdown';",
    "import { DropdownItemAction } from './DropdownItemAction';",
    "import { DropdownItemDivider } from './DropdownItemDivider';",
    "import { DropdownItemHeader } from './DropdownItemHeader';",
  ],
  example: figma.code`<DropdownMenu>
      <DropdownItemHeader label="Dropdown header"/>
      <DropdownItemDivider />
      <DropdownItemAction label={itemLabel}/>
      <DropdownItemAction label={itemLabel}/>
      <DropdownItemAction label={itemLabel}/>
    </DropdownMenu>`,
};

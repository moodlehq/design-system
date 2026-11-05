// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=12527-1258&m=dev
// source=https://github.com/moodlehq/design-system/blob/main/components/dropdown/DropdownItemExpandable.tsx
// component=DropdownItemExpandable

import figma from 'figma';

export default {
  id: 'DropdownItemExpandable',
  imports: [
    "import { DropdownItemAction } from './DropdownItemAction';",
    "import { DropdownItemExpandable } from './DropdownItemExpandable';",
  ],
  example: figma.code`<DropdownItemExpandable label="Expand">
      <DropdownItemAction label={itemLabel}/>
    </DropdownItemExpandable>`,
};

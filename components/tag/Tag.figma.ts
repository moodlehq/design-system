// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=15712-281
// source=https://github.com/moodlehq/design-system/blob/main/components/tag/Tag.tsx
// component=Tag

import figma from 'figma';

let template;
if (figma.selectedInstance.getPropertyValue('Type') === 'Link') {
  template = {
    id: 'Tag',
    imports: ["import { Tag } from './Tag';"],
    example: figma.code`<Tag type="link" href="#" content="Category name"/>`,
  };
} else if (figma.selectedInstance.getPropertyValue('Type') === 'Removable') {
  template = {
    id: 'Tag',
    imports: ["import { Tag } from './Tag';"],
    example: figma.code`<Tag type="removable" content="Name/category" removeLabel="Remove Name/category" onRemove={() => { }}/>`,
  };
} else {
  template = {
    id: 'Tag',
    imports: ["import { Tag } from './Tag';"],
    example: figma.code`<Tag type="removable" content="Name/category" removeLabel="Remove Name/category" onRemove={() => { }}/>`,
  };
}

export default template;

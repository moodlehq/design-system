// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=13170-296
// source=https://github.com/moodlehq/design-system/blob/main/components/breadcrumb/Breadcrumb.tsx
// component=Breadcrumb

import figma from 'figma';

let template;
if (figma.selectedInstance.getPropertyValue('Items') === '2') {
  template = {
    id: 'Breadcrumb',
    imports: ["import { Breadcrumb } from './Breadcrumb';"],
    example: figma.code`<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Current page' }]} ariaLabel="Breadcrumb"/>`,
  };
} else if (figma.selectedInstance.getPropertyValue('Items') === '3') {
  template = {
    id: 'Breadcrumb',
    imports: ["import { Breadcrumb } from './Breadcrumb';"],
    example: figma.code`<Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Section', href: '/section' },
          { label: 'Current page' },
      ]} ariaLabel="Breadcrumb"/>`,
  };
} else if (figma.selectedInstance.getPropertyValue('Items') === '4') {
  template = {
    id: 'Breadcrumb',
    imports: ["import { Breadcrumb } from './Breadcrumb';"],
    example: figma.code`<Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Section', href: '/section' },
          { label: 'Sub-section', href: '/sub' },
          { label: 'Current page' },
      ]} ariaLabel="Breadcrumb"/>`,
  };
} else if (figma.selectedInstance.getPropertyValue('Items') === 'More than 4') {
  template = {
    id: 'Breadcrumb',
    imports: ["import { Breadcrumb } from './Breadcrumb';"],
    example: figma.code`<Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Level 2', href: '/l2' },
          { label: 'Level 3', href: '/l3' },
          { label: 'Level 4', href: '/l4' },
          { label: 'Level 5', href: '/l5' },
          { label: 'Current page' },
      ]} ariaLabel="Breadcrumb" overflowAriaLabel="Show more items"/>`,
  };
} else {
  template = {
    id: 'Breadcrumb',
    imports: ["import { Breadcrumb } from './Breadcrumb';"],
    example: figma.code`<Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Level 2', href: '/l2' },
          { label: 'Level 3', href: '/l3' },
          { label: 'Level 4', href: '/l4' },
          { label: 'Level 5', href: '/l5' },
          { label: 'Current page' },
      ]} ariaLabel="Breadcrumb" overflowAriaLabel="Show more items"/>`,
  };
}

export default template;

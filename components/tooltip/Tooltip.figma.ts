// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=11558-438
// source=https://github.com/moodlehq/design-system/blob/main/components/tooltip/Tooltip.tsx
// component=Tooltip

import figma from 'figma';

const label = figma.selectedInstance.getString('Text');
const placement = figma.selectedInstance.getEnum('Placement', {
  Top: 'top',
  Bottom: 'bottom',
  Left: 'left',
  Right: 'right',
});
const variant = figma.selectedInstance.getEnum('Variant', {
  Dark: 'dark',
  Light: 'light',
});

export default {
  id: 'Tooltip',
  imports: [
    "import { Button } from '../button';",
    "import { Tooltip } from './Tooltip';",
  ],
  example: figma.code`<Tooltip${figma.helpers.react.renderProp(
    'label',
    label,
  )}${figma.helpers.react.renderProp(
    'placement',
    placement,
  )}${figma.helpers.react.renderProp('variant', variant)}>
        <Button label="Hover me" variant="secondary"/>
      </Tooltip>`,
  metadata: { nestable: true },
};

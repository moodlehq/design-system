// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=7811-354
// source=https://github.com/moodlehq/design-system/blob/main/components/close-button/CloseButton.tsx
// component=CloseButton

import figma from 'figma';

const size = figma.selectedInstance.getEnum('Size', {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
});
const disabled = figma.selectedInstance.getEnum('State', { Disabled: true });

const template = {
  id: 'CloseButton',
  imports: ["import { CloseButton } from './CloseButton';"],
  example: figma.code`<CloseButton aria-label="Close"${figma.helpers.react.renderProp(
    'size',
    size,
  )}${figma.helpers.react.renderProp('disabled', disabled)}/>`,
  metadata: { nestable: true },
};

export default template;

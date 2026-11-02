// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=10508-2297
// source=https://github.com/moodlehq/design-system/blob/main/components/favourite-button/FavouriteButton.tsx
// component=FavouriteButton

import figma from 'figma';

const ariaLabel = figma.selectedInstance.getEnum('Selected', {
  False: 'Add to favourites',
  True: 'Remove from favourites',
});
const selected = figma.selectedInstance.getEnum('Selected', { True: true });
const disabled = figma.selectedInstance.getEnum('State', { Disabled: true });

const template = {
  id: 'FavouriteButton',
  imports: ["import { FavouriteButton } from './FavouriteButton';"],
  example: figma.code`<FavouriteButton${figma.helpers.react.renderProp(
    'aria-label',
    ariaLabel,
  )}${figma.helpers.react.renderProp(
    'selected',
    selected,
  )}${figma.helpers.react.renderProp('disabled', disabled)}/>`,
  metadata: { nestable: true },
};

export default template;

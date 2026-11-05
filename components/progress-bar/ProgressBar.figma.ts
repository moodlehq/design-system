// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=8847-672
// source=https://github.com/moodlehq/design-system/blob/main/components/progress-bar/ProgressBar.tsx
// component=ProgressBar

import figma from 'figma';

const labelVariant = figma.selectedInstance.getEnum('Label variant', {
  'Title and count': 'title-and-count',
  Title: 'title',
  Inline: 'inline',
  None: 'none',
});
const title = figma.selectedInstance.getString('Title');
const count = figma.selectedInstance.getEnum('Label variant', {
  'Title and count': figma.selectedInstance.getString('Count'),
  Inline: figma.selectedInstance.getString('Count'),
});

const template = {
  id: 'ProgressBar',
  imports: ["import { ProgressBar } from './ProgressBar';"],
  example: figma.code`<ProgressBar {...baseLabelExampleProps}${figma.helpers.react.renderProp(
    'labelVariant',
    labelVariant,
  )}${figma.helpers.react.renderProp(
    'title',
    title,
  )}${figma.helpers.react.renderProp('count', count)}/>`,
  metadata: { nestable: true },
};

export default template;

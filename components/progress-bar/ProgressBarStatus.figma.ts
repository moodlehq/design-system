// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=8838-290
// source=https://github.com/moodlehq/design-system/blob/main/components/progress-bar/ProgressBar.tsx
// component=ProgressBar

import figma from 'figma';

const count = figma.selectedInstance.getEnum('Status', {
  Empty: '0%',
  'In progress': '50%',
  Loading: '30%',
  Error: '40%',
  Warning: '60%',
  Completed: '100%',
});
const value = figma.selectedInstance.getEnum('Status', {
  Empty: 0,
  'In progress': 50,
  Loading: 30,
  Error: 40,
  Warning: 60,
  Completed: 100,
});
const status = figma.selectedInstance.getEnum('Status', {
  Empty: 'warning',
  'In progress': 'in-progress',
  Loading: 'loading',
  Error: 'error',
  Warning: 'warning',
  Completed: 'in-progress',
});

const template = {
  id: 'ProgressBar',
  imports: ["import { ProgressBar } from './ProgressBar';"],
  example: figma.code`<ProgressBar {...baseStatusExampleProps} title="Title"${figma.helpers.react.renderProp(
    'count',
    count,
  )}${figma.helpers.react.renderProp(
    'value',
    value,
  )}${figma.helpers.react.renderProp('status', status)}/>`,
};

export default template;

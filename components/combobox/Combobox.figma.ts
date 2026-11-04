// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=15956-7179
// source=https://github.com/moodlehq/design-system/blob/main/components/combobox/Combobox.tsx
// component=Combobox

import figma from 'figma';

// Figma's Combobox component set has a single property, Open (Yes/No), which
// only toggles whether the menu is drawn. Opening is interaction, not a code
// prop, so both values share one template and Open is not mapped. The rest is
// mapped from the nested Input instance. The menu rows and chosen tags are
// driven by `options` and `defaultValue` in code, and the Tags / Avatar /
// Username / Email / Institution toggles live on nested Tag and
// combobox.option instances, so they are left out of the snippet. The
// caller-supplied strings use placeholders because the component ships no
// English defaults.
const input = figma.selectedInstance.findInstance('Input');
const field = figma.selectedInstance.findInstance('Input/input.search');

const label =
  input.type !== 'ERROR' ? input.getString('Label text') : undefined;
const hideLabel =
  input.type !== 'ERROR'
    ? input.getBoolean('Show label', { true: false, false: true })
    : undefined;
const required =
  input.type !== 'ERROR' ? input.getBoolean('Required') : undefined;
const infoTooltipLabel =
  input.type !== 'ERROR'
    ? input.getBoolean('Info', {
        true: 'More information about this field',
        false: '',
      })
    : undefined;
const supportingText =
  input.type !== 'ERROR'
    ? input.getBoolean('Support text', {
        true: input.getString('Supporting text'),
        false: '',
      })
    : undefined;
const placeholder =
  field.type !== 'ERROR' ? field.getString('Placeholder text') : undefined;

const template = {
  id: 'Combobox',
  imports: ["import { Combobox } from './Combobox';"],
  example: figma.code`<Combobox${figma.helpers.react.renderProp(
    'label',
    label,
  )}${figma.helpers.react.renderProp(
    'hideLabel',
    hideLabel,
  )}${figma.helpers.react.renderProp(
    'required',
    required,
  )}${figma.helpers.react.renderProp(
    'infoTooltipLabel',
    infoTooltipLabel,
  )}${figma.helpers.react.renderProp(
    'supportingText',
    supportingText,
  )}${figma.helpers.react.renderProp(
    'placeholder',
    placeholder,
  )} options={options} multiple clearLabel="Clear all" showOptionsLabel="Show options" removeLabel={(name) => \`Remove \${name}\`} loadingLabel="Loading results" noResultsLabel={(query) => \`No matches for \${query}\`} resultsAnnouncement={(count) => \`\${count} results available\`}/>`,
};

export default template;

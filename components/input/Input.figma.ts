// url=https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=14649-2248
// source=https://github.com/moodlehq/design-system/blob/main/components/input/Input.tsx
// component=Input

import figma from 'figma';

// Search, Password and Text inputs differ only in component, nested layer and
// the labels they need for their built-in controls.
const component =
  figma.selectedInstance.getEnum('Type', {
    Search: 'SearchInput',
    Password: 'PasswordInput',
    Text: 'Input',
  }) ?? 'Input';
const layerName =
  figma.selectedInstance.getEnum('Type', {
    Search: 'Input/input.search',
    Password: 'Input/input.password',
    Text: 'Input/input.text',
  }) ?? 'Input/input.text';
const controlLabels = figma.selectedInstance.getEnum('Type', {
  Search: ' clearLabel="Clear search"',
  Password:
    ' passwordToggleShowLabel="Show password" passwordToggleHideLabel="Hide password"',
  Text: '',
});

const disabled = figma.selectedInstance.getEnum('State', { disabled: true });
const readOnly = figma.selectedInstance.getEnum('State', { 'read-only': true });
// Disabled and read-only inputs never show the invalid state.
const invalid =
  !disabled &&
  !readOnly &&
  figma.selectedInstance.getEnum('isInvalid', { Yes: true });

// Supporting text becomes the error message once the input is invalid.
const feedback = figma.selectedInstance.getBoolean('Support text', {
  true: figma.selectedInstance.getString('Supporting text'),
  false: '',
});
const supportingText = invalid ? undefined : feedback;
const invalidFeedback = invalid ? feedback : undefined;
const label = figma.selectedInstance.getString('Label text');
const hideLabel = figma.selectedInstance.getBoolean('Show label', {
  true: false,
  false: true,
});
const required = figma.selectedInstance.getBoolean('Required');
const infoTooltipLabel = figma.selectedInstance.getBoolean('Info', {
  true: 'More information about this field',
  false: '',
});
const field = (function () {
  const nestedLayer = figma.selectedInstance.findInstance(layerName);
  const filledText =
    nestedLayer.type !== 'ERROR'
      ? nestedLayer.getString('Fill text')
      : undefined;
  return {
    placeholder:
      nestedLayer.type !== 'ERROR'
        ? nestedLayer.getEnum('Content', {
            Empty: '',
            Placeholder: nestedLayer.getString('Placeholder text'),
            Filled: '',
            'Filled masked': '',
            'Filled visible': '',
          })
        : undefined,
    defaultValue:
      nestedLayer.type !== 'ERROR'
        ? nestedLayer.getEnum('Content', {
            Empty: '',
            Placeholder: '',
            Filled: filledText,
            'Filled masked': filledText,
            'Filled visible': filledText,
          })
        : undefined,
  };
})();

const template = {
  id: component,
  imports: [`import { ${component} } from './${component}';`],
  example: figma.code`<${component}${figma.helpers.react.renderProp(
    'supportingText',
    supportingText,
  )}${figma.helpers.react.renderProp(
    'invalidFeedback',
    invalidFeedback,
  )}${figma.helpers.react.renderProp(
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
    'placeholder',
    field.placeholder,
  )}${figma.helpers.react.renderProp(
    'defaultValue',
    field.defaultValue,
  )}${figma.helpers.react.renderProp(
    'invalid',
    invalid,
  )}${figma.helpers.react.renderProp(
    'disabled',
    disabled,
  )}${figma.helpers.react.renderProp('readOnly', readOnly)}${controlLabels}/>`,
  metadata: { nestable: true },
};

export default template;

import figma from '@figma/code-connect';
import { Choicebox } from './Choicebox';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=10232-4215';

const baseProps = {
  label: figma.string('Label'),
  supportingText: figma.string('Support text'),
};

// -----------------------------------------------------------------------
// Unselected — no supporting text
// -----------------------------------------------------------------------
figma.connect(Choicebox, url, {
  variant: { Selected: 'No', 'Supporting text': false },
  props: {
    label: figma.string('Label'),
  },
  example: ({ label }) => <Choicebox label={label} />,
});

// -----------------------------------------------------------------------
// Unselected — with supporting text
// -----------------------------------------------------------------------
figma.connect(Choicebox, url, {
  variant: { Selected: 'No', 'Supporting text': true },
  props: baseProps,
  example: ({ label, supportingText }) => (
    <Choicebox label={label} supportingText={supportingText} />
  ),
});

// -----------------------------------------------------------------------
// Selected — no supporting text
// -----------------------------------------------------------------------
figma.connect(Choicebox, url, {
  variant: { Selected: 'Yes', 'Supporting text': false },
  props: {
    label: figma.string('Label'),
  },
  example: ({ label }) => <Choicebox label={label} checked />,
});

// -----------------------------------------------------------------------
// Selected — with supporting text
// -----------------------------------------------------------------------
figma.connect(Choicebox, url, {
  variant: { Selected: 'Yes', 'Supporting text': true },
  props: baseProps,
  example: ({ label, supportingText }) => (
    <Choicebox label={label} supportingText={supportingText} checked />
  ),
});

// -----------------------------------------------------------------------
// Disabled (unselected)
// Disabled state is a separate variant split so the disabled prop
// appears explicitly in the Dev Mode snippet without conditional logic.
// -----------------------------------------------------------------------
figma.connect(Choicebox, url, {
  variant: { State: 'Disabled', Selected: 'No' },
  props: {
    label: figma.string('Label'),
    supportingText: figma.string('Support text'),
  },
  example: ({ label, supportingText }) => (
    <Choicebox label={label} supportingText={supportingText} disabled />
  ),
});

// -----------------------------------------------------------------------
// Disabled (selected)
// -----------------------------------------------------------------------
figma.connect(Choicebox, url, {
  variant: { State: 'Disabled', Selected: 'Yes' },
  props: {
    label: figma.string('Label'),
    supportingText: figma.string('Support text'),
  },
  example: ({ label, supportingText }) => (
    <Choicebox label={label} supportingText={supportingText} checked disabled />
  ),
});

// -----------------------------------------------------------------------
// Unselected — icon, no supporting text
// -----------------------------------------------------------------------
figma.connect(Choicebox, url, {
  variant: { Selected: 'No', 'Supporting text': false, Icon: true },
  props: {
    label: figma.string('Label'),
  },
  example: ({ label }) => (
    <Choicebox label={label} icon={<i className="fa-solid fa-star" />} />
  ),
});

// -----------------------------------------------------------------------
// Unselected — icon, with supporting text
// -----------------------------------------------------------------------
figma.connect(Choicebox, url, {
  variant: { Selected: 'No', 'Supporting text': true, Icon: true },
  props: baseProps,
  example: ({ label, supportingText }) => (
    <Choicebox
      label={label}
      supportingText={supportingText}
      icon={<i className="fa-solid fa-star" />}
    />
  ),
});

// -----------------------------------------------------------------------
// Selected — icon, no supporting text
// -----------------------------------------------------------------------
figma.connect(Choicebox, url, {
  variant: { Selected: 'Yes', 'Supporting text': false, Icon: true },
  props: {
    label: figma.string('Label'),
  },
  example: ({ label }) => (
    <Choicebox
      label={label}
      icon={<i className="fa-solid fa-star" />}
      checked
    />
  ),
});

// -----------------------------------------------------------------------
// Selected — icon, with supporting text
// -----------------------------------------------------------------------
figma.connect(Choicebox, url, {
  variant: { Selected: 'Yes', 'Supporting text': true, Icon: true },
  props: baseProps,
  example: ({ label, supportingText }) => (
    <Choicebox
      label={label}
      supportingText={supportingText}
      icon={<i className="fa-solid fa-star" />}
      checked
    />
  ),
});

// -----------------------------------------------------------------------
// Disabled (unselected) — icon
// -----------------------------------------------------------------------
figma.connect(Choicebox, url, {
  variant: { State: 'Disabled', Selected: 'No', Icon: true },
  props: {
    label: figma.string('Label'),
    supportingText: figma.string('Support text'),
  },
  example: ({ label, supportingText }) => (
    <Choicebox
      label={label}
      supportingText={supportingText}
      icon={<i className="fa-solid fa-star" />}
      disabled
    />
  ),
});

// -----------------------------------------------------------------------
// Disabled (selected) — icon
// -----------------------------------------------------------------------
figma.connect(Choicebox, url, {
  variant: { State: 'Disabled', Selected: 'Yes', Icon: true },
  props: {
    label: figma.string('Label'),
    supportingText: figma.string('Support text'),
  },
  example: ({ label, supportingText }) => (
    <Choicebox
      label={label}
      supportingText={supportingText}
      icon={<i className="fa-solid fa-star" />}
      checked
      disabled
    />
  ),
});

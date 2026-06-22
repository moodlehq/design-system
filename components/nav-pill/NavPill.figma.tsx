import figma from '@figma/code-connect';
import { NavPill } from './NavPill';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=10982-756';

const label = figma.string('Label');

// Interactive pseudo-states (hover/focus/pressed) are visual-only and not
// represented by React props, so one mapping per semantic state is enough.
figma.connect(NavPill, url, {
  variant: { Selected: 'No' },
  props: {
    label: label,
  },
  example: ({ label }) => <NavPill label={label} />,
});

figma.connect(NavPill, url, {
  variant: { Selected: 'Yes' },
  props: {
    label: label,
  },
  example: ({ label }) => <NavPill label={label} selected />,
});

// Disabled unselected
figma.connect(NavPill, url, {
  variant: { State: 'Disabled', Selected: 'No' },
  props: {
    label: label,
  },
  example: ({ label }) => <NavPill label={label} disabled />,
});

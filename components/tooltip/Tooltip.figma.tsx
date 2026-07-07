import figma from '@figma/code-connect';
import { Button } from '../button';
import { Tooltip } from './Tooltip';

figma.connect(
  Tooltip,
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=11558-438',
  {
    props: {
      label: figma.string('Text'),
      placement: figma.enum('Placement', {
        Top: 'top',
        Bottom: 'bottom',
        Left: 'left',
        Right: 'right',
      }),
      variant: figma.enum('Variant', {
        Dark: 'dark',
        Light: 'light',
      }),
    },
    example: ({ label, placement, variant }) => (
      <Tooltip label={label} placement={placement} variant={variant}>
        <Button label="Hover me" variant="secondary" />
      </Tooltip>
    ),
  },
);

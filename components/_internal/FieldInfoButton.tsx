import { Button } from '../button/index.js';
import { Tooltip } from '../tooltip/index.js';

interface FieldInfoButtonProps {
  /** Tooltip text, also used as the button's accessible name. */
  label: string;
}

/** Info icon button that reveals a tooltip with extra guidance for a form field. */
export function FieldInfoButton({ label }: FieldInfoButtonProps) {
  return (
    <Tooltip label={label} variant="light">
      <Button
        variant="ghost"
        size="sm"
        className="mds-field-info-button"
        aria-label={label}
        startIcon={<i className="fa-solid fa-circle-info" aria-hidden="true" />}
      />
    </Tooltip>
  );
}

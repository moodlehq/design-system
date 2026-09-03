import { Button } from '../button';
import { Tooltip } from '../tooltip';

interface FieldInfoButtonProps {
  label: string;
}

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

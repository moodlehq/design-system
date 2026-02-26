import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button as RBButton,
  ButtonProps as RBButtonProps,
} from 'react-bootstrap';

export interface ButtonProps extends RBButtonProps {
  label: string;
  variant?: string;
  disabled?: boolean;
  size?: 'sm' | 'lg';
  icon?: IconDefinition;
  iconPosition?: 'start' | 'end';
}

const allowedVariants = [
  'primary',
  'secondary',
  'danger',
  'outline-primary',
  'outline-secondary',
  'outline-danger',
];

export const Button: React.FC<ButtonProps> = ({
  label,
  variant,
  icon,
  iconPosition = 'start',
  ...props
}) => {
  const resolvedVariant = allowedVariants.includes(variant ?? '')
    ? variant
    : 'primary';

  const iconElement = icon ? (
    <FontAwesomeIcon className="mds-btn__icon" icon={icon} aria-hidden="true" />
  ) : null;

  return (
    <RBButton className="mds-btn" variant={resolvedVariant} {...props}>
      <span className="mds-btn__content">
        {iconPosition === 'start' ? iconElement : null}
        <span className="mds-btn__label">{label}</span>
        {iconPosition === 'end' ? iconElement : null}
      </span>
    </RBButton>
  );
};

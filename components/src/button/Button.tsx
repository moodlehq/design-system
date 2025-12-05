import {
  Button as RBButton,
  ButtonProps as RBButtonProps,
} from 'react-bootstrap';

import './button.css';

export interface ButtonProps extends RBButtonProps {
  label: string;
  variant?: string;
  disabled?: boolean;
  size?: 'sm' | 'lg';
}

const allowedVariants = [
  'primary',
  'secondary',
  'danger',
  'outline-primary',
  'outline-secondary',
  'outline-danger',
];

export const Button: React.FC<ButtonProps> = ({ label, variant, ...props }) => {
  const resolvedVariant = allowedVariants.includes(variant ?? '')
    ? variant
    : 'primary';

  return (
    <RBButton className="mds-btn" variant={resolvedVariant} {...props}>
      {label}
    </RBButton>
  );
};

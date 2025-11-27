import {
  Button as RBButton,
  ButtonProps as RBButtonProps,
} from 'react-bootstrap';

import './button.css';

export interface ButtonProps extends RBButtonProps {
  label: string;
  variant?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'outline-primary'
    | 'outline-secondary'
    | 'outline-danger';
  disabled?: boolean;
  size?: 'sm' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ label, ...props }) => {
  return (
    <RBButton className="mds-btn" {...props}>
      {label}
    </RBButton>
  );
};

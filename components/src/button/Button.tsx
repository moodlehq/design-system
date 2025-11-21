import {
  Button as RBButton,
  ButtonProps as RBButtonProps,
} from 'react-bootstrap';

import './button.css';

export interface ButtonProps extends RBButtonProps {
  label: string;
}

export const Button: React.FC<ButtonProps> = ({ label, ...props }) => {
  return (
    <RBButton className="mds-btn" {...props}>
      {label}
    </RBButton>
  );
};

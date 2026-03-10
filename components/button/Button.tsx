import type { ButtonHTMLAttributes } from 'react';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-danger';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: string;
  size?: 'sm' | 'lg';
}

const allowedVariants: ButtonVariant[] = [
  'primary',
  'secondary',
  'danger',
  'outline-primary',
  'outline-secondary',
  'outline-danger',
];

export const Button = ({
  label,
  variant,
  size,
  className,
  type = 'button',
  ...props
}: ButtonProps) => {
  const resolvedVariant =
    variant && allowedVariants.includes(variant as ButtonVariant)
      ? variant
      : 'primary';

  const classes = ['mds-btn', 'btn', `btn-${resolvedVariant}`];
  if (size) {
    classes.push(`btn-${size}`);
  }
  if (className) {
    classes.push(className);
  }

  return (
    <button className={classes.join(' ')} type={type} {...props}>
      {label}
    </button>
  );
};

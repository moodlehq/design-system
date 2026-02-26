import React from 'react';
import { Alert as RBAlert, AlertProps as RBAlertProps } from 'react-bootstrap';
import { Button, ButtonProps } from '../button';

export interface AlertActionButtonProps extends Omit<ButtonProps, 'onClick'> {
  onClick?: ButtonProps['onClick'];
}

export interface AlertProps extends Omit<RBAlertProps, 'variant'> {
  variant?: 'success' | 'info' | 'warning' | 'danger';
  heading?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  actionLabel?: string;
  onActionClick?: () => void;
  actionButtonProps?: AlertActionButtonProps;
  dismissible?: boolean;
  onClose?: () => void;
}

const allowedVariants = ['success', 'info', 'warning', 'danger'];

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  heading,
  children,
  icon,
  actionLabel,
  onActionClick,
  actionButtonProps,
  dismissible = false,
  onClose,
  ...props
}) => {
  const resolvedVariant = allowedVariants.includes(variant ?? '')
    ? variant
    : 'info';
  const hasActionButtonVariantOverride =
    !!actionButtonProps &&
    Object.prototype.hasOwnProperty.call(actionButtonProps, 'variant');
  const actionContainerClassName = hasActionButtonVariantOverride
    ? 'mds-alert-action-container'
    : 'mds-alert-action-container mds-alert-action-container--contextual';

  return (
    <RBAlert
      className="mds-alert"
      variant={resolvedVariant}
      dismissible={dismissible}
      onClose={onClose}
      {...props}
    >
      <div className="mds-alert-content">
        <div className="mds-alert-header-body">
          <div className="mds-alert-header">
            {icon && (
              <div className="mds-alert-icon" aria-hidden="true">
                {icon}
              </div>
            )}
            {heading && (
              <RBAlert.Heading className="mds-alert-heading">
                {heading}
              </RBAlert.Heading>
            )}
          </div>
          {children && <div className="mds-alert-body">{children}</div>}
        </div>
        {actionButtonProps ? (
          <div className={actionContainerClassName}>
            <Button {...actionButtonProps} />
          </div>
        ) : (
          actionLabel &&
          onActionClick && (
            <button
              className="mds-alert-action"
              onClick={onActionClick}
              type="button"
            >
              {actionLabel}
            </button>
          )
        )}
      </div>
    </RBAlert>
  );
};

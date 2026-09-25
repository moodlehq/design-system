import type { HTMLAttributes, ReactNode } from 'react';
import { useRef, useState } from 'react';
import { getNextFocusableElement } from '../_internal/focus';
import type { ButtonProps } from '../button';
import { Button } from '../button';
import { CloseButton } from '../close-button';

export type AlertType = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /** Semantic alert type that controls icon, colours, and live-region role. */
  type?: AlertType;

  /** Optional heading above the message body. */
  title?: string;

  /** Required alert message content. */
  message: string;

  /** Shows a dismiss control that removes the alert from the page. Defaults to true. */
  isDismissible?: boolean;

  /** Accessible label for the dismiss control. Defaults to 'Dismiss alert'. */
  dismissAriaLabel?: string;

  /** Callback fired after the alert is dismissed. */
  onDismiss?: () => void;

  /** Shows a single inline action button below the message. */
  isActionable?: boolean;

  /** Visible action button label. Required when actionable. */
  actionLabel?: string;

  /** Click handler for the action button. */
  onAction?: ButtonProps['onClick'];

  /** Additional props forwarded to the action Button component. */
  actionButtonProps?: Omit<
    ButtonProps,
    'label' | 'variant' | 'onClick' | 'type' | 'startIcon' | 'endIcon'
  >;

  /** Optional custom content rendered in the custom slot. */
  children?: ReactNode;
}

const allowedTypes: AlertType[] = ['info', 'success', 'warning', 'danger'];

const roleByType: Record<AlertType, 'alert' | 'status'> = {
  info: 'status',
  success: 'status',
  warning: 'alert',
  danger: 'alert',
};

export const Alert = ({
  type,
  title,
  message,
  isDismissible = true,
  dismissAriaLabel = 'Dismiss alert',
  onDismiss,
  isActionable = false,
  actionLabel,
  onAction,
  actionButtonProps,
  children,
  className,
  ...props
}: AlertProps) => {
  const [dismissed, setDismissed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const resolvedType =
    type && allowedTypes.includes(type as AlertType) ? type : 'info';

  if (import.meta.env.DEV) {
    if (type && !allowedTypes.includes(type as AlertType)) {
      console.warn(
        `[MDS Alert] Invalid type "${type}". Falling back to "info". Allowed: ${allowedTypes.join(', ')}`,
      );
    }

    if (isDismissible && !dismissAriaLabel?.trim()) {
      console.warn(
        '[MDS Alert] dismissAriaLabel is required when isDismissible is true.',
      );
    }

    if (isActionable && !actionLabel?.trim()) {
      console.warn(
        '[MDS Alert] actionLabel is required when isActionable is true.',
      );
    }
  }

  const showDismissControl = isDismissible;
  const showActionControl = isActionable && Boolean(actionLabel?.trim());
  const showCustomSlot = Boolean(children);
  const liveRegionRole = roleByType[resolvedType as AlertType];

  const handleDismiss = () => {
    const nextFocusableElement = getNextFocusableElement(
      rootRef.current,
      document.activeElement,
    );

    setDismissed(true);
    onDismiss?.();

    // Move focus after unmounting the alert content to keep keyboard flow predictable.
    if (nextFocusableElement) {
      requestAnimationFrame(() => {
        nextFocusableElement.focus();
      });
    }
  };

  if (dismissed) {
    return null;
  }

  const classes = [
    'mds-alert',
    'alert',
    `mds-alert--${resolvedType}`,
    `alert-${resolvedType}`,
  ];
  if (!title) {
    classes.push('mds-alert--no-title');
  }
  if (className) {
    classes.push(className);
  }

  return (
    <div ref={rootRef} className={classes.join(' ')} {...props}>
      <span className="mds-alert-icon-wrap" aria-hidden="true">
        <span className="mds-alert-icon" />
      </span>

      <div className="mds-alert-content">
        <div className="mds-alert-text" role={liveRegionRole}>
          {title && <p className="mds-alert-title">{title}</p>}
          <p className="mds-alert-message">{message}</p>
        </div>

        {showCustomSlot && <div className="mds-alert-custom">{children}</div>}

        {showActionControl && (
          <div className="mds-alert-actions">
            <Button
              label={actionLabel}
              variant="outline-secondary"
              onClick={onAction}
              {...actionButtonProps}
            />
          </div>
        )}
      </div>

      {showDismissControl && (
        <div className="mds-alert-dismiss">
          <CloseButton
            aria-label={dismissAriaLabel}
            className="mds-alert-dismiss-button"
            onClick={handleDismiss}
          />
        </div>
      )}
    </div>
  );
};

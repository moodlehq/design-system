import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useId, useState } from 'react';

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  variant?: 'default' | 'info';
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  triggerId?: string;
  panelId?: string;
  disabled?: boolean;
}

const allowedVariants = ['default', 'info'];

export const Accordion: React.FC<AccordionProps> = ({
  heading,
  children,
  variant = 'default',
  expanded,
  defaultExpanded = false,
  onExpandedChange,
  triggerId,
  panelId,
  disabled = false,
  className,
  ...props
}) => {
  const generatedId = useId();
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

  const isControlled = expanded !== undefined;
  const isExpanded = isControlled ? expanded : internalExpanded;
  const resolvedVariant = allowedVariants.includes(variant)
    ? variant
    : 'default';
  const resolvedTriggerId = triggerId ?? `mds-accordion-trigger-${generatedId}`;
  const resolvedPanelId = panelId ?? `mds-accordion-panel-${generatedId}`;

  const rootClassName = [
    'mds-accordion',
    `mds-accordion--${resolvedVariant}`,
    isExpanded ? 'mds-accordion--expanded' : '',
    disabled ? 'mds-accordion--disabled' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const handleToggle = () => {
    if (disabled) {
      return;
    }

    const nextExpanded = !isExpanded;

    if (!isControlled) {
      setInternalExpanded(nextExpanded);
    }

    onExpandedChange?.(nextExpanded);
  };

  return (
    <div className={rootClassName} {...props}>
      <button
        aria-controls={resolvedPanelId}
        aria-expanded={isExpanded}
        className="mds-accordion__trigger"
        disabled={disabled}
        id={resolvedTriggerId}
        onClick={handleToggle}
        type="button"
      >
        <span className="mds-accordion__heading">{heading}</span>
        <FontAwesomeIcon
          className="mds-accordion__icon"
          icon={faChevronDown}
          aria-hidden="true"
        />
      </button>

      <div
        aria-labelledby={resolvedTriggerId}
        className="mds-accordion__panel"
        hidden={!isExpanded}
        id={resolvedPanelId}
        role="region"
      >
        <div className="mds-accordion__content">{children}</div>
      </div>
    </div>
  );
};

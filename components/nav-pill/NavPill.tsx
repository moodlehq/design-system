import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { forwardRef } from 'react';

export interface NavPillProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'aria-current' | 'aria-disabled' | 'role'
> {
  /**
   * Visible label text. Must be a caller-supplied translated string.
   */
  label: string;

  /**
   * Whether this pill is currently the active/selected navigation item.
   * Controls the active-indicator dot and selected visual styles.
   */
  selected?: boolean;

  /**
   * Destination URL for the navigation pill.
   */
  href: string;

  /**
   * Marks the anchor as non-interactive while preserving anchor semantics.
   */
  disabled?: boolean;
}

export const NavPill = forwardRef<HTMLAnchorElement, NavPillProps>(
  function NavPill(
    {
      label,
      selected = false,
      className,
      disabled,
      onClick,
      href,
      target,
      rel,
      tabIndex,
      ...props
    },
    ref,
  ) {
    // A selected pill represents the active navigation destination and cannot
    // be disabled — disabling it would leave users with no way to identify
    // the current location. Silently ignore the disabled prop when selected.
    if (import.meta.env.DEV && selected && disabled) {
      console.warn(
        '[MDS NavPill] A selected NavPill cannot be disabled. ' +
          'The disabled prop is ignored when selected=true.',
      );
    }
    const isDisabled = selected ? false : disabled;

    const classes = [
      'mds-nav-pill',
      selected ? 'mds-nav-pill--selected' : null,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const resolvedHref = isDisabled ? undefined : href;

    // Align anchor hardening with Link: when opening in a new tab, enforce
    // noopener+noreferrer to prevent opener access and referrer leakage.
    const resolvedRel = (() => {
      if (target !== '_blank') return rel;
      const parts = new Set([
        ...(rel ?? '').split(/\s+/).filter(Boolean),
        'noopener',
        'noreferrer',
      ]);
      return Array.from(parts).join(' ');
    })();

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      if (isDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      onClick?.(event);
    };

    return (
      <a
        ref={ref}
        {...props}
        className={classes}
        target={target}
        rel={resolvedRel}
        href={resolvedHref}
        aria-disabled={isDisabled ? 'true' : undefined}
        tabIndex={isDisabled ? -1 : tabIndex}
        role={isDisabled ? 'link' : undefined}
        onClick={handleClick}
        aria-current={selected ? 'page' : undefined}
      >
        {/* Active-indicator dot: only visible when selected */}
        {selected && (
          <span className="mds-nav-pill__indicator" aria-hidden="true" />
        )}
        <span className="mds-nav-pill__label">{label}</span>
      </a>
    );
  },
);

NavPill.displayName = 'NavPill';

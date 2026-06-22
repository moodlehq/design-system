import type { HTMLAttributes } from 'react';
import { useId } from 'react';

type ProgressBarStatus = 'in-progress' | 'loading' | 'error' | 'warning';

type ProgressBarVisualStatus = 'empty' | ProgressBarStatus | 'completed';

type ProgressBarLabelVariant = 'title-and-count' | 'title' | 'inline' | 'none';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Current progress value in the range defined by `min` and `max`. */
  value?: number;
  /** Lower bound for the progress range. Defaults to 0. */
  min?: number;
  /** Upper bound for the progress range. Defaults to 100. */
  max?: number;
  /** Visual state of the progress indicator — controls fill and track colours. */
  status?: ProgressBarStatus;
  /**
   * Controls label layout:
   * - `title-and-count`: title + count row above the bar (default)
   * - `title`: title only above the bar
   * - `inline`: bar with count beside it in a row
   * - `none`: bar only, no visible label
   */
  labelVariant?: ProgressBarLabelVariant;
  /** Pre-translated title text rendered above the bar (title-and-count / title variants).
   *  Also used as the accessible name for the bar when no visible label is present. */
  title?: string;
  /**
   * Pre-translated count or percentage text, e.g. "3 of 10" or "50%".
   * The component intentionally does not calculate or format this from
   * `value`, `min`, and `max`; word order, plural rules, and number formatting
   * belong to the consuming application's i18n layer.
   */
  count?: string;
  /** Controls striped animation when status is loading. */
  animated?: boolean;
}

const allowedStatuses: ProgressBarStatus[] = [
  'in-progress',
  'loading',
  'error',
  'warning',
];

const allowedLabels: ProgressBarLabelVariant[] = [
  'title-and-count',
  'title',
  'inline',
  'none',
];

export const ProgressBar = ({
  value = 0,
  min = 0,
  max = 100,
  status,
  labelVariant = 'title-and-count',
  title,
  count,
  animated = false,
  className,
  ...props
}: ProgressBarProps) => {
  const titleId = useId();

  const isAllowedStatus =
    !!status && allowedStatuses.includes(status as ProgressBarStatus);
  const isAllowedLabelVariant = allowedLabels.includes(
    labelVariant as ProgressBarLabelVariant,
  );

  // Normalize range inputs to finite numbers and ensure an ascending range.
  const hasFiniteRange = Number.isFinite(min) && Number.isFinite(max);
  const hasAscendingRange = hasFiniteRange && min < max;
  const resolvedMin = hasAscendingRange ? min : 0;
  const resolvedMax = hasAscendingRange ? max : 100;
  const isValueInRange = value >= resolvedMin && value <= resolvedMax;

  const resolvedStatus: ProgressBarStatus = isAllowedStatus
    ? status
    : 'in-progress';
  const resolvedLabel: ProgressBarLabelVariant = isAllowedLabelVariant
    ? labelVariant
    : 'title-and-count';
  const clampedValue = Math.min(resolvedMax, Math.max(resolvedMin, value));
  const fillPercent =
    ((clampedValue - resolvedMin) / (resolvedMax - resolvedMin)) * 100;
  // At 0% and 100% fill, visual styling is derived from normalized position,
  // regardless of status.
  const visualStatus: ProgressBarVisualStatus =
    fillPercent === 0
      ? 'empty'
      : fillPercent === 100
        ? 'completed'
        : resolvedStatus;

  if (import.meta.env.DEV) {
    if (status && !isAllowedStatus) {
      console.warn(
        `[MDS ProgressBar] Invalid status "${status}". Falling back to "in-progress". Allowed: ${allowedStatuses.join(', ')}`,
      );
    }
    if (!isAllowedLabelVariant) {
      console.warn(
        `[MDS ProgressBar] Invalid labelVariant "${labelVariant}". Falling back to "title-and-count". Allowed: ${allowedLabels.join(', ')}`,
      );
    }
    if (!hasAscendingRange) {
      console.warn(
        `[MDS ProgressBar] Invalid range min="${min}" max="${max}". Falling back to min=0 and max=100 with min < max required.`,
      );
    }
    if (!isValueInRange) {
      console.warn(
        `[MDS ProgressBar] value "${value}" is outside the allowed range [${resolvedMin}–${resolvedMax}] and will be clamped.`,
      );
    }
  }

  const isTitleCount = resolvedLabel === 'title-and-count';
  const isTitle = resolvedLabel === 'title';
  const isInline = resolvedLabel === 'inline';
  const showTitleRow = isTitleCount || isTitle;

  // Extract aria-* props so they can be forwarded to the progressbar track element,
  // which carries role="progressbar" — the accessible element in this component.
  const {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    ...restProps
  } = props;

  // Derive accessible name for the track:
  // - Explicit aria-labelledby wins if provided.
  // - If a visible title element is present and no explicit aria-label, point to it.
  const hasVisibleTitle = showTitleRow && Boolean(title);
  const trackLabelledby =
    ariaLabelledby ?? (hasVisibleTitle && !ariaLabel ? titleId : undefined);

  // aria-label is used when no visible title is rendered (inline / none variants)
  // and no labelledby reference applies.
  const trackAriaLabel = ariaLabel ?? (!hasVisibleTitle ? title : undefined);

  // Check derived accessible-name values regardless of the labelVariant
  if (import.meta.env.DEV && !trackAriaLabel && !trackLabelledby) {
    console.warn(
      '[MDS ProgressBar] No accessible name found. Provide a title prop or aria-label / aria-labelledby.',
    );
  }

  const wrapperClasses = [
    'mds-progress-bar',
    `mds-progress-bar--label-${resolvedLabel}`,
    `mds-progress-bar--${visualStatus}`,
  ];
  if (className) wrapperClasses.push(className);

  const fillClasses = [
    'mds-progress-bar-fill',
    'progress-bar',
    // In loading status, stripes are always shown; motion is controlled by `animated`.
    visualStatus === 'loading' ? 'progress-bar-striped' : '',
    visualStatus === 'loading' && animated ? 'progress-bar-animated' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses.join(' ')} {...restProps}>
      {showTitleRow && (
        <div className="mds-progress-bar-label">
          <span id={titleId} className="mds-progress-bar-title">
            {title}
          </span>
          {isTitleCount && (
            <span className="mds-progress-bar-count">{count}</span>
          )}
        </div>
      )}
      <div
        className="mds-progress-bar-track progress"
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={resolvedMin}
        aria-valuemax={resolvedMax}
        aria-labelledby={trackLabelledby}
        aria-label={trackAriaLabel}
      >
        <div className={fillClasses} style={{ width: `${fillPercent}%` }} />
      </div>
      {isInline && <span className="mds-progress-bar-count">{count}</span>}
    </div>
  );
};

import type { HTMLAttributes } from 'react';
import { forwardRef, useEffect, useState } from 'react';

/** Size of a Spinner: `small` (20px, label beside) or `large` (64px, label beneath). */
export type SpinnerSize = 'small' | 'large';

/** Colour treatment of a Spinner: `primary` for light surfaces or `inverse` for dark and filled surfaces. */
export type SpinnerAppearance = 'primary' | 'inverse';

/** Props for Spinner. */
export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Pre-translated text saying what is happening, e.g. "Saving changes...".
   * Always required: it is the spinner's accessible name, and is shown on
   * screen only when `showLabel` is true.
   */
  labelText: string;
  /** Shows `labelText` as visible text. When false, the text stays available to screen readers only. */
  showLabel?: boolean;
  /** How much space the spinner takes. Small sits inside or beside a control; large is for a page or main content area. */
  size?: SpinnerSize;
  /** Colours of the ring and label. Use `inverse` on dark or strongly coloured surfaces, such as a filled primary button. */
  appearance?: SpinnerAppearance;
  /**
   * Waits about 300ms before showing the spinner, so loads that finish quickly
   * don't flash. Use it for content loading in a region or on a page. Leave it
   * off for a response to something the person has just done, which should
   * show straight away.
   */
  delay?: boolean;
}

// ZeroHeight (Spinner > Behaviour): "wait about 300ms before showing the
// spinner" for region and page loads. No motion/duration tokens exist yet, so
// the value lives here once instead of in every consumer.
const SPINNER_SHOW_DELAY_MS = 300;

const allowedSizes: SpinnerSize[] = ['small', 'large'];
const allowedAppearances: SpinnerAppearance[] = ['primary', 'inverse'];

// Ring geometry per size, taken from the Figma glyph frames: a 20px box with a
// 2px stroke and a 64px box with a 4px stroke. The viewBox matches the rendered
// pixel size so the stroke-weight tokens set in CSS map 1:1 to user units, and
// the radius insets the circle by half the stroke so the ring isn't clipped.
const ringGeometry: Record<SpinnerSize, { box: number; radius: number }> = {
  small: { box: 20, radius: 9 },
  large: { box: 64, radius: 30 },
};

/** Shows that the system is working on something and the person needs to wait, when the wait has no known length. Not interactive. For progress towards a known total use ProgressBar. */
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  function Spinner(
    {
      labelText,
      showLabel = false,
      size = 'small',
      appearance = 'primary',
      delay = false,
      className,
      ...props
    },
    ref,
  ) {
    const [delayElapsed, setDelayElapsed] = useState(false);

    useEffect(() => {
      if (!delay) return;
      const timer = setTimeout(
        () => setDelayElapsed(true),
        SPINNER_SHOW_DELAY_MS,
      );
      // Unmounting before the delay ends (a quick load) cancels the show.
      return () => clearTimeout(timer);
    }, [delay]);

    const isWaiting = delay && !delayElapsed;

    const isAllowedSize = allowedSizes.includes(size as SpinnerSize);
    const isAllowedAppearance = allowedAppearances.includes(
      appearance as SpinnerAppearance,
    );

    if (import.meta.env.DEV) {
      if (!isAllowedSize) {
        console.warn(
          `[MDS Spinner] Invalid size "${size}". Falling back to "small". Allowed: ${allowedSizes.join(', ')}`,
        );
      }
      if (!isAllowedAppearance) {
        console.warn(
          `[MDS Spinner] Invalid appearance "${appearance}". Falling back to "primary". Allowed: ${allowedAppearances.join(', ')}`,
        );
      }
      if (!labelText?.trim()) {
        console.warn(
          '[MDS Spinner] No accessible name found. Provide labelText saying what is happening, even when showLabel is false.',
        );
      }
      // ZeroHeight: a Large spinner MUST show a message beneath it. The label
      // stays off by default for every size (matching Figma), so flag the miss
      // here rather than changing the default per size.
      if (size === 'large' && !showLabel) {
        console.warn(
          '[MDS Spinner] size="large" should always show its label. Pass showLabel so people can see what they are waiting for.',
        );
      }
    }

    const resolvedSize: SpinnerSize = isAllowedSize ? size : 'small';
    const resolvedAppearance: SpinnerAppearance = isAllowedAppearance
      ? appearance
      : 'primary';
    const { box, radius } = ringGeometry[resolvedSize];
    const centre = box / 2;

    const classes = [
      'mds-spinner',
      `mds-spinner--${resolvedSize}`,
      `mds-spinner--${resolvedAppearance}`,
    ];
    if (className) classes.push(className);

    const labelClasses = ['mds-spinner-label'];
    // Bootstrap's visually-hidden keeps the text in the status region for
    // screen readers when the visible label is off.
    if (!showLabel) labelClasses.push('visually-hidden');

    return (
      // role="status" makes the wrapper a polite live region that announces the
      // label text inside it (the Bootstrap spinner pattern). The ring is
      // decorative and hidden. Consumers can override role/aria-* via props.
      // While a delay is pending the region renders empty: a live region that
      // exists before its text is inserted announces reliably, and a quick
      // load that unmounts first announces nothing.
      <span ref={ref} className={classes.join(' ')} role="status" {...props}>
        {!isWaiting && (
          <>
            <svg
              className="mds-spinner-glyph"
              viewBox={`0 0 ${box} ${box}`}
              aria-hidden="true"
              focusable="false"
            >
              {/* pathLength normalises both circles to 360 units so the dash
              keyframes in spinner.css work at every size. */}
              <circle
                className="mds-spinner-track"
                cx={centre}
                cy={centre}
                r={radius}
                pathLength={360}
              />
              <circle
                className="mds-spinner-indicator"
                cx={centre}
                cy={centre}
                r={radius}
                pathLength={360}
              />
            </svg>
            <span className={labelClasses.join(' ')}>{labelText}</span>
          </>
        )}
      </span>
    );
  },
);
Spinner.displayName = 'Spinner';

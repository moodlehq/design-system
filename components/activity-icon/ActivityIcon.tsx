import type { CSSProperties, HTMLAttributes } from 'react';
import { useEffect, useState } from 'react';
import type { ActivityIconName } from './activityIconRegistry';
import {
  activityIconNames,
  activityIconRegistry,
} from './activityIconRegistry';

const iconGlob = import.meta.glob<{ default: string }>('./assets/*.svg', {
  eager: false,
});

function loadIconSrc(fileName: string): Promise<string> {
  const globPath = `./assets/${fileName}.svg`;
  const loader = iconGlob[globPath];

  if (!loader) {
    return Promise.reject(
      new Error(
        `[MDS ActivityIcon] Icon file "${fileName}.svg" not found in assets.`,
      ),
    );
  }

  return loader().then((mod) => mod.default);
}

/** Container style around an ActivityIcon: `none`, `default` or `large`. */
export type ActivityIconContainer = 'none' | 'default' | 'large';
const allowedContainers: ActivityIconContainer[] = ['none', 'default', 'large'];

/** Size of an ActivityIcon: `sm`, `md`, `lg` or `xl`. */
export type ActivityIconSize = 'sm' | 'md' | 'lg' | 'xl';
const allowedSizes: ActivityIconSize[] = ['sm', 'md', 'lg', 'xl'];

export type ActivityIconAppearance = 'default' | 'muted';
const allowedAppearances: ActivityIconAppearance[] = ['default', 'muted'];
const iconLookupFallback: ActivityIconName = 'file-unknown';

// Third-party brand artwork can't be recoloured with tokens and loses its detail
// when masked to a single colour, so these icons have their saturation reduced
// for the muted state instead of using the token overlay.
const mutedFilterFallbackIcons: ActivityIconName[] = ['bigbluebutton', 'h5p'];

/** Props for ActivityIcon. */
export interface ActivityIconProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Activity/resource icon key used to resolve the SVG asset from the registry.
   */
  icon: ActivityIconName;
  /**
   * Accessible text for the rendered image. Use an empty string for decorative icons.
   */
  alt?: string;
  /**
   * Visual container style around the icon.
   */
  container?: ActivityIconContainer;
  /**
   * Icon size token.
   */
  size?: ActivityIconSize;
  /**
   * Colour treatment. `muted` replaces the category colours with the muted
   * tokens, for hidden or unavailable activities. Third-party brand icons
   * (e.g. BigBlueButton, H5P) can't be recoloured, so they are desaturated
   * instead. The icon remains in the
   * accessibility tree, so convey the hidden state to assistive technology
   * separately.
   */
  appearance?: ActivityIconAppearance;
}

/** Renders a Moodle activity or resource type icon (e.g. assignment, quiz, forum), looked up by `icon` key. Use for course content types; use an `<i>`/`<svg>` icon element for general UI icons. */
export const ActivityIcon = ({
  icon,
  alt = '',
  container,
  size,
  appearance,
  className,
  style,
  ...props
}: ActivityIconProps) => {
  // TS callers must pass icon, but JS consumers can still provide undefined at runtime.
  const normalizedIcon = icon?.toLowerCase();
  const hasValidIcon =
    normalizedIcon !== undefined && normalizedIcon in activityIconRegistry;

  if (!hasValidIcon) {
    const invalidIconMessage = `[MDS ActivityIcon] Invalid icon "${icon}". Allowed: ${activityIconNames.join(', ')}`;
    console.error(
      `${invalidIconMessage}. Falling back to "${iconLookupFallback}" placeholder.`,
    );
  }

  if (
    import.meta.env.DEV &&
    container &&
    !allowedContainers.includes(container)
  ) {
    console.warn(
      `[MDS ActivityIcon] Invalid container "${container}". Falling back to "default". Allowed: ${allowedContainers.join(', ')}`,
    );
  }

  if (import.meta.env.DEV && size && !allowedSizes.includes(size)) {
    console.warn(
      `[MDS ActivityIcon] Invalid size "${size}". Falling back to "md". Allowed: ${allowedSizes.join(', ')}`,
    );
  }

  if (
    import.meta.env.DEV &&
    appearance &&
    !allowedAppearances.includes(appearance)
  ) {
    console.warn(
      `[MDS ActivityIcon] Invalid appearance "${appearance}". Falling back to "default". Allowed: ${allowedAppearances.join(', ')}`,
    );
  }

  const resolvedIcon: ActivityIconName = hasValidIcon
    ? (normalizedIcon as ActivityIconName)
    : iconLookupFallback;
  const resolvedAppearance =
    appearance && allowedAppearances.includes(appearance)
      ? appearance
      : 'default';
  const resolvedContainer =
    container && allowedContainers.includes(container) ? container : 'default';
  const resolvedSize = size && allowedSizes.includes(size) ? size : 'md';
  const resolvedCategory = activityIconRegistry[resolvedIcon].category;
  const [iconSrc, setIconSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    let isMounted = true;
    const { fileName } = activityIconRegistry[resolvedIcon];

    void loadIconSrc(fileName)
      .then((src) => {
        if (isMounted) {
          setIconSrc(src);
        }
      })
      .catch(() => {
        if (isMounted) {
          setIconSrc(undefined);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [resolvedIcon]);

  const classes = [
    'mds-activity-icon',
    `mds-activity-icon--${resolvedContainer}`,
    `mds-activity-icon--size-${resolvedSize}`,
    `mds-activity-icon--category-${resolvedCategory}`,
  ];
  const isMuted = resolvedAppearance === 'muted';
  const needsFilterFallback = mutedFilterFallbackIcons.includes(resolvedIcon);
  if (isMuted) {
    classes.push(
      needsFilterFallback
        ? 'mds-activity-icon--muted-filter'
        : 'mds-activity-icon--muted',
    );
  }
  if (className) {
    classes.push(className);
  }

  // The SVG assets carry fixed fills, so the muted colour is applied by masking
  // a token-coloured overlay with the asset (see activity-icon.css). The mask is
  // set inline so the URL resolves against the page like the <img src>, and the
  // overlay only renders once the asset is ready to avoid a solid grey box.
  const maskStyle: CSSProperties | undefined =
    isMuted && !needsFilterFallback && iconSrc
      ? {
          WebkitMaskImage: `url("${iconSrc}")`,
          maskImage: `url("${iconSrc}")`,
        }
      : undefined;

  return (
    <span className={classes.join(' ')} style={style} {...props}>
      <img alt={alt} className="mds-activity-icon__asset" src={iconSrc} />
      {maskStyle && (
        <span
          aria-hidden="true"
          className="mds-activity-icon__mask"
          style={maskStyle}
        />
      )}
    </span>
  );
};

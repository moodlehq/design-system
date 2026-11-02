import type { CSSProperties, HTMLAttributes } from 'react';
import { useEffect, useState } from 'react';
import type {
  ActivityIconCategory,
  ActivityIconName,
} from './activityIconRegistry';
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

export type ActivityIconContainer = 'none' | 'default' | 'large';
const allowedContainers: ActivityIconContainer[] = ['none', 'default', 'large'];

export type ActivityIconSize = 'sm' | 'md' | 'lg' | 'xl';
const allowedSizes: ActivityIconSize[] = ['sm', 'md', 'lg', 'xl'];

export type ActivityIconAppearance = 'default' | 'muted';
const allowedAppearances: ActivityIconAppearance[] = ['default', 'muted'];
const allowedCategories: ActivityIconCategory[] = [
  'assessment',
  'collaboration',
  'communication',
  'interactive',
  'other',
  'resource',
];
const iconLookupFallback: ActivityIconName = 'file-unknown';
const customCategoryFallback: ActivityIconCategory = 'other';

// Third-party brand artwork can't be recoloured with tokens and loses its detail
// when masked to a single colour, so these icons have their saturation reduced
// for the muted state instead of using the token overlay.
const mutedFilterFallbackIcons: ActivityIconName[] = ['bigbluebutton', 'h5p'];

export interface ActivityIconProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Activity/resource icon key used to resolve the SVG asset from the registry.
   * Required unless `src` is provided.
   */
  icon?: ActivityIconName;
  /**
   * URL of a custom image, for activities that bring their own artwork (for
   * example an LTI tool or third-party plugin icon). It renders in the same
   * container, size and radius as registry icons and takes precedence over
   * `icon`. The image is inset to match the built-in glyphs and fitted with
   * `object-fit: contain`, so non-square artwork is not distorted. If it fails
   * to load, the generic fallback glyph is shown instead.
   */
  src?: string;
  /**
   * Category tint for the container behind a custom `src` image. Ignored for
   * registry icons, which take their category from the registry.
   * @default 'other'
   */
  category?: ActivityIconCategory;
  /**
   * Accessible text for the rendered image. Use an empty string for decorative
   * icons, which is the right choice for a custom `src` image when the activity
   * type is already conveyed in text beside it.
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
   * (e.g. BigBlueButton, H5P) and custom `src` images can't be recoloured, so
   * they are desaturated instead. The icon remains in the
   * accessibility tree, so convey the hidden state to assistive technology
   * separately.
   */
  appearance?: ActivityIconAppearance;
}

export const ActivityIcon = ({
  icon,
  src,
  category,
  alt = '',
  container,
  size,
  appearance,
  className,
  style,
  ...props
}: ActivityIconProps) => {
  const isCustom = typeof src === 'string' && src !== '';
  const [failedSrc, setFailedSrc] = useState<string | undefined>(undefined);
  // A custom image that fails to load is replaced by the generic glyph.
  const usesCustomSrc = isCustom && failedSrc !== src;

  // TS callers must pass icon or src, but JS consumers can still provide neither at runtime.
  const normalizedIcon = icon?.toLowerCase();
  const hasValidIcon =
    normalizedIcon !== undefined && normalizedIcon in activityIconRegistry;

  if (import.meta.env.DEV && !isCustom && !hasValidIcon) {
    const invalidIconMessage = `[MDS ActivityIcon] Invalid icon "${icon}". Allowed: ${activityIconNames.join(', ')}`;
    console.error(
      `${invalidIconMessage}. Falling back to "${iconLookupFallback}" placeholder.`,
    );
  }

  if (import.meta.env.DEV && isCustom && icon !== undefined) {
    console.warn(
      `[MDS ActivityIcon] Both "src" and "icon" were passed. "src" takes precedence and "icon" is ignored.`,
    );
  }

  if (
    import.meta.env.DEV &&
    category &&
    !allowedCategories.includes(category)
  ) {
    console.warn(
      `[MDS ActivityIcon] Invalid category "${category}". Falling back to "${customCategoryFallback}". Allowed: ${allowedCategories.join(', ')}`,
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

  const resolvedIcon: ActivityIconName =
    hasValidIcon && !isCustom
      ? (normalizedIcon as ActivityIconName)
      : iconLookupFallback;
  const resolvedAppearance =
    appearance && allowedAppearances.includes(appearance)
      ? appearance
      : 'default';
  const resolvedContainer =
    container && allowedContainers.includes(container) ? container : 'default';
  const resolvedSize = size && allowedSizes.includes(size) ? size : 'md';
  const resolvedCategory = usesCustomSrc
    ? category && allowedCategories.includes(category)
      ? category
      : customCategoryFallback
    : activityIconRegistry[resolvedIcon].category;
  const [registrySrc, setRegistrySrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Custom images are loaded by the <img> itself, so there is no chunk to fetch.
    if (usesCustomSrc) {
      return undefined;
    }

    let isMounted = true;
    const { fileName } = activityIconRegistry[resolvedIcon];

    void loadIconSrc(fileName)
      .then((loadedSrc) => {
        if (isMounted) {
          setRegistrySrc(loadedSrc);
        }
      })
      .catch(() => {
        if (isMounted) {
          setRegistrySrc(undefined);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [resolvedIcon, usesCustomSrc]);

  const iconSrc = usesCustomSrc ? src : registrySrc;

  const classes = [
    'mds-activity-icon',
    `mds-activity-icon--${resolvedContainer}`,
    `mds-activity-icon--size-${resolvedSize}`,
    `mds-activity-icon--category-${resolvedCategory}`,
  ];
  const isMuted = resolvedAppearance === 'muted';
  const needsFilterFallback =
    usesCustomSrc || mutedFilterFallbackIcons.includes(resolvedIcon);
  if (isMuted) {
    classes.push(
      needsFilterFallback
        ? 'mds-activity-icon--muted-filter'
        : 'mds-activity-icon--muted',
    );
  }
  if (usesCustomSrc) {
    classes.push('mds-activity-icon--custom');
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
      <img
        alt={alt}
        className="mds-activity-icon__asset"
        onError={usesCustomSrc ? () => setFailedSrc(src) : undefined}
        src={iconSrc}
      />
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

import type { HTMLAttributes } from 'react';
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

export type ActivityIconContainer = 'none' | 'default' | 'large';
const allowedContainers: ActivityIconContainer[] = ['none', 'default', 'large'];

export type ActivityIconSize = 'sm' | 'md' | 'lg' | 'xl';
const allowedSizes: ActivityIconSize[] = ['sm', 'md', 'lg', 'xl'];
const iconLookupFallback: ActivityIconName = 'file-unknown';

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
}

export const ActivityIcon = ({
  icon,
  alt = '',
  container,
  size,
  className,
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

  const resolvedIcon: ActivityIconName = hasValidIcon
    ? (normalizedIcon as ActivityIconName)
    : iconLookupFallback;
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
  if (className) {
    classes.push(className);
  }

  return (
    <span className={classes.join(' ')} {...props}>
      <img alt={alt} className="mds-activity-icon__asset" src={iconSrc} />
    </span>
  );
};

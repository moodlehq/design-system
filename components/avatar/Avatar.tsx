import type { HTMLAttributes } from 'react';
import { forwardRef, useState } from 'react';
import fallbackSrc from './assets/image-fallback.svg';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Visual size of the avatar.
   * xs=16px, sm=24px, md=32px, lg=48px, xl=64px, xxl=96px.
   * Defaults to 'md'.
   */
  size?: AvatarSize;

  /**
   * URL for the avatar photo. When provided, the image is displayed on top of
   * the initials layer. If the image fails to load, the component automatically
   * falls back to displaying the initials.
   */
  imageSrc?: string;

  /**
   * Accessible description of the image passed to the inner `<img>` element.
   * Required when `imageSrc` is provided so screen readers can identify the
   * avatar in image-navigation mode. Use the user's full name (e.g. `"Jane Doe"`).
   * Omit or leave empty when the avatar is purely decorative.
   */
  alt?: string;

  /**
   * 1–2 character string used as the fallback when no `imageSrc` is provided
   * or when the image fails to load. The consuming app is responsible for
   * truncation and locale (e.g. derive from the user's display name).
   */
  initials: string;
}

const allowedSizes: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    { size, imageSrc, alt, initials, className, ...props }: AvatarProps,
    ref,
  ) => {
    const [imgFailed, setImgFailed] = useState(false);

    const sizeValue: AvatarSize =
      size && allowedSizes.includes(size) ? size : 'md';

    // Show the image only when a src is provided and it has not errored.
    const showImage = !!imageSrc && !imgFailed;

    // Show the SVG silhouette when there is no valid image to display and
    // either (a) no initials were supplied, or (b) the size is xs/sm where
    // initials are unsupported per the design spec (CSS also hides them).
    // This prevents a blank grey circle in both the empty-data and image-error
    // states at small sizes.
    const showFallback =
      !showImage && (!initials || sizeValue === 'xs' || sizeValue === 'sm');

    if (import.meta.env.DEV) {
      if (size && !allowedSizes.includes(size)) {
        console.warn(
          `[MDS Avatar] Invalid size "${size}". Falling back to "md". Allowed: ${allowedSizes.join(', ')}`,
        );
      }
      // xs and sm are image-only per the design spec; initials are not supported
      // at these sizes because the container is too small to render them legibly.
      // The SVG silhouette renders automatically as a graceful fallback, but
      // callers should always provide a real imageSrc at these sizes.
      if ((sizeValue === 'xs' || sizeValue === 'sm') && !imageSrc) {
        console.warn(
          `[MDS Avatar] Initials are not supported at size "${sizeValue}". ` +
            'Provide an `imageSrc` or use size "md" or larger. ' +
            'A silhouette placeholder is shown automatically.',
        );
      }
      // When an image is provided it should carry an accessible name so screen
      // readers can identify the avatar in image-navigation mode.
      if (imageSrc && !alt) {
        console.warn(
          "[MDS Avatar] Pass an `alt` prop (e.g. the user's full name) when `imageSrc` is set. " +
            'Omit or leave empty only when the avatar is purely decorative.',
        );
      }
    }

    const classes = ['mds-avatar', `mds-avatar--${sizeValue}`];
    if (className) classes.push(className);

    return (
      <span ref={ref} className={classes.join(' ')} {...props}>
        {/* Initials are always rendered as the base layer and serve as the
          graceful fallback when no imageSrc is passed or the image errors.
          Hidden from AT when the image is showing; visible to AT as plain
          text when acting as the fallback so the initials are announced. */}
        <span className="mds-avatar__initials" aria-hidden={showImage}>
          {(initials ?? '').slice(0, 2)}
        </span>
        {showFallback && (
          // SVG silhouette shown when there is no valid image and no initials,
          // or at xs/sm where initials are always suppressed. Purely decorative.
          <img
            className="mds-avatar__image"
            src={fallbackSrc}
            alt=""
            aria-hidden
          />
        )}
        {showImage && (
          // The image is absolutely positioned over the initials (see avatar.css).
          // onError triggers the graceful fallback: imgFailed is set to true,
          // the image unmounts, and the initials layer becomes visible.
          <img
            className="mds-avatar__image"
            src={imageSrc}
            alt={alt ?? ''}
            onError={() => setImgFailed(true)}
          />
        )}
      </span>
    );
  },
);

Avatar.displayName = 'Avatar';

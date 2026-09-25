import type {
  AnchorHTMLAttributes,
  AriaRole,
  HTMLAttributes,
  MouseEvent,
  Ref,
} from 'react';
import { forwardRef, useRef } from 'react';
import { getNextFocusableElement } from '../_internal/focus';
import type { TagContentAvatar } from '../_internal/TagContent';
import { countTagContentLines, TagContent } from '../_internal/TagContent';
import { CloseButton } from '../close-button';

/**
 * Link-mode colour variant. Deliberately scoped to what Figma/ZeroHeight
 * have actually designed for Tag — `Default` and `Danger` only. Badge
 * shares a wider variant axis (primary/secondary/success/warning/info),
 * but extending Tag to match would ship undesigned states; add to this
 * union only once a variant is built in Figma and documented in ZeroHeight.
 */
export type TagVariant = 'default' | 'danger';

const allowedVariants: readonly TagVariant[] = ['default', 'danger'];

/**
 * Avatar sub-fields accepted by Tag. `size` is deliberately excluded — it's
 * derived from how many text lines are populated. Aliased from the shared
 * content helper so Tag and the future Combobox accept the same shape.
 */
export type TagAvatar = TagContentAvatar;

interface TagSharedProps {
  /** Position 1 — the tag's name/category label. Always rendered first. Required. */
  content: string;

  /** Disables the whole tag. In removable mode this also disables the nested CloseButton. */
  disabled?: boolean;
}

/**
 * Identity fields — removable mode only. Figma/ZeroHeight define Link as a
 * single-line label, so multi-line content would collide with its pill ends.
 */
interface TagIdentityProps {
  /**
   * Position 2 — a short supporting identifier, shown after `content`.
   * Named "Username / short name" in Figma/ZeroHeight: a person's username
   * for a User tag, or a site/tenant's short name for a Tenant tag. Shown
   * before `email` when both are present (divider-separated).
   */
  username?: string;

  /**
   * Position 2 — an email address, shown after `username` (divider-separated
   * when both are present). Person-only per ZeroHeight — omit for Tenant tags.
   */
  email?: string;

  /**
   * Position 3 — institution name only. Renders after Position 2 but its
   * visibility does not depend on it.
   */
  institution?: string;

  /**
   * Optional leading identity avatar. Reuses the MDS Avatar component. Its
   * size scales with how many of the three text lines are populated: `xs`
   * for `content` alone, `md` when one of Position 2 / `institution` is
   * also present, `lg` when all three lines are filled. Always rendered
   * `aria-hidden` — the identity it shows is already conveyed by the
   * visible text alongside it, so exposing its own accessible name would
   * announce the same identity twice.
   */
  avatar?: TagAvatar;
}

/** The two interaction modes a Tag can render. Never both at once. */
export type TagType = 'link' | 'removable';

export interface TagLinkProps
  extends
    TagSharedProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'content'> {
  /** Discriminant — selects the link-mode prop shape. Renders a real `<a>`. */
  type: Extract<TagType, 'link'>;
  /** Destination URL. Required — link mode always renders a real `<a>`. */
  href: string;
  /**
   * Colour variant. Link mode only — removable mode has no colour axis and
   * always renders its neutral surface. When omitted, renders as `default`.
   */
  variant?: TagVariant;
}

export interface TagRemovableProps
  extends
    TagSharedProps,
    TagIdentityProps,
    Omit<HTMLAttributes<HTMLSpanElement>, 'content'> {
  /** Discriminant — selects the removable-mode prop shape. Renders a `<span>` with a nested CloseButton. */
  type: Extract<TagType, 'removable'>;
  /**
   * Callback fired when the nested CloseButton is activated. Removable mode
   * always renders the CloseButton — ZeroHeight treats it as required, and a
   * value the user can't remove should use Badge or plain text instead. The
   * non-removable identity layout used by Combobox rows is shared through
   * `_internal/TagContent` rather than a Tag prop (see the reasoning there).
   */
  onRemove: (event: MouseEvent<HTMLButtonElement>) => void;
  /**
   * Accessible name passed to the nested CloseButton, e.g. "Remove Ana Silva".
   * Must include the tag's label — a bare "Remove" is not sufficient.
   * Required because CloseButton's own `aria-label` is required.
   */
  removeLabel: string;
}

/** The strongly-typed shape used for all internal destructuring/Omit logic. */
type TagKnownProps = TagLinkProps | TagRemovableProps;

/**
 * Public prop type — a plain alias for the discriminated union. `type`
 * determines which of `TagLinkProps`/`TagRemovableProps` applies, so e.g.
 * `href` and `onRemove` can never both be valid on the same call site.
 */
export type TagProps = TagKnownProps;

/**
 * Scales the removable-mode surface (radius/padding/gap) with the same
 * filled-lines count the shared content helper uses to size the avatar,
 * matching the Figma/ZeroHeight content-density spec: `sm` radius for the
 * label alone, `md` once a second line (Position 2 or institution) is added,
 * `lg` once all three lines are filled. Figma never built a
 * Position-2-less "content + institution only" state, so institution isn't
 * treated as special — content + institution alone is a 2-line tag, same as
 * content + username alone. Link mode is unaffected — it's always
 * pill-shaped regardless of content.
 */
const densityByLines = { 1: 'sm', 2: 'md', 3: 'lg' } as const;

const resolveVariant = (
  variant: string | undefined,
  componentLabel: string,
): TagVariant | undefined => {
  if (!variant) return undefined;
  if (allowedVariants.includes(variant as TagVariant)) {
    return variant as TagVariant;
  }
  if (import.meta.env.DEV) {
    console.warn(
      `[MDS Tag] Invalid variant "${variant}" on ${componentLabel}. Ignoring — no variant modifier applied. Allowed: ${allowedVariants.join(', ')}`,
    );
  }
  return undefined;
};

export const Tag = forwardRef<HTMLAnchorElement | HTMLSpanElement, TagProps>(
  (rawProps, ref) => {
    const props = rawProps as unknown as TagKnownProps;
    // Called before the link/removable branch so hook order stays stable
    // if a consumer switches `type` between renders.
    const removableRef = useRef<HTMLSpanElement | null>(null);
    const { content, disabled = false, className, type, ...rest } = props;

    if (import.meta.env.DEV && type !== 'link' && type !== 'removable') {
      console.warn(
        `[MDS Tag] Invalid type "${type}". Falling back to "removable". Allowed: link, removable`,
      );
    }
    const resolvedType: TagType = type === 'link' ? 'link' : 'removable';

    if (resolvedType === 'link') {
      // Identity fields aren't part of the link contract, but JS consumers
      // can still pass them — pull them out so they never reach the <a>.
      const {
        href,
        variant,
        onClick,
        tabIndex,
        role,
        username,
        email,
        institution,
        avatar,
        ...domProps
      } = rest as Omit<TagLinkProps, keyof TagSharedProps | 'type'> &
        TagIdentityProps;
      if (import.meta.env.DEV && (username || email || institution || avatar)) {
        console.warn(
          '[MDS Tag] "username", "email", "institution" and "avatar" are removable mode only. Ignoring them in link mode.',
        );
      }
      const resolvedVariant = resolveVariant(variant, 'Tag');

      const classes = ['mds-tag', 'mds-tag--link'];
      // 'default' needs no modifier class — the base .mds-tag--link rule
      // already renders it; only 'danger' has a dedicated class in tag.css.
      if (resolvedVariant && resolvedVariant !== 'default') {
        classes.push(`mds-tag--${resolvedVariant}`);
      }
      if (disabled) classes.push('mds-tag--disabled');
      if (className) classes.push(className);

      const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        if (disabled) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        onClick?.(event);
      };

      return (
        <a
          ref={ref as Ref<HTMLAnchorElement>}
          className={classes.join(' ')}
          href={disabled ? undefined : href}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : tabIndex}
          role={
            disabled
              ? ((role as AriaRole | undefined) ?? 'link')
              : (role as AriaRole | undefined)
          }
          onClick={handleClick}
          {...domProps}
        >
          <TagContent content={content} />
        </a>
      );
    }

    const {
      username,
      email,
      institution,
      avatar,
      onRemove,
      removeLabel,
      ...domProps
    } = rest as Omit<TagRemovableProps, keyof TagSharedProps | 'type'>;

    const density =
      densityByLines[countTagContentLines({ username, email, institution })];

    const setRemovableRef = (node: HTMLSpanElement | null) => {
      removableRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    const handleRemove = (event: MouseEvent<HTMLButtonElement>) => {
      const root = removableRef.current;
      const nextFocusableElement = getNextFocusableElement(
        root,
        document.activeElement,
      );

      onRemove(event);

      // Removal is consumer-owned, so only step in once the tag has actually
      // unmounted and left focus stranded on <body>. A consumer that moves
      // focus itself (e.g. back to a chip input's field) is never overridden.
      requestAnimationFrame(() => {
        if (
          root &&
          !root.isConnected &&
          nextFocusableElement?.isConnected &&
          (document.activeElement === document.body ||
            document.activeElement === null)
        ) {
          nextFocusableElement.focus();
        }
      });
    };

    const classes = ['mds-tag', 'mds-tag--removable'];
    if (density !== 'sm') classes.push(`mds-tag--density-${density}`);
    if (disabled) classes.push('mds-tag--disabled');
    if (className) classes.push(className);

    return (
      <span ref={setRemovableRef} className={classes.join(' ')} {...domProps}>
        <TagContent
          content={content}
          username={username}
          email={email}
          institution={institution}
          avatar={avatar}
        />
        <CloseButton
          size="sm"
          aria-label={removeLabel}
          onClick={handleRemove}
          disabled={disabled}
          className="mds-tag__remove"
        />
      </span>
    );
  },
);

Tag.displayName = 'Tag';

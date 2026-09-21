import type {
  AnchorHTMLAttributes,
  AriaRole,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  Ref,
} from 'react';
import { forwardRef } from 'react';
import type { AvatarProps, AvatarSize } from '../avatar';
import { Avatar } from '../avatar';
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
 * Avatar sub-fields accepted by Tag. Derived from `AvatarProps` so it stays
 * in sync with Avatar's own contract. `size` is deliberately excluded —
 * Tag derives it itself from how many text lines are populated (see
 * `resolveAvatarSize`).
 */
export type TagAvatar = Pick<AvatarProps, 'imageSrc' | 'alt' | 'initials'>;

interface TagSharedProps {
  /** Position 1 — the tag's name/category label. Always rendered first. Required. */
  content: string;

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

  /**
   * Disables the whole tag. In removable mode this also disables the nested
   * CloseButton. Has no effect when `nonRemovable` is set — a non-removable
   * tag has no interactive element left to disable, so the combination is
   * ignored (with a dev-mode warning) rather than rendered.
   */
  disabled?: boolean;
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
  extends TagSharedProps, Omit<HTMLAttributes<HTMLSpanElement>, 'content'> {
  /** Discriminant — selects the removable-mode prop shape. Renders a `<span>` with a nested CloseButton. */
  type: Extract<TagType, 'removable'>;
  /** Callback fired when the nested CloseButton is activated. */
  onRemove: (event: MouseEvent<HTMLButtonElement>) => void;
  /**
   * Accessible name passed to the nested CloseButton, e.g. "Remove Ana Silva".
   * Must include the tag's label — a bare "Remove" is not sufficient.
   * Required because CloseButton's own `aria-label` is required.
   */
  removeLabel: string;
  /**
   * When true, renders no CloseButton at all — the value is fixed and
   * cannot be removed. Not combinable with `disabled` — see its doc comment.
   */
  nonRemovable?: boolean;
  /** Marks the tag's value as failing validation after selection. */
  invalid?: boolean;
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
 * Scales the leading avatar with how many of the three text lines are
 * populated — `content` is always present, so this only varies with
 * whether Position 2 and/or `institution` are also filled.
 */
const resolveAvatarSize = (
  hasSupportingText: boolean,
  hasInstitution: boolean,
): AvatarSize => {
  const filledLines =
    1 + (hasSupportingText ? 1 : 0) + (hasInstitution ? 1 : 0);
  if (filledLines >= 3) return 'lg';
  if (filledLines === 2) return 'md';
  return 'xs';
};

/**
 * Scales the removable-mode surface (radius/padding/gap) with the same
 * filled-lines count as `resolveAvatarSize`, matching the Figma/ZeroHeight
 * content-density spec: `sm` radius for the label alone, `md` once a second
 * line (Position 2 or institution) is added, `lg` once all three lines are
 * filled. Figma never actually built a Position-2-less "content +
 * institution only" state, so this deliberately mirrors `resolveAvatarSize`'s
 * line-count logic rather than treating `institution` as special — content
 * + institution alone is a 2-line tag, same as content + username alone.
 * Link mode is unaffected — it's always pill-shaped regardless of content.
 */
const resolveDensity = (
  hasSupportingText: boolean,
  hasInstitution: boolean,
): 'sm' | 'md' | 'lg' => {
  const filledLines =
    1 + (hasSupportingText ? 1 : 0) + (hasInstitution ? 1 : 0);
  if (filledLines >= 3) return 'lg';
  if (filledLines === 2) return 'md';
  return 'sm';
};

const renderAvatar = (avatar: TagAvatar | undefined, size: AvatarSize) =>
  avatar ? (
    <Avatar
      size={size}
      imageSrc={avatar.imageSrc}
      alt={avatar.alt}
      initials={avatar.initials}
      className="mds-tag__avatar"
      aria-hidden="true"
    />
  ) : null;

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

/**
 * Renders the three stacked lines: line 1 is `content`, line 2 is the
 * Position 2 bucket (its own items divider-separated when there's more
 * than one), and line 3 is `institution` — visible independently of
 * whether line 2 has any content.
 */
const TagBody = ({
  content,
  supportingText,
  institution,
}: {
  content: string;
  supportingText: string[];
  institution?: string;
}) => {
  const supportingItems: ReactNode[] = [];
  supportingText.forEach((text, index) => {
    if (index > 0) {
      supportingItems.push(
        <span
          key={`divider-${index}`}
          className="mds-tag__divider"
          aria-hidden="true"
        />,
      );
    }
    supportingItems.push(
      <span key={`supporting-${index}`} className="mds-tag__supporting-text">
        {text}
      </span>,
    );
  });

  return (
    <span className="mds-tag__content">
      <span className="mds-tag__name">{content}</span>
      {supportingItems.length > 0 && (
        <span className="mds-tag__supporting-row">{supportingItems}</span>
      )}
      {institution && (
        <span className="mds-tag__institution">{institution}</span>
      )}
    </span>
  );
};

export const Tag = forwardRef<HTMLAnchorElement | HTMLSpanElement, TagProps>(
  (rawProps, ref) => {
    const props = rawProps as unknown as TagKnownProps;
    const {
      content,
      username,
      email,
      institution,
      avatar,
      disabled = false,
      className,
      type,
      ...rest
    } = props;

    const supportingText = [username, email].filter((value): value is string =>
      Boolean(value),
    );

    if (import.meta.env.DEV && type !== 'link' && type !== 'removable') {
      console.warn(
        `[MDS Tag] Invalid type "${type}". Falling back to "removable". Allowed: link, removable`,
      );
    }
    const resolvedType: TagType = type === 'link' ? 'link' : 'removable';

    if (resolvedType === 'link') {
      const { href, variant, onClick, tabIndex, role, ...domProps } =
        rest as Omit<TagLinkProps, keyof TagSharedProps | 'type'>;
      const resolvedVariant = resolveVariant(variant, 'Tag');
      const avatarNode = renderAvatar(
        avatar,
        resolveAvatarSize(supportingText.length > 0, !!institution),
      );

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
          {avatarNode}
          <TagBody
            content={content}
            supportingText={supportingText}
            institution={institution}
          />
        </a>
      );
    }

    const {
      onRemove,
      removeLabel,
      nonRemovable = false,
      invalid = false,
      ...domProps
    } = rest as Omit<TagRemovableProps, keyof TagSharedProps | 'type'>;

    // A non-removable tag has no CloseButton and its body is already inert,
    // so there's nothing left for `disabled` to disable — the combination
    // isn't a valid state. Ignore `disabled` rather than rendering a
    // disabled-looking tag with no interactive element underneath it.
    if (import.meta.env.DEV && nonRemovable && disabled) {
      console.warn(
        '[MDS Tag] "disabled" has no effect when "nonRemovable" is set — a non-removable tag has no interactive element to disable. Ignoring "disabled".',
      );
    }
    const effectiveDisabled = nonRemovable ? false : disabled;

    const avatarNode = renderAvatar(
      avatar,
      resolveAvatarSize(supportingText.length > 0, !!institution),
    );
    const density = resolveDensity(supportingText.length > 0, !!institution);

    const classes = ['mds-tag', 'mds-tag--removable'];
    if (density !== 'sm') classes.push(`mds-tag--density-${density}`);
    if (effectiveDisabled) classes.push('mds-tag--disabled');
    if (nonRemovable) classes.push('mds-tag--non-removable');
    if (invalid) classes.push('is-invalid');
    if (className) classes.push(className);

    return (
      <span
        ref={ref as Ref<HTMLSpanElement>}
        className={classes.join(' ')}
        aria-invalid={invalid || undefined}
        {...domProps}
      >
        {avatarNode}
        <TagBody
          content={content}
          supportingText={supportingText}
          institution={institution}
        />
        {!nonRemovable && (
          <CloseButton
            size="sm"
            aria-label={removeLabel}
            onClick={onRemove}
            disabled={effectiveDisabled}
            className="mds-tag__remove"
          />
        )}
      </span>
    );
  },
);

Tag.displayName = 'Tag';

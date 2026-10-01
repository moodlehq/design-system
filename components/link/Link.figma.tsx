import figma from '@figma/code-connect';
import { Link } from './Link';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=10843-763';

const variantProps = {
  variant: figma.enum('Variant', {
    Primary: 'primary',
    Secondary: 'secondary',
    Inline: 'inline',
  }),
};

const linkLabel = 'Label';
const linkHref = '#';

// NOTE: figma.connect() calls must use literal variant values - Code Connect
// statically parses this file rather than executing it, so blocks are unrolled.
//
// One connection per Variant x State x Link combination. Hover, pressed and
// focus are interaction states with no code prop, so they share the default
// snippet; only disabled adds a prop. `disabled` is written into the JSX only
// when it is on.

figma.connect(Link, url, {
  variant: { Variant: 'Primary', State: 'default', Link: 'none' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link label={linkLabel} href={linkHref} variant={variant} />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Primary', State: 'hover', Link: 'none' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link label={linkLabel} href={linkHref} variant={variant} />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Primary', State: 'pressed', Link: 'none' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link label={linkLabel} href={linkHref} variant={variant} />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Primary', State: 'focus', Link: 'none' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link label={linkLabel} href={linkHref} variant={variant} />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Primary', State: 'disabled', Link: 'none' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link label={linkLabel} href={linkHref} variant={variant} disabled />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Primary', State: 'default', Link: 'startIcon' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      startIcon={<i className="fa-solid fa-arrow-left" />}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Primary', State: 'hover', Link: 'startIcon' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      startIcon={<i className="fa-solid fa-arrow-left" />}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Primary', State: 'pressed', Link: 'startIcon' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      startIcon={<i className="fa-solid fa-arrow-left" />}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Primary', State: 'focus', Link: 'startIcon' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      startIcon={<i className="fa-solid fa-arrow-left" />}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Primary', State: 'disabled', Link: 'startIcon' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      disabled
      startIcon={<i className="fa-solid fa-arrow-left" />}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Primary', State: 'default', Link: 'endIcon' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      endIcon={<i className="fa-solid fa-arrow-right" />}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Primary', State: 'hover', Link: 'endIcon' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      endIcon={<i className="fa-solid fa-arrow-right" />}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Primary', State: 'pressed', Link: 'endIcon' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      endIcon={<i className="fa-solid fa-arrow-right" />}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Primary', State: 'focus', Link: 'endIcon' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      endIcon={<i className="fa-solid fa-arrow-right" />}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Primary', State: 'disabled', Link: 'endIcon' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      disabled
      endIcon={<i className="fa-solid fa-arrow-right" />}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Secondary', State: 'default', Link: 'none' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link label={linkLabel} href={linkHref} variant={variant} />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Secondary', State: 'hover', Link: 'none' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link label={linkLabel} href={linkHref} variant={variant} />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Secondary', State: 'pressed', Link: 'none' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link label={linkLabel} href={linkHref} variant={variant} />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Secondary', State: 'focus', Link: 'none' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link label={linkLabel} href={linkHref} variant={variant} />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Secondary', State: 'disabled', Link: 'none' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link label={linkLabel} href={linkHref} variant={variant} disabled />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Secondary', State: 'default', Link: 'startIcon' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      startIcon={<i className="fa-solid fa-arrow-left" />}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Secondary', State: 'hover', Link: 'startIcon' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      startIcon={<i className="fa-solid fa-arrow-left" />}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Secondary', State: 'pressed', Link: 'startIcon' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      startIcon={<i className="fa-solid fa-arrow-left" />}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Secondary', State: 'focus', Link: 'startIcon' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      startIcon={<i className="fa-solid fa-arrow-left" />}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Secondary', State: 'disabled', Link: 'startIcon' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      disabled
      startIcon={<i className="fa-solid fa-arrow-left" />}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Secondary', State: 'default', Link: 'endIcon' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      endIcon={<i className="fa-solid fa-arrow-right" />}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Secondary', State: 'hover', Link: 'endIcon' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      endIcon={<i className="fa-solid fa-arrow-right" />}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Secondary', State: 'pressed', Link: 'endIcon' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      endIcon={<i className="fa-solid fa-arrow-right" />}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Secondary', State: 'focus', Link: 'endIcon' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      endIcon={<i className="fa-solid fa-arrow-right" />}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Secondary', State: 'disabled', Link: 'endIcon' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      disabled
      endIcon={<i className="fa-solid fa-arrow-right" />}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Inline', State: 'default', Link: 'none' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link label={linkLabel} href={linkHref} variant={variant} />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Inline', State: 'hover', Link: 'none' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link label={linkLabel} href={linkHref} variant={variant} />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Inline', State: 'pressed', Link: 'none' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link label={linkLabel} href={linkHref} variant={variant} />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Inline', State: 'focus', Link: 'none' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link label={linkLabel} href={linkHref} variant={variant} />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Inline', State: 'disabled', Link: 'none' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link label={linkLabel} href={linkHref} variant={variant} disabled />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Inline', State: 'default', Link: 'endIcon' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      endIcon={<i className="fa-solid fa-arrow-up-right-from-square" />}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Inline', State: 'hover', Link: 'endIcon' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      endIcon={<i className="fa-solid fa-arrow-up-right-from-square" />}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Inline', State: 'pressed', Link: 'endIcon' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      endIcon={<i className="fa-solid fa-arrow-up-right-from-square" />}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Inline', State: 'focus', Link: 'endIcon' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      endIcon={<i className="fa-solid fa-arrow-up-right-from-square" />}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Inline', State: 'disabled', Link: 'endIcon' },
  props: { ...variantProps },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      disabled
      endIcon={<i className="fa-solid fa-arrow-up-right-from-square" />}
    />
  ),
});

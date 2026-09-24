import figma from '@figma/code-connect';
import { Link } from './Link';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=10843-763';

const variant = figma.enum('Variant', {
  Primary: 'primary',
  Secondary: 'secondary',
  Inline: 'inline',
});

const linkLabel = 'Label';
const linkHref = '#';

// NOTE: figma.connect() calls must use literal variant values - Code Connect
// statically parses this file rather than executing it, so loop variables
// cannot be used as variant values. Blocks below are unrolled accordingly.

figma.connect(Link, url, {
  variant: { Variant: 'Primary', State: 'default', Link: 'none' },
  props: { variant: variant },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      disabled={false}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Primary', State: 'hover', Link: 'none' },
  props: { variant: variant },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      disabled={false}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Primary', State: 'pressed', Link: 'none' },
  props: { variant: variant },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      disabled={false}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Primary', State: 'focus', Link: 'none' },
  props: { variant: variant },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      disabled={false}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Primary', State: 'disabled', Link: 'none' },
  props: { variant: variant },
  example: ({ variant }) => (
    <Link label={linkLabel} href={linkHref} variant={variant} disabled={true} />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Secondary', State: 'default', Link: 'none' },
  props: { variant: variant },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      disabled={false}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Secondary', State: 'hover', Link: 'none' },
  props: { variant: variant },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      disabled={false}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Secondary', State: 'pressed', Link: 'none' },
  props: { variant: variant },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      disabled={false}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Secondary', State: 'focus', Link: 'none' },
  props: { variant: variant },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      disabled={false}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Secondary', State: 'disabled', Link: 'none' },
  props: { variant: variant },
  example: ({ variant }) => (
    <Link label={linkLabel} href={linkHref} variant={variant} disabled={true} />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Primary', State: 'default', Link: 'startIcon' },
  props: { variant: variant },
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
  variant: { Variant: 'Primary', State: 'default', Link: 'endIcon' },
  props: { variant: variant },
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
  variant: { Variant: 'Secondary', State: 'default', Link: 'startIcon' },
  props: { variant: variant },
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
  variant: { Variant: 'Secondary', State: 'default', Link: 'endIcon' },
  props: { variant: variant },
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
  variant: { Variant: 'Inline', State: 'default', Link: 'none' },
  props: { variant: variant },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      disabled={false}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Inline', State: 'default', Link: 'endIcon' },
  props: { variant: variant },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      disabled={false}
      endIcon={<i className="fa-solid fa-arrow-up-right-from-square" />}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Inline', State: 'hover', Link: 'none' },
  props: { variant: variant },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      disabled={false}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Inline', State: 'hover', Link: 'endIcon' },
  props: { variant: variant },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      disabled={false}
      endIcon={<i className="fa-solid fa-arrow-up-right-from-square" />}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Inline', State: 'pressed', Link: 'none' },
  props: { variant: variant },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      disabled={false}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Inline', State: 'pressed', Link: 'endIcon' },
  props: { variant: variant },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      disabled={false}
      endIcon={<i className="fa-solid fa-arrow-up-right-from-square" />}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Inline', State: 'focus', Link: 'none' },
  props: { variant: variant },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      disabled={false}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Inline', State: 'focus', Link: 'endIcon' },
  props: { variant: variant },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      disabled={false}
      endIcon={<i className="fa-solid fa-arrow-up-right-from-square" />}
    />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Inline', State: 'disabled', Link: 'none' },
  props: { variant: variant },
  example: ({ variant }) => (
    <Link label={linkLabel} href={linkHref} variant={variant} disabled={true} />
  ),
});

figma.connect(Link, url, {
  variant: { Variant: 'Inline', State: 'disabled', Link: 'endIcon' },
  props: { variant: variant },
  example: ({ variant }) => (
    <Link
      label={linkLabel}
      href={linkHref}
      variant={variant}
      disabled={true}
      endIcon={<i className="fa-solid fa-arrow-up-right-from-square" />}
    />
  ),
});

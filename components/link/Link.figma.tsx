import figma from '@figma/code-connect';
import { Link } from './Link';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=10843-763';

const variant = figma.enum('Variant', {
  Primary: 'primary',
  Secondary: 'secondary',
});

const linkLabel = 'Label';
const linkHref = '#';

figma.connect(Link, url, {
  variant: { State: 'default', Link: 'none' },
  props: { variant: variant },
  example: ({ variant }) => (
    <Link label={linkLabel} href={linkHref} variant={variant} />
  ),
});

figma.connect(Link, url, {
  variant: { State: 'hover', Link: 'none' },
  props: { variant: variant },
  example: ({ variant }) => (
    <Link label={linkLabel} href={linkHref} variant={variant} />
  ),
});

figma.connect(Link, url, {
  variant: { State: 'pressed', Link: 'none' },
  props: { variant: variant },
  example: ({ variant }) => (
    <Link label={linkLabel} href={linkHref} variant={variant} />
  ),
});

figma.connect(Link, url, {
  variant: { State: 'focus', Link: 'none' },
  props: { variant: variant },
  example: ({ variant }) => (
    <Link label={linkLabel} href={linkHref} variant={variant} />
  ),
});

figma.connect(Link, url, {
  variant: { State: 'disabled', Link: 'none' },
  props: { variant: variant },
  example: ({ variant }) => (
    <Link label={linkLabel} href={linkHref} variant={variant} disabled />
  ),
});

figma.connect(Link, url, {
  variant: { State: 'default', Link: 'startIcon' },
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
  variant: { State: 'default', Link: 'endIcon' },
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

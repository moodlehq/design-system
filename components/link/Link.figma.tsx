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

const states = ['default', 'hover', 'pressed', 'focus', 'disabled'] as const;
const standardVariants = ['Primary', 'Secondary'] as const;

for (const selectedVariant of standardVariants) {
  for (const state of states) {
    figma.connect(Link, url, {
      variant: { Variant: selectedVariant, State: state, Link: 'none' },
      props: { variant: variant },
      example: ({ variant }) => (
        <Link
          label={linkLabel}
          href={linkHref}
          variant={variant}
          disabled={state === 'disabled'}
        />
      ),
    });
  }
}

for (const selectedVariant of standardVariants) {
  figma.connect(Link, url, {
    variant: { Variant: selectedVariant, State: 'default', Link: 'startIcon' },
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
    variant: { Variant: selectedVariant, State: 'default', Link: 'endIcon' },
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
}

for (const state of states) {
  figma.connect(Link, url, {
    variant: { Variant: 'Inline', State: state, Link: 'none' },
    props: { variant: variant },
    example: ({ variant }) => (
      <Link
        label={linkLabel}
        href={linkHref}
        variant={variant}
        disabled={state === 'disabled'}
      />
    ),
  });

  figma.connect(Link, url, {
    variant: { Variant: 'Inline', State: state, Link: 'endIcon' },
    props: { variant: variant },
    example: ({ variant }) => (
      <Link
        label={linkLabel}
        href={linkHref}
        variant={variant}
        disabled={state === 'disabled'}
        endIcon={<i className="fa-solid fa-arrow-up-right-from-square" />}
      />
    ),
  });
}

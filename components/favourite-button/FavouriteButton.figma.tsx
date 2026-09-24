import figma from '@figma/code-connect';
import { FavouriteButton } from './FavouriteButton';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=10508-2297';

const selected = figma.boolean('Selected', {
  true: true,
  false: false,
});

// NOTE: figma.connect() calls must use literal variant values - Code Connect
// statically parses this file rather than executing it, so a loop variable
// (e.g. from Array.forEach) cannot be used as a variant value.

figma.connect(FavouriteButton, url, {
  variant: { State: 'Default', Selected: 'False' },
  props: { selected: selected },
  example: () => <FavouriteButton aria-label="Add to favourites" />,
});

figma.connect(FavouriteButton, url, {
  variant: { State: 'Default', Selected: 'True' },
  props: { selected: selected },
  example: () => (
    <FavouriteButton aria-label="Remove from favourites" selected />
  ),
});

figma.connect(FavouriteButton, url, {
  variant: { State: 'Focus', Selected: 'False' },
  props: { selected: selected },
  example: () => <FavouriteButton aria-label="Add to favourites" />,
});

figma.connect(FavouriteButton, url, {
  variant: { State: 'Focus', Selected: 'True' },
  props: { selected: selected },
  example: () => (
    <FavouriteButton aria-label="Remove from favourites" selected />
  ),
});

figma.connect(FavouriteButton, url, {
  variant: { State: 'Hover', Selected: 'False' },
  props: { selected: selected },
  example: () => <FavouriteButton aria-label="Add to favourites" />,
});

figma.connect(FavouriteButton, url, {
  variant: { State: 'Hover', Selected: 'True' },
  props: { selected: selected },
  example: () => (
    <FavouriteButton aria-label="Remove from favourites" selected />
  ),
});

figma.connect(FavouriteButton, url, {
  variant: { State: 'Pressed', Selected: 'False' },
  props: { selected: selected },
  example: () => <FavouriteButton aria-label="Add to favourites" />,
});

figma.connect(FavouriteButton, url, {
  variant: { State: 'Pressed', Selected: 'True' },
  props: { selected: selected },
  example: () => (
    <FavouriteButton aria-label="Remove from favourites" selected />
  ),
});

figma.connect(FavouriteButton, url, {
  variant: { State: 'Disabled', Selected: 'False' },
  props: { selected: selected },
  example: () => <FavouriteButton aria-label="Add to favourites" disabled />,
});

figma.connect(FavouriteButton, url, {
  variant: { State: 'Disabled', Selected: 'True' },
  props: { selected: selected },
  example: () => (
    <FavouriteButton aria-label="Remove from favourites" selected disabled />
  ),
});

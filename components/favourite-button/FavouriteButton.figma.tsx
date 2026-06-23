import figma from '@figma/code-connect';
import { FavouriteButton } from './FavouriteButton';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=10508-2297';

const selected = figma.boolean('Selected', {
  true: true,
  false: false,
});

const interactiveStates = ['Default', 'Focus', 'Hover', 'Pressed'];

interactiveStates.forEach((state) => {
  figma.connect(FavouriteButton, url, {
    variant: { State: state, Selected: 'False' },
    props: { selected },
    example: () => <FavouriteButton aria-label="Add to favourites" />,
  });

  figma.connect(FavouriteButton, url, {
    variant: { State: state, Selected: 'True' },
    props: { selected },
    example: () => (
      <FavouriteButton aria-label="Remove from favourites" selected />
    ),
  });
});

figma.connect(FavouriteButton, url, {
  variant: { State: 'Disabled', Selected: 'False' },
  props: { selected },
  example: () => <FavouriteButton aria-label="Add to favourites" disabled />,
});

figma.connect(FavouriteButton, url, {
  variant: { State: 'Disabled', Selected: 'True' },
  props: { selected },
  example: () => (
    <FavouriteButton aria-label="Remove from favourites" selected disabled />
  ),
});

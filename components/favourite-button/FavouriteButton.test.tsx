import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { FavouriteButton } from './FavouriteButton';

describe('FavouriteButton: Unit Test', () => {
  describe('class names', () => {
    it('always applies the mds-favourite-button class', () => {
      render(<FavouriteButton aria-label="Add to favourites" />);
      expect(
        screen.getByRole('button', { name: 'Add to favourites' }),
      ).toHaveClass('mds-favourite-button');
    });

    it('applies the selected modifier class when selected', () => {
      render(<FavouriteButton aria-label="Remove from favourites" selected />);
      expect(
        screen.getByRole('button', { name: 'Remove from favourites' }),
      ).toHaveClass('mds-favourite-button--selected');
    });

    it('does not apply the selected modifier class when unselected', () => {
      render(<FavouriteButton aria-label="Add to favourites" />);
      expect(
        screen.getByRole('button', { name: 'Add to favourites' }),
      ).not.toHaveClass('mds-favourite-button--selected');
    });

    it('appends consumer className after the mds classes', () => {
      render(
        <FavouriteButton
          aria-label="Add to favourites"
          className="my-custom-class"
        />,
      );
      const btn = screen.getByRole('button', { name: 'Add to favourites' });
      const classes = btn.getAttribute('class') ?? '';
      expect(classes.indexOf('mds-favourite-button')).toBeLessThan(
        classes.indexOf('my-custom-class'),
      );
    });
  });

  describe('aria attributes', () => {
    it('uses the provided aria-label as the accessible name', () => {
      render(<FavouriteButton aria-label="Add to favourites" />);
      expect(
        screen.getByRole('button', { name: 'Add to favourites' }),
      ).toBeInTheDocument();
    });

    it('sets aria-pressed=false when unselected', () => {
      render(<FavouriteButton aria-label="Add to favourites" />);
      expect(
        screen.getByRole('button', { name: 'Add to favourites' }),
      ).toHaveAttribute('aria-pressed', 'false');
    });

    it('sets aria-pressed=true when selected', () => {
      render(<FavouriteButton aria-label="Remove from favourites" selected />);
      expect(
        screen.getByRole('button', { name: 'Remove from favourites' }),
      ).toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('icon rendering', () => {
    it('renders the decorative icon when unselected', () => {
      render(<FavouriteButton aria-label="Add to favourites" />);
      const icon = document.querySelector('.mds-favourite-button__icon')!;
      expect(icon).toBeInTheDocument();
    });

    it('renders the decorative icon when selected', () => {
      render(<FavouriteButton aria-label="Remove from favourites" selected />);
      const icon = document.querySelector('.mds-favourite-button__icon')!;
      expect(icon).toBeInTheDocument();
    });

    it('marks the icon as decorative (aria-hidden)', () => {
      render(<FavouriteButton aria-label="Add to favourites" />);
      const icon = document.querySelector('.mds-favourite-button__icon')!;
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('button element', () => {
    it('defaults button type to button to avoid implicit form submission', () => {
      render(<FavouriteButton aria-label="Add to favourites" />);
      expect(
        screen.getByRole('button', { name: 'Add to favourites' }),
      ).toHaveAttribute('type', 'button');
    });

    it('respects disabled prop', () => {
      render(<FavouriteButton aria-label="Add to favourites" disabled />);
      expect(
        screen.getByRole('button', { name: 'Add to favourites' }),
      ).toBeDisabled();
    });

    it('forwards extra props to the button element', () => {
      render(
        <FavouriteButton
          aria-label="Add to favourites"
          data-testid="fav-btn"
        />,
      );
      expect(
        screen.getByRole('button', { name: 'Add to favourites' }),
      ).toHaveAttribute('data-testid', 'fav-btn');
    });

    it('forwards onClick to the button element', () => {
      const handleClick = vi.fn();
      render(
        <FavouriteButton
          aria-label="Add to favourites"
          onClick={handleClick}
        />,
      );
      fireEvent.click(
        screen.getByRole('button', { name: 'Add to favourites' }),
      );
      expect(handleClick).toHaveBeenCalledOnce();
    });
  });

  describe('ref forwarding', () => {
    it('forwards a ref to the underlying button element', () => {
      const ref = createRef<HTMLButtonElement>();
      render(<FavouriteButton aria-label="Add to favourites" ref={ref} />);
      expect(ref.current).toBe(
        screen.getByRole('button', { name: 'Add to favourites' }),
      );
    });
  });
});

import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { DropdownTrigger } from './DropdownTrigger';

describe('DropdownTrigger: Unit Test', () => {
  describe('rendering', () => {
    it('applies the mds-dropdown-trigger class name', () => {
      render(<DropdownTrigger label="Label" />);
      expect(screen.getByRole('button')).toHaveClass('mds-dropdown-trigger');
    });

    it('renders the label and a chevron', () => {
      const { container } = render(<DropdownTrigger label="Open menu" />);
      expect(screen.getByRole('button')).toHaveTextContent('Open menu');
      expect(
        container.querySelector('.mds-dropdown-trigger__chevron'),
      ).toBeInTheDocument();
    });

    it('sets menu popup semantics', () => {
      render(<DropdownTrigger label="Label" />);
      const trigger = screen.getByRole('button');
      expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('reflects the open state on aria-expanded and the open class', () => {
      render(<DropdownTrigger label="Label" open />);
      const trigger = screen.getByRole('button');
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(trigger).toHaveClass('mds-dropdown-trigger--open');
    });

    it('renders as disabled when disabled is true', () => {
      render(<DropdownTrigger label="Label" disabled />);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('appearance', () => {
    it.each([
      ['emphasis', 'btn-secondary'],
      ['default', 'btn-outline-secondary'],
      ['subtle', 'btn-ghost'],
    ] as const)(
      'maps appearance "%s" to the %s Button class',
      (appearance, expectedClass) => {
        render(<DropdownTrigger label="Label" appearance={appearance} />);
        expect(screen.getByRole('button')).toHaveClass(expectedClass);
      },
    );

    it('falls back to default and warns in development for an invalid appearance', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(
        <DropdownTrigger
          label="Label"
          // @ts-expect-error — runtime validation path for JS consumers
          appearance="invalid"
        />,
      );
      expect(screen.getByRole('button')).toHaveClass('btn-outline-secondary');
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('[MDS DropdownTrigger] Invalid appearance'),
      );
      warnSpy.mockRestore();
    });
  });

  describe('size', () => {
    it('applies the size class', () => {
      render(<DropdownTrigger label="Label" size="sm" />);
      expect(screen.getByRole('button')).toHaveClass('mds-btn--size-sm');
    });

    it('uses the small chevron for sm triggers', () => {
      const { container } = render(<DropdownTrigger label="Label" size="sm" />);
      expect(
        container.querySelector('.mds-dropdown-trigger__chevron--sm'),
      ).toBeInTheDocument();
    });
  });

  describe('icons', () => {
    it('renders a startIcon before the label', () => {
      const { container } = render(
        <DropdownTrigger
          label="Label"
          startIcon={
            <i className="fa-solid fa-face-smile" aria-hidden="true" />
          }
        />,
      );
      expect(container.querySelector('i.fa-face-smile')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveTextContent('Label');
      expect(
        container.querySelector('.mds-dropdown-trigger__chevron'),
      ).toBeInTheDocument();
    });

    it('renders icon-only with the label as aria-label and no chevron', () => {
      const { container } = render(
        <DropdownTrigger
          label="Open menu"
          startIcon={<i className="fa-solid fa-gear" aria-hidden="true" />}
          iconOnly
        />,
      );
      expect(
        screen.getByRole('button', { name: 'Open menu' }),
      ).toBeInTheDocument();
      expect(screen.getByRole('button')).not.toHaveTextContent('Open menu');
      expect(
        container.querySelector('.mds-dropdown-trigger__chevron'),
      ).not.toBeInTheDocument();
    });
  });

  describe('nav-pill variant', () => {
    it('applies nav-pill classes instead of button classes', () => {
      render(<DropdownTrigger label="Label" variant="nav-pill" />);
      const trigger = screen.getByRole('button');
      expect(trigger).toHaveClass('mds-nav-pill');
      expect(trigger).not.toHaveClass('mds-btn');
    });

    it('ignores icons and warns in development', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const { container } = render(
        <DropdownTrigger
          label="Label"
          variant="nav-pill"
          startIcon={<i className="fa-solid fa-gear" aria-hidden="true" />}
        />,
      );
      expect(container.querySelector('i.fa-gear')).not.toBeInTheDocument();
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('nav-pill variant does not support icons'),
      );
      warnSpy.mockRestore();
    });
  });

  describe('prop forwarding', () => {
    it('forwards extra props to the button element', () => {
      render(<DropdownTrigger label="Label" data-testid="trigger" />);
      expect(screen.getByTestId('trigger')).toBe(screen.getByRole('button'));
    });

    it('forwards the ref to the button element', () => {
      const ref = createRef<HTMLButtonElement>();
      render(<DropdownTrigger label="Label" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });
});

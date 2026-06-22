import { fireEvent, render, screen } from '@testing-library/react';
import * as fc from 'fast-check';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fuzzComponent } from '../../tests/utils/fuzzComponent';
import type { NavPillProps } from './NavPill';
import { NavPill } from './NavPill';

// Explicit visible-character set keeps getAllByText assertions stable while
// still exercising a wide range of label content (letters, numbers, symbols).
const fuzzLabelCharacters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

describe('NavPill: Unit Test', () => {
  const defaultHref = '#';

  describe('class names', () => {
    it('always applies the mds-nav-pill class', () => {
      render(<NavPill label="Home" href={defaultHref} />);
      expect(screen.getByRole('link', { name: 'Home' })).toHaveClass(
        'mds-nav-pill',
      );
    });

    it('applies the selected modifier class when selected', () => {
      render(<NavPill label="Home" href={defaultHref} selected />);
      expect(screen.getByRole('link')).toHaveClass('mds-nav-pill--selected');
    });

    it('does not apply the selected modifier class when unselected', () => {
      render(<NavPill label="Home" href={defaultHref} />);
      expect(screen.getByRole('link')).not.toHaveClass(
        'mds-nav-pill--selected',
      );
    });

    it('appends consumer className after the mds classes', () => {
      render(
        <NavPill label="Home" href={defaultHref} className="custom-class" />,
      );
      const link = screen.getByRole('link');
      const classes = link.getAttribute('class') ?? '';
      expect(classes.indexOf('mds-nav-pill')).toBeLessThan(
        classes.indexOf('custom-class'),
      );
    });
  });

  describe('aria attributes', () => {
    it('sets aria-current="page" when selected', () => {
      render(<NavPill label="Home" href={defaultHref} selected />);
      expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'page');
    });

    it('does not set aria-current when unselected', () => {
      render(<NavPill label="Home" href={defaultHref} />);
      expect(screen.getByRole('link')).not.toHaveAttribute('aria-current');
    });
  });

  describe('label rendering', () => {
    it('renders the label text', () => {
      render(<NavPill label="Courses" href={defaultHref} />);
      expect(screen.getByText('Courses')).toBeInTheDocument();
    });

    it('renders the label inside a span with the label class', () => {
      render(<NavPill label="Courses" href={defaultHref} />);
      const link = screen.getByRole('link', { name: 'Courses' });
      const span = link.querySelector('.mds-nav-pill__label');
      expect(span).toHaveTextContent('Courses');
    });
  });

  describe('active indicator', () => {
    it('renders the indicator dot when selected', () => {
      render(<NavPill label="Home" href={defaultHref} selected />);
      const link = screen.getByRole('link', { name: 'Home' });
      expect(
        link.querySelector('.mds-nav-pill__indicator'),
      ).toBeInTheDocument();
    });

    it('does not render the indicator dot when unselected', () => {
      render(<NavPill label="Home" href={defaultHref} />);
      const link = screen.getByRole('link', { name: 'Home' });
      expect(link.querySelector('.mds-nav-pill__indicator')).toBeNull();
    });

    it('hides the indicator from assistive tech via aria-hidden', () => {
      render(<NavPill label="Home" href={defaultHref} selected />);
      const link = screen.getByRole('link', { name: 'Home' });
      expect(link.querySelector('.mds-nav-pill__indicator')).toHaveAttribute(
        'aria-hidden',
        'true',
      );
    });
  });

  describe('disabled state', () => {
    it('sets aria-disabled when disabled', () => {
      render(<NavPill label="Home" href={defaultHref} disabled />);
      expect(screen.getByRole('link')).toHaveAttribute('aria-disabled', 'true');
    });

    it('warns in development when both selected and disabled are set', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<NavPill label="Home" href={defaultHref} selected disabled />);

      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining(
          '[MDS NavPill] A selected NavPill cannot be disabled',
        ),
      );
      vi.restoreAllMocks();
    });

    it('is NOT disabled when both selected and disabled are set', () => {
      render(<NavPill label="Home" href={defaultHref} selected disabled />);
      expect(screen.getByRole('link')).not.toHaveAttribute('aria-disabled');
    });

    it('retains the selected modifier class when both selected and disabled are set', () => {
      render(<NavPill label="Home" href={defaultHref} selected disabled />);
      expect(screen.getByRole('link')).toHaveClass('mds-nav-pill--selected');
    });

    it('keeps aria-current="page" when both selected and disabled are set', () => {
      render(<NavPill label="Home" href={defaultHref} selected disabled />);
      expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'page');
    });

    it('removes href and tab stop when disabled', () => {
      render(<NavPill label="Home" href="/courses" disabled />);
      const link = screen.getByRole('link');
      expect(link).not.toHaveAttribute('href');
      expect(link).toHaveAttribute('tabindex', '-1');
      expect(link).toHaveAttribute('role', 'link');
    });

    it('preserves href when selected and disabled are both set', () => {
      render(<NavPill label="Home" href="/courses" selected disabled />);
      expect(screen.getByRole('link')).toHaveAttribute('href', '/courses');
    });

    it('component disabled semantics are not overridden by consumer props', () => {
      render(
        <NavPill
          label="Home"
          href="/courses"
          disabled
          aria-disabled={false as unknown as boolean}
          tabIndex={0}
        />,
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('aria-disabled', 'true');
      expect(link).toHaveAttribute('tabindex', '-1');
      expect(link).toHaveAttribute('role', 'link');
    });
  });

  describe('target/rel security', () => {
    it('auto-adds noopener noreferrer when target="_blank" is set without rel', () => {
      render(<NavPill label="Home" href="/courses" target="_blank" />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
      const rel = link.getAttribute('rel') ?? '';
      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');
    });

    it('merges provided rel tokens with noopener noreferrer for target="_blank"', () => {
      render(
        <NavPill
          label="Home"
          href="/courses"
          target="_blank"
          rel="noreferrer"
        />,
      );

      const rel = screen.getByRole('link').getAttribute('rel') ?? '';
      expect(rel.split(/\s+/)).toContain('noopener');
      expect(rel.split(/\s+/)).toContain('noreferrer');
      expect(
        rel.split(/\s+/).filter((token) => token === 'noreferrer'),
      ).toHaveLength(1);
    });

    it('does not force rel when target is not "_blank"', () => {
      render(
        <NavPill label="Home" href="/courses" target="_self" rel="author" />,
      );
      expect(screen.getByRole('link')).toHaveAttribute('rel', 'author');
    });
  });

  describe('anchor href', () => {
    it('forwards href to the rendered anchor', () => {
      render(<NavPill label="Home" href="/courses" />);
      expect(screen.getByRole('link')).toHaveAttribute('href', '/courses');
    });

    it('forwards href values provided by callers', () => {
      render(<NavPill label="Home" href="/dashboard" />);
      expect(screen.getByRole('link')).toHaveAttribute('href', '/dashboard');
    });
  });

  describe('group integration', () => {
    it('forwards caller-provided tabIndex when enabled', () => {
      render(
        <NavPill label="Participants" href="/participants" tabIndex={-1} />,
      );
      expect(screen.getByRole('link')).toHaveAttribute('tabindex', '-1');
    });

    it('calls onFocus so parent wrappers can maintain roving focus state', () => {
      const onFocus = vi.fn();
      render(
        <NavPill
          label="Participants"
          href="/participants"
          tabIndex={0}
          onFocus={onFocus}
        />,
      );

      fireEvent.focus(screen.getByRole('link'));
      expect(onFocus).toHaveBeenCalledTimes(1);
    });
  });

  describe('ref forwarding', () => {
    it('forwards a ref to the underlying anchor element', () => {
      const ref = createRef<HTMLAnchorElement>();
      render(<NavPill label="Home" href={defaultHref} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });
  });

  describe('event handling', () => {
    it('calls onClick when clicked', () => {
      const onClick = vi.fn();
      render(<NavPill label="Home" href={defaultHref} onClick={onClick} />);
      fireEvent.click(screen.getByRole('link'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
      const onClick = vi.fn();
      render(
        <NavPill label="Home" href={defaultHref} disabled onClick={onClick} />,
      );
      fireEvent.click(screen.getByRole('link'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('stops click propagation when disabled', () => {
      const parentOnClick = vi.fn();

      render(
        <div onClick={parentOnClick}>
          <NavPill label="Home" href={defaultHref} disabled />
        </div>,
      );

      fireEvent.click(screen.getByRole('link'));
      expect(parentOnClick).not.toHaveBeenCalled();
    });
  });

  describe('property-based testing', () => {
    it('renders and displays label for random props', () => {
      // Property-based test: run the component against many random prop combinations
      // to catch edge cases that example-based tests may miss.
      fuzzComponent<NavPillProps>(
        NavPill,
        fc.record<NavPillProps>({
          // Generate labels from a safe visible-character set so getAllByText
          // assertions remain stable (avoids regex-special characters).
          label: fc
            .array(fc.constantFrom(...fuzzLabelCharacters.split('')), {
              minLength: 1,
              maxLength: 60,
            })
            .map((chars) => chars.join('')),
          selected: fc.boolean(),
          disabled: fc.boolean(),
          href: fc.constant('#'),
          className: fc.option(fc.string({ maxLength: 30 }), {
            nil: undefined,
          }),
        }),
        // For each generated prop set, assert the label text is present in the link.
        (props: NavPillProps) => props.label,
        // 100 runs gives a good speed/coverage balance.
        { numRuns: 100 },
      );
    });
  });
});

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Breadcrumb, type BreadcrumbItem } from './Breadcrumb';

const resizeObserverMock = vi.fn(
  class {
    disconnect = vi.fn();
    observe = vi.fn();
    unobserve = vi.fn();
  },
);
vi.stubGlobal('ResizeObserver', resizeObserverMock);

const twoItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/home' },
  { label: 'Current page' },
];

const threeItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/home' },
  { label: 'Section', href: '/section' },
  { label: 'Current page' },
];

const fourItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/home' },
  { label: 'Section', href: '/section' },
  { label: 'Sub-section', href: '/subsection' },
  { label: 'Current page' },
];

const sevenItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/home' },
  { label: 'Level 2', href: '/l2' },
  { label: 'Level 3', href: '/l3' },
  { label: 'Level 4', href: '/l4' },
  { label: 'Level 5', href: '/l5' },
  { label: 'Level 6', href: '/l6' },
  { label: 'Current page' },
];

describe('Breadcrumb: Unit Test', () => {
  describe('rendering', () => {
    it('applies the mds-breadcrumb class on the nav element', () => {
      render(<Breadcrumb items={twoItems} />);
      expect(screen.getByRole('navigation')).toHaveClass('mds-breadcrumb');
    });

    it('sets aria-label on the nav element', () => {
      render(<Breadcrumb items={twoItems} ariaLabel="Page navigation" />);
      expect(screen.getByRole('navigation')).toHaveAttribute(
        'aria-label',
        'Page navigation',
      );
    });

    it('defaults aria-label to "Breadcrumb"', () => {
      render(<Breadcrumb items={twoItems} />);
      expect(screen.getByRole('navigation')).toHaveAttribute(
        'aria-label',
        'Breadcrumb',
      );
    });

    it('forwards extra props to the nav element', () => {
      render(<Breadcrumb items={twoItems} data-testid="bc" />);
      expect(screen.getByTestId('bc')).toBeInTheDocument();
    });

    it('returns null and warns when fewer than 2 items are supplied', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const { container } = render(
        <Breadcrumb items={[{ label: 'Home', href: '/home' }]} />,
      );
      expect(container).toBeEmptyDOMElement();
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('[MDS Breadcrumb]'),
      );
      warnSpy.mockRestore();
    });
  });

  describe('current page', () => {
    it('marks the last item with aria-current="page"', () => {
      render(<Breadcrumb items={twoItems} />);
      expect(screen.getByText('Current page').closest('li')).toHaveAttribute(
        'aria-current',
        'page',
      );
    });

    it('renders the current page as plain text, not a link', () => {
      render(<Breadcrumb items={twoItems} />);
      const currentLabel = screen.getByText('Current page');
      expect(currentLabel.tagName).not.toBe('A');
    });

    it('applies mds-breadcrumb__item--current class to the last item', () => {
      render(<Breadcrumb items={twoItems} />);
      const currentLi = screen.getByText('Current page').closest('li');
      expect(currentLi).toHaveClass('mds-breadcrumb__item--current');
    });

    it('does not make the current page keyboard-focusable when not truncated', () => {
      render(<Breadcrumb items={twoItems} />);
      const currentLabel = screen.getByText('Current page');
      expect(currentLabel).not.toHaveAttribute('tabindex');
    });

    it('makes the current page keyboard-focusable when truncated', async () => {
      const originalScrollWidth = Object.getOwnPropertyDescriptor(
        HTMLElement.prototype,
        'scrollWidth',
      );
      const originalOffsetWidth = Object.getOwnPropertyDescriptor(
        HTMLElement.prototype,
        'offsetWidth',
      );

      Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
        configurable: true,
        get: () => 240,
      });
      Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
        configurable: true,
        get: () => 80,
      });

      try {
        render(<Breadcrumb items={twoItems} />);
        const currentItem = screen
          .getByRole('navigation')
          .querySelector('li[aria-current="page"]');
        const currentLabel = currentItem?.querySelector(
          '.mds-breadcrumb__label',
        );

        expect(currentLabel).toBeTruthy();

        await waitFor(() => {
          expect(currentLabel).toHaveAttribute('tabindex', '0');
        });
      } finally {
        if (originalScrollWidth) {
          Object.defineProperty(
            HTMLElement.prototype,
            'scrollWidth',
            originalScrollWidth,
          );
        }
        if (originalOffsetWidth) {
          Object.defineProperty(
            HTMLElement.prototype,
            'offsetWidth',
            originalOffsetWidth,
          );
        }
      }
    });
  });

  describe('link items', () => {
    it('renders link items as anchors with the correct href', () => {
      render(<Breadcrumb items={threeItems} />);
      const homeLink = screen.getByRole('link', { name: 'Home' });
      expect(homeLink).toHaveAttribute('href', '/home');
    });

    it('renders all ancestor links except the current page as anchors', () => {
      render(<Breadcrumb items={fourItems} />);
      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Section' })).toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: 'Sub-section' }),
      ).toBeInTheDocument();
    });

    it('wraps link labels with a Tooltip when the label is truncated', async () => {
      const originalScrollWidth = Object.getOwnPropertyDescriptor(
        HTMLElement.prototype,
        'scrollWidth',
      );
      const originalOffsetWidth = Object.getOwnPropertyDescriptor(
        HTMLElement.prototype,
        'offsetWidth',
      );

      // jsdom does not compute real layout values, so force a truncated state.
      Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
        configurable: true,
        get: () => 240,
      });
      Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
        configurable: true,
        get: () => 80,
      });

      try {
        render(<Breadcrumb items={sevenItems} />);
        const homeLink = screen.getByRole('link', { name: 'Home' });

        await waitFor(() => {
          // Tooltip links the trigger to its bubble via aria-describedby.
          expect(homeLink).toHaveAttribute('aria-describedby');
        });
      } finally {
        if (originalScrollWidth) {
          Object.defineProperty(
            HTMLElement.prototype,
            'scrollWidth',
            originalScrollWidth,
          );
        }
        if (originalOffsetWidth) {
          Object.defineProperty(
            HTMLElement.prototype,
            'offsetWidth',
            originalOffsetWidth,
          );
        }
      }
    });
  });

  describe('overflow (more than 4 items)', () => {
    it('does not render an overflow button when items <= 4', () => {
      render(<Breadcrumb items={fourItems} />);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('renders an overflow button when items > 4', () => {
      render(<Breadcrumb items={sevenItems} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('overflow button has aria-expanded="false" by default', () => {
      render(<Breadcrumb items={sevenItems} />);
      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-expanded',
        'false',
      );
    });

    it('opens the overflow menu on button click and sets aria-expanded="true"', async () => {
      const user = userEvent.setup();
      render(<Breadcrumb items={sevenItems} />);
      const trigger = screen.getByRole('button');
      await user.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('shows hidden middle items in the overflow menu', async () => {
      const user = userEvent.setup();
      render(<Breadcrumb items={sevenItems} />);
      await user.click(screen.getByRole('button'));
      // items[1..3] are hidden; items[4,5] are visible anchors
      expect(
        screen.getByRole('menuitem', { name: 'Level 2' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('menuitem', { name: 'Level 3' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('menuitem', { name: 'Level 4' }),
      ).toBeInTheDocument();
    });

    it('always shows the root item and the 2 closest ancestors as links', () => {
      render(<Breadcrumb items={sevenItems} />);
      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Level 5' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Level 6' })).toBeInTheDocument();
    });

    it('closes the overflow menu on Escape key', async () => {
      const user = userEvent.setup();
      render(<Breadcrumb items={sevenItems} />);
      const trigger = screen.getByRole('button');
      await user.click(trigger);
      expect(screen.getByRole('menu')).toBeInTheDocument();
      await user.keyboard('{Escape}');
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('closes the overflow menu when a menu item is clicked', async () => {
      const user = userEvent.setup();
      render(<Breadcrumb items={sevenItems} />);
      await user.click(screen.getByRole('button'));
      await user.click(screen.getByRole('menuitem', { name: 'Level 2' }));
      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      });
    });
  });
});

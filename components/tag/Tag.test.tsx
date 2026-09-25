import { fireEvent, render, screen } from '@testing-library/react';
import { createRef, useRef, useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Tag } from './Tag';

describe('Tag: Unit Test', () => {
  describe('shared behaviour', () => {
    it('applies the mds-tag hook class to both modes', () => {
      render(<Tag type="link" href="/tags/course" content="Course" />);
      expect(screen.getByRole('link')).toHaveClass('mds-tag');

      render(
        <Tag
          type="removable"
          content="Ana Silva"
          removeLabel="Remove Ana Silva"
          onRemove={() => {}}
        />,
      );
      expect(screen.getByText('Ana Silva').closest('.mds-tag')).not.toBeNull();
    });

    it('renders the content label', () => {
      render(<Tag type="link" href="/tags/course" content="Course" />);
      expect(screen.getByText('Course')).toBeInTheDocument();
    });

    it('still forwards reserved-name string attributes to the DOM element rather than treating them as content', () => {
      render(
        <Tag
          type="link"
          href="/tags/course"
          content="Course"
          title="Course tag"
          data-tracking="tag-course"
        />,
      );
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('title', 'Course tag');
      expect(link).toHaveAttribute('data-tracking', 'tag-course');
      expect(screen.queryByText('Course tag')).not.toBeInTheDocument();
    });

    it('appends consumer className after the mds classes', () => {
      render(
        <Tag
          type="link"
          href="/tags/course"
          content="Course"
          className="custom-class"
        />,
      );
      const link = screen.getByRole('link');
      const classes = link.getAttribute('class') ?? '';
      expect(classes.indexOf('mds-tag')).toBeLessThan(
        classes.indexOf('custom-class'),
      );
    });

    it('warns and falls back to removable mode on an invalid type', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(
        <Tag
          // @ts-expect-error — intentional invalid value to verify runtime fallback
          type="invalid"
          content="Ana Silva"
          removeLabel="Remove Ana Silva"
          onRemove={() => {}}
        />,
      );
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('Invalid type "invalid"'),
      );
      expect(screen.getByText('Ana Silva').closest('.mds-tag')).toHaveClass(
        'mds-tag--removable',
      );
      vi.restoreAllMocks();
    });
  });

  describe('identity content (removable mode)', () => {
    it('renders username and email as Position 2 content, username first', () => {
      render(
        <Tag
          type="removable"
          removeLabel="Remove Course"
          onRemove={() => {}}
          content="Course"
          username="ana.silva"
          email="ana@example.com"
        />,
      );
      expect(screen.getByText('ana.silva')).toBeInTheDocument();
      expect(screen.getByText('ana@example.com')).toBeInTheDocument();
    });

    it('renders institution independently of extra content props', () => {
      render(
        <Tag
          type="removable"
          removeLabel="Remove Course"
          onRemove={() => {}}
          content="Course"
          institution="Moodle HQ"
        />,
      );
      expect(screen.getByText('Moodle HQ')).toBeInTheDocument();
    });

    it('renders content, Position 2, and institution as three separate lines', () => {
      render(
        <Tag
          type="removable"
          removeLabel="Remove Course"
          onRemove={() => {}}
          content="Ana Silva"
          username="ana.silva"
          institution="Moodle HQ"
        />,
      );
      const name = screen.getByText('Ana Silva');
      const supporting = screen.getByText('ana.silva');
      const institution = screen.getByText('Moodle HQ');

      expect(name).toHaveClass('mds-tag__name');
      expect(supporting.closest('.mds-tag__supporting-row')).not.toBeNull();
      expect(institution).toHaveClass('mds-tag__institution');
      // Each is its own row within the content block, not inline siblings.
      expect(name.parentElement).toHaveClass('mds-tag__content');
      expect(supporting.parentElement).toHaveClass('mds-tag__supporting-row');
      expect(institution.parentElement).toHaveClass('mds-tag__content');
    });

    it('renders an avatar when supplied', () => {
      render(
        <Tag
          type="removable"
          removeLabel="Remove Course"
          onRemove={() => {}}
          content="Course"
          avatar={{ initials: 'AS', alt: 'Ana Silva' }}
        />,
      );
      expect(screen.getByLabelText('Ana Silva')).toBeInTheDocument();
    });

    it('does not render an avatar when omitted', () => {
      render(
        <Tag
          type="removable"
          content="Course"
          removeLabel="Remove Course"
          onRemove={() => {}}
        />,
      );
      expect(document.querySelector('.mds-tag__avatar')).toBeNull();
    });

    it('renders the avatar aria-hidden, since its identity is already conveyed by the visible content text', () => {
      render(
        <Tag
          type="removable"
          removeLabel="Remove Course"
          onRemove={() => {}}
          content="Course"
          avatar={{ initials: 'AS', alt: 'Ana Silva' }}
        />,
      );
      expect(document.querySelector('.mds-tag__avatar')).toHaveAttribute(
        'aria-hidden',
        'true',
      );
    });

    it('sizes the avatar xs when only content is filled', () => {
      render(
        <Tag
          type="removable"
          removeLabel="Remove Course"
          onRemove={() => {}}
          content="Course"
          avatar={{ initials: 'AS', alt: 'Ana Silva' }}
        />,
      );
      expect(screen.getByLabelText('Ana Silva')).toHaveClass('mds-avatar--xs');
    });

    it('sizes the avatar md when content plus Position 2 are filled', () => {
      render(
        <Tag
          type="removable"
          removeLabel="Remove Course"
          onRemove={() => {}}
          content="Course"
          username="ana.silva"
          avatar={{ initials: 'AS', alt: 'Ana Silva' }}
        />,
      );
      expect(screen.getByLabelText('Ana Silva')).toHaveClass('mds-avatar--md');
    });

    it('sizes the avatar md when content plus institution are filled', () => {
      render(
        <Tag
          type="removable"
          removeLabel="Remove Course"
          onRemove={() => {}}
          content="Course"
          institution="Moodle HQ"
          avatar={{ initials: 'AS', alt: 'Ana Silva' }}
        />,
      );
      expect(screen.getByLabelText('Ana Silva')).toHaveClass('mds-avatar--md');
    });

    it('sizes the avatar lg when content, Position 2, and institution are all filled', () => {
      render(
        <Tag
          type="removable"
          removeLabel="Remove Course"
          onRemove={() => {}}
          content="Course"
          username="ana.silva"
          institution="Moodle HQ"
          avatar={{ initials: 'AS', alt: 'Ana Silva' }}
        />,
      );
      expect(screen.getByLabelText('Ana Silva')).toHaveClass('mds-avatar--lg');
    });
  });

  describe('link mode', () => {
    it('ignores identity fields in link mode with a warning, keeping them off the DOM', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(
        <Tag
          type="link"
          href="/tags/course"
          content="Course"
          // @ts-expect-error — identity fields are removable mode only; verifies the runtime guard
          username="ana.silva"
          avatar={{ initials: 'AS', alt: 'Ana Silva' }}
        />,
      );
      const link = screen.getByRole('link');
      expect(link).not.toHaveAttribute('username');
      expect(link).not.toHaveAttribute('avatar');
      expect(screen.queryByText('ana.silva')).not.toBeInTheDocument();
      expect(document.querySelector('.mds-tag__avatar')).toBeNull();
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('removable mode only'),
      );
      warn.mockRestore();
    });

    it('renders a real anchor with the given href', () => {
      render(<Tag type="link" href="/tags/course" content="Course" />);
      expect(screen.getByRole('link', { name: 'Course' })).toHaveAttribute(
        'href',
        '/tags/course',
      );
    });

    it('applies the mds-tag--link class', () => {
      render(<Tag type="link" href="/tags/course" content="Course" />);
      expect(screen.getByRole('link')).toHaveClass('mds-tag--link');
    });

    it('applies the mds-tag--danger class for variant="danger"', () => {
      render(
        <Tag
          type="link"
          href="/tags/course"
          content="Course"
          variant="danger"
        />,
      );
      expect(screen.getByRole('link')).toHaveClass('mds-tag--danger');
    });

    it('applies no variant modifier class for variant="default" (the base link rule already renders it)', () => {
      render(
        <Tag
          type="link"
          href="/tags/course"
          content="Course"
          variant="default"
        />,
      );
      const link = screen.getByRole('link');
      expect(link).not.toHaveClass('mds-tag--default');
      expect(link).not.toHaveClass('mds-tag--danger');
    });

    it('applies no variant class when variant is omitted', () => {
      render(<Tag type="link" href="/tags/course" content="Course" />);
      const link = screen.getByRole('link');
      expect(
        Array.from(link.classList).some((c) => c.startsWith('mds-tag--')),
      ).toBe(true); // mds-tag--link is always present
      expect(link).not.toHaveClass('mds-tag--danger');
    });

    it('ignores and warns on an invalid variant, applying no variant modifier', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(
        <Tag
          type="link"
          href="/tags/course"
          content="Course"
          // @ts-expect-error — intentional invalid value to verify runtime fallback
          variant="invalid"
        />,
      );
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('Invalid variant "invalid"'),
      );
      expect(screen.getByRole('link')).not.toHaveClass('mds-tag--invalid');
      vi.restoreAllMocks();
    });

    it('forwards onClick', () => {
      const handleClick = vi.fn();
      render(
        <Tag
          type="link"
          href="/tags/course"
          content="Course"
          onClick={handleClick}
        />,
      );
      fireEvent.click(screen.getByRole('link'));
      expect(handleClick).toHaveBeenCalledOnce();
    });

    it('disabled: strips href, sets aria-disabled and blocks clicks', () => {
      const handleClick = vi.fn();
      render(
        <Tag
          type="link"
          href="/tags/course"
          content="Course"
          disabled
          onClick={handleClick}
        />,
      );
      const link = screen.getByRole('link');
      expect(link).not.toHaveAttribute('href');
      expect(link).toHaveAttribute('aria-disabled', 'true');
      expect(link).toHaveClass('mds-tag--disabled');
      fireEvent.click(link);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('forwards ref to the anchor element', () => {
      const ref = createRef<HTMLAnchorElement>();
      render(
        <Tag ref={ref} type="link" href="/tags/course" content="Course" />,
      );
      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });
  });

  describe('removable mode', () => {
    it('has no colour variant — an unsafely-passed `variant` renders as neither a colour class nor Position 2 content', () => {
      render(
        <Tag
          type="removable"
          content="Ana Silva"
          removeLabel="Remove Ana Silva"
          onRemove={() => {}}
          // @ts-expect-error — `variant` is link-mode only; not part of TagRemovableProps
          variant="danger"
        />,
      );
      const tag = screen.getByText('Ana Silva').closest('.mds-tag');
      expect(tag).not.toHaveClass('mds-tag--danger');
      expect(screen.queryByText('danger')).not.toBeInTheDocument();
    });

    it('renders a CloseButton as the remove control', () => {
      render(
        <Tag
          type="removable"
          content="Ana Silva"
          removeLabel="Remove Ana Silva"
          onRemove={() => {}}
        />,
      );
      expect(
        screen.getByRole('button', { name: 'Remove Ana Silva' }),
      ).toBeInTheDocument();
    });

    it("the CloseButton's accessible name includes the tag label", () => {
      render(
        <Tag
          type="removable"
          content="Ana Silva"
          removeLabel="Remove Ana Silva"
          onRemove={() => {}}
        />,
      );
      expect(
        screen.getByRole('button', { name: /Ana Silva/ }),
      ).toBeInTheDocument();
    });

    it('calls onRemove when the CloseButton is activated', () => {
      const handleRemove = vi.fn();
      render(
        <Tag
          type="removable"
          content="Ana Silva"
          removeLabel="Remove Ana Silva"
          onRemove={handleRemove}
        />,
      );
      fireEvent.click(screen.getByRole('button', { name: 'Remove Ana Silva' }));
      expect(handleRemove).toHaveBeenCalledOnce();
    });

    it('clicking the tag body does not call onRemove', () => {
      const handleRemove = vi.fn();
      render(
        <Tag
          type="removable"
          content="Ana Silva"
          removeLabel="Remove Ana Silva"
          onRemove={handleRemove}
        />,
      );
      fireEvent.click(screen.getByText('Ana Silva'));
      expect(handleRemove).not.toHaveBeenCalled();
    });

    it('disabled applies the disabled class and disables the CloseButton', () => {
      render(
        <Tag
          type="removable"
          content="Ana Silva"
          removeLabel="Remove Ana Silva"
          onRemove={() => {}}
          disabled
        />,
      );
      expect(screen.getByText('Ana Silva').closest('.mds-tag')).toHaveClass(
        'mds-tag--disabled',
      );
      expect(
        screen.getByRole('button', { name: 'Remove Ana Silva' }),
      ).toBeDisabled();
    });

    it('applies no density modifier when only content is filled', () => {
      render(
        <Tag
          type="removable"
          content="Ana Silva"
          removeLabel="Remove Ana Silva"
          onRemove={() => {}}
        />,
      );
      const tag = screen.getByText('Ana Silva').closest('.mds-tag');
      expect(tag).not.toHaveClass('mds-tag--density-md');
      expect(tag).not.toHaveClass('mds-tag--density-lg');
    });

    it('applies the md density modifier when a Position 2 field is filled', () => {
      render(
        <Tag
          type="removable"
          content="Ana Silva"
          username="ana.silva"
          removeLabel="Remove Ana Silva"
          onRemove={() => {}}
        />,
      );
      expect(screen.getByText('Ana Silva').closest('.mds-tag')).toHaveClass(
        'mds-tag--density-md',
      );
    });

    it('applies the md density modifier when only institution is filled (a 2-line tag, same as username alone)', () => {
      render(
        <Tag
          type="removable"
          content="Ana Silva"
          institution="Moodle HQ"
          removeLabel="Remove Ana Silva"
          onRemove={() => {}}
        />,
      );
      expect(screen.getByText('Ana Silva').closest('.mds-tag')).toHaveClass(
        'mds-tag--density-md',
      );
    });

    it('applies the lg density modifier when a Position 2 field and institution are both filled', () => {
      render(
        <Tag
          type="removable"
          content="Ana Silva"
          username="ana.silva"
          institution="Moodle HQ"
          removeLabel="Remove Ana Silva"
          onRemove={() => {}}
        />,
      );
      expect(screen.getByText('Ana Silva').closest('.mds-tag')).toHaveClass(
        'mds-tag--density-lg',
      );
    });

    it('forwards extra props to the root element', () => {
      render(
        <Tag
          type="removable"
          content="Ana Silva"
          removeLabel="Remove Ana Silva"
          onRemove={() => {}}
          data-testid="my-tag"
        />,
      );
      expect(screen.getByTestId('my-tag')).toBeInTheDocument();
    });

    it('forwards ref to the span element', () => {
      const ref = createRef<HTMLSpanElement>();
      render(
        <Tag
          ref={ref}
          type="removable"
          content="Ana Silva"
          removeLabel="Remove Ana Silva"
          onRemove={() => {}}
        />,
      );
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe('focus after remove', () => {
    // Queue rAF callbacks rather than running them inline: the focus fallback
    // must only run after the consumer's state update has unmounted the tag.
    const queueAnimationFrames = () => {
      const callbacks: FrameRequestCallback[] = [];
      vi.spyOn(window, 'requestAnimationFrame').mockImplementation(
        (callback: FrameRequestCallback) => {
          callbacks.push(callback);
          return callbacks.length;
        },
      );
      return () => callbacks.splice(0).forEach((callback) => callback(0));
    };

    const RemovableList = ({ focusOnRemove }: { focusOnRemove?: boolean }) => {
      const [visible, setVisible] = useState(true);
      const fieldRef = useRef<HTMLInputElement>(null);
      return (
        <>
          <input ref={fieldRef} aria-label="Search people" />
          {visible && (
            <Tag
              type="removable"
              content="Ana Silva"
              removeLabel="Remove Ana Silva"
              onRemove={() => {
                setVisible(false);
                if (focusOnRemove) fieldRef.current?.focus();
              }}
            />
          )}
          <button type="button">Next focus target</button>
        </>
      );
    };

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('moves focus to the next focusable element once the tag unmounts', () => {
      const flushAnimationFrames = queueAnimationFrames();
      render(<RemovableList />);

      const removeButton = screen.getByRole('button', {
        name: 'Remove Ana Silva',
      });
      removeButton.focus();
      fireEvent.click(removeButton);
      flushAnimationFrames();

      expect(
        screen.getByRole('button', { name: 'Next focus target' }),
      ).toHaveFocus();
    });

    it('does not override focus the consumer placed itself', () => {
      const flushAnimationFrames = queueAnimationFrames();
      render(<RemovableList focusOnRemove />);

      const removeButton = screen.getByRole('button', {
        name: 'Remove Ana Silva',
      });
      removeButton.focus();
      fireEvent.click(removeButton);
      flushAnimationFrames();

      expect(
        screen.getByRole('textbox', { name: 'Search people' }),
      ).toHaveFocus();
    });

    it('leaves focus alone when the consumer keeps the tag mounted', () => {
      const flushAnimationFrames = queueAnimationFrames();
      render(
        <>
          <Tag
            type="removable"
            content="Ana Silva"
            removeLabel="Remove Ana Silva"
            onRemove={() => {}}
          />
          <button type="button">Next focus target</button>
        </>,
      );

      const removeButton = screen.getByRole('button', {
        name: 'Remove Ana Silva',
      });
      removeButton.focus();
      fireEvent.click(removeButton);
      flushAnimationFrames();

      expect(removeButton).toHaveFocus();
    });

    it('still forwards the ref in removable mode', () => {
      const ref = vi.fn();
      render(
        <Tag
          ref={ref}
          type="removable"
          content="Ana Silva"
          removeLabel="Remove Ana Silva"
          onRemove={() => {}}
        />,
      );
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement));
    });
  });
});

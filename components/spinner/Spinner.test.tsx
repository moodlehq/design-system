import { act, render, screen } from '@testing-library/react';
import fc from 'fast-check';
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { fuzzComponent } from '../../tests/utils/fuzzComponent';
import { Spinner, type SpinnerProps } from './Spinner';

describe('Spinner: Unit Test', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('applies the mds-spinner class to the root element', () => {
    const { container } = render(<Spinner labelText="Loading..." />);
    expect(container.firstChild).toHaveClass('mds-spinner');
  });

  // role="status" takes no name from its content (ARIA: name from author
  // only); the label text is what the live region announces.
  it('renders a status region that contains the label text', () => {
    render(<Spinner labelText="Saving changes..." />);
    expect(screen.getByRole('status')).toHaveTextContent('Saving changes...');
  });

  it('defaults to the small size and primary appearance', () => {
    const { container } = render(<Spinner labelText="Loading..." />);
    expect(container.firstChild).toHaveClass('mds-spinner--small');
    expect(container.firstChild).toHaveClass('mds-spinner--primary');
  });

  it.each(['small', 'large'] as const)('applies the %s size class', (size) => {
    const { container } = render(
      <Spinner labelText="Loading..." size={size} />,
    );
    expect(container.firstChild).toHaveClass(`mds-spinner--${size}`);
  });

  it.each(['primary', 'inverse'] as const)(
    'applies the %s appearance class',
    (appearance) => {
      const { container } = render(
        <Spinner labelText="Loading..." appearance={appearance} />,
      );
      expect(container.firstChild).toHaveClass(`mds-spinner--${appearance}`);
    },
  );

  it('falls back to small and warns for an invalid size', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { container } = render(
      <Spinner labelText="Loading..." size={'medium' as never} />,
    );
    expect(container.firstChild).toHaveClass('mds-spinner--small');
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('[MDS Spinner] Invalid size "medium"'),
    );
  });

  it('falls back to primary and warns for an invalid appearance', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { container } = render(
      <Spinner labelText="Loading..." appearance={'dark' as never} />,
    );
    expect(container.firstChild).toHaveClass('mds-spinner--primary');
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('[MDS Spinner] Invalid appearance "dark"'),
    );
  });

  it('warns when labelText is empty', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Spinner labelText="  " />);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('[MDS Spinner] No accessible name found'),
    );
  });

  it('warns when a large spinner has no visible label', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Spinner labelText="Loading..." size="large" />);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining(
        '[MDS Spinner] size="large" should always show its label',
      ),
    );
  });

  it('does not warn when a large spinner shows its label', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Spinner labelText="Loading..." size="large" showLabel />);
    expect(warn).not.toHaveBeenCalled();
  });

  it('does not warn when a small spinner hides its label', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Spinner labelText="Loading..." />);
    expect(warn).not.toHaveBeenCalled();
  });

  it('visually hides the label by default but keeps it in the DOM', () => {
    render(<Spinner labelText="Loading..." />);
    const label = screen.getByText('Loading...');
    expect(label).toHaveClass('mds-spinner-label');
    expect(label).toHaveClass('visually-hidden');
  });

  it('shows the label when showLabel is true', () => {
    render(<Spinner labelText="Loading..." showLabel />);
    expect(screen.getByText('Loading...')).not.toHaveClass('visually-hidden');
  });

  it('hides the ring graphic from assistive technology', () => {
    const { container } = render(<Spinner labelText="Loading..." />);
    const glyph = container.querySelector('svg.mds-spinner-glyph');
    expect(glyph).toHaveAttribute('aria-hidden', 'true');
    expect(glyph).toHaveAttribute('focusable', 'false');
  });

  it('renders the track and indicator circles with a normalised path length', () => {
    const { container } = render(<Spinner labelText="Loading..." />);
    const track = container.querySelector('.mds-spinner-track');
    const indicator = container.querySelector('.mds-spinner-indicator');
    expect(track).toHaveAttribute('pathLength', '360');
    expect(indicator).toHaveAttribute('pathLength', '360');
  });

  it.each([
    { size: 'small' as const, viewBox: '0 0 20 20', r: '9' },
    { size: 'large' as const, viewBox: '0 0 64 64', r: '30' },
  ])(
    'matches the Figma ring geometry for the $size size',
    ({ size, viewBox, r }) => {
      const { container } = render(
        <Spinner labelText="Loading..." size={size} />,
      );
      expect(container.querySelector('svg')).toHaveAttribute(
        'viewBox',
        viewBox,
      );
      expect(container.querySelector('.mds-spinner-indicator')).toHaveAttribute(
        'r',
        r,
      );
    },
  );

  it('is not focusable', () => {
    const { container } = render(<Spinner labelText="Loading..." />);
    expect(container.firstChild).not.toHaveAttribute('tabindex');
    expect(container.querySelector('[tabindex]')).toBeNull();
  });

  it('forwards extra props to the root element', () => {
    const { container } = render(
      <Spinner labelText="Loading..." data-testid="spinner" aria-live="off" />,
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'spinner');
    expect(container.firstChild).toHaveAttribute('aria-live', 'off');
  });

  // Guards the props spread order: role="status" must stay overridable.
  it('lets consumers override the role and add aria attributes', () => {
    const { container } = render(
      <Spinner
        labelText="Loading..."
        role="alert"
        aria-label="Uploading file"
      />,
    );
    expect(container.firstChild).toHaveAttribute('role', 'alert');
    expect(container.firstChild).toHaveAttribute(
      'aria-label',
      'Uploading file',
    );
  });

  it('appends a consumer className after the mds classes', () => {
    const { container } = render(
      <Spinner labelText="Loading..." className="custom-class" />,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toBe(
      'mds-spinner mds-spinner--small mds-spinner--primary custom-class',
    );
  });

  it('forwards the ref to the root span', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Spinner ref={ref} labelText="Loading..." />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toHaveClass('mds-spinner');
  });

  it('keeps the status text inside an RTL container', () => {
    render(
      <div dir="rtl">
        <Spinner labelText="جارٍ الحفظ..." showLabel />
      </div>,
    );
    expect(screen.getByRole('status')).toHaveTextContent('جارٍ الحفظ...');
  });

  describe('delay', () => {
    afterEach(() => {
      vi.useRealTimers();
    });

    it('shows the ring and label straight away without delay', () => {
      const { container } = render(<Spinner labelText="Saving changes..." />);
      expect(container.querySelector('svg')).not.toBeNull();
      expect(screen.getByRole('status')).toHaveTextContent('Saving changes...');
    });

    it('renders an empty status region until 300ms have passed', () => {
      vi.useFakeTimers();
      render(<Spinner labelText="Loading..." delay />);
      const status = screen.getByRole('status');
      expect(status).toBeEmptyDOMElement();

      act(() => {
        vi.advanceTimersByTime(299);
      });
      expect(status).toBeEmptyDOMElement();

      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(status.querySelector('svg')).not.toBeNull();
      expect(status).toHaveTextContent('Loading...');
    });

    // Progress-style labels ("1 of 5", "2 of 5"...) must not restart the timer,
    // or the spinner would never appear.
    it('does not restart the delay when labelText changes while pending', () => {
      vi.useFakeTimers();
      const { rerender } = render(<Spinner labelText="Loading..." delay />);
      act(() => {
        vi.advanceTimersByTime(200);
      });
      rerender(<Spinner labelText="Still loading..." delay />);
      expect(screen.getByRole('status')).toBeEmptyDOMElement();

      act(() => {
        vi.advanceTimersByTime(100);
      });
      expect(screen.getByRole('status')).toHaveTextContent('Still loading...');
    });

    it('cancels the pending show when unmounted before the delay ends', () => {
      vi.useFakeTimers();
      const { unmount } = render(<Spinner labelText="Loading..." delay />);
      unmount();
      expect(vi.getTimerCount()).toBe(0);
    });
  });

  describe('Spinner: Fuzz Test', () => {
    it('renders the label text for arbitrary label, size and appearance inputs', () => {
      // Restrict strings to values that survive Testing Library's whitespace
      // normalisation unchanged, otherwise getByText fails on valid output.
      const normalise = (text: string) => text.replace(/\s+/gu, ' ').trim();
      const printableText = fc
        .string({ unit: 'grapheme', minLength: 1, maxLength: 60 })
        .filter(
          (text) => normalise(text).length > 0 && normalise(text) === text,
        );
      fuzzComponent<SpinnerProps>(
        Spinner,
        fc.record<SpinnerProps>({
          labelText: printableText,
          showLabel: fc.constant(true),
          size: fc.constantFrom('small', 'large') as fc.Arbitrary<
            SpinnerProps['size']
          >,
          appearance: fc.constantFrom('primary', 'inverse') as fc.Arbitrary<
            SpinnerProps['appearance']
          >,
        }),
        (props) => props.labelText,
        { numRuns: 50 },
      );
    });
  });
});

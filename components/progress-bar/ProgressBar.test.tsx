import { render, screen } from '@testing-library/react';
import fc from 'fast-check';
import { describe, expect, it, vi } from 'vitest';
import { fuzzComponent } from '../../tests/utils/fuzzComponent';
import { ProgressBar, type ProgressBarProps } from './ProgressBar';

describe('ProgressBar: Unit Test', () => {
  it('applies mds-progress-bar class to the root wrapper element', () => {
    const { container } = render(<ProgressBar title="Upload" value={50} />);
    expect(container.firstChild).toHaveClass('mds-progress-bar');
  });

  it('renders a progressbar role element', () => {
    render(<ProgressBar title="Upload" value={50} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('uses in-progress visual styling when status is omitted and value is between 1 and 99', () => {
    const { container } = render(<ProgressBar title="Upload" value={50} />);
    expect(container.firstChild).toHaveClass('mds-progress-bar--in-progress');
  });

  it('sets aria-valuenow, aria-valuemin, and aria-valuemax on the track', () => {
    render(<ProgressBar title="Upload" value={75} />);
    const track = screen.getByRole('progressbar');
    expect(track).toHaveAttribute('aria-valuenow', '75');
    expect(track).toHaveAttribute('aria-valuemin', '0');
    expect(track).toHaveAttribute('aria-valuemax', '100');
  });

  it('supports custom min/max range for aria values and normalized fill width', () => {
    const { container } = render(
      <ProgressBar title="Upload" value={230} min={0} max={500} />,
    );
    const track = screen.getByRole('progressbar');
    const fill = container.querySelector('.mds-progress-bar-fill');

    expect(track).toHaveAttribute('aria-valuenow', '230');
    expect(track).toHaveAttribute('aria-valuemin', '0');
    expect(track).toHaveAttribute('aria-valuemax', '500');
    expect(fill).toHaveStyle({ width: '46%' });
  });

  it('clamps value below 0 to 0', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<ProgressBar title="Upload" value={-10} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '0',
    );
    vi.restoreAllMocks();
  });

  it('clamps value above 100 to 100', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<ProgressBar title="Upload" value={150} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '100',
    );
    vi.restoreAllMocks();
  });

  it('clamps value against custom min/max bounds', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { rerender } = render(
      <ProgressBar title="Upload" value={2} min={3} max={10} />,
    );

    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '3',
    );

    rerender(<ProgressBar title="Upload" value={15} min={3} max={10} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '10',
    );
    vi.restoreAllMocks();
  });

  it('falls back to default range when min/max are invalid', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<ProgressBar title="Upload" value={50} min={10} max={10} />);
    const track = screen.getByRole('progressbar');

    expect(track).toHaveAttribute('aria-valuemin', '0');
    expect(track).toHaveAttribute('aria-valuemax', '100');
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('[MDS ProgressBar] Invalid range'),
    );
    vi.restoreAllMocks();
  });

  it('warns in development when value is out of range', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<ProgressBar title="Upload" value={-1} />);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('[MDS ProgressBar] value "-1"'),
    );
    vi.restoreAllMocks();
  });

  it('applies the status modifier class', () => {
    const { container } = render(
      <ProgressBar title="Upload" value={50} status="error" />,
    );
    expect(container.firstChild).toHaveClass('mds-progress-bar--error');
  });

  it('uses neutral visual styling at 0% regardless of status', () => {
    const { container } = render(
      <ProgressBar title="Upload" value={0} status="warning" />,
    );
    expect(container.firstChild).toHaveClass('mds-progress-bar--empty');
    expect(container.firstChild).not.toHaveClass('mds-progress-bar--warning');
  });

  it('uses completed visual styling at 100% regardless of status', () => {
    const { container } = render(
      <ProgressBar title="Upload" value={100} status="error" />,
    );
    expect(container.firstChild).toHaveClass('mds-progress-bar--completed');
    expect(container.firstChild).not.toHaveClass('mds-progress-bar--error');
  });

  it('falls back to in-progress for an invalid status', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { container } = render(
      <ProgressBar title="Upload" value={50} status={'invalid' as never} />,
    );
    expect(container.firstChild).toHaveClass('mds-progress-bar--in-progress');
    vi.restoreAllMocks();
  });

  it('warns in development when an invalid status is passed', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <ProgressBar title="Upload" value={50} status={'invalid' as never} />,
    );
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('[MDS ProgressBar] Invalid status "invalid"'),
    );
    vi.restoreAllMocks();
  });

  it('applies the label variant modifier class', () => {
    const { container } = render(
      <ProgressBar title="Upload" value={50} labelVariant="inline" />,
    );
    expect(container.firstChild).toHaveClass('mds-progress-bar--label-inline');
  });

  it('renders title text in the title-and-count variant', () => {
    render(
      <ProgressBar
        title="Uploading"
        count="5 of 10"
        value={50}
        labelVariant="title-and-count"
      />,
    );
    expect(screen.getByText('Uploading')).toBeInTheDocument();
  });

  it('renders count text in the title-and-count variant', () => {
    render(
      <ProgressBar
        title="Uploading"
        count="5 of 10"
        value={50}
        labelVariant="title-and-count"
      />,
    );
    expect(screen.getByText('5 of 10')).toBeInTheDocument();
  });

  it('renders title but not count in the title variant', () => {
    render(
      <ProgressBar
        title="Uploading"
        count="5 of 10"
        value={50}
        labelVariant="title"
      />,
    );
    expect(screen.getByText('Uploading')).toBeInTheDocument();
    expect(screen.queryByText('5 of 10')).not.toBeInTheDocument();
  });

  it('renders count beside the bar in the inline variant', () => {
    render(
      <ProgressBar
        title="Upload"
        count="5 of 10"
        value={50}
        labelVariant="inline"
      />,
    );
    expect(screen.getByText('5 of 10')).toBeInTheDocument();
    // Title row should not be rendered in inline variant
    expect(screen.queryByText('Upload')).not.toBeInTheDocument();
  });

  it('renders no visible label in the none variant', () => {
    render(
      <ProgressBar
        title="Upload"
        count="5 of 10"
        value={50}
        labelVariant="none"
      />,
    );
    expect(screen.queryByText('Upload')).not.toBeInTheDocument();
    expect(screen.queryByText('5 of 10')).not.toBeInTheDocument();
  });

  it('uses the title as the accessible name for the progressbar track via aria-labelledby', () => {
    render(
      <ProgressBar
        title="Uploading files"
        value={50}
        labelVariant="title-and-count"
      />,
    );
    // The progressbar track should be labelled by the title element
    expect(
      screen.getByRole('progressbar', { name: 'Uploading files' }),
    ).toBeInTheDocument();
  });

  it('uses an explicit aria-label on the track when provided', () => {
    render(
      <ProgressBar
        title="Uploading files"
        value={50}
        labelVariant="none"
        aria-label="File upload progress"
      />,
    );
    expect(
      screen.getByRole('progressbar', { name: 'File upload progress' }),
    ).toBeInTheDocument();
  });

  it('falls back to title as aria-label for inline and none variants without explicit aria-label', () => {
    render(
      <ProgressBar title="Uploading files" value={50} labelVariant="none" />,
    );
    expect(
      screen.getByRole('progressbar', { name: 'Uploading files' }),
    ).toBeInTheDocument();
  });

  it('applies striped class but not animated class when loading and animated is not provided', () => {
    const { container } = render(
      <ProgressBar title="Loading" value={40} status="loading" />,
    );
    const fill = container.querySelector('.mds-progress-bar-fill');
    expect(fill).toHaveClass('progress-bar-striped');
    expect(fill).not.toHaveClass('progress-bar-animated');
  });

  it('applies striped classes and animated class when loading and animated=true', () => {
    const { container } = render(
      <ProgressBar title="Loading" value={40} status="loading" animated />,
    );
    const fill = container.querySelector('.mds-progress-bar-fill');
    expect(fill).toHaveClass('progress-bar-striped');
    expect(fill).toHaveClass('progress-bar-animated');
  });

  it('applies striped class but not animated class when loading and animated=false', () => {
    const { container } = render(
      <ProgressBar
        title="Loading"
        value={40}
        status="loading"
        animated={false}
      />,
    );
    const fill = container.querySelector('.mds-progress-bar-fill');
    expect(fill).toHaveClass('progress-bar-striped');
    expect(fill).not.toHaveClass('progress-bar-animated');
  });

  it('does not apply striped classes for non-loading statuses', () => {
    const { container } = render(
      <ProgressBar title="Upload" value={40} status="in-progress" />,
    );
    const fill = container.querySelector('.mds-progress-bar-fill');
    expect(fill).not.toHaveClass('progress-bar-striped');
  });

  it('does not apply striped classes at 0% even when status is loading', () => {
    const { container } = render(
      <ProgressBar title="Loading" value={0} status="loading" />,
    );
    const fill = container.querySelector('.mds-progress-bar-fill');
    expect(fill).not.toHaveClass('progress-bar-striped');
  });

  it('does not apply striped classes at 100% even when status is loading', () => {
    const { container } = render(
      <ProgressBar title="Loading" value={100} status="loading" />,
    );
    const fill = container.querySelector('.mds-progress-bar-fill');
    expect(fill).not.toHaveClass('progress-bar-striped');
  });

  it('forwards extra props to the wrapper element', () => {
    const { container } = render(
      <ProgressBar title="Upload" value={50} data-testid="my-bar" />,
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'my-bar');
  });

  it('appends a consumer className to the wrapper', () => {
    const { container } = render(
      <ProgressBar title="Upload" value={50} className="custom-class" />,
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders the fill with the correct width style', () => {
    const { container } = render(<ProgressBar title="Upload" value={65} />);
    const fill = container.querySelector('.mds-progress-bar-fill');
    expect(fill).toHaveStyle({ width: '65%' });
  });

  it('updates aria-valuenow, fill width, and visual status correctly across rerenders', () => {
    const { container, rerender } = render(
      <ProgressBar title="Upload" value={25} status="loading" />,
    );

    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '25',
    );
    expect(container.querySelector('.mds-progress-bar-fill')).toHaveStyle({
      width: '25%',
    });
    expect(container.firstChild).toHaveClass('mds-progress-bar--loading');

    rerender(<ProgressBar title="Upload" value={0} status="loading" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '0',
    );
    expect(container.querySelector('.mds-progress-bar-fill')).toHaveStyle({
      width: '0%',
    });
    expect(container.firstChild).toHaveClass('mds-progress-bar--empty');
    expect(container.firstChild).not.toHaveClass('mds-progress-bar--loading');

    rerender(<ProgressBar title="Upload" value={60} status="warning" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '60',
    );
    expect(container.querySelector('.mds-progress-bar-fill')).toHaveStyle({
      width: '60%',
    });
    expect(container.firstChild).toHaveClass('mds-progress-bar--warning');

    rerender(<ProgressBar title="Upload" value={100} status="error" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '100',
    );
    expect(container.querySelector('.mds-progress-bar-fill')).toHaveStyle({
      width: '100%',
    });
    expect(container.firstChild).toHaveClass('mds-progress-bar--completed');
    expect(container.firstChild).not.toHaveClass('mds-progress-bar--error');
  });

  it('derives empty/completed visual states from normalized range position', () => {
    const { container, rerender } = render(
      <ProgressBar
        title="Upload"
        value={3}
        min={3}
        max={10}
        status="warning"
      />,
    );

    expect(container.firstChild).toHaveClass('mds-progress-bar--empty');
    expect(container.firstChild).not.toHaveClass('mds-progress-bar--warning');

    rerender(
      <ProgressBar title="Upload" value={10} min={3} max={10} status="error" />,
    );
    expect(container.firstChild).toHaveClass('mds-progress-bar--completed');
    expect(container.firstChild).not.toHaveClass('mds-progress-bar--error');
  });

  it.each([
    { labelVariant: 'none' as const },
    { labelVariant: 'inline' as const },
    { labelVariant: 'title-and-count' as const },
    { labelVariant: 'title' as const },
  ])(
    'warns when labelVariant="$labelVariant" and no accessible name is provided',
    ({ labelVariant }) => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<ProgressBar value={50} labelVariant={labelVariant} />);
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('[MDS ProgressBar] No accessible name found'),
      );
      vi.restoreAllMocks();
    },
  );

  it('renders correctly in RTL mode when wrapped by a dir="rtl" container', () => {
    render(
      <div dir="rtl">
        <ProgressBar
          title="جاري رفع الملفات"
          count="٥ من ١٠"
          value={50}
          labelVariant="inline"
        />
      </div>,
    );

    expect(
      screen.getByRole('progressbar', { name: 'جاري رفع الملفات' }),
    ).toBeInTheDocument();
    expect(screen.getByText('٥ من ١٠')).toBeInTheDocument();
    expect(screen.getByText('٥ من ١٠').closest('[dir="rtl"]')).not.toBeNull();
  });

  it('renders a long translated title string without losing the accessible name', () => {
    const longTranslatedTitle =
      'Dies ist eine sehr lange lokalisierte Fortschrittsbeschreibung fuer den Upload mehrerer Kursmaterialien und begleitender Dateien';

    render(
      <ProgressBar
        title={longTranslatedTitle}
        count="5 von 10"
        value={50}
        labelVariant="title-and-count"
      />,
    );

    expect(screen.getByText(longTranslatedTitle)).toBeInTheDocument();
    expect(
      screen.getByRole('progressbar', { name: longTranslatedTitle }),
    ).toBeInTheDocument();
  });

  describe('ProgressBar: Fuzz Test', () => {
    it('renders the title text without crashing for arbitrary title-and-count inputs', () => {
      // Restrict to visible-title variants (title-and-count, title) so the getText
      // assertion can reliably locate the rendered title span in the DOM.
      // Restrict strings to values whose rendered text survives Testing Library's
      // whitespace normalisation unchanged, otherwise the generic helper can fail
      // on valid output when leading/trailing or repeated whitespace is collapsed.
      const normalizeVisibleText = (text: string) =>
        text.replace(/\s+/gu, ' ').trim();
      const printableText = fc
        .string({ unit: 'grapheme', minLength: 1, maxLength: 80 })
        .filter(
          (text) =>
            normalizeVisibleText(text).length > 0 &&
            normalizeVisibleText(text) === text,
        );
      fuzzComponent<ProgressBarProps>(
        ProgressBar,
        fc.record<ProgressBarProps>({
          title: printableText,
          count: printableText,
          value: fc.integer({ min: 0, max: 100 }),
          labelVariant: fc.constantFrom(
            'title-and-count',
            'title',
          ) as fc.Arbitrary<ProgressBarProps['labelVariant']>,
          status: fc.constantFrom(
            'in-progress',
            'loading',
            'error',
            'warning',
          ) as fc.Arbitrary<ProgressBarProps['status']>,
        }),
        (props) => props.title as string,
        { numRuns: 50 },
      );
    });
  });
});

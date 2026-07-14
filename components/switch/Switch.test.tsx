import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { type JSX } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { type SwitchProps, Switch } from './Switch';

describe('Switch: Unit Test', () => {
  const expectDevWarning = (
    ui: JSX.Element,
    expectedMessageSubstring: string,
  ) => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(ui);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining(expectedMessageSubstring),
    );
    vi.restoreAllMocks();
  };

  const renderWithWarnSuppressed = (ui: JSX.Element) => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const rendered = render(ui);
    vi.restoreAllMocks();
    return rendered;
  };

  it('applies the mds-switch class to the wrapper', () => {
    const { container } = render(<Switch label="Label text" />);
    expect(container.firstChild).toHaveClass('mds-switch');
  });

  it('renders the visible label by default', () => {
    render(<Switch label="Label text" />);
    expect(screen.getByText('Label text')).toBeInTheDocument();
  });

  it('associates the visible label with the checkbox input', () => {
    render(<Switch label="Label text" />);
    expect(screen.getByLabelText('Label text')).toBeInTheDocument();
  });

  it('forces type=checkbox even when another type is passed', () => {
    render(
      <Switch
        {...({
          label: 'Label text',
          type: 'radio',
        } as unknown as SwitchProps)}
      />,
    );
    expect(screen.getByRole('checkbox')).toHaveAttribute('type', 'checkbox');
  });

  it('uses the provided id for the checkbox input', () => {
    render(<Switch label="Label text" id="switch-id" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'switch-id');
  });

  it('generates an id when none is provided', () => {
    render(<Switch label="Label text" />);
    const input = screen.getByRole('checkbox');
    expect(input.getAttribute('id')).toBeTruthy();
  });

  it('forwards extra props to the input element', () => {
    render(<Switch label="Label text" data-testid="my-switch" />);
    expect(screen.getByTestId('my-switch')).toBeInTheDocument();
  });

  it('forwards a ref to the underlying input element', () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<Switch label="Label text" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('respects defaultChecked for uncontrolled mode', () => {
    render(<Switch label="Label text" defaultChecked />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('respects checked in controlled mode', () => {
    render(<Switch label="Label text" checked onChange={() => {}} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('respects disabled state', () => {
    render(<Switch label="Label text" disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it.each([
    {
      name: 'uses end label side by default',
      props: {} as Partial<SwitchProps>,
      expectedClass: 'mds-switch--label-end',
    },
    {
      name: 'applies start label side when requested',
      props: { labelSide: 'start' } as Partial<SwitchProps>,
      expectedClass: 'mds-switch--label-start',
    },
  ])('$name', ({ props, expectedClass }) => {
    const { container } = render(<Switch label="Label text" {...props} />);
    expect(container.firstChild).toHaveClass(expectedClass);
  });

  it.each([
    {
      name: 'enablement variant',
      props: { variant: 'enablement' } as Partial<SwitchProps>,
      expectedClass: 'mds-switch--variant-enablement',
    },
    {
      name: 'visibility variant',
      props: { variant: 'visibility' } as Partial<SwitchProps>,
      expectedClass: 'mds-switch--variant-visibility',
    },
    {
      name: 'lock variant',
      props: { variant: 'lock' } as Partial<SwitchProps>,
      expectedClass: 'mds-switch--variant-lock',
    },
  ])('$name', ({ props, expectedClass }) => {
    const { container } = render(<Switch label="Label text" {...props} />);
    expect(container.firstChild).toHaveClass(expectedClass);
  });

  it('falls back to enablement variant when an invalid value is passed at runtime', () => {
    const { container } = renderWithWarnSuppressed(
      <Switch
        label="Label text"
        variant={'bad-value' as unknown as SwitchProps['variant']}
      />,
    );
    expect(container.firstChild).toHaveClass('mds-switch--variant-enablement');
  });

  it('falls back to end label side when an invalid value is passed at runtime', () => {
    const { container } = renderWithWarnSuppressed(
      <Switch
        label="Label text"
        labelSide={'bad-side' as unknown as SwitchProps['labelSide']}
      />,
    );
    expect(container.firstChild).toHaveClass('mds-switch--label-end');
  });

  describe('hideLabel', () => {
    it('hides the visible label text when hideLabel is true', () => {
      render(<Switch label="Label text" hideLabel aria-label="Label text" />);
      expect(screen.queryByText('Label text')).not.toBeInTheDocument();
    });

    it('uses the aria-label prop as the accessible name when hideLabel is true', () => {
      render(<Switch hideLabel aria-label="Visibility toggle" />);
      expect(screen.getByRole('checkbox')).toHaveAccessibleName(
        'Visibility toggle',
      );
    });

    it('falls back to label prop for the accessible name when hideLabel is true', () => {
      render(<Switch label="Label text" hideLabel />);
      expect(screen.getByRole('checkbox')).toHaveAccessibleName('Label text');
    });

    it('falls back to label when aria-label is an empty string', () => {
      render(<Switch label="Label text" hideLabel aria-label="" />);
      expect(screen.getByRole('checkbox')).toHaveAccessibleName('Label text');
    });

    it('does not render a visible label element when label is an empty string', () => {
      const { container } = render(<Switch label="" hideLabel={false} />);
      expect(
        container.querySelector('.mds-switch-label'),
      ).not.toBeInTheDocument();
    });
  });

  describe('development warnings', () => {
    it.each([
      {
        name: 'hideLabel is true and no accessible name is available',
        ui: <Switch hideLabel />,
        message: 'label prop or aria-label attribute is required',
      },
      {
        name: 'label is not provided and hideLabel is false',
        ui: <Switch />,
        message: 'label prop is required when hideLabel is false',
      },
      {
        name: 'invalid variant is provided',
        ui: (
          <Switch
            label="Label text"
            variant={'bad' as unknown as SwitchProps['variant']}
          />
        ),
        message: 'Invalid variant',
      },
      {
        name: 'invalid labelSide is provided',
        ui: (
          <Switch
            label="Label text"
            labelSide={'bad' as unknown as SwitchProps['labelSide']}
          />
        ),
        message: 'Invalid labelSide',
      },
    ])('warns in development when $name', ({ ui, message }) => {
      expectDevWarning(ui, message);
    });
  });
});

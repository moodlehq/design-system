import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fc from 'fast-check';
import { type JSX, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fuzzComponent } from '../../tests/utils/fuzzComponent';
import { type SwitchProps, Switch } from './Switch';

const fuzzTextCharacters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:\'"<>.,?/\\`~';

describe('Switch: Unit Test', () => {
  const expectDevWarning = (
    ui: JSX.Element,
    expectedMessageSubstring: string,
    expectedClass?: string,
  ) => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { container } = render(ui);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining(expectedMessageSubstring),
    );
    if (expectedClass) {
      expect(container.firstChild).toHaveClass(expectedClass);
    }
    vi.restoreAllMocks();
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
    expect(screen.getByRole('switch')).toHaveAttribute('type', 'checkbox');
  });

  it('uses the provided id for the checkbox input', () => {
    render(<Switch label="Label text" id="switch-id" />);
    expect(screen.getByRole('switch')).toHaveAttribute('id', 'switch-id');
  });

  it('generates an id when none is provided', () => {
    render(<Switch label="Label text" />);
    const input = screen.getByRole('switch');
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
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('respects checked in controlled mode', () => {
    render(<Switch label="Label text" checked onChange={() => {}} />);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('supports controlled toggling from checked to unchecked when parent updates checked', async () => {
    const user = userEvent.setup();

    const ControlledSwitch = () => {
      const [checked, setChecked] = useState<boolean>(true);

      return (
        <Switch
          label="Label text"
          checked={checked}
          onChange={(event) => {
            setChecked(event.currentTarget.checked);
          }}
        />
      );
    };

    render(<ControlledSwitch />);
    const input = screen.getByRole('switch');
    expect(input).toBeChecked();

    await user.click(screen.getByText('Label text'));

    expect(input).not.toBeChecked();
  });

  it('respects disabled state', () => {
    render(<Switch label="Label text" disabled />);
    expect(screen.getByRole('switch')).toBeDisabled();
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
      name: 'enable variant',
      props: { variant: 'enable' } as Partial<SwitchProps>,
      expectedClass: 'mds-switch--variant-enable',
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

  describe('hideLabel', () => {
    it('hides the visible label text when hideLabel is true', () => {
      render(<Switch label="Label text" hideLabel aria-label="Label text" />);
      expect(screen.queryByText('Label text')).not.toBeInTheDocument();
    });

    it('uses the aria-label prop as the accessible name when hideLabel is true', () => {
      render(<Switch hideLabel aria-label="Visibility toggle" />);
      expect(screen.getByRole('switch')).toHaveAccessibleName(
        'Visibility toggle',
      );
    });

    it('falls back to label prop for the accessible name when hideLabel is true', () => {
      render(<Switch label="Label text" hideLabel />);
      expect(screen.getByRole('switch')).toHaveAccessibleName('Label text');
    });

    it('falls back to label when aria-label is an empty string', () => {
      render(<Switch label="Label text" hideLabel aria-label="" />);
      expect(screen.getByRole('switch')).toHaveAccessibleName('Label text');
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
        expectedClass: 'mds-switch--variant-enable',
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
        expectedClass: 'mds-switch--label-end',
      },
      {
        name: 'checked is provided without onChange in controlled mode',
        ui: <Switch label="Label text" checked />,
        message: 'checked prop was provided without onChange',
      },
    ])('warns in development when $name', ({ ui, message, expectedClass }) => {
      expectDevWarning(ui, message, expectedClass);
    });
  });

  describe('property-based testing', () => {
    it('renders random label text safely without interpreting injected markup', () => {
      const textArbitrary = fc
        .array(fc.constantFrom(...fuzzTextCharacters.split('')), {
          minLength: 1,
          maxLength: 80,
        })
        .map((chars) => chars.join(''));

      fuzzComponent(
        Switch,
        fc.record<SwitchProps>({
          // Exercise punctuation-heavy and HTML-like strings to verify they render as text.
          label: textArbitrary as unknown as fc.Arbitrary<SwitchProps['label']>,
          hideLabel: fc.constant(false),
          variant: fc.option(fc.constantFrom('enable', 'visibility', 'lock'), {
            nil: undefined,
          }) as unknown as fc.Arbitrary<SwitchProps['variant']>,
          labelSide: fc.option(fc.constantFrom('end', 'start'), {
            nil: undefined,
          }) as unknown as fc.Arbitrary<SwitchProps['labelSide']>,
          disabled: fc.boolean(),
        }),
        (props: SwitchProps) => props.label ?? '',
        { numRuns: 100 },
      );

      fc.assert(
        fc.property(textArbitrary, (label) => {
          const { container, unmount } = render(<Switch label={label} />);
          expect(container.querySelector('script')).not.toBeInTheDocument();
          expect(container.querySelector('img')).not.toBeInTheDocument();
          unmount();
        }),
        { numRuns: 100 },
      );
    });
  });
});

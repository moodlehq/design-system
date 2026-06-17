import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fc from 'fast-check';
import { describe, expect, it, vi } from 'vitest';
import { fuzzComponent } from '../../tests/utils/fuzzComponent';
import { type ChoiceboxProps, Choicebox } from './Choicebox';

const fuzzLabelCharacters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:'<>.,.?/";

describe('Choicebox: Unit Tests', () => {
  // ---------------------------------------------------------------------------
  // Stable CSS hook
  // ---------------------------------------------------------------------------

  it('applies mds-choicebox-wrapper class to the host element', () => {
    const { container } = render(<Choicebox label="Option A" />);
    expect(container.firstChild).toHaveClass('mds-choicebox-wrapper');
  });

  it('applies mds-choicebox-input class to the radio input', () => {
    render(<Choicebox label="Option A" />);
    expect(screen.getByRole('radio')).toHaveClass('mds-choicebox-input');
  });

  it('applies mds-choicebox class to the label card', () => {
    const { container } = render(<Choicebox label="Option A" />);

    expect(container.querySelector('.mds-choicebox')).toBeInTheDocument();
  });

  // ---------------------------------------------------------------------------
  // Input type
  // ---------------------------------------------------------------------------

  it('renders a radio input', () => {
    render(<Choicebox label="Option A" />);
    expect(screen.getByRole('radio')).toHaveAttribute('type', 'radio');
  });

  // ---------------------------------------------------------------------------
  // Label
  // ---------------------------------------------------------------------------

  it('renders the label text', () => {
    render(<Choicebox label="Weekly format" />);
    expect(screen.getByText('Weekly format')).toBeInTheDocument();
  });

  it('associates the label with the radio input via htmlFor', () => {
    render(<Choicebox label="Weekly format" />);
    expect(screen.getByLabelText('Weekly format')).toBeInTheDocument();
  });

  // ---------------------------------------------------------------------------
  // Supporting text
  // ---------------------------------------------------------------------------

  it('renders supporting text when provided', () => {
    render(<Choicebox label="Option A" supportingText="Helpful context" />);
    expect(screen.getByText('Helpful context')).toBeInTheDocument();
  });

  it('does not render supporting text element when not provided', () => {
    const { container } = render(<Choicebox label="Option A" />);
    expect(
      container.querySelector('.mds-choicebox-supporting-text'),
    ).not.toBeInTheDocument();
  });

  it('links supporting text to the input via aria-describedby', () => {
    render(<Choicebox label="Option A" supportingText="Some detail" />);
    const input = screen.getByRole('radio');
    const describedById = input.getAttribute('aria-describedby');
    expect(describedById).toBeTruthy();
    const supportingEl = document.getElementById(describedById as string);
    expect(supportingEl).toHaveTextContent('Some detail');
  });

  it('merges caller aria-describedby with the supporting text id', () => {
    render(
      <Choicebox
        label="Option A"
        supportingText="Some detail"
        aria-describedby="external-hint"
      />,
    );
    const input = screen.getByRole('radio');
    const describedBy = input.getAttribute('aria-describedby') ?? '';
    expect(describedBy).toContain('external-hint');
    // Also contains the auto-generated supporting text id
    expect(describedBy.split(' ').length).toBeGreaterThan(1);
  });

  it('sets only the caller aria-describedby when there is no supporting text', () => {
    render(<Choicebox label="Option A" aria-describedby="external-hint" />);
    expect(screen.getByRole('radio')).toHaveAttribute(
      'aria-describedby',
      'external-hint',
    );
  });

  // ---------------------------------------------------------------------------
  // Icon
  // ---------------------------------------------------------------------------

  it('renders the icon slot when icon prop is an <i> element', () => {
    const { container } = render(
      <Choicebox label="Option A" icon={<i className="fa-solid fa-star" />} />,
    );
    expect(container.querySelector('.mds-choicebox-icon')).toBeInTheDocument();
    expect(container.querySelector('.fa-star')).toBeInTheDocument();
  });

  it('renders the icon slot when icon prop is an <svg> element', () => {
    const { container } = render(
      <Choicebox label="Option A" icon={<svg data-testid="custom-icon" />} />,
    );
    expect(container.querySelector('.mds-choicebox-icon')).toBeInTheDocument();
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('does not render the icon slot when icon is not provided', () => {
    const { container } = render(<Choicebox label="Option A" />);
    expect(
      container.querySelector('.mds-choicebox-icon'),
    ).not.toBeInTheDocument();
  });

  it('silently ignores an invalid icon element and does not render the icon slot', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { container } = render(
      // @ts-expect-error — intentional invalid type for test
      <Choicebox label="Option A" icon={<span>not-an-icon</span>} />,
    );
    expect(
      container.querySelector('.mds-choicebox-icon'),
    ).not.toBeInTheDocument();
    consoleSpy.mockRestore();
  });

  // ---------------------------------------------------------------------------
  // ID handling
  // ---------------------------------------------------------------------------

  it('uses a provided id on the input', () => {
    render(<Choicebox label="Option A" id="my-choice" />);
    expect(screen.getByRole('radio')).toHaveAttribute('id', 'my-choice');
  });

  it('generates an id when none is provided so the label association works', () => {
    render(<Choicebox label="Option A" />);
    const input = screen.getByRole('radio');
    expect(input.getAttribute('id')).toBeTruthy();
    expect(screen.getByLabelText('Option A')).toBe(input);
  });

  // ---------------------------------------------------------------------------
  // Disabled
  // ---------------------------------------------------------------------------

  it('applies disabled to the input', () => {
    render(<Choicebox label="Option A" disabled />);
    expect(screen.getByRole('radio')).toBeDisabled();
  });

  // ---------------------------------------------------------------------------
  // Checked (controlled)
  // ---------------------------------------------------------------------------

  it('reflects the checked state in controlled mode', () => {
    render(<Choicebox label="Option A" checked readOnly />);
    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('reflects unchecked in controlled mode', () => {
    render(<Choicebox label="Option A" checked={false} readOnly />);
    expect(screen.getByRole('radio')).not.toBeChecked();
  });

  it('can be selected by clicking the card label in uncontrolled mode', async () => {
    const user = userEvent.setup();
    render(<Choicebox label="Option A" />);

    const input = screen.getByRole('radio');
    expect(input).not.toBeChecked();

    await user.click(screen.getByText('Option A'));
    expect(input).toBeChecked();
  });

  // ---------------------------------------------------------------------------
  // Extra props forwarded
  // ---------------------------------------------------------------------------

  it('forwards data-testid to the input', () => {
    render(<Choicebox label="Option A" data-testid="choicebox-input" />);
    expect(screen.getByTestId('choicebox-input')).toBeInTheDocument();
  });

  it('forwards name to the input', () => {
    render(<Choicebox label="Option A" name="group-a" />);
    expect(screen.getByRole('radio')).toHaveAttribute('name', 'group-a');
  });

  it('forwards value to the input', () => {
    render(<Choicebox label="Option A" value="weekly" />);
    expect(screen.getByRole('radio')).toHaveAttribute('value', 'weekly');
  });

  it('merges className onto the wrapper element', () => {
    const { container } = render(
      <Choicebox label="Option A" className="custom-wrapper" />,
    );
    expect(container.firstChild).toHaveClass(
      'mds-choicebox-wrapper',
      'custom-wrapper',
    );
  });

  // ---------------------------------------------------------------------------
  // Ref forwarding
  // ---------------------------------------------------------------------------

  it('forwards ref to the underlying radio input element', () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<Choicebox label="Option A" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.type).toBe('radio');
  });

  // ---------------------------------------------------------------------------
  // DEV warnings
  // ---------------------------------------------------------------------------

  it('warns in DEV when label is empty', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    // @ts-expect-error — intentional missing required prop for test
    render(<Choicebox />);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('label prop is required'),
    );
    warn.mockRestore();
  });

  // ---------------------------------------------------------------------------
  // Indicator is present in DOM (aria-hidden)
  // ---------------------------------------------------------------------------

  it('renders the indicator element with aria-hidden', () => {
    const { container } = render(<Choicebox label="Option A" />);
    const indicator = container.querySelector('.mds-choicebox-indicator');
    expect(indicator).toBeInTheDocument();
    expect(indicator).toHaveAttribute('aria-hidden', 'true');
  });

  // ---------------------------------------------------------------------------
  // Property-based fuzz (label + supportingText prop space)
  // ---------------------------------------------------------------------------

  it('renders without throwing for arbitrary label/supportingText strings', () => {
    fuzzComponent(
      Choicebox,
      fc.record<ChoiceboxProps>({
        label: fc
          .array(fc.constantFrom(...fuzzLabelCharacters.split('')), {
            minLength: 1,
            maxLength: 50,
          })
          .map((chars) => chars.join('')) as unknown as fc.Arbitrary<
          ChoiceboxProps['label']
        >,
        supportingText: fc.oneof(fc.constant(undefined), fc.string()),
        disabled: fc.boolean(),
        checked: fc.boolean(),
      } as unknown as Record<keyof ChoiceboxProps, fc.Arbitrary<unknown>>),
      (props) => props.label,
    );
  });
});

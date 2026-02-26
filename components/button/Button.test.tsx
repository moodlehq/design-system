import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { render, screen } from '@testing-library/react';
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { fuzzComponent } from '../../tests/utils/fuzzComponent';
import { Button, ButtonProps } from './Button';

describe('Button: Unit Test', () => {
  it('applies mds class name', () => {
    render(<Button label="Button" />);
    expect(screen.getByRole('button')).toHaveClass('mds-btn');
  });

  it('renders with empty label', () => {
    render(<Button label="" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders the label correctly', () => {
    render(<Button label="ThisIsAButton" />);
    expect(screen.getByRole('button')).toHaveTextContent('ThisIsAButton');
  });

  it('applies variant prop', () => {
    render(<Button label="Button" variant="secondary" />);
    expect(screen.getByRole('button')).toHaveClass('btn-secondary');
  });

  it('handles invalid variant prop as default variant', () => {
    render(<Button label="Button" variant="invalid" />);
    expect(screen.getByRole('button')).toHaveClass('btn-primary');
  });

  it('applies the size classes', () => {
    render(<Button label="Button" size="lg" />);
    expect(screen.getByRole('button')).toHaveClass('btn-lg');
  });

  it('respects disabled prop', () => {
    render(<Button label="Button" disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('forwards extra props to the button element', () => {
    render(<Button label="Button" data-testid="my-btn" />);
    expect(screen.getByTestId('my-btn')).toBeInTheDocument();
  });

  it('renders icon when icon prop is set', () => {
    const { container } = render(<Button label="Button" icon={faArrowRight} />);
    expect(
      container.querySelector('[data-icon="arrow-right"]'),
    ).toBeInTheDocument();
  });

  it('renders icon after label when iconPosition is end', () => {
    const { container } = render(
      <Button label="Button" icon={faArrowRight} iconPosition="end" />,
    );

    const content = container.querySelector('.mds-btn__content');
    expect(content?.firstElementChild).toHaveClass('mds-btn__label');
    expect(content?.lastElementChild).toHaveClass('mds-btn__icon');
  });

  it('renders and display label for random props', () => {
    fuzzComponent(
      Button,
      fc.record<ButtonProps>({
        label: fc.stringOf(
          fc.constantFrom(
            ...("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:'<>.,.?/".split(
              '',
            ) as [string, ...string[]]),
          ),
          { minLength: 1, maxLength: 50 },
        ),
        variant: fc.constantFrom(
          'primary',
          'secondary',
          'danger',
          'outline-primary',
          'outline-secondary',
          'outline-danger',
        ) as unknown as fc.Arbitrary<ButtonProps['variant']>,
        disabled: fc.boolean(),
        size: fc.option(fc.constantFrom('sm', 'lg'), {
          nil: undefined,
        }) as unknown as fc.Arbitrary<ButtonProps['size']>,
        iconPosition: fc.option(fc.constantFrom('start', 'end'), {
          nil: undefined,
        }) as unknown as fc.Arbitrary<ButtonProps['iconPosition']>,
      }),
      (props: ButtonProps) => props.label,
      { numRuns: 100 },
    );
  });
});

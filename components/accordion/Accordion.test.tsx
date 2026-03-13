import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Accordion } from './Accordion';

describe('Accordion: Unit Test', () => {
  it('applies mds class name', () => {
    render(<Accordion heading="Heading">Body</Accordion>);
    expect(screen.getByRole('button', { name: 'Heading' })).toBeInTheDocument();
    expect(screen.getByText('Body').closest('.mds-accordion')).toHaveClass(
      'mds-accordion',
    );
  });

  it('renders heading and content', () => {
    render(
      <Accordion heading="Accordion heading" defaultExpanded>
        Accordion body
      </Accordion>,
    );
    expect(
      screen.getByRole('button', { name: 'Accordion heading' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('region')).toHaveTextContent('Accordion body');
  });

  it('applies variant prop', () => {
    render(
      <Accordion heading="Heading" variant="info">
        Body
      </Accordion>,
    );
    expect(screen.getByText('Body').closest('.mds-accordion')).toHaveClass(
      'mds-accordion--info',
    );
  });

  it('handles invalid variant prop as default variant', () => {
    render(
      <Accordion heading="Heading" variant={'invalid' as 'default' | 'info'}>
        Body
      </Accordion>,
    );
    expect(screen.getByText('Body').closest('.mds-accordion')).toHaveClass(
      'mds-accordion--default',
    );
  });

  it('toggles expanded state in uncontrolled mode', async () => {
    const user = userEvent.setup();
    render(<Accordion heading="Heading">Body</Accordion>);

    const trigger = screen.getByRole('button', { name: 'Heading' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('calls onExpandedChange when toggled', async () => {
    const user = userEvent.setup();
    const onExpandedChange = vi.fn();
    render(
      <Accordion heading="Heading" onExpandedChange={onExpandedChange}>
        Body
      </Accordion>,
    );

    await user.click(screen.getByRole('button', { name: 'Heading' }));
    expect(onExpandedChange).toHaveBeenCalledWith(true);
  });

  it('uses controlled expanded prop', async () => {
    const user = userEvent.setup();
    const onExpandedChange = vi.fn();
    render(
      <Accordion
        heading="Heading"
        expanded={false}
        onExpandedChange={onExpandedChange}
      >
        Body
      </Accordion>,
    );

    const trigger = screen.getByRole('button', { name: 'Heading' });
    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(onExpandedChange).toHaveBeenCalledWith(true);
  });

  it('respects disabled prop', async () => {
    const user = userEvent.setup();
    const onExpandedChange = vi.fn();
    render(
      <Accordion heading="Heading" disabled onExpandedChange={onExpandedChange}>
        Body
      </Accordion>,
    );

    const trigger = screen.getByRole('button', { name: 'Heading' });
    await user.click(trigger);

    expect(trigger).toBeDisabled();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(onExpandedChange).not.toHaveBeenCalled();
  });

  it('forwards extra props to root element', () => {
    render(
      <Accordion heading="Heading" data-testid="my-accordion">
        Body
      </Accordion>,
    );

    expect(screen.getByTestId('my-accordion')).toBeInTheDocument();
  });
});

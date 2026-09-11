import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { SearchInput } from './SearchInput';

describe('SearchInput: Unit Test', () => {
  it('applies the mds-search-input class name', () => {
    const { container } = render(
      <SearchInput label="Search" clearLabel="Clear search" />,
    );

    expect(
      container.firstElementChild?.classList.contains('mds-search-input'),
    ).toBe(true);
  });

  it('always renders a decorative magnifying-glass icon at the start of the field', () => {
    render(<SearchInput label="Search" clearLabel="Clear search" />);

    const icon = document.querySelector(
      '.mds-input-start-icon .fa-magnifying-glass',
    );
    expect(icon).toBeInTheDocument();
    expect(screen.getByLabelText('Search')).toHaveClass(
      'mds-input-field--with-start-icon',
    );
  });

  it('renders type=search on the underlying input', () => {
    render(<SearchInput label="Search" clearLabel="Clear search" />);
    expect(screen.getByLabelText('Search')).toHaveAttribute('type', 'search');
  });

  it('does not render the clear button when the field is empty', () => {
    render(<SearchInput label="Search" clearLabel="Clear search" />);
    expect(
      screen.queryByRole('button', { name: 'Clear search' }),
    ).not.toBeInTheDocument();
  });

  it('renders the clear button once a value is typed and clears it on click (uncontrolled)', async () => {
    const user = userEvent.setup();
    render(<SearchInput label="Search" clearLabel="Clear search" />);

    const input = screen.getByLabelText('Search');
    await user.type(input, 'course');
    expect(input).toHaveValue('course');

    const clearButton = screen.getByRole('button', { name: 'Clear search' });
    await user.click(clearButton);

    expect(input).toHaveValue('');
    expect(
      screen.queryByRole('button', { name: 'Clear search' }),
    ).not.toBeInTheDocument();
  });

  it('clears a controlled value and notifies the consumer via onChange', async () => {
    const user = userEvent.setup();

    function ControlledSearchInput() {
      const [value, setValue] = useState('course');
      return (
        <SearchInput
          label="Search"
          clearLabel="Clear search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      );
    }

    render(<ControlledSearchInput />);

    const input = screen.getByLabelText('Search');
    expect(input).toHaveValue('course');

    await user.click(screen.getByRole('button', { name: 'Clear search' }));

    expect(input).toHaveValue('');
  });

  it('renders the clear button when defaultValue is populated', () => {
    render(
      <SearchInput
        label="Search"
        clearLabel="Clear search"
        defaultValue="course"
      />,
    );
    expect(
      screen.getByRole('button', { name: 'Clear search' }),
    ).toBeInTheDocument();
  });

  it('does not render the clear button when disabled, even with a value', () => {
    render(
      <SearchInput
        label="Search"
        clearLabel="Clear search"
        defaultValue="course"
        disabled
        supportingText="Unavailable"
      />,
    );
    expect(screen.getByLabelText('Search')).toBeDisabled();
    expect(
      screen.queryByRole('button', { name: 'Clear search' }),
    ).not.toBeInTheDocument();
  });

  it('does not render the clear button when readOnly, even with a value', () => {
    render(
      <SearchInput
        label="Search"
        clearLabel="Clear search"
        defaultValue="course"
        readOnly
      />,
    );
    expect(screen.getByLabelText('Search')).toHaveAttribute('readonly');
    expect(
      screen.queryByRole('button', { name: 'Clear search' }),
    ).not.toBeInTheDocument();
  });

  it('forwards extra props to the underlying input element', () => {
    render(
      <SearchInput
        label="Search"
        clearLabel="Clear search"
        data-testid="search-input"
      />,
    );

    expect(screen.queryByTestId('search-input')).not.toBeNull();
  });

  it('forwards refs to the underlying input element', () => {
    const ref = { current: null as HTMLInputElement | null };

    render(<SearchInput label="Search" clearLabel="Clear search" ref={ref} />);

    expect(ref.current).toBe(screen.getByLabelText('Search'));
  });

  it('returns focus to the field after clearing', async () => {
    const user = userEvent.setup();
    render(
      <SearchInput
        label="Search"
        clearLabel="Clear search"
        defaultValue="course"
      />,
    );

    const input = screen.getByLabelText('Search');
    await user.click(screen.getByRole('button', { name: 'Clear search' }));

    expect(input).toHaveFocus();
  });

  it('calls the consumer onChange handler while typing', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <SearchInput
        label="Search"
        clearLabel="Clear search"
        onChange={handleChange}
      />,
    );

    await user.type(screen.getByLabelText('Search'), 'a');
    expect(handleChange).toHaveBeenCalled();
  });
});

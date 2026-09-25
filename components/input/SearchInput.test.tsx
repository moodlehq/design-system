import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
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

  it('reports its accessible role as a searchbox, not a plain text field', () => {
    render(<SearchInput label="Search" clearLabel="Clear search" />);
    expect(screen.getByRole('searchbox', { name: 'Search' })).toBe(
      screen.getByLabelText('Search'),
    );
  });

  it('does not render a search landmark by default', () => {
    render(<SearchInput label="Search" clearLabel="Clear search" />);
    expect(screen.queryByRole('search')).not.toBeInTheDocument();
  });

  it('renders the root as a search landmark named by the label when landmark is true', () => {
    const { container } = render(
      <SearchInput label="Search courses" clearLabel="Clear search" landmark />,
    );

    const landmark = screen.getByRole('search', { name: 'Search courses' });
    expect(landmark).toBe(container.firstElementChild);
    expect(landmark).toHaveClass('mds-search-input');
    expect(landmark).toContainElement(screen.getByRole('searchbox'));
  });

  it('names the landmark with aria-label when the label is hidden', () => {
    render(
      <SearchInput
        label="Search"
        aria-label="Search site"
        hideLabel
        clearLabel="Clear search"
        landmark
      />,
    );

    expect(
      screen.getByRole('search', { name: 'Search site' }),
    ).toBeInTheDocument();
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

  it('does not render the clear button for a whitespace-only value', async () => {
    const user = userEvent.setup();
    render(<SearchInput label="Search" clearLabel="Clear search" />);

    const input = screen.getByLabelText('Search');
    await user.type(input, '   ');

    expect(input).toHaveValue('   ');
    expect(
      screen.queryByRole('button', { name: 'Clear search' }),
    ).not.toBeInTheDocument();
  });

  it('does not render the clear button when defaultValue is whitespace-only', () => {
    render(
      <SearchInput
        label="Search"
        clearLabel="Clear search"
        defaultValue="   "
      />,
    );
    expect(
      screen.queryByRole('button', { name: 'Clear search' }),
    ).not.toBeInTheDocument();
  });

  it('does not render the clear button for a whitespace-only controlled value', () => {
    render(
      <SearchInput
        label="Search"
        clearLabel="Clear search"
        value="   "
        onChange={() => {}}
      />,
    );
    expect(
      screen.queryByRole('button', { name: 'Clear search' }),
    ).not.toBeInTheDocument();
  });

  it('keeps the native input in sync with React after an imperative clear, so retyping the prior value is registered as a change', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <SearchInput
        label="Search"
        clearLabel="Clear search"
        onChange={handleChange}
      />,
    );

    const input = screen.getByLabelText('Search');
    await user.type(input, 'course');
    handleChange.mockClear();

    await user.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(input).toHaveValue('');

    fireEvent.change(input, { target: { value: 'course' } });
    expect(input).toHaveValue('course');
    expect(handleChange).toHaveBeenCalled();
  });

  it('supports clearing and typing a new value afterwards', async () => {
    const user = userEvent.setup();
    render(<SearchInput label="Search" clearLabel="Clear search" />);

    const input = screen.getByLabelText('Search');
    await user.type(input, 'course');
    await user.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(input).toHaveValue('');

    fireEvent.change(input, { target: { value: 'category' } });
    expect(input).toHaveValue('category');
    expect(
      screen.getByRole('button', { name: 'Clear search' }),
    ).toBeInTheDocument();
  });

  it('clears correctly when the consumer forwards a plain object ref', async () => {
    const user = userEvent.setup();
    const ref = { current: null as HTMLInputElement | null };

    render(
      <SearchInput
        label="Search"
        clearLabel="Clear search"
        defaultValue="course"
        ref={ref}
      />,
    );

    expect(ref.current).toBe(screen.getByLabelText('Search'));

    await user.click(screen.getByRole('button', { name: 'Clear search' }));

    expect(ref.current?.value).toBe('');
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

  it('clears the field on Escape', async () => {
    const user = userEvent.setup();
    render(
      <SearchInput
        label="Search"
        clearLabel="Clear search"
        defaultValue="course"
      />,
    );

    const input = screen.getByLabelText('Search');
    input.focus();
    await user.keyboard('{Escape}');

    expect(input).toHaveValue('');
    expect(
      screen.queryByRole('button', { name: 'Clear search' }),
    ).not.toBeInTheDocument();
  });

  it('does nothing on Escape when the field is already empty', async () => {
    const user = userEvent.setup();
    render(<SearchInput label="Search" clearLabel="Clear search" />);

    const input = screen.getByLabelText('Search');
    input.focus();
    await user.keyboard('{Escape}');

    expect(input).toHaveValue('');
  });

  it('calls the consumer onKeyDown handler for Escape and other keys', async () => {
    const user = userEvent.setup();
    const handleKeyDown = vi.fn();

    render(
      <SearchInput
        label="Search"
        clearLabel="Clear search"
        defaultValue="course"
        onKeyDown={handleKeyDown}
      />,
    );

    screen.getByLabelText('Search').focus();
    await user.keyboard('{Escape}');

    expect(handleKeyDown).toHaveBeenCalledOnce();
  });

  it('fires onDebouncedChange immediately with an empty value when cleared via Escape', async () => {
    const user = userEvent.setup();
    const handleDebouncedChange = vi.fn();

    render(
      <SearchInput
        label="Search"
        clearLabel="Clear search"
        defaultValue="course"
        onDebouncedChange={handleDebouncedChange}
      />,
    );

    screen.getByLabelText('Search').focus();
    await user.keyboard('{Escape}');

    expect(handleDebouncedChange).toHaveBeenCalledExactlyOnceWith('');
  });

  it('prevents implicit form submission on Enter when the field is empty or whitespace-only', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn((event: SubmitEvent) => event.preventDefault());

    render(
      <form
        onSubmit={(event) => handleSubmit(event.nativeEvent as SubmitEvent)}
      >
        <SearchInput label="Search" clearLabel="Clear search" />
        <button type="submit">Submit</button>
      </form>,
    );

    const input = screen.getByLabelText('Search');
    await user.type(input, '{Enter}');
    expect(handleSubmit).not.toHaveBeenCalled();

    await user.type(input, '   {Enter}');
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('allows implicit form submission on Enter when the field has a value', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn((event: SubmitEvent) => event.preventDefault());

    render(
      <form
        onSubmit={(event) => handleSubmit(event.nativeEvent as SubmitEvent)}
      >
        <SearchInput label="Search" clearLabel="Clear search" />
        <button type="submit">Submit</button>
      </form>,
    );

    await user.type(screen.getByLabelText('Search'), 'course{Enter}');
    expect(handleSubmit).toHaveBeenCalledOnce();
  });

  it('still calls the consumer onKeyDown handler for Enter on an empty field', async () => {
    const user = userEvent.setup();
    const handleKeyDown = vi.fn();

    render(
      <SearchInput
        label="Search"
        clearLabel="Clear search"
        onKeyDown={handleKeyDown}
      />,
    );

    await user.type(screen.getByLabelText('Search'), '{Enter}');
    expect(handleKeyDown).toHaveBeenCalledOnce();
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

  describe('onDebouncedChange', () => {
    afterEach(() => {
      vi.useRealTimers();
    });

    it('does not call onDebouncedChange until the debounce interval elapses', () => {
      vi.useFakeTimers();
      const handleDebouncedChange = vi.fn();

      render(
        <SearchInput
          label="Search"
          clearLabel="Clear search"
          onDebouncedChange={handleDebouncedChange}
        />,
      );

      fireEvent.change(screen.getByLabelText('Search'), {
        target: { value: 'course' },
      });
      expect(handleDebouncedChange).not.toHaveBeenCalled();

      vi.advanceTimersByTime(299);
      expect(handleDebouncedChange).not.toHaveBeenCalled();

      vi.advanceTimersByTime(1);
      expect(handleDebouncedChange).toHaveBeenCalledExactlyOnceWith('course');
    });

    it('resets the debounce timer on every keystroke rather than firing per keystroke', () => {
      vi.useFakeTimers();
      const handleDebouncedChange = vi.fn();

      render(
        <SearchInput
          label="Search"
          clearLabel="Clear search"
          onDebouncedChange={handleDebouncedChange}
        />,
      );

      const input = screen.getByLabelText('Search');
      fireEvent.change(input, { target: { value: 'a' } });
      vi.advanceTimersByTime(200);
      fireEvent.change(input, { target: { value: 'ab' } });
      vi.advanceTimersByTime(200);
      expect(handleDebouncedChange).not.toHaveBeenCalled();

      vi.advanceTimersByTime(100);
      expect(handleDebouncedChange).toHaveBeenCalledExactlyOnceWith('ab');
    });

    it('respects a custom debounceMs', () => {
      vi.useFakeTimers();
      const handleDebouncedChange = vi.fn();

      render(
        <SearchInput
          label="Search"
          clearLabel="Clear search"
          onDebouncedChange={handleDebouncedChange}
          debounceMs={1000}
        />,
      );

      fireEvent.change(screen.getByLabelText('Search'), {
        target: { value: 'course' },
      });

      vi.advanceTimersByTime(300);
      expect(handleDebouncedChange).not.toHaveBeenCalled();

      vi.advanceTimersByTime(700);
      expect(handleDebouncedChange).toHaveBeenCalledTimes(1);
    });

    it('trims whitespace from the value passed to onDebouncedChange', () => {
      vi.useFakeTimers();
      const handleDebouncedChange = vi.fn();

      render(
        <SearchInput
          label="Search"
          clearLabel="Clear search"
          onDebouncedChange={handleDebouncedChange}
        />,
      );

      fireEvent.change(screen.getByLabelText('Search'), {
        target: { value: '  course  ' },
      });
      vi.advanceTimersByTime(300);

      expect(handleDebouncedChange).toHaveBeenCalledExactlyOnceWith('course');
    });

    it('calls onDebouncedChange with an empty string for a whitespace-only value', () => {
      vi.useFakeTimers();
      const handleDebouncedChange = vi.fn();

      render(
        <SearchInput
          label="Search"
          clearLabel="Clear search"
          onDebouncedChange={handleDebouncedChange}
        />,
      );

      fireEvent.change(screen.getByLabelText('Search'), {
        target: { value: '   ' },
      });
      vi.advanceTimersByTime(300);

      expect(handleDebouncedChange).toHaveBeenCalledExactlyOnceWith('');
    });

    it('fires onDebouncedChange immediately with an empty value when cleared', () => {
      vi.useFakeTimers();
      const handleDebouncedChange = vi.fn();

      render(
        <SearchInput
          label="Search"
          clearLabel="Clear search"
          defaultValue="course"
          onDebouncedChange={handleDebouncedChange}
        />,
      );

      fireEvent.click(screen.getByRole('button', { name: 'Clear search' }));

      expect(handleDebouncedChange).toHaveBeenCalledExactlyOnceWith('');
    });
  });
});

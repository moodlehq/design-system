import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import type { UserEvent } from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import { createRef, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import type { ComboboxOption, ComboboxProps } from './Combobox';
import { Combobox } from './Combobox';
import { COMBOBOX_RENDER_PAGE } from './useCombobox';

const options: ComboboxOption[] = [
  { value: 'jose', label: 'José Alvarez' },
  { value: 'jessica', label: 'Jessica Parker', username: 'jparker' },
  { value: 'sam', label: 'Sam Lee', disabled: true },
  { value: 'maria', label: 'Maria Jose' },
];

const baseProps = {
  label: 'Members',
  options,
  clearLabel: 'Clear all',
  showOptionsLabel: 'Show options',
  removeLabel: (name: string) => `Remove ${name}`,
  loadingLabel: 'Loading results…',
  noResultsLabel: (query: string) => `No matches for '${query}'`,
  resultsAnnouncement: (count: number) => `${count} results available`,
} satisfies ComboboxProps;

type SingleProps = Extract<ComboboxProps, { multiple?: false }>;
type MultipleProps = Extract<ComboboxProps, { multiple: true }>;
interface DataAttributes {
  [dataAttribute: `data-${string}`]: string;
}
interface SetupResult extends ReturnType<typeof render> {
  user: UserEvent;
  input: HTMLElement;
}

// Typed per mode so a wrong value shape (array vs string) fails to compile.
function setup(props?: Partial<SingleProps> & DataAttributes): SetupResult;
function setup(
  props: Partial<MultipleProps> & { multiple: true } & DataAttributes,
): SetupResult;
function setup(
  props: Partial<ComboboxProps> & DataAttributes = {},
): SetupResult {
  const user = userEvent.setup();
  const merged = { ...baseProps, ...props } as ComboboxProps;
  const utils = render(<Combobox {...merged} />);
  return { user, ...utils, input: screen.getByRole('combobox') };
}

describe('Combobox: Unit Test', () => {
  it('applies the hook classes to the host and merges a consumer className after them', () => {
    const { container } = setup({ className: 'extra' });
    expect(container.firstElementChild).toHaveClass(
      'mds-combobox',
      'mds-input',
      'mds-search-input',
    );
    expect(container.firstElementChild?.className).toBe(
      'mds-input mds-search-input mds-combobox extra',
    );
  });
  it('is a closed combobox named by its label until the user acts', () => {
    const { input } = setup();
    expect(screen.getByRole('combobox', { name: 'Members' })).toBe(input);
    expect(input).toHaveAttribute('aria-autocomplete', 'list');
    expect(input).toHaveAttribute('aria-expanded', 'false');
    expect(input).not.toHaveAttribute('aria-controls');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
  it('forwards the ref and extra props to the native input', () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <Combobox
        {...baseProps}
        ref={ref}
        data-testid="field"
        placeholder="Search"
      />,
    );
    const input = screen.getByRole('combobox');
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toBe(input);
    expect(input).toHaveAttribute('data-testid', 'field');
    expect(input).toHaveAttribute('placeholder', 'Search');
  });
  it('names the field with aria-label when the label is hidden', () => {
    setup({ hideLabel: true });
    expect(screen.getByRole('combobox', { name: 'Members' })).toBeVisible();
    expect(screen.queryByText('Members')).not.toBeInTheDocument();
  });

  it('opens when the user types and wires aria-controls to the listbox', async () => {
    const { user, input } = setup();
    await user.type(input, 'j');

    const listbox = await screen.findByRole('listbox', { name: 'Members' });
    expect(input).toHaveAttribute('aria-expanded', 'true');
    expect(input).toHaveAttribute('aria-controls', listbox.id);
  });

  it('opens on ArrowDown with nothing typed, showing every option', async () => {
    const { user, input } = setup();
    input.focus();
    await user.keyboard('{ArrowDown}');

    const listbox = await screen.findByRole('listbox');
    expect(within(listbox).getAllByRole('option')).toHaveLength(4);
  });

  it('opens from the chevron button, which has its own accessible name', async () => {
    const { user } = setup();
    await user.click(screen.getByRole('button', { name: 'Show options' }));
    expect(await screen.findByRole('listbox')).toBeInTheDocument();
    // Focus stays on the field.
    expect(screen.getByRole('combobox')).toHaveFocus();
  });

  it('filters with the built-in filter as the user types (case, accents, label first)', async () => {
    const { user, input } = setup();
    await user.type(input, 'jose');

    const rows = await screen.findAllByRole('option');
    expect(rows.map((row) => row.textContent)).toEqual([
      'José Alvarez',
      'Maria Jose',
    ]);
  });
  // aria-orientation is only valid on the listbox; a generic panel with it
  // fails Axe. Floating UI adds it through the navigation props.
  it('stops at the last row after the list narrows, never on a row that is gone', async () => {
    const many = Array.from({ length: 8 }, (_, i) => ({
      value: `v${i}`,
      label: i < 2 ? `Match ${i}` : `Other ${i}`,
    }));
    const { user, input } = setup({ options: many });
    input.focus();
    await user.keyboard('{ArrowDown}');
    await screen.findAllByRole('option');
    await user.type(input, 'match');
    await waitFor(() => expect(screen.getAllByRole('option')).toHaveLength(2));
    await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}');

    const rows = screen.getAllByRole('option');
    expect(input).toHaveAttribute('aria-activedescendant', rows[1].id);
  });

  it('draws the keyboard focus ring after arrow keys, and drops it when the pointer moves', async () => {
    const { user, input } = setup();
    input.focus();
    await user.keyboard('{ArrowDown}');
    const listbox = await screen.findByRole('listbox');
    expect(listbox).toHaveClass('mds-combobox__listbox--keyboard');

    await user.hover(listbox);
    expect(listbox).not.toHaveClass('mds-combobox__listbox--keyboard');
  });

  it('puts aria-orientation on the listbox, not the generic menu panel', async () => {
    const { user, input } = setup();
    input.focus();
    await user.keyboard('{ArrowDown}');
    const listbox = await screen.findByRole('listbox');
    expect(listbox).toHaveAttribute('aria-orientation', 'vertical');
    expect(listbox.parentElement).not.toHaveAttribute('aria-orientation');
  });

  it('reports a single value as a string and null once it is removed', async () => {
    const onValueChange = vi.fn();
    const { user } = setup({ defaultValue: 'jessica', onValueChange });
    await user.click(
      screen.getByRole('button', { name: 'Remove Jessica Parker' }),
    );
    expect(onValueChange).toHaveBeenLastCalledWith(null);
  });

  it('treats a null single value as controlled and empty', () => {
    setup({ value: null });
    expect(
      screen.queryByRole('button', { name: /^Remove / }),
    ).not.toBeInTheDocument();
  });

  it('uses a custom filterOptions in place of the built-in filter, including its order', async () => {
    const { user, input } = setup({
      filterOptions: (all) => [...all].reverse(),
    });
    await user.type(input, 'zzz');
    const rows = await screen.findAllByRole('option');
    expect(rows.map((row) => row.textContent)).toEqual(
      [...options]
        .reverse()
        .map((option) => expect.stringContaining(option.label)),
    );
  });
  it('passes filterOptions the options not yet chosen and the typed text, and shows what it returns', async () => {
    const filterOptions = vi.fn((all: ComboboxOption[]) => all.slice(0, 1));
    const { user, input } = setup({
      multiple: true,
      defaultValue: ['jessica'],
      filterOptions,
    });
    await user.type(input, 'ab');
    expect(filterOptions).toHaveBeenLastCalledWith(
      options.filter((option) => option.value !== 'jessica'),
      'ab',
    );
    expect(await screen.findAllByRole('option')).toHaveLength(1);
  });

  it('moves aria-activedescendant with the arrow keys, marks only that option aria-selected, and keeps focus on the input', async () => {
    const { user, input } = setup();
    input.focus();
    await user.keyboard('{ArrowDown}{ArrowDown}');

    const rows = await screen.findAllByRole('option');
    expect(input).toHaveAttribute('aria-activedescendant', rows[1].id);
    expect(input).toHaveFocus();
    // aria-selected follows the highlighted option (the APG combobox pattern),
    // not a constant false.
    expect(rows.map((row) => row.getAttribute('aria-selected'))).toEqual([
      'false',
      'true',
      'false',
      'false',
    ]);
  });
  it('skips disabled options when navigating', async () => {
    const { user, input } = setup();
    input.focus();
    await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}');

    const options = await screen.findAllByRole('option');
    expect(options[2]).toHaveAttribute('aria-disabled', 'true');
    expect(input).toHaveAttribute('aria-activedescendant', options[3].id);
  });

  it('does not choose a disabled option on click', async () => {
    const onValueChange = vi.fn();
    const { user, input } = setup({ onValueChange });
    await user.type(input, 'sam');
    await user.click(await screen.findByRole('option', { name: 'Sam Lee' }));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('chooses the highlighted option with Enter, adds a tag and clears the text', async () => {
    const onValueChange = vi.fn();
    const { user, input } = setup({ multiple: true, onValueChange });
    await user.type(input, 'jess');
    await user.keyboard('{ArrowDown}{Enter}');

    expect(onValueChange).toHaveBeenCalledWith(['jessica']);
    expect(input).toHaveValue('');
    expect(
      screen.getByRole('button', { name: 'Remove Jessica Parker' }),
    ).toBeInTheDocument();
    expect(input).toHaveFocus();
  });

  it('keeps the menu open after a choice when multiple, without the chosen option', async () => {
    const { user, input } = setup({ multiple: true });
    await user.type(input, 'jess');
    await user.click(
      await screen.findByRole('option', { name: /Jessica Parker/ }),
    );

    const listbox = await screen.findByRole('listbox');
    expect(listbox).toHaveAttribute('aria-multiselectable', 'true');
    expect(
      within(listbox).queryByRole('option', { name: /Jessica/ }),
    ).not.toBeInTheDocument();
  });

  it('closes after a choice when single and replaces the previous value', async () => {
    const onValueChange = vi.fn();
    const { user, input } = setup({ onValueChange });
    await user.type(input, 'jess');
    await user.click(await screen.findByRole('option'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    await user.type(input, 'maria');
    await user.click(await screen.findByRole('option'));
    expect(onValueChange).toHaveBeenLastCalledWith('maria');
    expect(screen.getAllByRole('button', { name: /^Remove / })).toHaveLength(1);
  });

  it('does not submit the surrounding form when Enter chooses an option', async () => {
    const onSubmit = vi.fn((event) => event.preventDefault());
    const user = userEvent.setup();
    render(
      <form onSubmit={onSubmit}>
        <Combobox {...baseProps} />
      </form>,
    );
    const input = screen.getByRole('combobox');
    await user.type(input, 'jess');
    await user.keyboard('{ArrowDown}{Enter}');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('closes on Escape keeping the text and focus, then clears the text on a second Escape', async () => {
    const { user, input } = setup();
    await user.type(input, 'j');
    await screen.findByRole('listbox');
    await user.keyboard('{Escape}');

    await waitFor(() =>
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument(),
    );
    expect(input).toHaveFocus();
    expect(input).toHaveValue('j');

    await user.keyboard('{Escape}');
    expect(input).toHaveValue('');
  });
  it('leaves Home and End to the text field, moving the caret without changing the highlight', async () => {
    const { user, input } = setup();
    await user.type(input, 'jo');
    const options = await screen.findAllByRole('option');
    await user.keyboard('{ArrowDown}');
    const active = input.getAttribute('aria-activedescendant');
    expect(active).toBe(options[0].id);

    await user.keyboard('{Home}');
    expect((input as HTMLInputElement).selectionStart).toBe(0);
    expect(input).toHaveAttribute('aria-activedescendant', active);
    expect(input).toHaveAttribute('aria-expanded', 'true');

    await user.keyboard('{End}');
    expect((input as HTMLInputElement).selectionStart).toBe(2);
    expect(input).toHaveAttribute('aria-activedescendant', active);
    expect(input).toHaveValue('jo');
    expect(input).toHaveFocus();
  });

  it('closes on outside press', async () => {
    const { user, input } = setup();
    await user.type(input, 'j');
    await screen.findByRole('listbox');
    await user.click(document.body);
    await waitFor(() =>
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument(),
    );
    expect(input).toHaveAttribute('aria-expanded', 'false');
  });

  it('discards unmatched text on blur but keeps chosen tags', async () => {
    const { user, input } = setup({ defaultValue: 'jessica' });
    await user.type(input, 'zzz');
    await user.tab();

    expect(input).toHaveValue('');
    expect(
      screen.getByRole('button', { name: 'Remove Jessica Parker' }),
    ).toBeInTheDocument();
  });

  it('keeps typed text and the open menu when the window loses focus but the field stays active', async () => {
    const { user, input } = setup();
    await user.type(input, 'jes');
    // A deactivated window blurs the field while it remains the active element.
    fireEvent.blur(input);

    expect(input).toHaveFocus();
    expect(input).toHaveValue('jes');
    expect(input).toHaveAttribute('aria-expanded', 'true');
  });

  it('portals the menu into the dialog the field sits in, and to the body otherwise', async () => {
    const dialog = render(
      <div role="dialog" aria-modal="true" aria-label="Enrol users">
        <Combobox {...baseProps} />
      </div>,
    );
    await userEvent.setup().type(screen.getByRole('combobox'), 'j');
    const inDialog = await screen.findByRole('listbox');
    expect(inDialog.closest('[role="dialog"]')).not.toBeNull();
    dialog.unmount();

    const { user, input } = setup();
    await user.type(input, 'j');
    const onPage = await screen.findByRole('listbox');
    expect(onPage.closest('[role="dialog"]')).toBeNull();
    expect(document.body).toContainElement(onPage);
  });

  it('removes a tag and returns focus to the field', async () => {
    const onValueChange = vi.fn();
    const { user, input } = setup({
      multiple: true,
      defaultValue: ['jessica', 'maria'],
      onValueChange,
    });
    await user.click(
      screen.getByRole('button', { name: 'Remove Jessica Parker' }),
    );

    expect(onValueChange).toHaveBeenCalledWith(['maria']);
    expect(input).toHaveFocus();
  });

  it('shows the chevron only while the field is empty; typed text or a chosen value leaves just the clear button', async () => {
    const onValueChange = vi.fn();
    const { user, input, rerender } = setup({ multiple: true, onValueChange });
    expect(
      screen.queryByRole('button', { name: 'Clear all' }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Show options' })).toBeVisible();

    await user.type(input, 'jes');
    expect(screen.getByRole('button', { name: 'Clear all' })).toBeVisible();
    expect(
      screen.queryByRole('button', { name: 'Show options' }),
    ).not.toBeInTheDocument();

    rerender(
      <Combobox
        {...baseProps}
        multiple
        value={['jessica']}
        onValueChange={onValueChange}
      />,
    );
    expect(
      screen.queryByRole('button', { name: 'Show options' }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Clear all' }));
    expect(onValueChange).toHaveBeenCalledWith([]);
    expect(input).toHaveFocus();
  });
  it('supports controlled value and inputValue', async () => {
    const onInputChange = vi.fn();
    const Controlled = () => {
      const [value, setValue] = useState<string[]>([]);
      return (
        <Combobox
          {...baseProps}
          multiple
          value={value}
          onValueChange={setValue}
          inputValue="jess"
          onInputChange={onInputChange}
        />
      );
    };
    const user = userEvent.setup();
    render(<Controlled />);
    const input = screen.getByRole('combobox');
    expect(input).toHaveValue('jess');

    await user.click(input);
    await user.keyboard('{ArrowDown}{Enter}');
    expect(
      await screen.findByRole('button', { name: 'Remove Jessica Parker' }),
    ).toBeInTheDocument();
    expect(onInputChange).toHaveBeenCalledWith('');
  });

  it('keeps a tag for a chosen option after options updates drop it', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Combobox {...baseProps} multiple />);
    await user.type(screen.getByRole('combobox'), 'jess');
    await user.click(await screen.findByRole('option'));

    rerender(<Combobox {...baseProps} multiple options={[options[0]]} />);
    // Uncontrolled value is kept, and the tag still has its label.
    expect(
      screen.getByRole('button', { name: 'Remove Jessica Parker' }),
    ).toBeInTheDocument();
  });

  it('submits each chosen value as a hidden input and never the typed text', () => {
    const { container } = setup({
      name: 'members',
      multiple: true,
      defaultValue: ['jessica', 'maria'],
    });
    const hidden = container.querySelectorAll<HTMLInputElement>(
      'input[type="hidden"][name="members"]',
    );
    expect(Array.from(hidden).map((input) => input.value)).toEqual([
      'jessica',
      'maria',
    ]);
    expect(screen.getByRole('combobox')).not.toHaveAttribute('name');
  });

  it('marks the label required but only enforces it natively until a value is chosen', () => {
    const { input, rerender } = setup({ required: true });
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(input).toBeRequired();

    rerender(<Combobox {...baseProps} required value="jessica" />);
    expect(screen.getByRole('combobox')).not.toBeRequired();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('reports a required field through the shared invalid feedback, not the browser bubble', async () => {
    const { user, input } = setup({ required: true });
    await user.click(input);
    await user.tab();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription(input.validationMessage);
  });

  it('reaches the chevron with Tab after the field', async () => {
    const { user, input } = setup();
    await user.click(input);
    await user.tab();
    expect(screen.getByRole('button', { name: 'Show options' })).toHaveFocus();
  });

  it('shows the loading message and announces it', async () => {
    const { user, input } = setup({ loading: true, options: [] });
    await user.type(input, 'j');

    expect(await screen.findAllByText('Loading results…')).toHaveLength(2);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('shows a no-results message that repeats the search term, not an empty listbox', async () => {
    const { user, input } = setup();
    await user.type(input, 'Jsoe');

    expect(await screen.findAllByText("No matches for 'Jsoe'")).toHaveLength(2);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    // The field points at the menu panel, never at an empty listbox.
    expect(input).toHaveAttribute(
      'aria-controls',
      document.querySelector('.mds-combobox__status')?.parentElement?.id,
    );
  });

  it('announces the result count through a status live region', async () => {
    const { user, input } = setup();
    await user.type(input, 'jose');
    await waitFor(() =>
      expect(screen.getByRole('status')).toHaveTextContent(
        '2 results available',
      ),
    );
  });

  it('reports the cleared text through onInputChange after a choice and on blur', async () => {
    const onInputChange = vi.fn();
    const { user, input } = setup({ multiple: true, onInputChange });
    await user.type(input, 'jess');
    await user.click(await screen.findByRole('option'));
    expect(onInputChange).toHaveBeenLastCalledWith('');

    await user.type(input, 'zzz');
    expect(onInputChange).toHaveBeenLastCalledWith('zzz');
    await user.tab();
    expect(onInputChange).toHaveBeenLastCalledWith('');
  });

  it('is multiselectable only when multiple', async () => {
    const single = setup();
    single.input.focus();
    await single.user.keyboard('{ArrowDown}');
    expect(await screen.findByRole('listbox')).not.toHaveAttribute(
      'aria-multiselectable',
    );
  });

  it('submits a single value as one hidden input', () => {
    const { container } = setup({ name: 'member', defaultValue: 'jessica' });
    const hidden = container.querySelectorAll<HTMLInputElement>(
      'input[type="hidden"][name="member"]',
    );
    expect(Array.from(hidden).map((input) => input.value)).toEqual(['jessica']);
  });

  it('renders supporting lines and avatar content inside option rows', async () => {
    const { user, input } = setup({
      options: [
        {
          value: 'a',
          label: 'Ana Silva',
          username: 'asilva',
          email: 'ana@example.com',
          institution: 'Moodle HQ',
        },
      ],
    });
    input.focus();
    await user.keyboard('{ArrowDown}');
    const option = await screen.findByRole('option');
    expect(option).toHaveTextContent('Ana Silva');
    expect(option).toHaveTextContent('asilva');
    expect(option).toHaveTextContent('ana@example.com');
    expect(option).toHaveTextContent('Moodle HQ');
  });

  it('links invalid feedback with aria-describedby and sets aria-invalid', () => {
    const { input } = setup({
      invalid: true,
      invalidFeedback: 'Pick a member',
    });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    const feedback = screen.getByText('Pick a member');
    expect(input.getAttribute('aria-describedby')).toContain(feedback.id);
  });

  it('does not open when disabled and disables its controls and chosen tags', async () => {
    const { user, input } = setup({
      disabled: true,
      defaultValue: 'jessica',
      supportingText: 'Unavailable',
    });
    expect(input).toBeDisabled();
    expect(
      screen.getByRole('button', { name: 'Remove Jessica Parker' }),
    ).toBeDisabled();
    await user.type(input, 'j');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
  it('keeps the live region mounted while closed so announcements are reliable', () => {
    setup();
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });
  it('clears typed text and chosen values together and closes the menu', async () => {
    const onValueChange = vi.fn();
    const { user, input } = setup({
      multiple: true,
      defaultValue: ['jessica'],
      onValueChange,
    });
    await user.type(input, 'ma');
    await screen.findByRole('listbox');
    await user.click(screen.getByRole('button', { name: 'Clear all' }));

    expect(input).toHaveValue('');
    expect(onValueChange).toHaveBeenCalledWith([]);
    expect(input).toHaveFocus();
    await waitFor(() =>
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument(),
    );
    expect(
      screen.getByRole('button', { name: 'Show options' }),
    ).toBeInTheDocument();
  });

  it('keeps the clear button reachable by keyboard', async () => {
    const { user, input } = setup({
      multiple: true,
      defaultValue: ['jessica'],
    });
    input.focus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Clear all' })).toHaveFocus();
  });
});

describe('Combobox: long lists', () => {
  const total = COMBOBOX_RENDER_PAGE * 3 + 20;
  const many: ComboboxOption[] = Array.from({ length: total }, (_, i) => ({
    value: `v${i}`,
    label: `Person ${i}`,
  }));

  it('renders only the first page of a long list, announcing the full count', async () => {
    const { user, input } = setup({ options: many });
    input.focus();
    await user.keyboard('{ArrowDown}');

    const rows = await screen.findAllByRole('option');
    expect(rows).toHaveLength(COMBOBOX_RENDER_PAGE);
    expect(rows[0]).toHaveAttribute('aria-setsize', String(total));
    expect(rows[0]).toHaveAttribute('aria-posinset', '1');
    expect(rows[5]).toHaveAttribute('aria-posinset', '6');
    expect(screen.getByRole('status')).toHaveTextContent(
      `${total} results available`,
    );
  });

  it('renders short lists in full, without set sizes', async () => {
    const { user, input } = setup();
    input.focus();
    await user.keyboard('{ArrowDown}');
    const rows = await screen.findAllByRole('option');
    expect(rows).toHaveLength(4);
    expect(rows[0]).not.toHaveAttribute('aria-setsize');
  });

  it('adds the next page when the list is scrolled near its end', async () => {
    const { user, input } = setup({ options: many });
    input.focus();
    await user.keyboard('{ArrowDown}');
    const listbox = await screen.findByRole('listbox');

    // jsdom has no layout, so give the list a scroll position near its end.
    Object.defineProperty(listbox, 'scrollHeight', { value: 4000 });
    Object.defineProperty(listbox, 'clientHeight', { value: 400 });
    Object.defineProperty(listbox, 'scrollTop', {
      value: 3600,
      configurable: true,
    });
    fireEvent.scroll(listbox);

    await waitFor(() =>
      expect(screen.getAllByRole('option')).toHaveLength(
        COMBOBOX_RENDER_PAGE * 2,
      ),
    );
  });

  it('does not add rows when scrolled away from the end', async () => {
    const { user, input } = setup({ options: many });
    input.focus();
    await user.keyboard('{ArrowDown}');
    const listbox = await screen.findByRole('listbox');
    Object.defineProperty(listbox, 'scrollHeight', { value: 4000 });
    Object.defineProperty(listbox, 'clientHeight', { value: 400 });
    Object.defineProperty(listbox, 'scrollTop', { value: 500 });
    fireEvent.scroll(listbox);
    expect(screen.getAllByRole('option')).toHaveLength(COMBOBOX_RENDER_PAGE);
  });

  it('adds the next page when arrowing near the last rendered row, so navigation continues', async () => {
    const { user, input } = setup({ options: many });
    input.focus();
    // ArrowUp on the closed field opens the menu on its last rendered row.
    await user.keyboard('{ArrowUp}');
    await screen.findAllByRole('option');
    expect(input).toHaveAttribute(
      'aria-activedescendant',
      expect.stringMatching(new RegExp(`option-${COMBOBOX_RENDER_PAGE - 1}$`)),
    );

    // ArrowDown here adds the next page (and may not move yet); the next one
    // moves on to the first row of that page.
    await user.keyboard('{ArrowDown}{ArrowDown}');
    const rows = await screen.findAllByRole('option');
    expect(rows.length).toBeGreaterThan(COMBOBOX_RENDER_PAGE);
    expect(input).toHaveAttribute(
      'aria-activedescendant',
      rows[COMBOBOX_RENDER_PAGE].id,
    );
  });

  it('starts over at the first page when the text changes', async () => {
    const { user, input } = setup({ options: many });
    input.focus();
    await user.keyboard('{ArrowDown}');
    const listbox = await screen.findByRole('listbox');
    Object.defineProperty(listbox, 'scrollHeight', { value: 4000 });
    Object.defineProperty(listbox, 'clientHeight', { value: 400 });
    Object.defineProperty(listbox, 'scrollTop', {
      value: 3600,
      configurable: true,
    });
    fireEvent.scroll(listbox);
    await waitFor(() =>
      expect(screen.getAllByRole('option').length).toBeGreaterThan(
        COMBOBOX_RENDER_PAGE,
      ),
    );

    await user.type(input, 'person');
    await user.clear(input);
    await user.type(input, 'p');
    await waitFor(() =>
      expect(screen.getAllByRole('option')).toHaveLength(COMBOBOX_RENDER_PAGE),
    );
  });

  it('chooses an option from a later page', async () => {
    const onValueChange = vi.fn();
    const { user, input } = setup({ options: many, onValueChange });
    await user.type(input, 'Person 25');
    const row = await screen.findByRole('option', { name: 'Person 250' });
    await user.click(row);
    expect(onValueChange).toHaveBeenCalledWith('v250');
  });
});

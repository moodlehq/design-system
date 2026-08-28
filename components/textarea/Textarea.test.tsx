import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Textarea } from './Textarea';

describe('Textarea: Unit Test', () => {
  it('applies mds-textarea class to the wrapper', () => {
    const { container } = render(<Textarea label="Description" />);
    expect(container.firstChild).toHaveClass('mds-textarea');
  });

  it('applies mds-textarea-field class to the textarea element', () => {
    render(<Textarea label="Description" />);
    expect(screen.getByRole('textbox')).toHaveClass('mds-textarea-field');
  });

  it('applies form-control class to the textarea element', () => {
    render(<Textarea label="Description" />);
    expect(screen.getByRole('textbox')).toHaveClass('form-control');
  });

  it('renders the label text', () => {
    render(<Textarea label="My field" />);
    expect(screen.getByText('My field')).toBeInTheDocument();
  });

  it('associates the label with the textarea via htmlFor', () => {
    render(<Textarea label="My field" />);
    expect(screen.getByLabelText('My field')).toBeInTheDocument();
  });

  it('hides the label when hideLabel is true', () => {
    render(<Textarea label="Hidden" hideLabel />);
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

  it('renders invalidFeedback when hideLabel is true', () => {
    render(
      <Textarea
        label="Field"
        hideLabel
        invalid
        invalidFeedback="Error message"
      />,
    );
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('uses aria-label from label prop when hideLabel is true', () => {
    render(<Textarea label="Hidden label" hideLabel />);
    expect(
      screen.getByRole('textbox', { name: 'Hidden label' }),
    ).toBeInTheDocument();
  });

  it('prefers explicit aria-label over label prop when hideLabel is true', () => {
    render(
      <Textarea label="Label prop" hideLabel aria-label="Explicit label" />,
    );
    expect(
      screen.getByRole('textbox', { name: 'Explicit label' }),
    ).toBeInTheDocument();
  });

  it('renders the required asterisk when required is true', () => {
    render(<Textarea label="Required field" required />);
    const label = screen.getByText('Required field').closest('label');
    expect(label).toBeInTheDocument();

    const requiredIndicator = within(label as HTMLLabelElement).getByText('*');
    expect(requiredIndicator).toBeInTheDocument();
    expect(requiredIndicator).toHaveAttribute('aria-hidden', 'true');
  });

  it('does not render the asterisk when required is false', () => {
    render(<Textarea label="Optional field" />);
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });

  it('applies is-invalid class when invalid is true', () => {
    render(<Textarea label="Field" invalid />);
    expect(screen.getByRole('textbox')).toHaveClass('is-invalid');
  });

  it('does not apply is-invalid class when invalid is false', () => {
    render(<Textarea label="Field" />);
    expect(screen.getByRole('textbox')).not.toHaveClass('is-invalid');
  });

  it('sets aria-invalid when invalid is true', () => {
    render(<Textarea label="Field" invalid />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not set aria-invalid when invalid is false', () => {
    render(<Textarea label="Field" />);
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid');
  });

  it('renders invalidFeedback when invalid is true', () => {
    render(<Textarea label="Field" invalid invalidFeedback="Error message" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('does not render invalidFeedback when invalid is false', () => {
    render(<Textarea label="Field" invalidFeedback="Error message" />);
    expect(screen.queryByText('Error message')).not.toBeInTheDocument();
  });

  it('associates the feedback text with the textarea via aria-describedby', () => {
    render(<Textarea label="Field" invalid invalidFeedback="Error message" />);
    const textarea = screen.getByRole('textbox');
    const feedbackId = textarea.getAttribute('aria-describedby');
    expect(feedbackId).toBeTruthy();
    expect(document.getElementById(feedbackId!)).toHaveTextContent(
      'Error message',
    );
  });

  it('renders supportingText in the footer', () => {
    render(<Textarea label="Field" supportingText="Helper text" />);
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('does not render supportingText when invalid+invalidFeedback is shown', () => {
    render(
      <Textarea
        label="Field"
        invalid
        invalidFeedback="Error"
        supportingText="Helper"
      />,
    );
    expect(screen.queryByText('Helper')).not.toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('renders the counter when showCounter and maxLength are provided', () => {
    render(
      <Textarea label="Field" showCounter maxLength={100} defaultValue="" />,
    );
    expect(screen.getByText('0 / 100')).toBeInTheDocument();
  });

  it('does not render the counter when showCounter is false', () => {
    render(<Textarea label="Field" maxLength={100} />);
    expect(screen.queryByText('0 / 100')).not.toBeInTheDocument();
  });

  it('updates counter display when value changes (controlled)', async () => {
    const { rerender } = render(
      <Textarea
        label="Field"
        showCounter
        maxLength={100}
        value=""
        onChange={() => {}}
      />,
    );
    expect(screen.getByText('0 / 100')).toBeInTheDocument();
    rerender(
      <Textarea
        label="Field"
        showCounter
        maxLength={100}
        value="Hello"
        onChange={() => {}}
      />,
    );
    expect(screen.getByText('5 / 100')).toBeInTheDocument();
  });

  it('updates counter display when typing into an uncontrolled textarea', async () => {
    const user = userEvent.setup();
    render(<Textarea label="Field" showCounter maxLength={100} />);

    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'Hello');

    expect(screen.getByText('5 / 100')).toBeInTheDocument();
  });

  it('applies custom counter aria-label formatter when provided', () => {
    render(
      <Textarea
        label="Field"
        showCounter
        maxLength={100}
        value="hello"
        onChange={() => {}}
        counterAriaLabel={(current, max) =>
          `${current} von ${max} Zeichen verwendet`
        }
      />,
    );

    expect(screen.getByText('5 / 100')).toHaveAttribute(
      'aria-label',
      '5 von 100 Zeichen verwendet',
    );
  });

  it('does not add default English aria-label when no formatter is provided', () => {
    render(<Textarea label="Field" showCounter maxLength={100} />);
    expect(screen.getByText('0 / 100')).not.toHaveAttribute('aria-label');
  });

  it('announces remaining-character milestones using custom formatter', async () => {
    const user = userEvent.setup();
    render(
      <Textarea
        label="Field"
        showCounter
        maxLength={10}
        counterRemainingAnnouncement={(remaining, max) =>
          `Il reste ${remaining} sur ${max}`
        }
      />,
    );

    await user.type(screen.getByRole('textbox'), 'abcde');

    expect(screen.getByRole('status')).toHaveTextContent('Il reste 5 sur 10');
  });

  it('announces over-limit text using custom formatter', () => {
    const { rerender } = render(
      <Textarea
        label="Field"
        showCounter
        maxLength={5}
        value="abcde"
        onChange={() => {}}
        counterOverLimitAnnouncement={(over, max) =>
          `${over} au-dessus de la limite de ${max}`
        }
      />,
    );

    rerender(
      <Textarea
        label="Field"
        showCounter
        maxLength={5}
        value="abcdef"
        onChange={() => {}}
        counterOverLimitAnnouncement={(over, max) =>
          `${over} au-dessus de la limite de ${max}`
        }
      />,
    );

    expect(screen.getByRole('status')).toHaveTextContent(
      '1 au-dessus de la limite de 5',
    );
  });

  it('applies mds-textarea-field--no-resize class when resizable is false', () => {
    render(<Textarea label="Field" resizable={false} />);
    expect(screen.getByRole('textbox')).toHaveClass(
      'mds-textarea-field--no-resize',
    );
  });

  it('does not apply no-resize class when resizable is true', () => {
    render(<Textarea label="Field" resizable />);
    expect(screen.getByRole('textbox')).not.toHaveClass(
      'mds-textarea-field--no-resize',
    );
  });

  it('disables the textarea when disabled is true', () => {
    render(<Textarea label="Field" disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('makes textarea read-only when readOnly is true', () => {
    render(<Textarea label="Field" readOnly />);
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
  });

  it('forwards extra props to the underlying textarea element', () => {
    render(<Textarea label="Field" data-testid="my-textarea" />);
    expect(screen.getByTestId('my-textarea')).toBeInTheDocument();
  });

  it('appends consumer className to the wrapper', () => {
    const { container } = render(
      <Textarea label="Field" className="custom-class" />,
    );
    expect(container.firstChild).toHaveClass('mds-textarea', 'custom-class');
  });

  it('uses provided id on the textarea', () => {
    render(<Textarea label="Field" id="my-id" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'my-id');
    expect(screen.getByText('Field').closest('label')).toHaveAttribute(
      'for',
      'my-id',
    );
  });

  it('forwards ref to the underlying textarea element', () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<Textarea label="Field" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('does not render the footer row when no footer content is needed', () => {
    const { container } = render(<Textarea label="Field" />);
    expect(container.querySelector('.mds-textarea-footer')).toBeNull();
  });

  it('warns in dev mode when hideLabel is true without a label', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Textarea hideLabel />);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('label prop or aria-label attribute is required'),
    );
    vi.restoreAllMocks();
  });

  it('warns in dev mode when showCounter is true without maxLength', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Textarea label="Field" showCounter />);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('showCounter=true requires maxLength'),
    );
    vi.restoreAllMocks();
  });

  it('warns in dev mode when disabled is true without supportingText', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Textarea label="Field" disabled />);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining(
        'disabled fields should include supportingText that explains why input is unavailable',
      ),
    );
    vi.restoreAllMocks();
  });

  describe('Textarea: supportingText visible when hideLabel is true', () => {
    it('renders supportingText even when hideLabel is true', () => {
      render(<Textarea label="Field" hideLabel supportingText="Helper" />);
      expect(screen.getByText('Helper')).toBeInTheDocument();
    });
  });

  it('renders the info tooltip button when infoTooltipLabel is provided', () => {
    render(<Textarea label="Field" infoTooltipLabel="More about this field" />);
    expect(
      screen.getByRole('button', { name: 'More about this field' }),
    ).toHaveClass('mds-field-info-button');
  });

  it('does not render the info button when hideLabel is true', () => {
    render(
      <Textarea
        label="Field"
        hideLabel
        aria-label="Field"
        infoTooltipLabel="More about this field"
      />,
    );
    expect(
      screen.queryByRole('button', { name: 'More about this field' }),
    ).not.toBeInTheDocument();
  });

  it('renders the invalid icon when invalid is true', () => {
    const { container } = render(<Textarea label="Field" invalid />);
    expect(
      container.querySelector('.mds-textarea-invalid-icon'),
    ).toBeInTheDocument();
  });

  it('does not render the invalid icon when invalid is false', () => {
    const { container } = render(<Textarea label="Field" />);
    expect(
      container.querySelector('.mds-textarea-invalid-icon'),
    ).not.toBeInTheDocument();
  });

  it('sets aria-readonly when readOnly is true', () => {
    render(<Textarea label="Field" readOnly />);
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'aria-readonly',
      'true',
    );
  });

  it('does not set aria-readonly when readOnly is false', () => {
    render(<Textarea label="Field" />);
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-readonly');
  });

  it('links counter to textarea via aria-describedby when showCounter and maxLength are set', () => {
    render(<Textarea label="Field" showCounter maxLength={100} />);
    const textarea = screen.getByRole('textbox');
    const describedBy = textarea.getAttribute('aria-describedby') ?? '';
    expect(describedBy).not.toBe('');
    const counterEl = document.getElementById(describedBy.split(' ').at(-1)!);
    expect(counterEl).toHaveTextContent('0 / 100');
  });

  it('includes both feedback id and counter id in aria-describedby', () => {
    render(
      <Textarea
        label="Field"
        invalid
        invalidFeedback="Error"
        showCounter
        maxLength={100}
      />,
    );
    const textarea = screen.getByRole('textbox');
    const describedBy = textarea.getAttribute('aria-describedby') ?? '';
    const ids = describedBy.split(' ');
    expect(ids.length).toBe(2);
    expect(document.getElementById(ids[0])).toHaveTextContent('Error');
    expect(document.getElementById(ids[1])).toHaveTextContent('0 / 100');
  });

  it('merges consumer aria-describedby with generated ids', () => {
    render(
      <>
        <span id="external-hint">External hint</span>
        <Textarea
          label="Field"
          aria-describedby="external-hint"
          invalid
          invalidFeedback="Error"
          showCounter
          maxLength={100}
        />
      </>,
    );

    const textarea = screen.getByRole('textbox');
    const describedBy = textarea.getAttribute('aria-describedby') ?? '';
    const ids = describedBy.split(' ');

    expect(ids).toContain('external-hint');
    expect(ids.length).toBe(3);
    expect(document.getElementById('external-hint')).toHaveTextContent(
      'External hint',
    );
    expect(document.getElementById(ids[1])).toHaveTextContent('Error');
    expect(document.getElementById(ids[2])).toHaveTextContent('0 / 100');
  });

  it('links hidden-label invalid feedback via aria-describedby', () => {
    render(
      <Textarea
        hideLabel
        aria-label="Field"
        invalid
        invalidFeedback="Hidden label error"
      />,
    );

    const textarea = screen.getByRole('textbox', { name: 'Field' });
    const feedbackId = textarea.getAttribute('aria-describedby');

    expect(screen.queryByText('Field')).not.toBeInTheDocument();
    expect(feedbackId).toBeTruthy();
    expect(document.getElementById(feedbackId!)).toHaveTextContent(
      'Hidden label error',
    );
  });

  it('merges consumer aria-describedby when hideLabel is true', () => {
    render(
      <>
        <span id="external-description">External description</span>
        <Textarea
          hideLabel
          aria-label="Field"
          aria-describedby="external-description"
          invalid
          invalidFeedback="Error"
        />
      </>,
    );

    const textarea = screen.getByRole('textbox', { name: 'Field' });
    const describedBy = textarea.getAttribute('aria-describedby') ?? '';
    const ids = describedBy.split(' ');

    expect(ids).toContain('external-description');
    expect(ids.length).toBe(2);
    expect(document.getElementById('external-description')).toHaveTextContent(
      'External description',
    );
    expect(document.getElementById(ids[1])).toHaveTextContent('Error');
  });

  it('only applies pointer-focus class for pointer-initiated focus', async () => {
    const user = userEvent.setup();
    render(
      <>
        <button type="button">Before</button>
        <Textarea label="Field" />
      </>,
    );

    const textarea = screen.getByRole('textbox');

    await user.tab();
    await user.tab();
    expect(textarea).toHaveFocus();
    expect(textarea).not.toHaveClass('mds-textarea-field--pointer-focus');

    fireEvent.blur(textarea);
    fireEvent.pointerDown(textarea);
    fireEvent.focus(textarea);

    expect(textarea).toHaveClass('mds-textarea-field--pointer-focus');

    fireEvent.blur(textarea);
    expect(textarea).not.toHaveClass('mds-textarea-field--pointer-focus');
  });

  it('keeps no-resize behavior when readOnly is enabled', () => {
    render(<Textarea label="Field" readOnly resizable={false} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('mds-textarea-field--readonly');
    expect(textarea).toHaveClass('mds-textarea-field--no-resize');
    expect(textarea).toHaveAttribute('readonly');
  });

  it('shows supporting guidance instead of invalid feedback when disabled', () => {
    render(
      <Textarea
        label="Field"
        disabled
        invalid
        invalidFeedback="Error message"
        supportingText="Guidance text"
      />,
    );

    expect(screen.getByText('Guidance text')).toBeInTheDocument();
    expect(screen.queryByText('Error message')).not.toBeInTheDocument();
  });

  it('shows controlled values above maxLength in the counter display', () => {
    const { rerender } = render(
      <Textarea
        label="Field"
        showCounter
        maxLength={5}
        value="abcde"
        onChange={() => {}}
      />,
    );

    expect(screen.getByText('5 / 5')).toBeInTheDocument();

    rerender(
      <Textarea
        label="Field"
        showCounter
        maxLength={5}
        value="abcdef"
        onChange={() => {}}
      />,
    );

    expect(screen.getByText('6 / 5')).toBeInTheDocument();
  });

  it('announces milestone text only when a threshold is crossed', async () => {
    const user = userEvent.setup();
    render(
      <Textarea
        label="Field"
        showCounter
        maxLength={25}
        counterRemainingAnnouncement={(remaining, max) =>
          `${remaining} characters left out of ${max}`
        }
      />,
    );

    const textarea = screen.getByRole('textbox');
    const status = screen.getByRole('status');

    await user.type(textarea, 'abcd');
    expect(status).toHaveTextContent('');

    await user.type(textarea, 'e');
    expect(status).toHaveTextContent('20 characters left out of 25');
  });
}) as unknown as void;

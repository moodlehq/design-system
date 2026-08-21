import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Alert } from './Alert';

describe('Alert: Unit Test', () => {
  it('applies mds hook class and default info variant class', () => {
    render(<Alert title="Title" message="Message" />);

    const liveRegion = screen.getByRole('status');

    const alert = liveRegion.closest('.mds-alert');
    expect(alert).not.toBeNull();
    expect(alert).toHaveClass('mds-alert');
    expect(alert).toHaveClass('mds-alert--info');
  });

  it('uses role alert for warning and danger variants', () => {
    const { rerender } = render(
      <Alert type="warning" title="Warning" message="Message" />,
    );

    const warningLiveRegion = screen.getByRole('alert');
    const warningAlert = warningLiveRegion.closest('.mds-alert');
    expect(warningAlert).not.toBeNull();
    expect(warningAlert).toHaveClass('mds-alert--warning');

    rerender(<Alert type="danger" title="Danger" message="Message" />);

    const dangerLiveRegion = screen.getByRole('alert');
    const dangerAlert = dangerLiveRegion.closest('.mds-alert');
    expect(dangerAlert).not.toBeNull();
    expect(dangerAlert).toHaveClass('mds-alert--danger');
  });

  it('falls back to info for invalid type values', () => {
    render(<Alert type={'bad' as unknown as 'info'} message="Message" />);

    const alert = screen.getByRole('status').closest('.mds-alert');
    expect(alert).not.toBeNull();
    expect(alert).toHaveClass('mds-alert--info');
  });

  it('renders action button when actionable with a label', () => {
    const onAction = vi.fn();

    render(
      <Alert
        title="Title"
        message="Message"
        isActionable
        actionLabel="Retry"
        onAction={onAction}
      />,
    );

    const actionButton = screen.getByRole('button', { name: 'Retry' });
    expect(actionButton).toHaveClass('mds-btn');
    expect(actionButton).toHaveClass('btn-outline-secondary');

    fireEvent.click(actionButton);
    expect(onAction).toHaveBeenCalledOnce();
  });

  it('renders dismiss button and removes alert when clicked', () => {
    const onDismiss = vi.fn();

    render(
      <>
        <Alert
          title="Title"
          message="Message"
          isDismissible
          dismissAriaLabel="Close alert"
          onDismiss={onDismiss}
        />
        <button type="button">Next focus target</button>
      </>,
    );

    const dismissButton = screen.getByRole('button', { name: 'Close alert' });
    fireEvent.click(dismissButton);

    expect(onDismiss).toHaveBeenCalledOnce();
    expect(screen.queryByText('Message')).not.toBeInTheDocument();
  });

  it('moves focus to the next focusable element after dismiss', () => {
    const requestAnimationFrameSpy = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback: FrameRequestCallback) => {
        callback(0);
        return 0;
      });

    render(
      <>
        <Alert
          title="Title"
          message="Message"
          isDismissible
          dismissAriaLabel="Close alert"
        />
        <button type="button">Next focus target</button>
      </>,
    );

    const dismissButton = screen.getByRole('button', { name: 'Close alert' });
    const nextButton = screen.getByRole('button', {
      name: 'Next focus target',
    });

    dismissButton.focus();
    fireEvent.click(dismissButton);

    expect(nextButton).toHaveFocus();

    requestAnimationFrameSpy.mockRestore();
  });

  it('forwards extra props to host element', () => {
    render(
      <Alert
        title="Title"
        message="Message"
        data-testid="alert"
        aria-describedby="form-hint"
      />,
    );

    const alert = screen.getByTestId('alert');
    expect(alert).toHaveAttribute('aria-describedby', 'form-hint');
  });

  it('renders custom slot content when children are provided', () => {
    render(
      <Alert title="Title" message="Message">
        <a href="#">Learn more</a>
      </Alert>,
    );

    expect(
      screen.getByRole('link', { name: 'Learn more' }),
    ).toBeInTheDocument();
  });
});

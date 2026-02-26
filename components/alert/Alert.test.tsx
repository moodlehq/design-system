import {
  faCircleCheck,
  faCircleExclamation,
  faCircleInfo,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fc from 'fast-check';
import { describe, expect, it, vi } from 'vitest';
import { fuzzComponent } from '../../tests/utils/fuzzComponent';
import { Alert, AlertProps } from './Alert';

describe('Alert: Unit Test', () => {
  it('applies mds class name', () => {
    render(<Alert heading="Test Alert">Alert content</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('mds-alert');
  });

  it('renders with heading only', () => {
    render(<Alert heading="Test Heading" />);
    expect(screen.getByText('Test Heading')).toBeInTheDocument();
  });

  it('renders with children', () => {
    render(<Alert heading="Test">This is alert content</Alert>);
    expect(screen.getByText('This is alert content')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    const { container } = render(
      <Alert
        heading="Test"
        icon={<FontAwesomeIcon icon={faCircleExclamation} />}
      />,
    );
    expect(
      container.querySelector('[data-icon="circle-exclamation"]'),
    ).toBeInTheDocument();
  });

  it('applies success variant', () => {
    render(
      <Alert heading="Success" variant="success">
        Success message
      </Alert>,
    );
    expect(screen.getByRole('alert')).toHaveClass('alert-success');
  });

  it('applies info variant', () => {
    render(
      <Alert heading="Info" variant="info">
        Info message
      </Alert>,
    );
    expect(screen.getByRole('alert')).toHaveClass('alert-info');
  });

  it('applies warning variant', () => {
    render(
      <Alert heading="Warning" variant="warning">
        Warning message
      </Alert>,
    );
    expect(screen.getByRole('alert')).toHaveClass('alert-warning');
  });

  it('applies danger variant', () => {
    render(
      <Alert heading="Danger" variant="danger">
        Danger message
      </Alert>,
    );
    expect(screen.getByRole('alert')).toHaveClass('alert-danger');
  });

  it('defaults to info variant when invalid variant provided', () => {
    render(
      <Alert
        heading="Test"
        variant={'invalid' as unknown as AlertProps['variant']}
      >
        Test message
      </Alert>,
    );
    expect(screen.getByRole('alert')).toHaveClass('alert-info');
  });

  it('renders action button when actionLabel and onActionClick provided', () => {
    const handleAction = vi.fn();
    render(
      <Alert heading="Test" actionLabel="Click Me" onActionClick={handleAction}>
        Test content
      </Alert>,
    );
    expect(
      screen.getByRole('button', { name: 'Click Me' }),
    ).toBeInTheDocument();
  });

  it('calls onActionClick when action button is clicked', async () => {
    const user = userEvent.setup();
    const handleAction = vi.fn();
    render(
      <Alert heading="Test" actionLabel="Action" onActionClick={handleAction}>
        Test content
      </Alert>,
    );

    await user.click(screen.getByRole('button', { name: 'Action' }));
    expect(handleAction).toHaveBeenCalledTimes(1);
  });

  it('renders design-system action button when actionButtonProps is provided', () => {
    render(
      <Alert
        heading="Test"
        actionButtonProps={{
          label: 'DS Action',
        }}
      >
        Test content
      </Alert>,
    );

    const button = screen.getByRole('button', { name: 'DS Action' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('mds-btn');
    expect(button).toHaveClass('btn-primary');
    expect(button.parentElement).toHaveClass(
      'mds-alert-action-container--contextual',
    );
  });

  it('keeps design-system button variant configurable when variant is provided', () => {
    render(
      <Alert
        heading="Test"
        actionButtonProps={{
          label: 'DS Action',
          variant: 'secondary',
          size: 'sm',
        }}
      >
        Test content
      </Alert>,
    );

    const button = screen.getByRole('button', { name: 'DS Action' });
    expect(button).toHaveClass('btn-secondary');
    expect(button).toHaveClass('btn-sm');
    expect(button.parentElement).not.toHaveClass(
      'mds-alert-action-container--contextual',
    );
  });

  it('calls onClick from actionButtonProps when design-system action button is clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <Alert
        heading="Test"
        actionButtonProps={{
          label: 'DS Action',
          onClick: handleClick,
        }}
      >
        Test content
      </Alert>,
    );

    await user.click(screen.getByRole('button', { name: 'DS Action' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('prioritizes actionButtonProps over actionLabel/onActionClick', () => {
    const handleAction = vi.fn();
    render(
      <Alert
        heading="Test"
        actionLabel="Legacy Action"
        onActionClick={handleAction}
        actionButtonProps={{
          label: 'DS Action',
        }}
      >
        Test content
      </Alert>,
    );

    expect(
      screen.getByRole('button', { name: 'DS Action' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Legacy Action' }),
    ).not.toBeInTheDocument();
  });

  it('does not render action button when only actionLabel provided', () => {
    render(
      <Alert heading="Test" actionLabel="Click Me">
        Test content
      </Alert>,
    );
    expect(
      screen.queryByRole('button', { name: 'Click Me' }),
    ).not.toBeInTheDocument();
  });

  it('does not render action button when only onActionClick provided', () => {
    const handleAction = vi.fn();
    render(
      <Alert heading="Test" onActionClick={handleAction}>
        Test content
      </Alert>,
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders dismissible alert with close button', () => {
    render(
      <Alert heading="Test" dismissible onClose={vi.fn()}>
        Dismissible alert
      </Alert>,
    );
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    render(
      <Alert heading="Test" dismissible onClose={handleClose}>
        Test content
      </Alert>,
    );

    await user.click(screen.getByRole('button', { name: /close/i }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('forwards extra props to the alert element', () => {
    render(
      <Alert heading="Test" data-testid="my-alert">
        Test content
      </Alert>,
    );
    expect(screen.getByTestId('my-alert')).toBeInTheDocument();
  });

  it('renders without heading', () => {
    render(<Alert>Just content without heading</Alert>);
    expect(
      screen.getByText('Just content without heading'),
    ).toBeInTheDocument();
  });

  it('renders and displays content for random props', () => {
    fuzzComponent(
      Alert,
      fc
        .record<AlertProps>({
          heading: fc.option(
            fc.stringOf(
              fc.constantFrom(
                ...('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split(
                  '',
                ) as [string, ...string[]]),
              ),
              { minLength: 1, maxLength: 50 },
            ),
            { nil: undefined },
          ),
          variant: fc.constantFrom(
            'success',
            'info',
            'warning',
            'danger',
          ) as unknown as fc.Arbitrary<AlertProps['variant']>,
          icon: fc.option(
            fc.constantFrom<AlertProps['icon']>(
              <FontAwesomeIcon icon={faCircleExclamation} />,
              <FontAwesomeIcon icon={faCircleInfo} />,
              <FontAwesomeIcon icon={faCircleCheck} />,
              <FontAwesomeIcon icon={faCircleXmark} />,
            ),
            {
              nil: undefined,
            },
          ) as unknown as fc.Arbitrary<AlertProps['icon']>,
          children: fc.option(
            fc.stringOf(
              fc.constantFrom(
                ...('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split(
                  '',
                ) as [string, ...string[]]),
              ),
              { minLength: 1, maxLength: 100 },
            ),
            { nil: undefined },
          ) as unknown as fc.Arbitrary<AlertProps['children']>,
          dismissible: fc.boolean(),
        })
        .filter((props) => {
          // Ensure at least one visible content is present
          return !!(props.heading || props.children);
        }),
      (props: AlertProps) => {
        // Return any text content that should be visible
        if (props.heading) return props.heading;
        if (props.children) return props.children.toString();
        return ''; // Should never reach here due to filter
      },
      { numRuns: 100 },
    );
  });
});

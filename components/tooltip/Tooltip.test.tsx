import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Button } from '../button';
import { Tooltip } from './Tooltip';

describe('Tooltip: Unit Test', () => {
  describe('rendering', () => {
    it('applies default host class, forwards props, and merges className', () => {
      const { container } = render(
        <Tooltip label="Info" data-testid="my-tooltip" className="custom-class">
          <Button label="Trigger" />
        </Tooltip>,
      );

      expect(container.firstChild).toHaveAttribute('data-testid', 'my-tooltip');
      expect(container.firstChild).toHaveClass('mds-tooltip', 'custom-class');
    });

    it('keeps data-forced-open on the bubble, not on the wrapper', () => {
      const { container } = render(
        <Tooltip label="Info" data-forced-open="">
          <Button label="Trigger" />
        </Tooltip>,
      );

      const wrapper = container.firstChild as HTMLDivElement;
      const tooltip = screen.getByRole('tooltip', { hidden: true });

      expect(wrapper).not.toHaveAttribute('data-forced-open');
      expect(tooltip).toHaveAttribute('data-forced-open', '');
    });

    it('renders the tooltip label text in the bubble', () => {
      render(
        <Tooltip label="Helper text">
          <Button label="Trigger" />
        </Tooltip>,
      );
      expect(screen.getByRole('tooltip', { hidden: true })).toHaveTextContent(
        'Helper text',
      );
    });

    it('renders the trigger children', () => {
      render(
        <Tooltip label="Info">
          <Button label="Click me" />
        </Tooltip>,
      );
      expect(
        screen.getByRole('button', { name: 'Click me' }),
      ).toBeInTheDocument();
    });

    it('sets role="tooltip" on the bubble element', () => {
      render(
        <Tooltip label="Info">
          <Button label="Trigger" />
        </Tooltip>,
      );
      expect(screen.getByRole('tooltip', { hidden: true })).toBeInTheDocument();
    });

    it('links the trigger to the tooltip with aria-describedby', () => {
      render(
        <Tooltip label="Info">
          <Button label="Trigger" />
        </Tooltip>,
      );

      const trigger = screen.getByRole('button', { name: 'Trigger' });
      const tooltip = screen.getByRole('tooltip', { hidden: true });
      expect(trigger).toHaveAttribute('aria-describedby', tooltip.id);
    });

    it('uses aria-label in auto mode when the trigger has no likely accessible name', () => {
      render(
        <Tooltip label="Icon action">
          <button type="button" aria-hidden="false">
            <span aria-hidden="true">*</span>
          </button>
        </Tooltip>,
      );

      const trigger = screen.getByRole('button', { name: 'Icon action' });
      expect(trigger).toHaveAttribute('aria-label', 'Icon action');
      expect(trigger).not.toHaveAttribute('aria-describedby');
    });

    it('preserves an existing aria-describedby value on the trigger', () => {
      render(
        <Tooltip label="Info">
          <Button label="Trigger" aria-describedby="existing-description" />
        </Tooltip>,
      );

      const trigger = screen.getByRole('button', { name: 'Trigger' });
      const tooltip = screen.getByRole('tooltip', { hidden: true });
      const describedBy = trigger.getAttribute('aria-describedby') ?? '';
      expect(describedBy).toContain('existing-description');
      expect(describedBy).toContain(tooltip.id);
    });

    it('deduplicates repeated aria-describedby ids', () => {
      render(
        <Tooltip label="Info">
          <Button
            label="Trigger"
            aria-describedby="existing-description existing-description"
          />
        </Tooltip>,
      );

      const trigger = screen.getByRole('button', { name: 'Trigger' });
      const describedBy = trigger.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();

      const describedByIds = (describedBy ?? '').split(/\s+/).filter(Boolean);
      expect(describedByIds).toContain('existing-description');
      expect(new Set(describedByIds).size).toBe(describedByIds.length);

      const tooltip = screen.getByRole('tooltip', { hidden: true });
      expect(describedByIds).toContain(tooltip.id);
    });

    it('preserves an existing aria-label value in auto mode', () => {
      render(
        <Tooltip label="Icon action">
          <button type="button" aria-label="Custom action" />
        </Tooltip>,
      );

      const trigger = screen.getByRole('button', { name: 'Custom action' });
      const tooltip = screen.getByRole('tooltip', { hidden: true });
      expect(trigger).toHaveAttribute('aria-label', 'Custom action');
      expect(trigger).toHaveAttribute('aria-describedby', tooltip.id);
    });

    it('bubble is hidden by default (no data-open attribute)', () => {
      render(
        <Tooltip label="Info">
          <Button label="Trigger" />
        </Tooltip>,
      );
      const tooltip = screen.getByRole('tooltip', { hidden: true });
      expect(tooltip).not.toHaveAttribute('data-open');
    });

    it('opens on hover, gets positioned, and closes on mouse leave', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip label="Info">
          <Button label="Trigger" />
        </Tooltip>,
      );

      const trigger = screen.getByRole('button', { name: 'Trigger' });
      const tooltip = screen.getByRole('tooltip', { hidden: true });

      await user.hover(trigger);
      await waitFor(() => expect(tooltip).toHaveAttribute('data-open'));
      await waitFor(() => expect(tooltip).toHaveAttribute('data-positioned'));

      await user.unhover(trigger);
      await waitFor(() => expect(tooltip).not.toHaveAttribute('data-open'));
    });

    it('opens on focus and closes when focus leaves the trigger', async () => {
      const user = userEvent.setup();
      render(
        <>
          <Tooltip label="Info">
            <Button label="Trigger" />
          </Tooltip>
          <Button label="Next" />
        </>,
      );

      const trigger = screen.getByRole('button', { name: 'Trigger' });
      const next = screen.getByRole('button', { name: 'Next' });
      const tooltip = screen.getByRole('tooltip', { hidden: true });

      await user.tab();
      expect(trigger).toHaveFocus();
      await waitFor(() => expect(tooltip).toHaveAttribute('data-open'));

      await user.tab();
      expect(next).toHaveFocus();
      await waitFor(() => expect(tooltip).not.toHaveAttribute('data-open'));
    });

    it('dismisses on Escape key after opening (WCAG 2.1 SC 1.4.13)', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip label="Info">
          <Button label="Trigger" />
        </Tooltip>,
      );

      const trigger = screen.getByRole('button', { name: 'Trigger' });
      const tooltip = screen.getByRole('tooltip', { hidden: true });

      await user.hover(trigger);
      await waitFor(() => expect(tooltip).toHaveAttribute('data-open'));

      await user.keyboard('{Escape}');
      await waitFor(() => expect(tooltip).not.toHaveAttribute('data-open'));
    });

    it('supports touch tap toggle and outside-click dismissal', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip label="Info">
          <Button label="Trigger" />
        </Tooltip>,
      );

      const trigger = screen.getByRole('button', { name: 'Trigger' });
      const tooltip = screen.getByRole('tooltip', { hidden: true });

      // Simulate a touch tap (pointerType: 'touch') — mouse hover never fires on touch devices.
      await user.pointer({ keys: '[TouchA]', target: trigger });
      await waitFor(() => expect(tooltip).toHaveAttribute('data-open'));

      // Second touch tap should close.
      await user.pointer({ keys: '[TouchA]', target: trigger });
      await waitFor(() => expect(tooltip).not.toHaveAttribute('data-open'));

      // Re-open via touch and assert outside click dismissal.
      await user.pointer({ keys: '[TouchA]', target: trigger });
      await waitFor(() => expect(tooltip).toHaveAttribute('data-open'));

      await user.click(document.body);
      await waitFor(() => expect(tooltip).not.toHaveAttribute('data-open'));
    });

    it('fails gracefully when children is not a valid React element', () => {
      expect(() =>
        render(
          <Tooltip label="Info">
            {
              // @ts-expect-error deliberately invalid runtime value
              'Trigger text'
            }
          </Tooltip>,
        ),
      ).not.toThrow();

      expect(
        screen.queryByRole('tooltip', { hidden: true }),
      ).not.toBeInTheDocument();
    });
  });

  describe('placement fallback', () => {
    it('accepts all valid placement values without warnings', () => {
      (['top', 'bottom', 'left', 'right'] as const).forEach((placement) => {
        const { unmount } = render(
          <Tooltip label="Info" placement={placement}>
            <Button label="Trigger" />
          </Tooltip>,
        );
        expect(
          screen.getByRole('tooltip', { hidden: true }),
        ).toBeInTheDocument();
        unmount();
      });
    });

    it('falls back gracefully for an invalid placement value', () => {
      expect(() =>
        render(
          // @ts-expect-error deliberately invalid value
          <Tooltip label="Info" placement="diagonal">
            <Button label="Trigger" />
          </Tooltip>,
        ),
      ).not.toThrow();
    });
  });

  describe('variant', () => {
    it('applies the expected bubble class for valid and invalid variants', () => {
      const cases: Array<{
        name: string;
        variant?: 'light';
        expectedClass:
          'mds-tooltip__bubble--dark' | 'mds-tooltip__bubble--light';
        unexpectedClass?: 'mds-tooltip__bubble--neon';
      }> = [
        {
          name: 'default variant',
          expectedClass: 'mds-tooltip__bubble--dark',
        },
        {
          name: 'light variant',
          variant: 'light',
          expectedClass: 'mds-tooltip__bubble--light',
        },
      ];

      cases.forEach(({ name, variant, expectedClass, unexpectedClass }) => {
        const { unmount } = render(
          <Tooltip label="Info" variant={variant}>
            <Button label="Trigger" />
          </Tooltip>,
        );

        const tooltip = screen.getByRole('tooltip', { hidden: true });
        expect(tooltip, name).toHaveClass(expectedClass);
        if (unexpectedClass) {
          expect(tooltip, name).not.toHaveClass(unexpectedClass);
        }
        unmount();
      });

      render(
        // @ts-expect-error deliberately invalid value
        <Tooltip label="Info" variant="neon">
          <Button label="Trigger" />
        </Tooltip>,
      );
      const invalidTooltip = screen.getByRole('tooltip', { hidden: true });
      expect(invalidTooltip).toHaveClass('mds-tooltip__bubble--dark');
      expect(invalidTooltip).not.toHaveClass('mds-tooltip__bubble--neon');
    });
  });
});

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DropdownItemSelect } from './DropdownItemSelect';

describe('DropdownItemSelect: Unit Test', () => {
  it('exposes radio-like semantics with the selected state', () => {
    const { getByRole } = render(
      <DropdownItemSelect label="Selectable" selected />,
    );
    const item = getByRole('menuitemradio');
    expect(item).toHaveAttribute('aria-checked', 'true');
    expect(item).toHaveClass('mds-dropdown-item--selected');
  });

  it('always renders the check span in the DOM (visibility toggled by CSS)', () => {
    const { container, rerender } = render(
      <DropdownItemSelect label="Selectable" selected />,
    );
    // Present when selected
    expect(
      container.querySelector('.mds-dropdown-item__check'),
    ).toBeInTheDocument();
    // Still present (not removed) when unselected - visibility is CSS-driven
    // so trailing-column width stays constant and labels don't jitter.
    rerender(<DropdownItemSelect label="Selectable" />);
    expect(
      container.querySelector('.mds-dropdown-item__check'),
    ).toBeInTheDocument();
  });
});

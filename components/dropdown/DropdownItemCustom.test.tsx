import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DropdownItemCustom } from './DropdownItemCustom';

describe('DropdownItemCustom: Unit Test', () => {
  it('renders custom slot content', () => {
    render(
      <DropdownItemCustom>
        <span>Anything</span>
      </DropdownItemCustom>,
    );
    expect(screen.getByText('Anything')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { countTagContentLines, TagContent } from './TagContent';

// Guards the host contract documented in TagContent.tsx: the helper is
// layout only, so hosts like a combobox `role="option"` row can wrap it
// without inheriting roles or focusable children.
describe('TagContent: Unit Test', () => {
  it('renders no roles or focusable elements, even with every field filled', () => {
    const { container } = render(
      <TagContent
        content="Ana Silva"
        username="ana.silva"
        email="ana@example.com"
        institution="Moodle HQ"
        avatar={{ initials: 'AS', alt: 'Ana Silva' }}
      />,
    );
    // Avatar keeps its own role="img" but is aria-hidden, so only roles
    // left in the accessibility tree would leak into the host.
    const exposedRoles = Array.from(
      container.querySelectorAll('[role]'),
    ).filter((element) => !element.closest('[aria-hidden="true"]'));
    expect(exposedRoles).toHaveLength(0);
    expect(
      container.querySelector('a, button, input, select, textarea, [tabindex]'),
    ).toBeNull();
  });

  it('renders a fragment so the host element owns layout and semantics', () => {
    const { container } = render(
      <TagContent content="Ana Silva" avatar={{ alt: 'Ana Silva' }} />,
    );
    const children = Array.from(container.children);
    expect(children).toHaveLength(2);
    expect(children[0]).toHaveClass('mds-tag__avatar');
    expect(children[1]).toHaveClass('mds-tag__content');
  });

  it('renders the three lines in order, with a divider between username and email', () => {
    render(
      <TagContent
        content="Ana Silva"
        username="ana.silva"
        email="ana@example.com"
        institution="Moodle HQ"
      />,
    );
    expect(screen.getByText('Ana Silva')).toHaveClass('mds-tag__name');
    const row = screen.getByText('ana.silva').parentElement;
    expect(row).toHaveClass('mds-tag__supporting-row');
    expect(row?.querySelector('.mds-tag__divider')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
    expect(screen.getByText('Moodle HQ')).toHaveClass('mds-tag__institution');
  });

  it('counts populated lines for host density scaling', () => {
    expect(countTagContentLines({})).toBe(1);
    expect(countTagContentLines({ email: 'ana@example.com' })).toBe(2);
    expect(countTagContentLines({ institution: 'Moodle HQ' })).toBe(2);
    expect(
      countTagContentLines({ username: 'ana.silva', institution: 'Moodle HQ' }),
    ).toBe(3);
  });
});

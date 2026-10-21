import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { CourseCard } from './CourseCard';

const baseProps = { title: 'New staff induction' };

describe('CourseCard: Unit Test', () => {
  it('applies the mds-course-card class to the host article', () => {
    render(<CourseCard {...baseProps} data-testid="card" />);
    const card = screen.getByTestId('card');
    expect(card.tagName).toBe('ARTICLE');
    expect(card).toHaveClass('mds-course-card');
  });

  it('renders the title as an h3 by default', () => {
    render(<CourseCard {...baseProps} />);
    expect(
      screen.getByRole('heading', { level: 3, name: 'New staff induction' }),
    ).toBeInTheDocument();
  });

  it('respects headingLevel', () => {
    render(<CourseCard {...baseProps} headingLevel={2} />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('falls back to h3 for an invalid headingLevel', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    // @ts-expect-error — intentional invalid value to verify runtime fallback
    render(<CourseCard {...baseProps} headingLevel={1} />);
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    warn.mockRestore();
  });

  it('renders the title as plain text, not a link', () => {
    render(<CourseCard {...baseProps} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders the subtitle when provided', () => {
    render(<CourseCard {...baseProps} subtitle="Teaching staff" />);
    expect(screen.getByText('Teaching staff')).toHaveClass(
      'mds-course-card-subtitle',
    );
  });

  it('renders the image only when imageSrc is provided', () => {
    const { container, rerender } = render(<CourseCard {...baseProps} />);
    expect(container.querySelector('img')).toBeNull();
    rerender(<CourseCard {...baseProps} imageSrc="/a.jpg" imageAlt="Cover" />);
    expect(screen.getByAltText('Cover')).toHaveAttribute('src', '/a.jpg');
  });

  it('renders the badge and teacher row when provided', () => {
    render(
      <CourseCard
        {...baseProps}
        badgeLabel="Label"
        teacherName="Mr. Sanders"
      />,
    );
    expect(screen.getByText('Label')).toHaveClass('mds-badge');
    expect(screen.getByText('Mr. Sanders')).toBeInTheDocument();
  });

  it('renders a progress bar with the supplied label and value', () => {
    render(
      <CourseCard
        {...baseProps}
        progressLabel="Lesson 7 of 16"
        progressValue={8}
        progressMax={16}
      />,
    );
    const bar = screen.getByRole('progressbar', { name: 'Lesson 7 of 16' });
    expect(bar).toHaveAttribute('aria-valuenow', '8');
    expect(bar).toHaveAttribute('aria-valuemax', '16');
  });

  it('omits the progress bar when no progressLabel is given', () => {
    render(<CourseCard {...baseProps} />);
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('renders the footer link only when label and href are both set', () => {
    const { rerender } = render(
      <CourseCard {...baseProps} linkLabel="Continue learning" />,
    );
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    rerender(
      <CourseCard
        {...baseProps}
        linkLabel="Continue learning"
        linkHref="/go"
      />,
    );
    expect(
      screen.getByRole('link', { name: 'Continue learning' }),
    ).toHaveAttribute('href', '/go');
  });

  it('appends a consumer className after the mds hook', () => {
    render(<CourseCard {...baseProps} className="extra" data-testid="card" />);
    expect(screen.getByTestId('card').className).toBe('mds-course-card extra');
  });

  it('forwards extra props to the host element', () => {
    render(
      <CourseCard {...baseProps} data-testid="card" aria-label="Course" />,
    );
    expect(screen.getByTestId('card')).toHaveAttribute('aria-label', 'Course');
  });

  it('forwards the ref to the article element', () => {
    const ref = createRef<HTMLElement>();
    render(<CourseCard {...baseProps} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('ARTICLE');
  });
});

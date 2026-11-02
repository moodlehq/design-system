import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type {
  ActivityIconAppearance,
  ActivityIconContainer,
  ActivityIconSize,
} from './ActivityIcon';
import { ActivityIcon } from './ActivityIcon';

// A stand-in for third-party artwork that is not in the icon registry.
const customSrc = 'jessica.jpeg';

const iconVariants = [
  ['a registry icon', { icon: 'assignment' }],
  ['a custom src', { src: customSrc }],
] as const;

describe('ActivityIcon: Unit Test', () => {
  it('applies mds class name', () => {
    render(<ActivityIcon data-testid="icon" icon="assignment" />);
    expect(
      screen.getByTestId('icon').classList.contains('mds-activity-icon'),
    ).toBe(true);
  });

  it('renders the requested icon asset', async () => {
    render(<ActivityIcon icon="assignment" alt="assignment icon" />);

    const image = screen.getByRole('img', { name: 'assignment icon' });
    await waitFor(() => {
      expect(image.getAttribute('src')).toContain('data:image/svg+xml');
    });
  });

  it('does not apply the muted class by default', () => {
    render(<ActivityIcon data-testid="icon" icon="assignment" />);
    expect(
      screen.getByTestId('icon').classList.contains('mds-activity-icon--muted'),
    ).toBe(false);
  });

  it('applies the muted class and renders the mask once the icon loads', async () => {
    render(
      <ActivityIcon data-testid="icon" icon="assignment" appearance="muted" />,
    );
    const root = screen.getByTestId('icon');
    expect(root.classList.contains('mds-activity-icon--muted')).toBe(true);
    expect(root.querySelector('.mds-activity-icon__mask')).toBeNull();
    await waitFor(() => {
      const mask = root.querySelector<HTMLElement>('.mds-activity-icon__mask');
      expect(mask).not.toBeNull();
      expect(mask?.getAttribute('aria-hidden')).toBe('true');
      expect(mask?.getAttribute('style')).toContain('data:image/svg+xml');
    });
  });

  it.each([
    ['bigbluebutton', { icon: 'bigbluebutton' }],
    ['h5p', { icon: 'h5p' }],
    ['a custom src image', { src: customSrc }],
  ] as const)(
    'uses the filter fallback instead of the overlay for %s',
    (_label, iconProps) => {
      render(
        <ActivityIcon data-testid="icon" {...iconProps} appearance="muted" />,
      );
      const root = screen.getByTestId('icon');
      expect(root.classList.contains('mds-activity-icon--muted-filter')).toBe(
        true,
      );
      expect(root.classList.contains('mds-activity-icon--muted')).toBe(false);
      expect(root.querySelector('.mds-activity-icon__mask')).toBeNull();
    },
  );

  it('keeps the image accessible name when muted', () => {
    render(
      <ActivityIcon icon="assignment" alt="Assignment" appearance="muted" />,
    );
    expect(screen.getByRole('img', { name: 'Assignment' })).toBeTruthy();
  });

  it('preserves a consumer style when muted', () => {
    render(
      <ActivityIcon
        data-testid="icon"
        icon="assignment"
        appearance="muted"
        style={{ margin: 0 }}
      />,
    );
    expect(screen.getByTestId('icon').style.margin).toBe('0px');
  });

  it('falls back to default appearance and warns for an invalid appearance', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <ActivityIcon
        data-testid="icon"
        icon="assignment"
        appearance={'invalid' as unknown as ActivityIconAppearance}
      />,
    );
    expect(
      screen.getByTestId('icon').classList.contains('mds-activity-icon--muted'),
    ).toBe(false);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('Invalid appearance "invalid"'),
    );
    warn.mockRestore();
  });

  describe.each(iconVariants)('%s', (_label, iconProps) => {
    it('applies default container and md size by default', () => {
      render(<ActivityIcon data-testid="icon" {...iconProps} />);
      const { classList } = screen.getByTestId('icon');
      expect(classList.contains('mds-activity-icon--default')).toBe(true);
      expect(classList.contains('mds-activity-icon--size-md')).toBe(true);
    });

    it.each(['sm', 'md', 'lg', 'xl'] as const)('applies size %s', (size) => {
      render(<ActivityIcon data-testid="icon" {...iconProps} size={size} />);
      expect(
        screen
          .getByTestId('icon')
          .classList.contains(`mds-activity-icon--size-${size}`),
      ).toBe(true);
    });

    it.each(['none', 'default', 'large'] as const)(
      'applies %s container',
      (container) => {
        render(
          <ActivityIcon
            data-testid="icon"
            {...iconProps}
            container={container}
          />,
        );
        expect(
          screen
            .getByTestId('icon')
            .classList.contains(`mds-activity-icon--${container}`),
        ).toBe(true);
      },
    );
  });

  it('falls back to file-unknown for an invalid icon name', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { rerender } = render(
      <ActivityIcon icon="file-unknown" alt="unknown icon" />,
    );
    let expectedFallbackSrc = '';

    await waitFor(() => {
      expectedFallbackSrc =
        screen.getByRole('img', { name: 'unknown icon' }).getAttribute('src') ??
        '';
      expect(expectedFallbackSrc).toContain('data:image/svg+xml');
    });

    rerender(<ActivityIcon icon="invalid" alt="fallback icon" />);

    const image = screen.getByRole('img', { name: 'fallback icon' });
    await waitFor(() => {
      expect(image.getAttribute('src')).toBe(expectedFallbackSrc);
    });

    expect(error).toHaveBeenCalledWith(
      expect.stringContaining('[MDS ActivityIcon] Invalid icon "invalid"'),
    );
    error.mockRestore();
  });

  it('does not log an invalid icon error outside development', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubEnv('DEV', false);

    render(<ActivityIcon icon="invalid" />);

    expect(error).not.toHaveBeenCalled();
    vi.unstubAllEnvs();
    error.mockRestore();
  });

  it('falls back to default for an invalid container', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <ActivityIcon
        data-testid="icon"
        icon="assignment"
        container={'invalid' as unknown as ActivityIconContainer}
      />,
    );

    expect(
      screen
        .getByTestId('icon')
        .classList.contains('mds-activity-icon--default'),
    ).toBe(true);
    vi.restoreAllMocks();
  });

  it('warns in development when an invalid container is passed', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <ActivityIcon
        icon="assignment"
        container={'invalid' as unknown as ActivityIconContainer}
      />,
    );

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('[MDS ActivityIcon] Invalid container "invalid"'),
    );
    warn.mockRestore();
  });

  it('falls back to md for an invalid size', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <ActivityIcon
        data-testid="icon"
        icon="assignment"
        size={'invalid' as unknown as ActivityIconSize}
      />,
    );

    expect(
      screen
        .getByTestId('icon')
        .classList.contains('mds-activity-icon--size-md'),
    ).toBe(true);
    vi.restoreAllMocks();
  });

  it('warns in development when an invalid size is passed', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <ActivityIcon
        icon="assignment"
        size={'invalid' as unknown as ActivityIconSize}
      />,
    );

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('[MDS ActivityIcon] Invalid size "invalid"'),
    );
    warn.mockRestore();
  });

  it('forwards extra props to the root element', () => {
    render(
      <ActivityIcon
        aria-label="quiz activity"
        data-testid="activity-icon"
        icon="quiz"
      />,
    );

    const root = screen.getByTestId('activity-icon');
    expect(root.getAttribute('aria-label')).toBe('quiz activity');
  });

  it('defaults to decorative image when alt is omitted', () => {
    const { container } = render(<ActivityIcon icon="quiz" />);
    const image = container.querySelector('img');

    expect(image?.getAttribute('alt')).toBe('');
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('infers category from icon name', () => {
    render(<ActivityIcon data-testid="icon" icon="forum" />);
    expect(
      screen
        .getByTestId('icon')
        .classList.contains('mds-activity-icon--category-collaboration'),
    ).toBe(true);
  });

  it('applies category-assessment class for assessment icons', () => {
    render(<ActivityIcon data-testid="icon" icon="quiz" />);
    expect(
      screen
        .getByTestId('icon')
        .classList.contains('mds-activity-icon--category-assessment'),
    ).toBe(true);
  });

  it('applies category-resource class for file icons', () => {
    render(<ActivityIcon data-testid="icon" icon="file-pdf" />);
    expect(
      screen
        .getByTestId('icon')
        .classList.contains('mds-activity-icon--category-resource'),
    ).toBe(true);
  });

  it('defaults to other category for unmapped icons', () => {
    // subsection is registered with the 'other' category.
    render(<ActivityIcon data-testid="icon" icon="subsection" />);

    expect(
      screen
        .getByTestId('icon')
        .classList.contains('mds-activity-icon--category-other'),
    ).toBe(true);
  });

  it('tints a custom src as other unless a category is supplied', () => {
    const { rerender } = render(
      <ActivityIcon data-testid="icon" src={customSrc} />,
    );
    const root = screen.getByTestId('icon');
    expect(root.classList.contains('mds-activity-icon--category-other')).toBe(
      true,
    );
    expect(root.classList.contains('mds-activity-icon--custom')).toBe(true);

    rerender(
      <ActivityIcon data-testid="icon" src={customSrc} category="assessment" />,
    );
    expect(
      root.classList.contains('mds-activity-icon--category-assessment'),
    ).toBe(true);
    expect(root.classList.contains('mds-activity-icon--category-other')).toBe(
      false,
    );
  });

  describe('custom src', () => {
    it('renders the supplied image immediately without an icon key', () => {
      render(<ActivityIcon src={customSrc} alt="LTI tool" />);
      expect(
        screen.getByRole('img', { name: 'LTI tool' }).getAttribute('src'),
      ).toBe(customSrc);
    });

    it('does not log an invalid icon error when only src is passed', () => {
      const error = vi.spyOn(console, 'error').mockImplementation(() => {});
      render(<ActivityIcon src={customSrc} />);
      expect(error).not.toHaveBeenCalled();
      error.mockRestore();
    });

    it('falls back to other and warns for an invalid category', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(
        <ActivityIcon
          data-testid="icon"
          src={customSrc}
          category={'nope' as unknown as 'other'}
        />,
      );
      expect(
        screen
          .getByTestId('icon')
          .classList.contains('mds-activity-icon--category-other'),
      ).toBe(true);
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('Invalid category "nope"'),
      );
      warn.mockRestore();
    });

    it('ignores the registry category for registry icons', () => {
      render(
        <ActivityIcon data-testid="icon" icon="assignment" category="other" />,
      );
      expect(
        screen
          .getByTestId('icon')
          .classList.contains('mds-activity-icon--category-assessment'),
      ).toBe(true);
    });

    it('prefers src over icon and warns', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(
        <ActivityIcon
          data-testid="icon"
          icon="assignment"
          src={customSrc}
          alt="custom"
        />,
      );
      expect(
        screen.getByRole('img', { name: 'custom' }).getAttribute('src'),
      ).toBe(customSrc);
      expect(
        screen
          .getByTestId('icon')
          .classList.contains('mds-activity-icon--category-other'),
      ).toBe(true);
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('Both "src" and "icon"'),
      );
      warn.mockRestore();
    });

    it('swaps to the generic glyph when the image fails to load', async () => {
      const error = vi.spyOn(console, 'error').mockImplementation(() => {});
      render(
        <ActivityIcon
          data-testid="icon"
          src="https://example.invalid/missing.png"
          alt="broken"
        />,
      );
      const image = screen.getByRole('img', { name: 'broken' });
      expect(image.getAttribute('src')).toBe(
        'https://example.invalid/missing.png',
      );

      fireEvent.error(image);

      await waitFor(() => {
        expect(
          screen.getByRole('img', { name: 'broken' }).getAttribute('src'),
        ).toContain('data:image/svg+xml');
      });
      expect(
        screen
          .getByTestId('icon')
          .classList.contains('mds-activity-icon--custom'),
      ).toBe(false);
      error.mockRestore();
    });

    it('tries a new src after a previous one failed', () => {
      const { rerender } = render(
        <ActivityIcon src="https://example.invalid/a.png" alt="icon" />,
      );
      fireEvent.error(screen.getByRole('img', { name: 'icon' }));
      rerender(<ActivityIcon src={customSrc} alt="icon" />);
      expect(
        screen.getByRole('img', { name: 'icon' }).getAttribute('src'),
      ).toBe(customSrc);
    });
  });
});

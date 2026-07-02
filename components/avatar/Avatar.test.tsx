import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Avatar } from './Avatar';

describe('Avatar: Unit Tests', () => {
  // ── mds-* hook class ──────────────────────────────────────────────────────

  it('applies mds-avatar hook class to the root element', () => {
    // The root <span> has no accessible role by default; find via test id
    const { container } = render(<Avatar initials="JD" data-testid="av" />);
    expect(container.querySelector('.mds-avatar')).toBeInTheDocument();
  });

  // ── Size modifier classes ─────────────────────────────────────────────────

  it.each(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const)(
    'applies mds-avatar--size class for size=%s',
    (size) => {
      const { container } = render(
        <Avatar size={size} initials="JD" data-testid="av" />,
      );
      expect(container.querySelector('.mds-avatar')).toHaveClass(
        `mds-avatar--${size}`,
      );
    },
  );

  it('falls back to mds-avatar--md for an invalid size', () => {
    const { container } = render(<Avatar initials="JD" size="invalid" />);
    expect(container.querySelector('.mds-avatar')).toHaveClass(
      'mds-avatar--md',
    );
  });

  it('warns in development when an invalid size is passed', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Avatar initials="JD" size="invalid" />);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('Invalid size "invalid"'),
    );
    vi.restoreAllMocks();
  });

  it.each(['xs', 'sm'] as const)(
    'warns in development when size=%s is used without imageSrc',
    (size) => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<Avatar size={size} initials="JD" aria-label="Jane Doe" />);
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining(`Initials are not supported at size "${size}"`),
      );
      vi.restoreAllMocks();
    },
  );

  it.each(['xs', 'sm'] as const)(
    'does not warn about initials when size=%s is used with imageSrc',
    (size) => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(
        <Avatar
          size={size}
          imageSrc="https://example.com/photo.jpg"
          initials="JD"
          aria-label="Jane Doe"
        />,
      );
      expect(warn).not.toHaveBeenCalledWith(
        expect.stringContaining('Initials are not supported'),
      );
      vi.restoreAllMocks();
    },
  );

  // ── Initials (always-present base layer) ──────────────────────────────────

  it('always renders the initials span as the base layer', () => {
    // The initials span is present even when an image is shown so the fallback
    // is instantly available without a repaint on image error.
    const { container } = render(
      <Avatar
        initials="JD"
        imageSrc="https://example.com/photo.jpg"
        aria-label="Jane Doe"
      />,
    );
    expect(
      container.querySelector('.mds-avatar__initials'),
    ).toBeInTheDocument();
  });

  it('renders initials text when provided', () => {
    const { container } = render(<Avatar initials="JD" />);
    expect(container.querySelector('.mds-avatar__initials')).toHaveTextContent(
      'JD',
    );
  });

  it('truncates initials to 2 characters', () => {
    const { container } = render(<Avatar initials="JohnDoe" />);
    expect(container.querySelector('.mds-avatar__initials')).toHaveTextContent(
      'Jo',
    );
  });

  it('renders without initials prop (silhouette shown)', () => {
    const { container } = render(<Avatar />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', '');
  });

  it('trims whitespace-only initials and shows silhouette', () => {
    const { container } = render(<Avatar initials="   " />);
    // Whitespace trims to empty → silhouette rendered, no initials text
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', '');
  });

  it('trims leading/trailing whitespace from initials', () => {
    const { container } = render(<Avatar initials=" AB " />);
    expect(container.querySelector('.mds-avatar__initials')).toHaveTextContent(
      'AB',
    );
  });

  it('does not aria-hide the initials span when no image is showing', () => {
    // Initials are the visible/accessible content here; they must NOT be
    // hidden from AT.
    const { container } = render(<Avatar initials="JD" />);
    expect(container.querySelector('.mds-avatar__initials')).toHaveAttribute(
      'aria-hidden',
      'false',
    );
  });

  it('aria-hides the initials span when the image is visible', () => {
    const { container } = render(
      <Avatar
        initials="JD"
        imageSrc="https://example.com/photo.jpg"
        alt="Jane Doe"
      />,
    );
    expect(container.querySelector('.mds-avatar__initials')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });

  // ── Image display and graceful fallback ───────────────────────────────────

  it('renders an img element and applies mds-avatar--has-image when imageSrc is provided', () => {
    const { container } = render(
      <Avatar
        imageSrc="https://example.com/photo.jpg"
        initials="JD"
        aria-label="Jane Doe"
      />,
    );
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg');
    expect(img).toHaveClass('mds-avatar__image');
    expect(container.querySelector('.mds-avatar')).toHaveClass(
      'mds-avatar--has-image',
    );
  });

  it('inner img defaults to alt="" when no alt prop is passed (decorative use)', () => {
    const { container } = render(
      <Avatar
        imageSrc="https://example.com/photo.jpg"
        initials="JD"
        aria-label="Jane Doe"
      />,
    );
    expect(container.querySelector('img')).toHaveAttribute('alt', '');
  });

  it('does not render an img element when imageSrc is not provided', () => {
    const { container } = render(
      <Avatar initials="JD" aria-label="Jane Doe" />,
    );
    expect(container.querySelector('img')).not.toBeInTheDocument();
  });

  it('falls back to initials and removes mds-avatar--has-image when the image fails to load', () => {
    const { container } = render(
      <Avatar
        imageSrc="https://example.com/broken.jpg"
        initials="JD"
        aria-label="Jane Doe"
      />,
    );
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    // Simulate a network/load error on the image element.
    fireEvent.error(img!);
    expect(container.querySelector('img')).not.toBeInTheDocument();
    expect(
      container.querySelector('.mds-avatar__initials'),
    ).toBeInTheDocument();
    expect(container.querySelector('.mds-avatar')).not.toHaveClass(
      'mds-avatar--has-image',
    );
  });

  it('recovers and shows a new image when imageSrc changes after a load error', () => {
    // Once imgFailed is true, changing imageSrc to a valid URL must reset the
    // error state so the new image can render.
    const { container, rerender } = render(
      <Avatar
        imageSrc="https://example.com/broken.jpg"
        initials="JD"
        alt="Jane Doe"
      />,
    );
    fireEvent.error(container.querySelector('img')!);
    // No image after the error
    expect(container.querySelector('img')).not.toBeInTheDocument();

    // Provide a new imageSrc
    act(() => {
      rerender(
        <Avatar
          imageSrc="https://example.com/valid.jpg"
          initials="JD"
          alt="Jane Doe"
        />,
      );
    });
    const newImg = container.querySelector('img');
    expect(newImg).toBeInTheDocument();
    expect(newImg).toHaveAttribute('src', 'https://example.com/valid.jpg');
  });

  // ── Accessible name warnings ──────────────────────────────────────────────

  it('does not warn when initials-only (no imageSrc) — initials are accessible text', () => {
    // The component uses <img alt> for the image case; when only initials are
    // present they are plain text content readable by AT with no warning needed.
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Avatar initials="JD" />);
    expect(warn).not.toHaveBeenCalled();
    vi.restoreAllMocks();
  });

  it('warns when imageSrc is set but no alt prop is provided', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Avatar imageSrc="https://example.com/photo.jpg" initials="JD" />);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('Pass an `alt` prop'),
    );
    vi.restoreAllMocks();
  });

  it('does not warn about alt when imageSrc is set and alt is provided', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <Avatar
        initials="JD"
        imageSrc="https://example.com/photo.jpg"
        alt="Jane Doe"
      />,
    );
    expect(warn).not.toHaveBeenCalledWith(
      expect.stringContaining('Pass an `alt` prop'),
    );
    vi.restoreAllMocks();
  });

  it('does not warn about alt when the avatar is decorative (alt omitted intentionally)', () => {
    // Passing no alt is valid for a decorative avatar; the component warns only
    // when imageSrc is set without alt, not when imageSrc is absent.
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Avatar initials="JD" aria-labelledby="name-id" />);
    expect(warn).not.toHaveBeenCalledWith(
      expect.stringContaining('Pass an `alt` prop'),
    );
    vi.restoreAllMocks();
  });

  // ── Extra props forwarding ────────────────────────────────────────────────

  it('forwards data-testid to the root element', () => {
    render(<Avatar data-testid="my-avatar" />);
    expect(screen.getByTestId('my-avatar')).toHaveClass('mds-avatar');
  });

  it('forwards aria-label to the root element', () => {
    // aria-label passed explicitly via ...props is forwarded to the root <span>.
    // No role is derived here because no alt prop is supplied — role="img" is
    // only added when the span itself carries the accessible name from alt.
    const { container } = render(<Avatar initials="" aria-label="Jane Doe" />);
    expect(container.querySelector('.mds-avatar')).toHaveAttribute(
      'aria-label',
      'Jane Doe',
    );
  });

  it('appends consumer className after the mds classes', () => {
    const { container } = render(<Avatar className="my-class" />);
    const el = container.querySelector('.mds-avatar');
    expect(el?.className).toMatch(/mds-avatar.*my-class/);
  });

  // ── SVG silhouette fallback ───────────────────────────────────────────────

  it('renders the SVG silhouette when initials is empty and no image is provided', () => {
    const { container } = render(<Avatar initials="" />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveClass('mds-avatar__image');
    expect(img).toHaveAttribute('alt', '');
  });

  it('renders the SVG silhouette at xs size when no imageSrc is provided', () => {
    const { container } = render(<Avatar size="xs" initials="JD" />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveClass('mds-avatar__image');
    vi.restoreAllMocks();
  });

  it('renders the SVG silhouette at sm size when no imageSrc is provided', () => {
    const { container } = render(<Avatar size="sm" initials="JD" />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveClass('mds-avatar__image');
    vi.restoreAllMocks();
  });

  it('renders the SVG silhouette when the image fails to load at xs size', () => {
    const { container } = render(
      <Avatar
        size="xs"
        initials="JD"
        imageSrc="https://example.com/broken.jpg"
        alt="Jane Doe"
      />,
    );
    // Fire the error on the real image to trigger the fallback.
    fireEvent.error(container.querySelector('img')!);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveClass('mds-avatar__image');
    // The silhouette carries no meaningful alt text — it is purely decorative.
    expect(img).toHaveAttribute('alt', '');
    vi.restoreAllMocks();
  });

  it('does not render the SVG silhouette when valid initials are provided at md+', () => {
    const { container } = render(<Avatar initials="JD" size="md" />);
    // No <img> — the initials span is the visible layer.
    expect(container.querySelector('img')).not.toBeInTheDocument();
  });

  // ── alt forwarding to non-image states (a11y) ─────────────────────────────

  it('applies alt as aria-label and role="img" on the root span when showing initials (no image)', () => {
    // When the image is absent, the <img alt> is never rendered, so the
    // accessible name must be carried by the root span instead.
    // role="img" is also required for aria-label to be valid on a <span>.
    const { container } = render(<Avatar initials="JD" alt="Jane Doe" />);
    const root = container.querySelector('.mds-avatar');
    expect(root).toHaveAttribute('aria-label', 'Jane Doe');
    expect(root).toHaveAttribute('role', 'img');
  });

  it('applies alt as aria-label on the root span when showing the SVG fallback', () => {
    const { container } = render(<Avatar alt="Jane Doe" />);
    expect(container.querySelector('.mds-avatar')).toHaveAttribute(
      'aria-label',
      'Jane Doe',
    );
  });

  it('applies alt as aria-label on root span after image load error (initials fallback)', () => {
    const { container } = render(
      <Avatar
        imageSrc="https://example.com/broken.jpg"
        initials="JD"
        alt="Jane Doe"
      />,
    );
    fireEvent.error(container.querySelector('img')!);
    expect(container.querySelector('.mds-avatar')).toHaveAttribute(
      'aria-label',
      'Jane Doe',
    );
  });

  it('hides initials from AT when alt is provided and no image is showing', () => {
    // The root span carries the accessible name via aria-label; the raw initials
    // text ("JD") must be suppressed to avoid a double-announcement.
    const { container } = render(<Avatar initials="JD" alt="Jane Doe" />);
    expect(container.querySelector('.mds-avatar__initials')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });

  it('does not set aria-label or role on the root span when alt is omitted in non-image state', () => {
    // No alt = purely decorative or initials-as-accessible-text use case.
    const { container } = render(<Avatar initials="JD" />);
    const root = container.querySelector('.mds-avatar');
    expect(root).not.toHaveAttribute('aria-label');
    expect(root).not.toHaveAttribute('role');
  });

  it('does not set derived aria-label or role on the root span when the image is showing', () => {
    // The <img alt> carries the accessible name; no redundant aria-label or
    // role override needed on the span.
    const { container } = render(
      <Avatar
        imageSrc="https://example.com/photo.jpg"
        initials="JD"
        alt="Jane Doe"
      />,
    );
    const root = container.querySelector('.mds-avatar');
    expect(root).not.toHaveAttribute('aria-label');
    expect(root).not.toHaveAttribute('role');
  });
});

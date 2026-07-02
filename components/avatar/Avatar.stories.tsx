import type { Meta, StoryObj } from '@storybook/react-vite';
import type React from 'react';
import { expect } from 'storybook/test';
import { Avatar } from './Avatar';

// Served from .storybook/assets/ via Storybook's staticDirs — a plain URL keeps the
// Controls panel readable and works offline without an external image service.
const PLACEHOLDER_IMG = '/Jessica.jpeg';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'test', 'stable'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Visual size of the avatar.',
      table: {
        type: { summary: 'xs | sm | md | lg | xl | xxl' },
        defaultValue: { summary: 'md' },
      },
    },
    initials: {
      control: { type: 'text' },
      description:
        '1–2 character fallback initials shown when no image is provided or when the image fails to load. Should always be set by the caller.',
      table: {
        type: { summary: 'string' },
      },
    },
    imageSrc: {
      control: { type: 'text' },
      description:
        'Image URL. When provided the photo is shown; if it fails to load the component falls back to initials automatically.',
      table: {
        type: { summary: 'string' },
      },
    },
    alt: {
      control: { type: 'text' },
      description:
        "Accessible description of the image passed to the inner `<img>`. Use the user's full name. Omit when the avatar is purely decorative.",
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    initials: 'JD',
    alt: 'Jane Doe',
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageSrc: PLACEHOLDER_IMG,
  },
  play: async ({ canvas }) => {
    // getByRole 'img' matches the inner <img alt="Jane Doe"> directly
    const avatar = canvas.getByRole('img', { name: 'Jane Doe' });
    await expect(avatar).toBeVisible();
    await expect(avatar.closest('.mds-avatar')).toHaveClass('mds-avatar');
  },
};

export const InitialsFallback: Story = {
  play: async ({ canvas }) => {
    // No image is present; the initials span is the visible fallback and is
    // not aria-hidden, so its text content is readable by AT.
    const initialsEl = canvas.getByText('JD');
    await expect(initialsEl).toBeVisible();
    await expect(initialsEl).toHaveTextContent('JD');
    await expect(initialsEl.closest('.mds-avatar')).toHaveClass('mds-avatar');
  },
};

export const SilhouetteFallback: Story = {
  args: {
    initials: '',
  },
  parameters: {
    docs: {
      description: {
        story:
          'When `initials` is empty and no `imageSrc` is provided the component automatically renders the silhouette placeholder. ' +
          'This covers data-driven lists where user name data may be temporarily unavailable.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    // The silhouette is a decorative <img alt=""> so it is hidden from the
    // accessibility tree. Query the DOM directly to confirm it rendered.
    const root = canvasElement.querySelector('.mds-avatar');
    await expect(root).not.toBeNull();
    const img = root?.querySelector('img');
    await expect(img).not.toBeNull();
    await expect(img).toHaveAttribute('alt', '');
  },
};

export const AllSizes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      canvas: { sourceState: 'none' },
      description: {
        story:
          'All six sizes shown without and with a profile image. <br>' +
          '**Note:** `xs` and `sm` are image-only sizes — initials are not officially supported at these dimensions per the design spec.',
      },
    },
  },
  render: () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;
    const initialsOnly = ['md', 'lg', 'xl', 'xxl'] as const;

    const gridRowStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      alignItems: 'center',
      gap: '0.5rem',
    };
    const headerLabelStyle: React.CSSProperties = {
      textAlign: 'center',
      fontSize: '0.75rem',
      fontWeight: 600,
      textTransform: 'uppercase',
    };
    const rowLabelStyle: React.CSSProperties = { fontSize: '0.75rem' };
    const cellStyle: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'center',
    };
    const naStyle: React.CSSProperties = {
      textAlign: 'center',
      fontSize: '0.75rem',
      color: '#888',
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Header row */}
        <div style={gridRowStyle}>
          <span />
          {sizes.map((s) => (
            <span key={s} style={headerLabelStyle}>
              {s}
            </span>
          ))}
        </div>
        {/* Images row */}
        <div style={gridRowStyle}>
          <span style={rowLabelStyle}>Image</span>
          {sizes.map((s) => (
            <div key={s} style={cellStyle}>
              <Avatar
                size={s}
                imageSrc={PLACEHOLDER_IMG}
                initials="JD"
                alt="Jane Doe"
              />
            </div>
          ))}
        </div>
        {/* Initials row */}
        <div style={gridRowStyle}>
          <span style={rowLabelStyle}>Initials</span>
          {sizes.map((s) => (
            <div key={s} style={cellStyle}>
              {initialsOnly.includes(s as (typeof initialsOnly)[number]) ? (
                <Avatar size={s} initials="JD" />
              ) : (
                <span style={naStyle}>N/A</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  },
};

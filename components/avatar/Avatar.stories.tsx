import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Avatar } from './Avatar';

// Placeholder image used only in story previews.
// Replace with a real user photo URL in the consuming application.
const PLACEHOLDER_IMG = 'https://picsum.photos/seed/mds-avatar/96/96';

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
    size: 'md',
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
          '**Note:** `xs` and `sm` are image-only sizes — initials are not officially supported at these dimensions per the design spec. ' +
          'In development, a `console.warn` is raised when `size="xs"` or `size="sm"` is rendered without an `imageSrc` ' +
          '(including the automatic fallback state when an image fails to load). ' +
          'Use `size="md"` or larger when initials must be shown.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <p style={{ margin: 0 }}>Image (all sizes)</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const).map((size) => (
          <Avatar
            key={size}
            size={size}
            imageSrc={PLACEHOLDER_IMG}
            initials="JD"
            alt="Jane Doe"
          />
        ))}
      </div>
      <p style={{ margin: 0 }}>Initials (md–xxl)</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {(['md', 'lg', 'xl', 'xxl'] as const).map((size) => (
          <Avatar key={size} size={size} initials="JD" />
        ))}
      </div>
    </div>
  ),
};

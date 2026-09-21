import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Tag } from './Tag';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'test', 'beta'],
  argTypes: {
    content: {
      control: { type: 'text' },
      description:
        "Position 1 — the tag's name/category label. Always rendered first. Required.",
      table: {
        type: { summary: 'string' },
      },
    },
    type: {
      control: { type: 'select' },
      options: ['link', 'removable'],
      description:
        'Interaction mode. A Tag either navigates (link) or can be removed (removable) — never both.',
      table: {
        type: { summary: 'link | removable' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: [undefined, 'default', 'danger'],
      description:
        'Colour variant. Link mode only — removable mode has no colour axis and always renders its neutral surface. Omit for `default`.',
      if: { arg: 'type', eq: 'link' },
      table: {
        type: {
          summary: 'default | danger',
        },
      },
    },
    username: {
      control: { type: 'text' },
      description:
        "Position 2 — a person's username or a tenant's short name. Shown before `email` when both are present.",
      table: {
        type: { summary: 'string' },
      },
    },
    email: {
      control: { type: 'text' },
      description:
        'Position 2 — an email address, shown after `username`. Person-only — omit for Tenant tags.',
      table: {
        type: { summary: 'string' },
      },
    },
    institution: {
      control: { type: 'text' },
      description:
        'Position 3 — institution name only. Visible independently of Position 2.',
      table: {
        type: { summary: 'string' },
      },
    },
    avatar: {
      control: { type: 'object' },
      description:
        'Optional leading identity avatar (imageSrc, alt, initials). Rendered via the MDS Avatar component at xs size.',
      table: {
        type: { summary: '{ imageSrc?, alt?, initials? }' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description:
        'Disables the whole tag. In removable mode this also disables the nested CloseButton. Not valid together with `nonRemovable` — a non-removable tag has nothing left to disable.',
      // Hidden once nonRemovable is on — the combination is invalid (see
      // description). Unaffected in link mode, since nonRemovable is never
      // set there (its value stays undefined, which is !== true).
      if: { arg: 'nonRemovable', neq: true },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    href: {
      control: { type: 'text' },
      description: 'Destination URL. Link mode only.',
      if: { arg: 'type', eq: 'link' },
      table: {
        type: { summary: 'string' },
      },
    },
    removeLabel: {
      control: { type: 'text' },
      description:
        'Accessible name for the nested CloseButton, e.g. "Remove Ana Silva". Removable mode only.',
      if: { arg: 'type', eq: 'removable' },
      table: {
        type: { summary: 'string' },
      },
    },
    nonRemovable: {
      control: { type: 'boolean' },
      description:
        'Renders no CloseButton at all — the value is fixed. Removable mode only. Not combinable with `disabled`.',
      if: { arg: 'type', eq: 'removable' },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    invalid: {
      control: { type: 'boolean' },
      description:
        'Marks the value as failing validation after selection. Removable mode only.',
      if: { arg: 'type', eq: 'removable' },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    onRemove: {
      description: 'Callback fired when the CloseButton is activated.',
      if: { arg: 'type', eq: 'removable' },
      table: {
        type: { summary: '(event: MouseEvent<HTMLButtonElement>) => void' },
      },
    },
  },
  args: {
    type: 'removable',
    content: 'Ana Silva',
    removeLabel: 'Remove Ana Silva',
    onRemove: () => {},
  },
  play: async ({ canvasElement }) => {
    const tags = canvasElement.querySelectorAll('.mds-tag');
    await expect(tags.length).toBeGreaterThan(0);
  },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Removable = {} satisfies Story;

export const Link = {
  args: {
    type: 'link',
    content: 'Category name',
    href: '#',
    removeLabel: undefined,
    onRemove: undefined,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('link', { name: 'Category name' }),
    ).toBeVisible();
  },
} satisfies Story;

export const WithAvatar = {
  parameters: {
    docs: {
      description: {
        story:
          "The avatar's size is derived automatically from how many of the three text lines are populated — content only, as here, renders it at `xs`. See `AvatarScaling` for the full xs/md/lg progression.",
      },
    },
  },
  args: {
    avatar: { initials: 'AS', alt: 'Ana Silva' },
  },
  play: async ({ canvas }) => {
    const avatar = canvas.getByLabelText('Ana Silva');
    await expect(avatar).toBeVisible();
    await expect(avatar).toHaveClass('mds-avatar--xs');
  },
} satisfies Story;

export const WithSupportingTextAndInstitution = {
  parameters: {
    docs: {
      description: {
        story:
          '`username` and `email` are Position 2 — shown divider-separated, username first — and `institution` is Position 3.',
      },
    },
  },
  args: {
    username: 'ana.silva',
    email: 'ana.silva@example.com',
    institution: 'Moodle HQ',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('ana.silva')).toBeVisible();
    await expect(canvas.getByText('Moodle HQ')).toBeVisible();
  },
} satisfies Story;

export const NonRemovable = {
  args: {
    nonRemovable: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole('button')).not.toBeInTheDocument();
  },
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('button', { name: 'Remove Ana Silva' }),
    ).toBeDisabled();
  },
} satisfies Story;

export const Invalid = {
  args: {
    invalid: true,
  },
  play: async ({ canvasElement }) => {
    const tag = canvasElement.querySelector('.mds-tag');
    await expect(tag).toHaveClass('is-invalid');
  },
} satisfies Story;

const showcaseParameters = {
  controls: { disable: true },
  docs: {
    canvas: { sourceState: 'none' as const },
  },
};

const showcaseInlineStyle = {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap' as const,
  gap: 'var(--mds-spacing-sm)',
};

export const Variants = {
  parameters: {
    ...showcaseParameters,
    docs: {
      description: {
        story:
          'Colour variants are link mode only — removable mode has no colour axis and always renders its neutral surface.',
      },
    },
  },
  render: () => (
    <div style={showcaseInlineStyle}>
      {(['default', 'danger'] as const).map((variant) => (
        <Tag
          key={variant}
          type="link"
          href="#"
          content={variant}
          variant={variant}
        />
      ))}
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: 'default' })).toBeVisible();
  },
} satisfies Story;

export const AvatarScaling = {
  parameters: {
    ...showcaseParameters,
    docs: {
      description: {
        story:
          'The avatar scales with how many of the three text lines are populated: `xs` for content alone, `md` when one of Position 2 or institution is also present, `lg` when all three are filled.',
      },
    },
  },
  render: () => (
    <div style={showcaseInlineStyle}>
      <Tag
        type="removable"
        content="Ana Silva"
        avatar={{ initials: 'AS', alt: 'Ana Silva xs' }}
        removeLabel="Remove Ana Silva"
        onRemove={() => {}}
      />
      <Tag
        type="removable"
        content="Ana Silva"
        username="ana.silva"
        avatar={{ initials: 'AS', alt: 'Ana Silva md' }}
        removeLabel="Remove Ana Silva"
        onRemove={() => {}}
      />
      <Tag
        type="removable"
        content="Ana Silva"
        username="ana.silva"
        institution="Moodle HQ"
        avatar={{ initials: 'AS', alt: 'Ana Silva lg' }}
        removeLabel="Remove Ana Silva"
        onRemove={() => {}}
      />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Ana Silva xs')).toHaveClass(
      'mds-avatar--xs',
    );
    await expect(canvas.getByLabelText('Ana Silva md')).toHaveClass(
      'mds-avatar--md',
    );
    await expect(canvas.getByLabelText('Ana Silva lg')).toHaveClass(
      'mds-avatar--lg',
    );
  },
} satisfies Story;

export const RightToLeft = {
  tags: ['test', 'beta'],
  args: {
    content: 'أحمد محمد',
    avatar: { initials: 'أم', alt: 'أحمد محمد' },
    username: 'ahmed.mohamed',
    institution: 'جامعة الملك سعود',
    removeLabel: 'إزالة أحمد محمد',
  },
  decorators: [
    (StoryFn) => (
      <div dir="rtl">
        <StoryFn />
      </div>
    ),
  ],
  play: async ({ canvas }) => {
    await expect(canvas.getByText('أحمد محمد')).toBeVisible();
    await expect(canvas.getByText('جامعة الملك سعود')).toBeVisible();
  },
} satisfies Story;

import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect } from 'storybook/test';
import { Button } from '../button';
import type { TagAvatar, TagVariant } from './Tag';
import { Tag } from './Tag';

const PLACEHOLDER_IMG = 'jessica.jpeg';

// Avatar doesn't render initials at `xs` (content-only tags), so that option
// only shows initials once a Position 2 or institution line is populated.
const avatarMapping: Record<string, TagAvatar | undefined> = {
  None: undefined,
  Image: { imageSrc: PLACEHOLDER_IMG, alt: 'Ana Silva' },
  'Initials (md and up)': { initials: 'AS', alt: 'Ana Silva' },
};

/**
 * Controls hold the union of both modes' args, so passing them straight
 * through would leak link-only props (`href`) onto the removable `<span>`
 * and removable-only props onto the `<a>`. The playground render hands
 * each mode only the props it accepts, and falls back to a default `href`
 * so switching `type` to link still renders a focusable anchor.
 */
interface PlaygroundArgs {
  type?: string;
  content: string;
  username?: string;
  email?: string;
  institution?: string;
  avatar?: TagAvatar;
  disabled?: boolean;
  href?: string;
  variant?: TagVariant;
  removeLabel?: string;
  onRemove?: () => void;
}

const renderPlayground = (args: PlaygroundArgs) => {
  const {
    type,
    href,
    variant,
    removeLabel,
    onRemove,
    username,
    email,
    institution,
    avatar,
    ...shared
  } = args;

  if (type === 'link') {
    return <Tag {...shared} type="link" href={href || '#'} variant={variant} />;
  }

  return (
    <Tag
      {...shared}
      type="removable"
      username={username}
      email={email}
      institution={institution}
      avatar={avatar}
      removeLabel={removeLabel || `Remove ${shared.content}`}
      onRemove={onRemove ?? (() => {})}
    />
  );
};

const meta = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Text is laid out in up to three lines, referred to as positions in the prop docs. ' +
          '**Position 1** is `content`, the name or category, always shown first. ' +
          '**Position 2** is the supporting line: **2a** `username` then **2b** `email`, divider-separated when both are set. ' +
          '**Position 3** is `institution`, on its own line. ' +
          'In RTL the order within each line mirrors, so 2a stays leading and 2b trailing.',
      },
    },
  },
  tags: ['autodocs', 'test', 'stable'],
  argTypes: {
    content: {
      type: { name: 'string', required: true },
      control: { type: 'text' },
      description:
        "Position 1 — the tag's name/category label. Always rendered first. Required.",
      table: {
        type: { summary: 'string' },
      },
    },
    type: {
      type: { name: 'string', required: true },
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
      options: ['default', 'danger'],
      description:
        'Colour variant. Link mode only — removable mode has no colour axis and always renders its neutral surface.',
      if: { arg: 'type', eq: 'link' },
      table: {
        type: {
          summary: 'default | danger',
        },
        defaultValue: { summary: 'default' },
      },
    },
    username: {
      if: { arg: 'type', eq: 'removable' },
      control: { type: 'text' },
      description:
        "Position 2a — a person's username or a tenant's short name. Shown before `email` when both are present.",
      table: {
        type: { summary: 'string' },
      },
    },
    email: {
      if: { arg: 'type', eq: 'removable' },
      control: { type: 'text' },
      description:
        'Position 2b — an email address, shown after `username`. Person-only — omit for Tenant tags.',
      table: {
        type: { summary: 'string' },
      },
    },
    institution: {
      if: { arg: 'type', eq: 'removable' },
      control: { type: 'text' },
      description:
        'Position 3 — institution name only. Visible independently of Position 2.',
      table: {
        type: { summary: 'string' },
      },
    },
    avatar: {
      if: { arg: 'type', eq: 'removable' },
      options: Object.keys(avatarMapping),
      mapping: avatarMapping,
      control: { type: 'select' },
      description:
        'Optional leading identity avatar (imageSrc, alt, initials), rendered via the MDS Avatar component. Its size scales with how many text lines are populated.',
      table: {
        type: { summary: '{ imageSrc?, alt?, initials? }' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description:
        'Disables the whole tag. In removable mode this also disables the nested CloseButton.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    href: {
      type: { name: 'string', required: true },
      control: { type: 'text' },
      description: 'Destination URL. Link mode only.',
      if: { arg: 'type', eq: 'link' },
      table: {
        type: { summary: 'string' },
      },
    },
    removeLabel: {
      type: { name: 'string', required: true },
      control: { type: 'text' },
      description:
        'Accessible name for the nested CloseButton, e.g. "Remove Ana Silva". Removable mode only.',
      if: { arg: 'type', eq: 'removable' },
      table: {
        type: { summary: 'string' },
      },
    },
    onRemove: {
      type: { name: 'function', required: true },
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
    disabled: false,
  },
  // Safe: the controls always supply a superset of PlaygroundArgs; the
  // union type just can't express mixed-mode args.
  render: (args) => renderPlayground(args as unknown as PlaygroundArgs),
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
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('link', { name: 'Category name' }),
    ).toBeVisible();
  },
} satisfies Story;

/**
 * Resolves a colour token to the computed rgb() string the browser reports
 * for it, so style assertions compare like with like (tokens may be hex).
 */
const resolveColourToken = (token: string) => {
  const probe = document.createElement('span');
  probe.style.color = `var(${token})`;
  document.body.append(probe);
  const colour = getComputedStyle(probe).color;
  probe.remove();
  return colour;
};

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
  // Guards the danger tokens: its states once fell through to the Default
  // (primary) tokens. Hover/pressed can't be driven from here — user-event's
  // synthetic pointer events don't trigger CSS :hover or :active.
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByRole('link', { name: 'default' })).toBeVisible();

    const danger = canvas.getByRole('link', { name: 'danger' });
    const dangerStyle = getComputedStyle(danger);
    await expect(dangerStyle.color).toBe(
      resolveColourToken('--mds-text-feedback-danger'),
    );
    await expect(dangerStyle.backgroundColor).toBe(
      resolveColourToken('--mds-bg-feedback-danger-light'),
    );
    await expect(dangerStyle.borderColor).toBe(
      resolveColourToken('--mds-border-feedback-danger'),
    );

    await userEvent.tab();
    await userEvent.tab();
    await expect(danger).toHaveFocus();
    await expect(getComputedStyle(danger).outlineColor).toBe(
      resolveColourToken('--mds-focus-danger'),
    );
  },
} satisfies Story;

export const WithAvatar = {
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

export const Disabled = {
  args: {
    disabled: true,
    username: 'ana.silva',
    institution: 'Moodle HQ',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('button', { name: 'Remove Ana Silva' }),
    ).toBeDisabled();
    await expect(getComputedStyle(canvas.getByText('Ana Silva')).color).toBe(
      resolveColourToken('--mds-text-subtle'),
    );
    for (const line of ['ana.silva', 'Moodle HQ']) {
      await expect(getComputedStyle(canvas.getByText(line)).color).toBe(
        resolveColourToken('--mds-text-muted'),
      );
    }
  },
} satisfies Story;

const RemovableTagList = () => {
  const [names, setNames] = useState(['Ana Silva', 'Jordan Lee']);
  return (
    <div style={showcaseInlineStyle}>
      {names.map((name) => (
        <Tag
          key={name}
          type="removable"
          content={name}
          removeLabel={`Remove ${name}`}
          onRemove={() =>
            setNames((current) => current.filter((item) => item !== name))
          }
        />
      ))}
      <Button label="Next target" variant="secondary" />
    </div>
  );
};

/**
 * Removal is consumer-owned: `onRemove` fires and the consumer unmounts the
 * tag. If that leaves focus stranded on `<body>`, Tag moves it to the next
 * focusable element — here the next tag's Close button, then the button.
 * A consumer that places focus itself is never overridden.
 */
export const FocusMovesAfterRemove = {
  parameters: {
    ...showcaseParameters,
    chromatic: { disableSnapshot: true },
  },
  render: () => <RemovableTagList />,
  play: async ({ canvas, userEvent }) => {
    const firstRemove = canvas.getByRole('button', {
      name: 'Remove Ana Silva',
    });
    firstRemove.focus();
    await userEvent.click(firstRemove);
    // Wait for the requestAnimationFrame that moves focus after unmount.
    await new Promise((resolve) => requestAnimationFrame(resolve));
    const secondRemove = canvas.getByRole('button', {
      name: 'Remove Jordan Lee',
    });
    await expect(secondRemove).toHaveFocus();

    await userEvent.click(secondRemove);
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await expect(
      canvas.getByRole('button', { name: 'Next target' }),
    ).toHaveFocus();
  },
} satisfies Story;

export const RightToLeft = {
  tags: ['test', 'stable'],
  parameters: {
    ...showcaseParameters,
    docs: {
      description: {
        story:
          'Moodle restricts usernames to lowercase ASCII by default, so an ASCII username inside an RTL layout is the common case (first tag). ' +
          'Sites with `extendedusernamechars` enabled can have non-Latin usernames, and internationalised email addresses exist too, so the second tag shows an all-Arabic identity to cover both. ' +
          'The link pill covers link mode.',
      },
    },
  },
  render: () => (
    <div dir="rtl" style={showcaseInlineStyle}>
      <Tag
        type="removable"
        content="أحمد محمد"
        avatar={{ initials: 'أم', alt: 'أحمد محمد' }}
        username="ahmed.mohamed"
        email="ahmed.mohamed@example.com"
        institution="جامعة الملك سعود"
        removeLabel="إزالة أحمد محمد"
        onRemove={() => {}}
      />
      <Tag
        type="removable"
        content="فاطمة علي"
        avatar={{ initials: 'فع', alt: 'فاطمة علي' }}
        username="فاطمة.علي"
        email="فاطمة@مثال.السعودية"
        institution="جامعة الملك سعود"
        removeLabel="إزالة فاطمة علي"
        onRemove={() => {}}
      />
      <Tag type="link" href="#" content="علوم الحاسب" />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('أحمد محمد')).toBeVisible();
    await expect(canvas.getByText('ahmed.mohamed@example.com')).toBeVisible();
    await expect(canvas.getByText('فاطمة.علي')).toBeVisible();
    await expect(canvas.getByText('فاطمة@مثال.السعودية')).toBeVisible();
    await expect(canvas.getAllByText('جامعة الملك سعود')).toHaveLength(2);
    await expect(
      canvas.getByRole('link', { name: 'علوم الحاسب' }),
    ).toBeVisible();
  },
} satisfies Story;

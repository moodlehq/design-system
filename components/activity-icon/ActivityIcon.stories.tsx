import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { ActivityIcon } from './ActivityIcon';
import {
  type ActivityIconCategory,
  type ActivityIconName,
  activityIconNames,
  activityIconRegistry,
} from './activityIconRegistry';

const meta = {
  title: 'Components/ActivityIcon',
  component: ActivityIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'test', 'stable'],
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: activityIconNames,
      description:
        'Activity icon name derived from assets in components/activity-icon/assets.',
      table: {
        type: { summary: activityIconNames.join(' | ') },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Icon size variant.',
      table: {
        type: { summary: 'sm | md | lg | xl' },
        defaultValue: { summary: 'md' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['none', 'default', 'large'],
      description:
        'Background/size variant matching Figma activity icon treatments.',
      table: {
        type: { summary: 'none | default | large' },
        defaultValue: { summary: 'default' },
      },
    },
    alt: {
      control: { type: 'text' },
      description:
        'Accessible alt text for non-decorative usage. Leave empty for decorative icons.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
  },
  args: {
    icon: 'assignment',
    size: 'md',
    variant: 'default',
    alt: '',
  },
} satisfies Meta<typeof ActivityIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const VariantDefault: Story = {
  args: {
    variant: 'default',
    icon: 'assignment',
  },
};

export const VariantNone: Story = {
  args: {
    variant: 'none',
    icon: 'assignment',
  },
};

export const VariantLarge: Story = {
  args: {
    variant: 'large',
    icon: 'assignment',
  },
};

export const WithAltText: Story = {
  args: {
    variant: 'default',
    icon: 'assignment',
    alt: 'Assignment activity icon',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('img', { name: 'Assignment activity icon' }),
    ).toBeVisible();
  },
};

export const SizeSmall: Story = {
  args: {
    size: 'sm',
    variant: 'default',
    icon: 'assignment',
  },
};

export const SizeMedium: Story = {
  args: {
    size: 'md',
    variant: 'default',
    icon: 'assignment',
  },
};

export const SizeLarge: Story = {
  args: {
    size: 'lg',
    variant: 'default',
    icon: 'assignment',
  },
};

export const SizeExtraLarge: Story = {
  args: {
    size: 'xl',
    variant: 'default',
    icon: 'assignment',
  },
};

export const CategoryCollaboration: Story = {
  args: {
    variant: 'default',
    icon: 'forum',
  },
};

export const CategoryAssessment: Story = {
  args: {
    variant: 'default',
    icon: 'assignment',
  },
};

export const CategoryCommunication: Story = {
  args: {
    variant: 'default',
    icon: 'chat',
  },
};

export const CategoryInteractive: Story = {
  args: {
    variant: 'default',
    icon: 'lesson',
  },
};

export const CategoryOther: Story = {
  args: {
    variant: 'default',
    icon: 'h5p',
  },
};

export const CategoryResource: Story = {
  args: {
    variant: 'default',
    icon: 'file-pdf',
  },
};

export const AllIcons: Story = {
  parameters: {
    layout: 'padded',
    // The render function includes gallery scaffolding that is not a canonical usage snippet.
    docs: {
      canvas: { sourceState: 'none' },
    },
  },
  render: () => {
    const categories: Array<{ key: ActivityIconCategory; label: string }> = [
      { key: 'assessment', label: 'Assessment' },
      { key: 'collaboration', label: 'Collaboration' },
      { key: 'communication', label: 'Communication' },
      { key: 'interactive', label: 'Interactive' },
      { key: 'resource', label: 'Resource' },
      { key: 'other', label: 'Other' },
    ];

    const typedActivityIconNames = activityIconNames as ActivityIconName[];

    const iconsByCategory = categories.reduce<
      Record<ActivityIconCategory, ActivityIconName[]>
    >(
      (acc, { key }) => {
        acc[key] = typedActivityIconNames.filter(
          (name) => activityIconRegistry[name].category === key,
        );
        return acc;
      },
      {} as Record<ActivityIconCategory, ActivityIconName[]>,
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {categories.map(({ key, label }) => (
          <section key={key}>
            <h3
              style={{
                marginBottom: '1rem',
                fontSize: '14px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--mds-text-muted)',
              }}
            >
              {label}
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                gap: '0.75rem',
              }}
            >
              {iconsByCategory[key].map((name) => (
                <div
                  key={name}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 0.5rem',
                    borderRadius: '6px',
                    border: '1px solid var(--mds-border-subtle)',
                    background: 'var(--mds-bg-surface-subtle)',
                  }}
                >
                  <ActivityIcon
                    icon={name}
                    variant="default"
                    size="md"
                    alt=""
                  />
                  <span
                    style={{
                      fontSize: '11px',
                      color: 'var(--mds-text-subtle)',
                      wordBreak: 'break-all',
                      lineHeight: 1.3,
                    }}
                  >
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  },
};

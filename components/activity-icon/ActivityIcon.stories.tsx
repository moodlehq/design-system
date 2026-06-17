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
    container: {
      control: { type: 'select' },
      options: ['none', 'default', 'large'],
      description: 'Container treatment matching Figma activity icon styles.',
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
    size: undefined,
    container: undefined,
    alt: '',
  },
} satisfies Meta<typeof ActivityIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

const showcaseParameters = {
  controls: { disable: true },
  docs: {
    canvas: { sourceState: 'none' as const },
  },
};

const showcaseStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--mds-spacing-md)',
};

export const Default: Story = {};

export const Containers: Story = {
  parameters: showcaseParameters,
  render: (args) => (
    <div style={showcaseStyles}>
      <ActivityIcon
        {...args}
        container="none"
        icon="assignment"
        alt="None container"
      />
      <ActivityIcon
        {...args}
        container="default"
        icon="assignment"
        alt="Default container"
      />
      <ActivityIcon
        {...args}
        container="large"
        icon="assignment"
        alt="Large container"
      />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('img', { name: 'None container' }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('img', { name: 'Default container' }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('img', { name: 'Large container' }),
    ).toBeVisible();
  },
};

export const Sizes: Story = {
  parameters: showcaseParameters,
  render: (args) => (
    <div style={showcaseStyles}>
      <ActivityIcon
        {...args}
        size="sm"
        container="default"
        icon="assignment"
        alt="Small size"
      />
      <ActivityIcon
        {...args}
        size="md"
        container="default"
        icon="assignment"
        alt="Medium size"
      />
      <ActivityIcon
        {...args}
        size="lg"
        container="default"
        icon="assignment"
        alt="Large size"
      />
      <ActivityIcon
        {...args}
        size="xl"
        container="default"
        icon="assignment"
        alt="Extra large size"
      />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: 'Small size' })).toBeVisible();
    await expect(
      canvas.getByRole('img', { name: 'Medium size' }),
    ).toBeVisible();
    await expect(canvas.getByRole('img', { name: 'Large size' })).toBeVisible();
    await expect(
      canvas.getByRole('img', { name: 'Extra large size' }),
    ).toBeVisible();
  },
};

export const Categories: Story = {
  parameters: showcaseParameters,
  render: (args) => (
    <div style={{ ...showcaseStyles, flexWrap: 'wrap' }}>
      <ActivityIcon
        {...args}
        container="default"
        icon="forum"
        alt="Collaboration category"
      />
      <ActivityIcon
        {...args}
        container="default"
        icon="assignment"
        alt="Assessment category"
      />
      <ActivityIcon
        {...args}
        container="default"
        icon="chat"
        alt="Communication category"
      />
      <ActivityIcon
        {...args}
        container="default"
        icon="lesson"
        alt="Interactive category"
      />
      <ActivityIcon
        {...args}
        container="default"
        icon="h5p"
        alt="Other category"
      />
      <ActivityIcon
        {...args}
        container="default"
        icon="file-pdf"
        alt="Resource category"
      />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('img', { name: 'Collaboration category' }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('img', { name: 'Assessment category' }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('img', { name: 'Communication category' }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('img', { name: 'Interactive category' }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('img', { name: 'Other category' }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('img', { name: 'Resource category' }),
    ).toBeVisible();
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
                    container="default"
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

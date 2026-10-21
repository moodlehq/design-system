import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { CourseCard } from './CourseCard';
import courseImage from './assets/course-card-example.jpg';
import teacherImage from './assets/teacher-avatar-example.jpg';

const meta = {
  title: 'Components/CourseCard',
  component: CourseCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'test', 'beta'],
  decorators: [
    (Story) => (
      <div style={{ inlineSize: '285px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Course name. Must be a caller-supplied translated string.',
      table: { type: { summary: 'string' } },
    },
    headingLevel: {
      control: { type: 'select' },
      options: [2, 3, 4, 5, 6],
      description: 'Heading level for the title.',
      table: {
        type: { summary: '2 | 3 | 4 | 5 | 6' },
        defaultValue: { summary: '3' },
      },
    },
    subtitle: {
      control: { type: 'text' },
      description: 'Secondary text beneath the title, e.g. the category.',
      table: { type: { summary: 'string' } },
    },
    imageSrc: {
      control: false,
      description: 'Course image URL. The image block is omitted when unset.',
      table: { type: { summary: 'string' } },
    },
    imageAlt: {
      control: { type: 'text' },
      description: 'Alt text for the course image. Empty when decorative.',
      table: { type: { summary: 'string' } },
    },
    badgeLabel: {
      control: { type: 'text' },
      description: 'Optional badge text shown beneath the title block.',
      table: { type: { summary: 'string' } },
    },
    teacherName: {
      control: { type: 'text' },
      description: 'Optional teacher name. Renders the teacher row.',
      table: { type: { summary: 'string' } },
    },
    teacherImageSrc: {
      control: false,
      description: 'Teacher photo URL for the avatar.',
      table: { type: { summary: 'string' } },
    },
    progressLabel: {
      control: { type: 'text' },
      description: 'Pre-translated progress text. Renders the progress bar.',
      table: { type: { summary: 'string' } },
    },
    progressValue: {
      control: { type: 'number' },
      description: 'Current progress value.',
      table: { type: { summary: 'number' }, defaultValue: { summary: '0' } },
    },
    progressMax: {
      control: { type: 'number' },
      description: 'Maximum progress value.',
      table: { type: { summary: 'number' }, defaultValue: { summary: '100' } },
    },
    linkLabel: {
      control: { type: 'text' },
      description: 'Footer link text. Renders with `linkHref`.',
      table: { type: { summary: 'string' } },
    },
    linkHref: {
      control: { type: 'text' },
      description: 'Footer link destination.',
      table: { type: { summary: 'string' } },
    },
  },
  args: {
    title: 'New staff induction',
    subtitle: 'Teaching staff',
    imageSrc: courseImage,
    imageAlt: '',
    progressLabel: 'Lesson 7 of 16',
    progressValue: 7,
    progressMax: 16,
    linkLabel: 'Continue learning',
    linkHref: '#',
  },
} satisfies Meta<typeof CourseCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: 'New staff induction' }),
    ).toBeInTheDocument();
    await expect(canvas.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '7',
    );
    await expect(
      canvas.getByRole('link', { name: 'Continue learning' }),
    ).toBeInTheDocument();
  },
};

export const WithBadgeAndTeacher: Story = {
  args: {
    badgeLabel: 'Label',
    teacherName: 'Mr. Sanders',
    teacherImageSrc: teacherImage,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Label')).toBeInTheDocument();
    await expect(canvas.getByText('Mr. Sanders')).toBeInTheDocument();
  },
};

export const WithoutImage: Story = {
  args: { imageSrc: undefined },
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole('img')).not.toBeInTheDocument();
  },
};

export const TitleOnly: Story = {
  args: {
    subtitle: undefined,
    imageSrc: undefined,
    progressLabel: undefined,
    linkLabel: undefined,
    linkHref: undefined,
  },
};

export const RightToLeft: Story = {
  tags: ['test', 'beta'],
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
};

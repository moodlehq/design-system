/// <reference types="vite/client" />
import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import contributingContent from '../.github/CONTRIBUTING.md?raw';

const meta: Meta = {
  title: 'Documentation/Contributing',
  parameters: {
    docs: { page: () => <Markdown>{contributingContent}</Markdown> },
  },
  tags: ['autodocs', '!test'],
};

export default meta;
export const Contributing: StoryObj = { render: () => <></>, tags: ['!dev'] };

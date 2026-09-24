/// <reference types="vite/client" />
import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import readmeContent from '../README.md?raw';

const meta: Meta = {
  title: 'Documentation/Getting Started',
  parameters: { docs: { page: () => <Markdown>{readmeContent}</Markdown> } },
  tags: ['autodocs', '!test'],
};

export default meta;
export const GettingStarted: StoryObj = { render: () => <></>, tags: ['!dev'] };

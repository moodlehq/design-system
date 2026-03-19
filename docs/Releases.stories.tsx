/// <reference types="vite/client" />
import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import releaseContent from '../RELEASES.md?raw';

const meta: Meta = {
  title: 'Documentation/Releases',
  parameters: { docs: { page: () => <Markdown>{releaseContent}</Markdown> } },
  tags: ['autodocs', '!test'],
};

export default meta;
export const Changelog: StoryObj = { render: () => <></>, tags: ['!dev'] };

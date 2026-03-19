/// <reference types="vite/client" />
import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import changelogContent from '../CHANGELOG.md?raw';

const meta: Meta = {
  title: 'Documentation/Changelog',
  parameters: { docs: { page: () => <Markdown>{changelogContent}</Markdown> } },
  tags: ['autodocs', '!test'],
};

export default meta;
export const Changelog: StoryObj = { render: () => <></>, tags: ['!dev'] };

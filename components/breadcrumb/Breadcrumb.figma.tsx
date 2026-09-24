import figma from '@figma/code-connect';
import { Breadcrumb } from './Breadcrumb';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=13170-296';

// Items: 2
figma.connect(Breadcrumb, url, {
  variant: { Items: '2' },
  example: () => (
    <Breadcrumb
      items={[{ label: 'Home', href: '/' }, { label: 'Current page' }]}
      ariaLabel="Breadcrumb"
    />
  ),
});

// Items: 3
figma.connect(Breadcrumb, url, {
  variant: { Items: '3' },
  example: () => (
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Section', href: '/section' },
        { label: 'Current page' },
      ]}
      ariaLabel="Breadcrumb"
    />
  ),
});

// Items: 4
figma.connect(Breadcrumb, url, {
  variant: { Items: '4' },
  example: () => (
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Section', href: '/section' },
        { label: 'Sub-section', href: '/sub' },
        { label: 'Current page' },
      ]}
      ariaLabel="Breadcrumb"
    />
  ),
});

// Items: More than 4
figma.connect(Breadcrumb, url, {
  variant: { Items: 'More than 4' },
  example: () => (
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Level 2', href: '/l2' },
        { label: 'Level 3', href: '/l3' },
        { label: 'Level 4', href: '/l4' },
        { label: 'Level 5', href: '/l5' },
        { label: 'Current page' },
      ]}
      ariaLabel="Breadcrumb"
    />
  ),
});

// Items: More than 4 (long labels / truncation)
figma.connect(Breadcrumb, url, {
  variant: { Items: 'More than 4' },
  example: () => (
    <Breadcrumb
      items={[
        {
          label: 'Moodle learning platform home page',
          href: '/',
        },
        {
          label: 'Faculty of Arts and Social Sciences',
          href: '/faculty',
        },
        {
          label: 'Bachelor of Design and Technology - 2025 intake cohort',
          href: '/program',
        },
        {
          label: 'DSGN 101 - Introduction to design thinking and process',
          href: '/course',
        },
        {
          label: 'Week 1 - Foundations and context setting workshop',
        },
      ]}
      ariaLabel="Breadcrumb"
    />
  ),
});

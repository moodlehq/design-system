import figma from '@figma/code-connect';
import { Tag } from './Tag';

const url =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=15712-281';

// Type=Link — the Figma file has not yet built out Variant, Avatar,
// Supporting text or Institution sub-properties for this node (only the
// Category names text layer exists), so this mapping covers the built
// state only. Extend it once those properties land in Figma.
figma.connect(Tag, url, {
  variant: { Type: 'Link' },
  example: () => <Tag type="link" href="#" content="Category name" />,
});

// Type=Removable — same caveat: Avatar/Username/Email/Institution are
// present on Tag.removable but currently only expose a single "No" option
// in Figma, so no real variant data can be mapped from them yet.
figma.connect(Tag, url, {
  variant: { Type: 'Removable' },
  example: () => (
    <Tag
      type="removable"
      content="Name/category"
      removeLabel="Remove Name/category"
      onRemove={() => {}}
    />
  ),
});

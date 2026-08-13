import figma from '@figma/code-connect';
import { Dropdown, DropdownMenu } from './Dropdown';
import { DropdownItemAction } from './DropdownItemAction';
import { DropdownItemCustom } from './DropdownItemCustom';
import { DropdownItemDivider } from './DropdownItemDivider';
import { DropdownItemExpandable } from './DropdownItemExpandable';
import { DropdownItemHeader } from './DropdownItemHeader';
import { DropdownItemList } from './DropdownItemList';
import { DropdownItemMultiselect } from './DropdownItemMultiselect';
import { DropdownItemSelect } from './DropdownItemSelect';
import { DropdownTrigger } from './DropdownTrigger';

const dropdownNodeUrl =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=12573-5470&m=dev';
const dropdownTriggerNodeUrl =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=12381-3057&m=dev';
const dropdownMenuNodeUrl =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=12573-1086&m=dev';
const dropdownItemNodeUrl =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=12563-2532&m=dev';
const dropdownItemActionNodeUrl =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=12467-2725&m=dev';
const dropdownItemSelectNodeUrl =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=12515-3057&m=dev';
const dropdownItemExpandableNodeUrl =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=12527-1258&m=dev';
const dropdownItemMultiselectNodeUrl =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=12543-10361&m=dev';
const dropdownItemHeaderNodeUrl =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=12515-1986&m=dev';
const dropdownItemDividerNodeUrl =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=12515-1992&m=dev';
const dropdownItemListNodeUrl =
  'https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?node-id=13587-2085&m=dev';

const triggerLabel = 'Label';
const itemLabel = 'Action item';
const selectLabel = 'Selectable';

/* ------------------------------------------------------------------ */
/* Dropdown (composed)                                                 */
/* ------------------------------------------------------------------ */

figma.connect(Dropdown, dropdownNodeUrl, {
  variant: { Open: 'false' },
  example: () => (
    <Dropdown label={triggerLabel}>
      <DropdownItemHeader label="Dropdown header" />
      <DropdownItemDivider />
      <DropdownItemAction label={itemLabel} />
      <DropdownItemAction label={itemLabel} />
    </Dropdown>
  ),
});

figma.connect(Dropdown, dropdownNodeUrl, {
  variant: { Open: 'true' },
  example: () => (
    <Dropdown label={triggerLabel} defaultOpen>
      <DropdownItemHeader label="Dropdown header" />
      <DropdownItemDivider />
      <DropdownItemAction label={itemLabel} />
      <DropdownItemAction label={itemLabel} />
    </Dropdown>
  ),
});

/* ------------------------------------------------------------------ */
/* Dropdown.trigger                                                    */
/* ------------------------------------------------------------------ */

const triggerAppearance = figma.enum('Appearance', {
  emphasis: 'emphasis',
  default: 'default',
  subtle: 'subtle',
} as const);
const triggerSize = figma.enum('Size', {
  sm: 'sm',
  md: 'md',
} as const);

// Interactive states (default/hover/active/disabled) are CSS states of the
// same component, so every State variant maps to the same example. Focus is
// the keyboard :focus-visible ring.
figma.connect(DropdownTrigger, dropdownTriggerNodeUrl, {
  variant: { Variant: 'button', Icon: 'none' },
  props: { appearance: triggerAppearance, size: triggerSize },
  example: (props) => (
    <DropdownTrigger
      label={triggerLabel}
      appearance={props.appearance}
      size={props.size}
    />
  ),
});

figma.connect(DropdownTrigger, dropdownTriggerNodeUrl, {
  variant: { Variant: 'button', Icon: 'startIcon' },
  props: { appearance: triggerAppearance, size: triggerSize },
  example: (props) => (
    <DropdownTrigger
      label={triggerLabel}
      appearance={props.appearance}
      size={props.size}
      startIcon={<i className="fa-solid fa-face-smile" />}
    />
  ),
});

figma.connect(DropdownTrigger, dropdownTriggerNodeUrl, {
  variant: { Variant: 'button', Icon: 'Icon only' },
  props: { appearance: triggerAppearance, size: triggerSize },
  example: (props) => (
    <DropdownTrigger
      label="Open menu"
      appearance={props.appearance}
      size={props.size}
      startIcon={<i className="fa-solid fa-face-smile" />}
      iconOnly
    />
  ),
});

figma.connect(DropdownTrigger, dropdownTriggerNodeUrl, {
  variant: { Variant: 'nav.pill' },
  example: () => <DropdownTrigger label={triggerLabel} variant="nav-pill" />,
});

/* ------------------------------------------------------------------ */
/* Dropdown.menu                                                       */
/* ------------------------------------------------------------------ */

// The Figma Items variant (2–12) is a static slot count; in code the menu is
// a dynamic container, so all counts map to the same composition pattern.
figma.connect(DropdownMenu, dropdownMenuNodeUrl, {
  example: () => (
    <DropdownMenu>
      <DropdownItemHeader label="Dropdown header" />
      <DropdownItemDivider />
      <DropdownItemAction label={itemLabel} />
      <DropdownItemAction label={itemLabel} />
      <DropdownItemAction label={itemLabel} />
    </DropdownMenu>
  ),
});

/* ------------------------------------------------------------------ */
/* Dropdown.item (variant switcher)                                   */
/* ------------------------------------------------------------------ */

figma.connect(DropdownItemAction, dropdownItemNodeUrl, {
  variant: { Variant: 'action' },
  example: () => <DropdownItemAction label={itemLabel} />,
});

figma.connect(DropdownItemSelect, dropdownItemNodeUrl, {
  variant: { Variant: 'selectable' },
  example: () => <DropdownItemSelect label={selectLabel} />,
});

figma.connect(DropdownItemExpandable, dropdownItemNodeUrl, {
  variant: { Variant: 'expandable' },
  example: () => (
    <DropdownItemExpandable label="Expand">
      <DropdownItemAction label={itemLabel} />
    </DropdownItemExpandable>
  ),
});

figma.connect(DropdownItemMultiselect, dropdownItemNodeUrl, {
  variant: { Variant: 'multi-select' },
  example: () => <DropdownItemMultiselect label="Label text" />,
});

figma.connect(DropdownItemHeader, dropdownItemNodeUrl, {
  variant: { Variant: 'header' },
  example: () => <DropdownItemHeader label="Dropdown header" />,
});

figma.connect(DropdownItemDivider, dropdownItemNodeUrl, {
  variant: { Variant: 'divider' },
  example: () => <DropdownItemDivider />,
});

figma.connect(DropdownItemCustom, dropdownItemNodeUrl, {
  variant: { Variant: 'custom' },
  example: () => (
    <DropdownItemCustom>
      <span>Custom content</span>
    </DropdownItemCustom>
  ),
});

/* ------------------------------------------------------------------ */
/* Dropdown.item.action                                                */
/* ------------------------------------------------------------------ */

const actionVariant = figma.enum('Variant', {
  default: 'default',
  danger: 'danger',
} as const);

figma.connect(DropdownItemAction, dropdownItemActionNodeUrl, {
  variant: { Icon: 'false', Description: 'false' },
  props: { variant: actionVariant },
  example: (props) => (
    <DropdownItemAction label={itemLabel} variant={props.variant} />
  ),
});

figma.connect(DropdownItemAction, dropdownItemActionNodeUrl, {
  variant: { Icon: 'true', Description: 'false' },
  props: { variant: actionVariant },
  example: (props) => (
    <DropdownItemAction
      label={itemLabel}
      variant={props.variant}
      startIcon={<i className="fa-solid fa-face-smile" />}
    />
  ),
});

figma.connect(DropdownItemAction, dropdownItemActionNodeUrl, {
  variant: { Icon: 'true', Description: 'true' },
  props: { variant: actionVariant },
  example: (props) => (
    <DropdownItemAction
      label={itemLabel}
      variant={props.variant}
      startIcon={<i className="fa-solid fa-face-smile" />}
      description="Description goes here"
    />
  ),
});

figma.connect(DropdownItemAction, dropdownItemActionNodeUrl, {
  variant: { Icon: 'false', Description: 'true' },
  props: { variant: actionVariant },
  example: (props) => (
    <DropdownItemAction
      label={itemLabel}
      variant={props.variant}
      description="Description goes here"
    />
  ),
});

figma.connect(DropdownItemAction, dropdownItemActionNodeUrl, {
  variant: { State: 'disabled' },
  props: { variant: actionVariant },
  example: (props) => (
    <DropdownItemAction label={itemLabel} variant={props.variant} disabled />
  ),
});

/* ------------------------------------------------------------------ */
/* Dropdown.item.select                                                */
/* ------------------------------------------------------------------ */

figma.connect(DropdownItemSelect, dropdownItemSelectNodeUrl, {
  variant: { Selected: 'true' },
  example: () => <DropdownItemSelect label={selectLabel} selected />,
});

figma.connect(DropdownItemSelect, dropdownItemSelectNodeUrl, {
  variant: { Selected: 'false' },
  example: () => <DropdownItemSelect label={selectLabel} />,
});

figma.connect(DropdownItemSelect, dropdownItemSelectNodeUrl, {
  variant: { State: 'disabled', Selected: 'true' },
  example: () => <DropdownItemSelect label={selectLabel} selected disabled />,
});

/* ------------------------------------------------------------------ */
/* Dropdown.item.expandable                                            */
/* ------------------------------------------------------------------ */

figma.connect(DropdownItemExpandable, dropdownItemExpandableNodeUrl, {
  example: () => (
    <DropdownItemExpandable label="Expand">
      <DropdownItemAction label={itemLabel} />
    </DropdownItemExpandable>
  ),
});

/* ------------------------------------------------------------------ */
/* dropdown.item.multiselect                                           */
/* ------------------------------------------------------------------ */

figma.connect(DropdownItemMultiselect, dropdownItemMultiselectNodeUrl, {
  example: () => <DropdownItemMultiselect label="Label text" />,
});

/* ------------------------------------------------------------------ */
/* dropdown.item.header                                                */
/* ------------------------------------------------------------------ */

figma.connect(DropdownItemHeader, dropdownItemHeaderNodeUrl, {
  example: () => <DropdownItemHeader label="Dropdown header" />,
});

/* ------------------------------------------------------------------ */
/* dropdown.item.divider                                               */
/* ------------------------------------------------------------------ */

figma.connect(DropdownItemDivider, dropdownItemDividerNodeUrl, {
  example: () => <DropdownItemDivider />,
});

/* ------------------------------------------------------------------ */
/* Dropdown.item.list                                                  */
/* ------------------------------------------------------------------ */

// Keep variant coverage here and split concrete states below.
figma.connect(DropdownItemList, dropdownItemListNodeUrl, {
  example: () => <DropdownItemList label={itemLabel} variant="todo" />,
});

// Variant splits for done/todo states.
figma.connect(DropdownItemList, dropdownItemListNodeUrl, {
  variant: { Variant: 'to do' },
  example: () => <DropdownItemList label={itemLabel} variant="todo" />,
});

figma.connect(DropdownItemList, dropdownItemListNodeUrl, {
  variant: { Variant: 'done' },
  example: () => <DropdownItemList label={itemLabel} variant="done" />,
});

// NOTE: DropdownItemGroup has no Figma Code Connect entry because it is an
// implementation extension with no dedicated node in the Moodle Design System
// Figma file.

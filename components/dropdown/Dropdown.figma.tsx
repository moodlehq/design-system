import figma from '@figma/code-connect';
import { Dropdown, DropdownMenu } from './Dropdown';
import {
  DropdownItemAction,
  DropdownItemCustom,
  DropdownItemDivider,
  DropdownItemExpandable,
  DropdownItemHeader,
  DropdownItemMultiselect,
  DropdownItemSelect,
} from './DropdownItem';
import { DropdownTrigger } from './DropdownTrigger';

const fileUrl = (nodeId: string) =>
  `https://www.figma.com/design/MvAObVzHaB9QZ5JGaP8sO2/Dropdown?node-id=${nodeId}`;

const triggerLabel = 'Label';
const itemLabel = 'Action item';
const selectLabel = 'Selectable';

/* ------------------------------------------------------------------ */
/* Dropdown (composed) — node 12573-5470                               */
/* ------------------------------------------------------------------ */

figma.connect(Dropdown, fileUrl('12573-5470'), {
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

figma.connect(Dropdown, fileUrl('12573-5470'), {
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
/* Dropdown.trigger — node 12381-3057                                  */
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
figma.connect(DropdownTrigger, fileUrl('12381-3057'), {
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

figma.connect(DropdownTrigger, fileUrl('12381-3057'), {
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

figma.connect(DropdownTrigger, fileUrl('12381-3057'), {
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

figma.connect(DropdownTrigger, fileUrl('12381-3057'), {
  variant: { Variant: 'nav.pill' },
  example: () => <DropdownTrigger label={triggerLabel} variant="nav-pill" />,
});

/* ------------------------------------------------------------------ */
/* Dropdown.menu — node 12573-1086                                     */
/* ------------------------------------------------------------------ */

// The Figma Items variant (2–12) is a static slot count; in code the menu is
// a dynamic container, so all counts map to the same composition pattern.
figma.connect(DropdownMenu, fileUrl('12573-1086'), {
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
/* Dropdown.item — node 12563-2532 (variant switcher)                  */
/* ------------------------------------------------------------------ */

figma.connect(DropdownItemAction, fileUrl('12563-2532'), {
  variant: { Variant: 'action' },
  example: () => <DropdownItemAction label={itemLabel} />,
});

figma.connect(DropdownItemSelect, fileUrl('12563-2532'), {
  variant: { Variant: 'selectable' },
  example: () => <DropdownItemSelect label={selectLabel} />,
});

figma.connect(DropdownItemExpandable, fileUrl('12563-2532'), {
  variant: { Variant: 'expandable' },
  example: () => (
    <DropdownItemExpandable label="Expand">
      <DropdownItemAction label={itemLabel} />
    </DropdownItemExpandable>
  ),
});

figma.connect(DropdownItemMultiselect, fileUrl('12563-2532'), {
  variant: { Variant: 'multi-select' },
  example: () => <DropdownItemMultiselect label="Label text" />,
});

figma.connect(DropdownItemHeader, fileUrl('12563-2532'), {
  variant: { Variant: 'header' },
  example: () => <DropdownItemHeader label="Dropdown header" />,
});

figma.connect(DropdownItemDivider, fileUrl('12563-2532'), {
  variant: { Variant: 'divider' },
  example: () => <DropdownItemDivider />,
});

figma.connect(DropdownItemCustom, fileUrl('12563-2532'), {
  variant: { Variant: 'custom' },
  example: () => (
    <DropdownItemCustom>
      <span>Custom content</span>
    </DropdownItemCustom>
  ),
});

/* ------------------------------------------------------------------ */
/* Dropdown.item.action — node 12467-2725                              */
/* ------------------------------------------------------------------ */

const actionVariant = figma.enum('Variant', {
  default: 'default',
  danger: 'danger',
} as const);

figma.connect(DropdownItemAction, fileUrl('12467-2725'), {
  variant: { Icon: 'false', Description: 'false' },
  props: { variant: actionVariant },
  example: (props) => (
    <DropdownItemAction label={itemLabel} variant={props.variant} />
  ),
});

figma.connect(DropdownItemAction, fileUrl('12467-2725'), {
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

figma.connect(DropdownItemAction, fileUrl('12467-2725'), {
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

figma.connect(DropdownItemAction, fileUrl('12467-2725'), {
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

figma.connect(DropdownItemAction, fileUrl('12467-2725'), {
  variant: { State: 'disabled' },
  props: { variant: actionVariant },
  example: (props) => (
    <DropdownItemAction label={itemLabel} variant={props.variant} disabled />
  ),
});

/* ------------------------------------------------------------------ */
/* Dropdown.item.select — node 12515-3057                              */
/* ------------------------------------------------------------------ */

figma.connect(DropdownItemSelect, fileUrl('12515-3057'), {
  variant: { Selected: 'true' },
  example: () => <DropdownItemSelect label={selectLabel} selected />,
});

figma.connect(DropdownItemSelect, fileUrl('12515-3057'), {
  variant: { Selected: 'false' },
  example: () => <DropdownItemSelect label={selectLabel} />,
});

figma.connect(DropdownItemSelect, fileUrl('12515-3057'), {
  variant: { State: 'disabled', Selected: 'true' },
  example: () => <DropdownItemSelect label={selectLabel} selected disabled />,
});

/* ------------------------------------------------------------------ */
/* Dropdown.item.expandable — node 12527-1258                          */
/* ------------------------------------------------------------------ */

figma.connect(DropdownItemExpandable, fileUrl('12527-1258'), {
  example: () => (
    <DropdownItemExpandable label="Expand">
      <DropdownItemAction label={itemLabel} />
    </DropdownItemExpandable>
  ),
});

/* ------------------------------------------------------------------ */
/* dropdown.item.multiselect — node 12543-10361                        */
/* ------------------------------------------------------------------ */

figma.connect(DropdownItemMultiselect, fileUrl('12543-10361'), {
  example: () => <DropdownItemMultiselect label="Label text" />,
});

/* ------------------------------------------------------------------ */
/* dropdown.item.header — node 12515-1986                              */
/* ------------------------------------------------------------------ */

figma.connect(DropdownItemHeader, fileUrl('12515-1986'), {
  example: () => <DropdownItemHeader label="Dropdown header" />,
});

/* ------------------------------------------------------------------ */
/* dropdown.item.divider — node 12515-1992                             */
/* ------------------------------------------------------------------ */

figma.connect(DropdownItemDivider, fileUrl('12515-1992'), {
  example: () => <DropdownItemDivider />,
});

// NOTE: DropdownItemGroup has no Figma Code Connect entry because it is an
// implementation extension with no dedicated node in the Moodle Design System
// Figma file. All seven item types published in the ZeroHeight spec (action,
// selectable, multi-select, expandable, header, divider, custom) are mapped
// above. DropdownItemGroup exists in code to satisfy the ARIA grouping contract
// when AT-announced group boundaries are needed; it is documented in Storybook
// under Components/Dropdown/DropdownItem/Group.

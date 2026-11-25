---
component: Combobox
slug: combobox
package: "@moodlehq/design-system@5.6.0"
status: In progress
source: https://design.moodle.com/98292f05f/v/latest/p/37396a-combobox
import: @moodlehq/design-system/components/combobox
types: dist/components/combobox/index.d.ts
---

<!-- Generated from ZeroHeight by npm run build-guidance. Do not edit. -->

# Combobox

A search field that opens a list of options. People type to narrow the list, then pick one or more values that are saved with the form.

## Look-alikes

Select · Dropdown · Search · Input


## Props

Generated from the component TypeScript types, not from ZeroHeight. Inherited HTML attributes are not listed.

### ComboboxBaseProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` (required) | `string` |  | Visible label. Required — every combobox is named, even with `hideLabel`. |
| `options` (required) | `ComboboxOption[]` |  | Options that can be chosen. Already-chosen options are left out of the listbox. With nothing typed they are listed in the order given, so pass them alphabetically unless there is a clear reason not to; once the user types, the filter ranks them by how well they match. Long lists render a page of rows at a time as the user scrolls, so thousands of options stay responsive; for server-sized sets, search on the server. |
| `selectedOptions` | `ComboboxOption[]` |  | Full options for values that are chosen but not in `options`, so their tags can still be drawn with a label. Needed when options load as the user types: an edit form opens with values already chosen and `options` still empty. Without it a value with no matching option submits but shows no tag. |
| `inputValue` | `string` |  | Controlled text typed into the field. |
| `onInputChange` | `(inputValue: string) => void` |  | Called when the typed text changes, including when it is cleared after a choice or on blur. Use it to fetch options from a server as the user types. |
| `filterOptions` | `( options: ComboboxOption[], inputValue: string, ) => ComboboxOption[]` | `defaultFilterOptions` | Replaces the built-in filter (case- and accent-insensitive; matches anywhere in the label, username, email or institution; label prefix matches first, then other label matches, then supporting-field matches). Pass `(options) => options` when the server has already filtered the list. |
| `loading` | `boolean` | `false` | Shows the loading message in the listbox while options are being fetched. |
| `name` | `string` |  | Field name. Each chosen value is submitted as its own hidden input with this name. With `multiple`, end the name in `[]` (e.g. `members[]`) when the form is read by PHP, as Moodle's forms are, or only the last value arrives. The visible text field is never submitted. |
| `placement` | `Placement` | `'bottom-start'` | Listbox placement relative to the field. flip() and shift() still apply. |
| `clearLabel` (required) | `string` |  | Accessible label for the clear button shown once values are chosen. |
| `showOptionsLabel` (required) | `string` |  | Accessible label for the chevron button that opens and closes the listbox. |
| `removeLabel` (required) | `(optionLabel: string) => string` |  | Accessible label for a tag's remove button, e.g. `(name) => t('remove', { name })`. |
| `loadingLabel` (required) | `string` |  | Message shown while `loading`, e.g. "Loading results…". |
| `noResultsLabel` (required) | `(inputValue: string) => string` |  | Message for an empty result, e.g. "No matches for 'Jsoe'. Check the spelling." |
| `resultsAnnouncement` (required) | `(count: number) => string` |  | Spoken (live region) as the result count changes, e.g. "5 results available". |

### ComboboxSingleProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `multiple` | `false` | `false` | Allow several values. Chosen options keep the listbox open. When false, choosing an option replaces the current value and closes the listbox. |
| `value` | `string \| null` |  | Controlled chosen value (an option `value`), or `null` for none. |
| `defaultValue` | `string \| null` |  | Initial chosen value when uncontrolled. |
| `onValueChange` | `(value: string \| null) => void` |  | Called with the chosen value, or `null` when it is cleared or removed. |

### ComboboxMultipleProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `multiple` (required) | `true` | `false` | Allow several values. Chosen options keep the listbox open. |
| `value` | `string[]` |  | Controlled chosen values (option `value`s). |
| `defaultValue` | `string[]` |  | Initial chosen values when uncontrolled. |
| `onValueChange` | `(value: string[]) => void` |  | Called with the full list of chosen values whenever it changes. |

### ComboboxOptionRowProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `option` (required) | `ComboboxOption` |  |  |
| `index` (required) | `number` |  |  |
| `id` (required) | `string` |  |  |
| `active` (required) | `boolean` |  |  |
| `setSize` (required) | `number \| undefined` |  | Total options, set when only some are rendered so assistive tech hears it. |
| `registerOption` (required) | `(index: number, node: HTMLElement \| null) => void` |  |  |
| `getOptionProps` (required) | `GetOptionProps` |  |  |
| `onSelect` (required) | `(option: ComboboxOption) => void` |  |  |

### ComboboxListboxProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `popupId` (required) | `string` |  |  |
| `listboxId` (required) | `string` |  |  |
| `portalRoot` (required) | `HTMLElement \| null` |  | Where to portal the listbox: the field's dialog, or the page body when null. |
| `setFloating` (required) | `(node: HTMLElement \| null) => void` |  |  |
| `floatingStyles` (required) | `CSSProperties` |  |  |
| `direction` (required) | `'ltr' \| 'rtl'` |  |  |
| `filtered` (required) | `ComboboxOption[]` |  | Options to list. The listbox is omitted when `showListbox` is false. |
| `showListbox` (required) | `boolean` |  |  |
| `activeIndex` (required) | `number \| null` |  |  |
| `keyboardNav` (required) | `boolean` |  | Whether the highlight last moved by keyboard, which draws the focus ring. |
| `onPointerMove` (required) | `() => void` |  | Called when the pointer moves over the list, ending keyboard navigation. |
| `total` (required) | `number` |  | Total options when `filtered` is only the first page of a longer list. |
| `onReachEnd` (required) | `(() => void) \| undefined` |  | Called when the list is scrolled near its end, to render the next page. |
| `listboxLabel` (required) | `string \| undefined` |  |  |
| `listboxLabelledBy` (required) | `string \| undefined` |  |  |
| `listboxProps` (required) | `HTMLAttributes<HTMLDivElement>` |  |  |
| `getOptionProps` (required) | `GetOptionProps` |  |  |
| `registerOption` (required) | `(index: number, node: HTMLElement \| null) => void` |  |  |
| `optionId` (required) | `(index: number) => string` |  |  |
| `onSelect` (required) | `(option: ComboboxOption) => void` |  |  |
| `statusMessage` (required) | `string \| undefined` |  | The loading or no-results message, shown below any rows. |

Allowed values:

- `direction`: `ltr`, `rtl`

## Built from

Generated from the component source and CSS, not from ZeroHeight.

- MDS components: input, tag

- Semantic tokens: `--mds-bg-interactive-primary-default-light`, `--mds-bg-surface-default`, `--mds-border-default`, `--mds-border-radius-md`, `--mds-border-radius-xs`, `--mds-focus-default`, `--mds-font-family-base`, `--mds-font-size-paragraph-small`, `--mds-font-weight-medium`, `--mds-font-weight-regular`, `--mds-icons-xxs`, `--mds-letter-spacing-default`, `--mds-line-height-paragraph-small`, `--mds-spacing-offset`, `--mds-spacing-sm`, `--mds-spacing-xs`, `--mds-spacing-xxs`, `--mds-stroke-weight-md`, `--mds-stroke-weight-sm`, `--mds-text-default`, `--mds-text-emphasis`, `--mds-text-muted`, `--mds-text-subtle`

## Usage

### Overview

Combobox pairs a search field with a list of options. People type to narrow the list, then pick one value or several. What they pick is stored in the field and submitted with the form, so it can be required and can show a validation error

#### When to use

* Use when the list of options is long enough that typing to narrow it is faster than scanning. For example, timezone, country or language.
* Use when options come from the server as the person types. For example, finding a user to enrol.
* Use when people need to pick several values from a long list. For example, adding members to a group or assigning tags.
* Use when options need extra detail to tell them apart. For example, two people called Sarah, or two courses with the same name.

#### ❌ When not to use

* Don't use for a fixed list people can scan without typing. Use [Select](https://design.moodle.com/98292f05f/p/013ac0) instead; if people can't or don't need to type, it isn't a Combobox.
* Don't use for actions or view settings like sort order. Use a [Dropdown](/8381b3-dropdown). If nothing is saved with a form, it isn't a Combobox.
* Don't use to search content when there's no list of options to pick from. Use [Search](/38ca1d-search) on its own.
* Don't build a "user picker" as a separate component. A Combobox with person options is the user picker.
* Don't assemble one yourself by placing a menu under an Input. Use Combobox.

### Variants

#### Tags

Every chosen value shows in the field as a removable [Tag](/25b418-tag). This property reflects whether any values have been chosen yet.

| **Variant** | **When to use** |
| :--- | :--- |
| | No values chosen yet. The field shows the placeholder or the text the user is typing, and the chevron. |
| | One or more values chosen. Each one shows as a removable tag ahead of the typed text, and a clear button replaces the chevron. |

#### Item content

Every item in the menu is the same `combobox.item`. Its content comes from a nested [Tag](/25b418-tag) (Removable) with the close button hidden, and has four independent toggles, all optional except the name/category label itself.

| **Props** | **When to use** |
| :--- | :--- |
| | **Avatar** Show a person's photo or a site's logo alongside the label. Leave off for plain options like timezone or country. |
| | **Username / short name** Show a short identifier as a supporting line. Works for a person's username or a course, group or site's short name. |
| | **Email** Show an email address, separated from the username by a divider. *(Person-only.)* |
| | **Institution** Show a second supporting line with the person's institution. *(Person-only.)* |

### Guidelines

#### Content guidelines

##### Content structure and constraints

* Item labels support a single line of text, which truncates with an ellipsis if it runs out of space.
* Recommended item label length: 1–4 words.
* Turn on supporting fields only when the label alone can't tell two options apart, not to repeat the label.
* Keep the same fields on for every item in a list, so rows stay the same height and easy to scan.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD use supporting fields when labels could be confused. |
| Don't | | | SHOULD NOT list people by name alone when names can repeat. |

##### Copywriting 

* Use sentence case for labels and option names. Person names keep their own casing.
* Name the value, not an action: "Teacher", not "Assign teacher role".
* Use the placeholder to say what the user can search by. Never use it as a replacement for the label.
* Write a no results message that repeats the search term and suggests a next step: "No matches for 'Jsoe'. Check the spelling or search by email."
* Use "Loading results…" while options load.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD use the placeholder to say what people can search by. |
| Don't | | | SHOULD NOT repeat the label in the placeholder. |

#### Placement

* The field fills the width of its container, and the menu matches the field's width.
* The menu opens `--mds-spacing-xxs` below the field and flips above it when there isn't room below.
* Order results by how well they match what's been typed. With nothing typed, use alphabetical order unless there's a clear reason not to.
* The menu shows up to 10 items before it scrolls. The menu scrolls, not the page.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD keep the menu the same width as the field. |
| Don't | | | SHOULD NOT let the menu shrink to its content or drift away from the field. |

#### Accessibility guidelines

##### Colour and contrast

* Item labels, supporting text and the placeholder meet 4.5:1 contrast against their background.
* The invalid state doesn't rely on colour alone. The border, icon and error message change together.
* Disabled contrast is intentionally reduced; supplement with `aria-disabled` so the state reaches screen reader users.

##### Focus

* Focus stays on the field while the user moves through items with the arrow keys. The highlighted item shows where they are.
* When the menu closes, focus stays on the field. Never drop focus to the document body.
* After removing a tag, focus returns to the field.

##### Labelling

* Every combobox has a label, even when it's visually hidden with Show label off.
* Each tag's close button names what it removes ("Remove Jessica Parker"), not a generic "Close".
* The chevron has its own accessible name, for example "Show options".

## Specs

### Anatomy

1. **Label**: names the field. Inherited from [Search input](/38ca1d-search), with the optional required asterisk and info icon.
2. **Field**: where the user types. Built from Input (Type=Search), with a leading search icon, placeholder or typed text, and the chosen values as removable tags.
3. **Chevron** *(optional)*: opens and closes the menu. Hidden once values are chosen, where a clear button takes its place.
4. **Support text** *(optional)*: help text under the field, replaced by the error message when invalid.
5. **Menu**: the floating panel that contains all items. It has a border and rounded corners.
6. **Item**: a single row in the menu. Contains a name/category label (required), and optionally an avatar, a username or short name, an email, and an institution.

### States

#### Combobox.item

The item is the wrapper for every row in the menu. Every item shares the same state model: default, hover, disabled, and focus. Items sit on the menu surface and have rounded corners.

| **States** | **Description** |
| :--- | --- |
| | **Default** The item's resting state. |
| | **Hover** Triggered when the cursor moves over the item, or it's highlighted with the arrow keys. |
| | **Disabled** Applied when the option is unavailable. Keep the item visible rather than removing it, to preserve the list structure. |
| | **Focus** Triggered via keyboard navigation. |

### Behaviour

* The menu opens when the user types, presses Arrow Down, or selects the chevron. The open state is reflected on the field via `aria-expanded`.
* Choosing an item adds it to the field as a removable tag and clears the typed text. The menu stays open so more values can be picked.
* Clicking outside the menu, pressing Escape, or tabbing away closes the menu.
* Filtering ignores case and accents, and matches anywhere in the label: "jose" finds "José".
* If the user leaves the field with text that doesn't match an option, the text is cleared and the chosen tags stay. Typed text never becomes a value on its own.
* Show the loading message straight away while results load, so a slow connection doesn't look like a broken field.
* Cursor: text cursor in the field, pointer on items and on each tag's close button, not-allowed on disabled items.

### Responsive behaviour

* The field stays full width at every breakpoint.
* On small viewports, the menu repositions to stay fully on screen rather than being clipped.
* Item height and tap targets stay the same across breakpoints. Don't shrink rows on mobile.

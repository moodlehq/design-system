import type { ComboboxOption } from './Combobox';

/*
 * Built-in filtering for Combobox. Internal: not exported from the barrel.
 * Consumers who want different matching pass `filterOptions` to Combobox.
 */

// Letters Unicode does not decompose into base + mark, so NFD alone leaves them
// distinct ("lodz" would not find "Łódź").
const FOLDED_LETTERS: Record<string, string> = {
  ø: 'o',
  ł: 'l',
  đ: 'd',
  ð: 'd',
  ħ: 'h',
  ı: 'i',
  ß: 'ss',
  æ: 'ae',
  œ: 'oe',
  þ: 'th',
};

// A combining mark after one of these scripts' letters is an accent or vowel
// point, so it is ignored when matching. In other scripts the mark changes the
// letter (kana voicing, Indic vowel signs), so it is kept: か must not find が.
const DECORATIVE_MARKS =
  /([\p{Script=Latin}\p{Script=Greek}\p{Script=Cyrillic}\p{Script=Arabic}\p{Script=Hebrew}])\p{M}+/gu;

// Folds case and diacritics so "jose" finds "José" and "lodz" finds "Łódź",
// independent of locale. Lowercases first so a capital İ leaves no stray mark.
const normalise = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(DECORATIVE_MARKS, '$1')
    // Recompose what is left so が stays one letter and a typed か can't match
    // inside its decomposed form.
    .normalize('NFC')
    .replace(/[øłđðħıßæœþ]/g, (letter) => FOLDED_LETTERS[letter]);

// An option's searchable text is folded once per option object rather than on
// every keystroke. The supporting fields are searched too, since they are what
// tell two options with the same name apart (username, email, institution).
const foldedTexts = new WeakMap<
  ComboboxOption,
  { label: string; supporting: string[] }
>();
const foldedText = (option: ComboboxOption) => {
  let folded = foldedTexts.get(option);
  if (folded === undefined) {
    folded = {
      label: normalise(option.label),
      supporting: [option.username, option.email, option.institution]
        .filter((text): text is string => Boolean(text))
        .map(normalise),
    };
    foldedTexts.set(option, folded);
  }
  return folded;
};

// Rank: label starts with the query, label contains it, a supporting field
// contains it. Each field is matched on its own, so a query never spans two.
const matchRank = (option: ComboboxOption, query: string) => {
  const { label, supporting } = foldedText(option);
  const at = label.indexOf(query);
  if (at === 0) return 0;
  if (at > 0) return 1;
  return supporting.some((text) => text.includes(query)) ? 2 : -1;
};

/**
 * Case- and accent-insensitive, matches anywhere in the label, username, email
 * or institution. Ranked: label starts with the query, label contains it, a
 * supporting field contains it; ties keep the caller's order. An empty query
 * returns the options unchanged.
 */
export const defaultFilterOptions = (
  options: ComboboxOption[],
  inputValue: string,
): ComboboxOption[] => {
  const query = normalise(inputValue.trim());
  if (!query) return options;

  const ranked: { option: ComboboxOption; rank: number; index: number }[] = [];
  options.forEach((option, index) => {
    const rank = matchRank(option, query);
    if (rank >= 0) ranked.push({ option, rank, index });
  });
  // Better matches first; ties keep the caller's order.
  return ranked
    .sort((a, b) => a.rank - b.rank || a.index - b.index)
    .map(({ option }) => option);
};

import { describe, expect, it } from 'vitest';
import type { ComboboxOption } from './Combobox';
import { defaultFilterOptions } from './comboboxFilter';

const labelsOf = (result: ComboboxOption[]) =>
  result.map((option) => option.label);

const people: ComboboxOption[] = [
  { value: 'jose', label: 'José Alvarez' },
  { value: 'jessica', label: 'Jessica Parker', username: 'jparker' },
  { value: 'maria', label: 'Maria Jose' },
];

describe('defaultFilterOptions', () => {
  it('returns the options unchanged for an empty or whitespace query', () => {
    expect(defaultFilterOptions(people, '')).toBe(people);
    expect(defaultFilterOptions(people, '   ')).toBe(people);
  });

  it('ignores case and accents, matches anywhere in the label, label prefix first', () => {
    expect(labelsOf(defaultFilterOptions(people, 'JOSE'))).toEqual([
      'José Alvarez',
      'Maria Jose',
    ]);
  });

  it('also matches username, email and institution, ranked after label matches', () => {
    const options: ComboboxOption[] = [
      {
        value: 'a',
        label: 'Ana Silva',
        username: 'asilva',
        email: 'ana@example.com',
        institution: 'Perth campus',
      },
      { value: 'b', label: 'Perth Smith' },
      { value: 'c', label: 'Carl Jones', email: 'carl@perth.example.com' },
    ];
    expect(labelsOf(defaultFilterOptions(options, 'perth'))).toEqual([
      'Perth Smith',
      'Ana Silva',
      'Carl Jones',
    ]);
  });

  it('keeps the caller order between matches of the same rank', () => {
    const options: ComboboxOption[] = [
      { value: 'a', label: 'Zed Perth' },
      { value: 'b', label: 'Amy Perth' },
    ];
    expect(labelsOf(defaultFilterOptions(options, 'perth'))).toEqual([
      'Zed Perth',
      'Amy Perth',
    ]);
  });

  it('matches each field on its own, never across two fields', () => {
    const options: ComboboxOption[] = [
      { value: 'a', label: 'Ana', username: 'silva', email: 'x@y.com' },
    ];
    expect(defaultFilterOptions(options, 'ana silva')).toEqual([]);
  });

  it.each([
    ['lodz', 'Łódź'],
    ['bron', 'Brøndby'],
    ['istan', 'İstanbul'],
    ['strasse', 'Straße'],
    ['aeon', 'Æon'],
  ])(
    'folds letters Unicode does not decompose: "%s" finds "%s"',
    (query, label) => {
      const options: ComboboxOption[] = [{ value: 'x', label }];
      expect(labelsOf(defaultFilterOptions(options, query))).toEqual([label]);
    },
  );

  it.each([
    ['Cyrillic accent', 'ударение', 'Уда́рение'],
    ['Arabic vowel marks', 'كتاب', 'كِتَاب'],
    ['Hebrew points', 'שלום', 'שָׁלוֹם'],
    ['Greek tonos', 'αθηνα', 'Αθήνα'],
  ])('ignores accents in %s', (_script, query, label) => {
    const options: ComboboxOption[] = [{ value: 'x', label }];
    expect(labelsOf(defaultFilterOptions(options, query))).toEqual([label]);
  });

  it.each([
    ['kana voicing', 'か', 'が'],
    ['kana semi-voicing', 'ひ', 'ぴ'],
    ['Devanagari vowel sign', 'के', 'कु'],
  ])(
    'keeps marks that change the letter in %s: "%s" does not find "%s"',
    (_script, query, label) => {
      const options: ComboboxOption[] = [{ value: 'x', label }];
      expect(defaultFilterOptions(options, query)).toEqual([]);
    },
  );

  it('still finds a base letter inside a longer word in those scripts', () => {
    const options: ComboboxOption[] = [{ value: 'x', label: 'さが' }];
    expect(labelsOf(defaultFilterOptions(options, 'が'))).toEqual(['さが']);
  });

  it('does not mutate the options it is given', () => {
    const options = [...people];
    defaultFilterOptions(options, 'jose');
    expect(options).toEqual(people);
  });
});

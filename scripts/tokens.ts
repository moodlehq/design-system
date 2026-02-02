// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

import fs from 'fs';
import StyleDictionary, {
  Dictionary,
  TransformedToken,
} from 'style-dictionary';
import { getReferences, usesReferences } from 'style-dictionary/utils';

const tokenFiles = fs
  .readdirSync('tokens/dtcg')
  .filter((file) => file.endsWith('.json'));

/**
 * Custom formatter: css/mds-variables
 * Generates CSS custom properties with 'mds-' prefix
 * and semantic tokens referencing the primitives (or referencing another semantic token).
 *
 * Why custom formatter?
 * - Built-in formatter couldn't handle names with brackets i.e. (default) and (base)
 * - Built-in formatter couldn't handle descriptions with multi-line block comments (/* ... *\/)
 */
StyleDictionary.registerFormat({
  name: 'css/mds-variables',
  format: ({ dictionary }: { dictionary: Dictionary }) => {
    const getTokenName = (token: TransformedToken) => `mds-${token.name}`;

    const getTokenValue = (token: TransformedToken): string => {
      /*
        original value:
        - primitive token -> the value before transformation
        - semantic token -> the variable reference (not the resolved/transformed value)
       */
      const originalValue = String(token.original.$value);
      if (!usesReferences(originalValue)) {
        return token.$value; // if primitive, return the transformed value
      }

      // if semantic, use the target token being referenced
      const [targetToken] = getReferences(
        originalValue,
        dictionary.unfilteredTokens ?? dictionary.tokens,
      );

      return `var(--${getTokenName(targetToken)})`;
    };

    const tokenVariables = dictionary.allTokens.map((token) => {
      return `  --${getTokenName(token)}: ${getTokenValue(token)};`;
    });

    return `${getFileHeader()}:root {\n${tokenVariables.join('\n')}\n}\n`;
  },
});

/**
 * Custom formatter: css/aggregator
 * Aggregator format to create a single CSS file that imports all other generated CSS files.
 */
StyleDictionary.registerFormat({
  name: 'css/aggregator',
  format: ({ options }) => {
    return (
      getFileHeader() +
      options.files.map((file: string) => `@import "./${file}";`).join('\n') +
      '\n@import "./fonts.css"\n'
    );
  },
});

/**
 * Custom transform: css/dimension-px-to-rem
 * Transforms px values to rem for tokens related to dimensions.
 *
 * Why custom transform?
 * - Built-in transform needs the type to be 'dimension', but our tokens solely use 'number' type.
 * - The exported values in DTCG JSON from ZeroHeight would not have the units (ie. 1rem) for dimension-related tokens
 *
 * Rules & Assumptions:
 * - Any flat numerical tokens with $type 'number' are considered dimension-related tokens and will be transformed from px to rem.
 */
StyleDictionary.registerTransform({
  name: 'css/dimension-px-to-rem',
  type: 'value',
  filter: (token) => {
    return token.$type === 'number';
  },
  transform: (token) => `${token.$value / 16}rem`,
});

/**
 * Build Style Dictionary
 */
new StyleDictionary({
  source: tokenFiles.map((file) => `tokens/dtcg/${file}`),
  platforms: {
    css: {
      transformGroup: 'css',
      transforms: ['css/dimension-px-to-rem'],
      buildPath: 'tokens/css',
      files: [
        ...tokenFiles.map((fileName) => ({
          destination: convertJsonFileNameToCssFileName(fileName),
          format: 'css/mds-variables',
          filter: (token: TransformedToken) =>
            token.filePath.endsWith(fileName),
          options: {
            outputReferences: true,
          },
        })),
        {
          destination: 'index.css',
          format: 'css/aggregator',
          options: {
            files: tokenFiles.map((fileName) =>
              convertJsonFileNameToCssFileName(fileName),
            ),
          },
        },
      ],
    },
  },
}).buildAllPlatforms();

/**
 * Helper function to convert JSON file name to CSS file name.
 * @param jsonFileName
 * @returns
 */
function convertJsonFileNameToCssFileName(jsonFileName: string) {
  return jsonFileName.replace(/^.*_(.+?)_.*\.json$/, '$1.css').toLowerCase();
}

/**
 * Helper function to get file header comment.
 * @param jsonFileName
 * @returns
 */
function getFileHeader(): string {
  return `/** THIS FILE IS AUTO-GENERATED — DO NOT EDIT DIRECTLY. **/\n\n`;
}

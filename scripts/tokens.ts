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
import StyleDictionary, { TransformedToken } from 'style-dictionary';

const tokenFiles = fs
  .readdirSync('tokens/dtcg')
  .filter((file) => file.endsWith('.json'));

/**
 * Custom formatter: css/aggregator
 * Aggregator to create a single CSS file that imports all other generated CSS files.
 */
StyleDictionary.registerFormat({
  name: 'css/aggregator',
  format: async ({ options }) => {
    return (
      `/**\n * ${getFileHeaderContent()}\n */\n\n` + // made to match Style Dictionary file header format for CSS
      options.files.map((file: string) => `@import "./${file}";`).join('\n') +
      '\n'
    );
  },
});

/**
 * Custom formatter: scss/aggregator
 * Aggregator to create a single SCSS file that imports all other generated SCSS files.
 */
StyleDictionary.registerFormat({
  name: 'scss/aggregator',
  format: async ({ options }) => {
    return (
      `\n// ${getFileHeaderContent()}\n\n` + // made to match Style Dictionary file header format for SCSS
      options.files
        .map(
          (file: string) =>
            `@forward "${file.replace(/(\.scss$)/, '').replace(/^_/, '')}";`,
        )
        .join('\n') +
      '\n'
    );
  },
});

/**
 * Custom transform: dimension-px-to-rem
 * Transforms px values to rem for tokens related to dimensions.
 *
 * Why custom transform?
 * - Built-in transform needs the type to be 'dimension', but our tokens solely use 'number' type.
 * - The exported values in DTCG JSON from ZeroHeight would not have the units (ie. 1rem) for dimension-related tokens
 *
 * Rules & Assumptions:
 * - Any flat numerical tokens with $type 'number' are considered dimension-related tokens and will be transformed from px to rem.
 * - Font weight tokens are excluded from this transformation as they are also of type 'number' but should remain unitless.
 */
StyleDictionary.registerTransform({
  name: 'dimension-px-to-rem',
  type: 'value',
  filter: (token) =>
    token.$type === 'number' && !/font-weight/i.test(token.name),
  transform: (token) => `${token.$value / 16}rem`,
});

/**
 * Custom file header: mdsTokensFileHeader
 * Purpose is to customise the content of the file header.
 * While the formatting must remain to be handled by Style Dictionary due to configuration limitations,
 */
StyleDictionary.registerFileHeader({
  name: 'mdsTokensFileHeader',
  fileHeader: function () {
    return [getFileHeaderContent()];
  },
});

/**
 * Build Style Dictionary
 */
new StyleDictionary({
  log: {
    warnings: 'disabled', // Suppress warnings about filtered references
  },
  source: tokenFiles.map((file) => `tokens/dtcg/${file}`),
  platforms: {
    css: {
      transformGroup: 'css',
      transforms: ['dimension-px-to-rem'],
      prefix: 'mds',
      buildPath: 'tokens/css',
      files: [
        ...tokenFiles.map((fileName) => ({
          destination: convertJsonFileName(fileName, '', 'css'),
          format: 'css/variables',
          filter: (token: TransformedToken) =>
            token.filePath.endsWith(fileName),
          options: {
            outputReferences: true,
            fileHeader: 'mdsTokensFileHeader',
          },
        })),
        {
          destination: 'index.css',
          format: 'css/aggregator',
          options: {
            files: tokenFiles.map((fileName) =>
              convertJsonFileName(fileName, '', 'css'),
            ),
          },
        },
      ],
    },
    scss: {
      transformGroup: 'scss',
      transforms: ['dimension-px-to-rem'],
      prefix: 'mds',
      buildPath: 'tokens/scss',
      files: [
        ...tokenFiles.map((fileName) => ({
          destination: convertJsonFileName(fileName, '_', 'scss'),
          format: 'scss/variables',
          filter: (token: TransformedToken) =>
            token.filePath.endsWith(fileName),
          options: {
            fileHeader: 'mdsTokensFileHeader',
          },
        })),

        {
          destination: '_index.scss',
          format: 'scss/aggregator',
          options: {
            files: tokenFiles.map((fileName) =>
              convertJsonFileName(fileName, '_', 'scss'),
            ),
          },
        },
      ],
    },
  },
}).buildAllPlatforms();

/**
 * Helper function to convert JSON file name to a target file name (CSS/SCSS).
 * @param jsonFileName
 * @param prefix - e.g. '' for CSS, '_' for SCSS
 * @param extension - e.g. 'css' or 'scss'
 * @returns
 */
function convertJsonFileName(
  jsonFileName: string,
  prefix: string,
  extension: string,
) {
  return jsonFileName
    .replace(/^.*_(.+?)_.*\.json$/, `${prefix}$1.${extension}`)
    .toLowerCase();
}
/**
 * Helper function to get file header comment.
 * @param jsonFileName
 * @returns
 */
function getFileHeaderContent(): string {
  return `THIS FILE IS AUTO-GENERATED BY STYLE DICTIONARY — DO NOT EDIT DIRECTLY.`;
}

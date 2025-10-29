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
/* jshint node: true, browser: false */
/* eslint-env node */
import fs from 'fs';
import StyleDictionary from 'style-dictionary';

// Read all .tokens files from the 'src/tokens' directory
const tokenFiles = fs.readdirSync('assets/src').filter((file) => file.endsWith('.json'));
// Configure Style Dictionary
const myStyleDictionary = new StyleDictionary({
    source: tokenFiles.map((file) => `assets/src/${file}`),
    platforms: {
        scss: {
            transformGroup: 'scss',
            buildPath: 'assets/scss',
            files: tokenFiles.map((file) => ({
                // Replace '.tokens' with '.scss' for the destination
                destination: `${file.replace('.json', '.scss')}`,
                format: 'scss/variables',
                // Match tokens by filename
                filter: (token) => file === token.filePath.split('/').pop(),
                options: {
                    outputReferences: true,
                },
            })),
        },
    },
    hooks: {
        transformGroups: {
            scss: ['size/pxToRem'],
        },
    },
});
// Build all platforms
myStyleDictionary.buildAllPlatforms();

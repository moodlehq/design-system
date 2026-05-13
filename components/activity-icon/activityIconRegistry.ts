export type ActivityIconCategory =
  | 'assessment'
  | 'collaboration'
  | 'communication'
  | 'interactive'
  | 'other'
  | 'resource';

export interface ActivityIconRegistryEntry {
  fileName: string;
  category: ActivityIconCategory;
}

// Single source of truth: icon metadata (category + file name). Assets are lazy-loaded on demand.
// Adding/removing an icon requires updating one entry here.
const registryMetadata = {
  assignment: 'assessment',
  quiz: 'assessment',
  workshop: 'assessment',
  database: 'collaboration',
  forum: 'collaboration',
  glossary: 'collaboration',
  wiki: 'collaboration',
  bigbluebutton: 'other',
  chat: 'communication',
  choice: 'communication',
  feedback: 'communication',
  survey: 'communication',
  h5p: 'other',
  'ims-package': 'interactive',
  lesson: 'interactive',
  'scorm-package': 'interactive',
  book: 'resource',
  'external-tool': 'resource',
  file: 'resource',
  folder: 'resource',
  page: 'resource',
  'text-and-media': 'resource',
  url: 'resource',
  subsection: 'other',
  'file-ai': 'resource',
  'file-archive': 'resource',
  'file-audio': 'resource',
  'file-code': 'resource',
  'file-database': 'resource',
  'file-doc': 'resource',
  'file-draw': 'resource',
  'file-eps': 'resource',
  'file-epub': 'resource',
  'file-flash': 'resource',
  'file-folder': 'resource',
  'file-gif': 'resource',
  'file-graphic': 'resource',
  'file-h5p': 'resource',
  'file-image': 'resource',
  'file-isf-flowchart': 'resource',
  'file-json': 'resource',
  'file-math': 'resource',
  'file-moodle': 'resource',
  'file-oth': 'resource',
  'file-pdf': 'resource',
  'file-plain-text': 'resource',
  'file-presentation': 'resource',
  'file-ppt': 'resource',
  'file-psd': 'resource',
  'file-pub': 'resource',
  'file-source-code': 'resource',
  'file-spreadsheet': 'resource',
  'file-text-editor': 'resource',
  'file-unknown': 'resource',
  'file-video': 'resource',
  'file-xls': 'resource',
} satisfies Record<string, ActivityIconCategory>;

export const activityIconRegistry: Record<string, ActivityIconRegistryEntry> =
  Object.fromEntries(
    Object.entries(registryMetadata).map(([name, category]) => [
      name,
      {
        fileName: name,
        category,
      },
    ]),
  );

export type ActivityIconName = keyof typeof activityIconRegistry;

export const activityIconNames = Object.keys(activityIconRegistry).sort();

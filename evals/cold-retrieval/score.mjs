// Usage: node evals/cold-retrieval/score.mjs <answers-dir> [tasks-file, default tasks.json]
// Each <answers-dir>/<taskId>.json: { "components": ["Switch"], "variant": "enable", "props": ["label"], "notAvailable": false }
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

const dir = process.argv[2];
if (!dir) throw new Error('answers dir required');
const { tasks, shipped } = JSON.parse(
  readFileSync(
    new URL(`./${process.argv[3] ?? 'tasks.json'}`, import.meta.url),
    'utf-8',
  ),
);

let pass = 0;
for (const t of tasks) {
  const f = join(dir, `${t.id}.json`);
  const a = existsSync(f) ? JSON.parse(readFileSync(f, 'utf-8')) : null;
  const problems = [];
  if (!a) problems.push('no answer');
  else {
    const comps = a.components ?? [];
    const e = t.expect;
    if (e.notAvailable) {
      if (!a.notAvailable) problems.push('should say not available');
      if (comps.some((c) => !shipped.includes(c)))
        problems.push('invented component');
    } else {
      if (!comps.includes(e.component)) problems.push(`missing ${e.component}`);
      if (e.variant && String(a.variant).toLowerCase() !== e.variant)
        problems.push(`variant ${a.variant} != ${e.variant}`);
      for (const p of e.props ?? [])
        if (!(a.props ?? []).includes(p)) problems.push(`missing prop ${p}`);
      for (const m of e.mustNot ?? [])
        if (comps.includes(m)) problems.push(`used ${m}`);
      const invented = comps.filter((c) => !shipped.includes(c));
      if (invented.length) problems.push(`invented: ${invented.join(',')}`);
    }
  }
  if (!problems.length) pass++;
  console.log(
    `${t.id} ${problems.length ? 'FAIL ' + problems.join('; ') : 'pass'}`,
  );
}
console.log(`\n${pass}/${tasks.length} passed`);

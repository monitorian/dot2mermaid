import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

async function readRepoFile(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8');
}

test('README links the packaged examples and conversion rules', async () => {
  const readme = await readRepoFile('README.md');

  assert.match(readme, /\.\.?\/?examples\/simple\.dot|\.\/examples\/simple\.dot/);
  assert.match(readme, /\.\/examples\/subgraphs\.dot/);
  assert.match(readme, /\.\/docs\/conversion-rules\.md/);
  assert.match(readme, /unlabeled subgraph/);
});

test('package metadata is ready for npm consumers', async () => {
  const pkg = JSON.parse(await readRepoFile('package.json'));

  assert.equal(pkg.description, 'Convert Graphviz DOT graphs to Mermaid flowcharts for documentation and CI-generated diagrams.');
  assert.deepEqual(pkg.bin, { dot2mermaid: './bin/cli.js' });
  assert.equal(pkg.repository.url, 'git+https://github.com/monitorian/dot2mermaid.git');
  assert.ok(pkg.keywords.includes('graphviz'));
  assert.ok(pkg.keywords.includes('mermaid'));
  assert.ok(pkg.keywords.includes('markdown'));
  assert.ok(pkg.files.includes('examples'));
  assert.ok(pkg.files.includes('docs'));
});

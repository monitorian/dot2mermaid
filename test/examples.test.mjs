import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { promisify } from 'node:util';
import { convert } from '../src/index.mjs';

const execFileAsync = promisify(execFile);

async function readFixture(path) {
  return readFile(new URL(path, import.meta.url), 'utf8');
}

test('simple example matches the documented Mermaid output', async () => {
  const dot = await readFixture('../examples/simple.dot');
  const expected = await readFixture('../examples/simple.mmd');

  assert.equal(convert(dot).trim(), expected.trim());
});

test('subgraph example matches the documented Mermaid output with LR direction', async () => {
  const dot = await readFixture('../examples/subgraphs.dot');
  const expected = await readFixture('../examples/subgraphs.mmd');

  assert.equal(convert(dot, { direction: 'LR' }).trim(), expected.trim());
});

test('CLI prints the same output used by the README examples', async () => {
  const { stdout } = await execFileAsync(
    process.execPath,
    ['bin/cli.js', 'examples/simple.dot'],
    { cwd: new URL('..', import.meta.url) },
  );
  const expected = await readFixture('../examples/simple.mmd');

  assert.equal(stdout.trim(), expected.trim());
});

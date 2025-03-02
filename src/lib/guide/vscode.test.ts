import { readFile } from 'node:fs/promises';
import { expect, test } from 'vitest';
import { ParseVscodeProject } from './vscode';

test('storage.json', async () => {
  const text = (await readFile('src/lib/guide/tests/storage.json')).toString();
  const projects = ParseVscodeProject(text);

  expect(projects).toEqual([
    '/Users/xxxx/finalgit',
    '/Users/xxxx/somex',
    '/Users/xxxx/asdf',
    '/Users/xxxx/.local/share/chezmoi',
    '/Users/xxxx/smoltcp',
    '/Users/xxxx/socket2',
    '/Users/xxxx/criterion-compare-action',
    '/Users/xxxx/asdf/asdf',
  ]);
});

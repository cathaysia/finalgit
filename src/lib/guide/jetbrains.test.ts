/**
 * @vitest-environment jsdom
 */
import { readFile } from 'node:fs/promises';
import { expect, test } from 'vitest';
import { ParseJetbrainsProject } from './jetbrains';

test('storage.json', async () => {
  const text = (
    await readFile('src/lib/guide/tests/recentProjects.xml')
  ).toString();
  const projects = ParseJetbrainsProject(text);

  console.log(projects);
  expect(projects).toEqual(['$USER_HOME$/asphinx']);
});

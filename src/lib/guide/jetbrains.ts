import { homeDir } from '@tauri-apps/api/path';
import { exists, readDir } from '@tauri-apps/plugin-fs';
import { type as OsType } from '@tauri-apps/plugin-os';

export async function JetbrainsBasePath() {
  // biome-ignore lint/style/useNamingConvention: <explanation>
  const HOME = await homeDir();

  if (OsType() === 'macos') {
    return `${HOME}/Library/Application Support/JetBrains/`;
  }
  if (OsType() === 'windows') {
    return `${HOME}/AppData/Roaming/JetBrains/`;
  }
  return `${HOME}/.config/JetBrains/`;
}

export async function GetJetbrainsProducts() {
  const jetbrainsPath = await JetbrainsBasePath();

  const res = [];

  const entities = await readDir(jetbrainsPath);

  for (const entity of entities) {
    if (entity.isFile) {
      continue;
    }
    if (await exists(`${entity.name}/options/recentProjects.xml`)) {
      res.push(entity.name);
    }
  }

  return res;
}

export function parseJetbrainsProject(_xml: string): string[] {
  return [];
}

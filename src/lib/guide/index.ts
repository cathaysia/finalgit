import { exists, readTextFile } from '@tauri-apps/plugin-fs';
import { JetbrainsBasePath, parseJetbrainsProject } from './jetbrains';
import { VscodeBasePath, VscodeParseProject } from './vscode';

export enum IdeType {
  Vscode = 0,
  Jetbrains = 1,
}

export async function GetProjectList(ide: IdeType, product: string | null) {
  if (ide === IdeType.Vscode) {
    const projectPath = await VscodeBasePath();
    const text = await readTextFile(projectPath);

    const pathes = VscodeParseProject(text);
    const res = [];
    for (const i of pathes) {
      if (await exists(`${i}/.git`)) {
        res.push(i);
      }
    }

    return res;
  }

  if (ide === IdeType.Jetbrains) {
    const jetbrainsPath = await JetbrainsBasePath();
    const text = await readTextFile(
      `${jetbrainsPath}/${product}/options/recentProjects.xml`,
    );
    return parseJetbrainsProject(text);
  }
}

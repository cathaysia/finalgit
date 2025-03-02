import { exists, readTextFile } from '@tauri-apps/plugin-fs';
import { JetbrainsBasePath, ParseJetbrainsProject } from './jetbrains';
import { ParseVscodeProject, VscodeBasePath } from './vscode';
import { homeDir } from '@tauri-apps/api/path';

export enum IdeType {
  Vscode = 0,
  Jetbrains = 1,
}

export async function GetProjectList(ide: IdeType, product: string | null) {
  // biome-ignore lint/style/useNamingConvention: <explanation>
  const HOME = await homeDir();

  if (ide === IdeType.Vscode) {
    const projectPath = await VscodeBasePath();
    const text = await readTextFile(projectPath);

    const pathes = ParseVscodeProject(text);
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
    return ParseJetbrainsProject(text).map(v => {
      return v.replace('$USER_HOME$', HOME);
    });
  }
}

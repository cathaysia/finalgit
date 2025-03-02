import { homeDir } from '@tauri-apps/api/path';
import { type as OsType } from '@tauri-apps/plugin-os';

interface CodeStorage {
  lastKnownMenubarData: {
    menus: {
      // biome-ignore lint/style/useNamingConvention: <explanation>
      File: {
        items: [
          {
            id: 'submenuitem.MenubarRecentMenu';
            submenu: {
              items: [
                {
                  id: 'openRecentFolder';
                  uri: {
                    path: string;
                    scheme: 'file' | 'vscode-remote';
                  };
                },
              ];
            };
          },
        ];
      };
    };
  };
}

export async function VscodeBasePath() {
  // biome-ignore lint/style/useNamingConvention: <explanation>
  const HOME = await homeDir();

  if (OsType() === 'macos') {
    return `${HOME}/Library/Application Support/Code/User/globalStorage/storage.json`;
  }
  if (OsType() === 'windows') {
    return `${HOME}/AppData/Roaming/Code/User/globalStorage/storage.json`;
  }

  return `${HOME}/.config/Code/User/globalStorage/storage.json`;
}

export function ParseVscodeProject(content: string) {
  const json: CodeStorage = JSON.parse(content);
  const rev = new Set<string>();
  for (const item of json.lastKnownMenubarData.menus.File.items) {
    if (item.id === 'submenuitem.MenubarRecentMenu') {
      for (const v of item.submenu.items) {
        if (v.id === 'openRecentFolder' && v.uri.scheme !== 'vscode-remote') {
          rev.add(v.uri.path);
        }
      }
    }
  }

  return Array.from(rev);
}

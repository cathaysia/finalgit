import languageMap from '@/lib/languageMap';
import { cn } from '@/lib/utils';
import type { Manifest } from 'material-icon-theme';
import * as Dist from 'material-icon-theme/dist/material-icons.json';

const manifest = Dist as Manifest;

export interface IconProps {
  fileName: string;
  isDir?: boolean;
  isSubmodule?: boolean;
  isSymlink?: boolean;
  className?: string;
}

export default function Icon({
  fileName,
  isDir = false,
  isSubmodule = false,
  isSymlink = false,
  className,
}: IconProps) {
  const lowerFileName = fileName.toLowerCase();
  const fileExtensions: string[] = [];
  if (fileName.length <= 255) {
    for (let i = 0; i < fileName.length; i += 1) {
      if (fileName[i] === '.') fileExtensions.push(lowerFileName.slice(i + 1));
    }
  }
  const iconname = lookForMatch(
    fileName,
    lowerFileName,
    fileExtensions,
    isDir,
    isSubmodule,
    isSymlink,
    manifest,
  );

  const iconpath = `/icons/${iconname}.svg`;

  return (
    <img
      alt={iconname}
      className={cn('inline', className)}
      width={16}
      height={16}
      src={iconpath}
    />
  );
}

function lookForMatch(
  fileName: string,
  lowerFileName: string,
  fileExtensions: string[],
  isDir: boolean,
  isSubmodule: boolean,
  isSymlink: boolean,
  manifest: Manifest,
): string {
  if (isSubmodule) return 'folder-git';
  if (isSymlink) return 'folder-symlink';

  if (!isDir) {
    if (manifest.fileNames?.[fileName]) return manifest.fileNames?.[fileName];
    if (manifest.fileNames?.[lowerFileName])
      return manifest.fileNames?.[lowerFileName];

    for (const ext of fileExtensions) {
      if (manifest.fileExtensions?.[ext]) return manifest.fileExtensions?.[ext];
      if (manifest.languageIds?.[ext]) return manifest.languageIds?.[ext];
    }

    if (languageMap.fileNames[fileName]) return languageMap.fileNames[fileName];
    if (languageMap.fileNames[lowerFileName])
      return languageMap.fileNames[lowerFileName];
    for (const ext of fileExtensions) {
      if (languageMap.fileExtensions[ext])
        return languageMap.fileExtensions[ext];
    }

    return 'file';
  }

  if (manifest.folderNames?.[fileName]) return manifest.folderNames?.[fileName];
  if (manifest.folderNames?.[lowerFileName])
    return manifest.folderNames?.[lowerFileName];

  return 'folder';
}

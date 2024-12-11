import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { open } from '@tauri-apps/plugin-shell';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function LicenseCard({ license }: { license: string[] }) {
  if (license.length === 0) {
    return <></>;
  }
  return (
    <ScrollArea className="w-full">
      {license.map(item => {
        return <LicenseCardSingle key={item} license={item} />;
      })}
    </ScrollArea>
  );
}

export function LicenseCardSingle({ license }: { license: string }) {
  const { t } = useTranslation('license-card');
  const [licensePermission, setLicensePermission] = useState<
    | undefined
    | {
        title: string;
        permissions: string[];
        conditions: string[];
        limitations: string[];
      }
  >();

  import(`./data/${license}.json`).then(module => {
    setLicensePermission(module.default);
  });

  return (
    <Card className="rounded-none border-none p-2">
      <CardTitle>
        <a
          href="_"
          onClick={e => {
            open(`https://choosealicense.com/licenses/${license}/`);
            e.preventDefault();
          }}
          className="text-xl"
        >
          {licensePermission?.title}
        </a>
      </CardTitle>
      <CardContent>
        <div className="grid grid-cols-3">
          <div>
            <h1>{t('Permissions')}</h1>
            <ul className="">
              {licensePermission?.permissions.map(item => {
                return (
                  <li
                    key={item}
                    className='flex items-center gap-2 before:h-3 before:w-3 before:rounded-lg before:bg-green-600 before:content-[""]'
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h1>{t('Conditions')}</h1>
            <ul>
              {licensePermission?.conditions.map(item => {
                return (
                  <li
                    key={item}
                    className='flex items-center gap-2 before:h-3 before:w-3 before:rounded-lg before:bg-sky-600 before:content-[""]'
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h1>{t('Limitations')}</h1>
            <ul>
              {licensePermission?.limitations.map(item => {
                return (
                  <li
                    key={item}
                    className='flex items-center gap-2 before:h-3 before:w-3 before:rounded-lg before:bg-red-600 before:content-[""]'
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const SimpleLicenseMap = {
  '0bsd': 'BSD Zero Clause License',
  'afl-3.0': 'Academic Free License ("AFL") v. 3.0',
  'agpl-3.0': 'Version 3, 19 November 2007',
  'apache-2.0': 'Version 2.0, January 2004',
  'artistic-2.0': 'Artistic License 2.0',
  'blueoak-1.0.0': 'Blue Oak Model License',
  'bsd-2-clause-patent': 'BSD-2-Clause Plus Patent License',
  'bsd-2-clause': 'BSD 2-Clause License',
  'bsd-3-clause-clear': 'The Clear BSD License',
  'bsd-3-clause': 'BSD 3-Clause License',
  'bsd-4-clause': 'BSD 4-Clause License',
  'bsl-1.0': 'Boost Software License - Version 1.0 - August 17th, 2003',
  'cecill-2.1': 'Version 2.1 du 2013-06-21',
  'ecl-2.0': 'Version 2.0, April 2007',
  'epl-1.0': 'Eclipse Public License - v 1.0',
  'epl-2.0': 'Eclipse Public License - v 2.0',
  'eupl-1.1': 'European Union Public Licence\nV. 1.1',
  'eupl-1.2': 'European Union Public License 1.2',
  'gfdl-1.3': 'GNU Free Documentation License\nVersion 1.3, 3 November 2008',
  'gpl-2.0': 'Version 2, June 1991',
  'gpl-3.0': 'Version 3, 29 June 2007',
  isc: 'ISC License',
  'lgpl-2.1': 'GNU LESSER GENERAL PUBLIC LICENSE\nVersion 2.1, February 1999',
  'lgpl-3.0': 'GNU LESSER GENERAL PUBLIC LICENSE\nVersion 3, 29 June 2007',
  'lppl-1.3c': 'LPPL Version 1.3c  2008-05-04',
  mit: 'MIT License',
  'mpl-2.0': 'Mozilla Public License Version 2.0',
  'ms-pl': 'Microsoft Public License (Ms-PL)',
  'ms-rl': 'Microsoft Reciprocal License (Ms-RL)',
  'mulanpsl-2.0': '木兰宽松许可证, 第2版',
  ncsa: 'University of Illinois/NCSA Open Source License',
  'odbl-1.0': 'ODC Open Database License (ODbL)',
  'ofl-1.1': 'SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007',
  'osl-3.0': 'Open Software License ("OSL") v. 3.0',
  postgresql: 'PostgreSQL License',
  'upl-1.0': 'The Universal Permissive License (UPL), Version 1.0',
  vim: 'VIM LICENSE',
  wtfpl:
    'DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE\nVersion 2, December 2004',
  zlib: 'zlib License',
};

export function detectLicense(fileContent: string) {
  const res = [];
  for (const [key, value] of Object.entries(SimpleLicenseMap)) {
    if (fileContent.includes(value)) {
      res.push(key);
    }
  }

  return res;
}

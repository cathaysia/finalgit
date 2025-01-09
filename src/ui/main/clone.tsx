import { type CloneArgs, commands } from '@/bindings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import NOTIFY from '@/lib/notify';
import { useXterm } from '@/lib/use-xterm';
import { Channel } from '@tauri-apps/api/core';
import { produce } from 'immer';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { FaFolder } from 'react-icons/fa6';
import { VscRepo } from 'react-icons/vsc';

export function CloneWidget() {
  const t = useTranslations('project');
  const [isCloning, setIsCloning] = useState(false);
  const { ref, writeText } = useXterm({
    options: {
      rows: 80,
      cols: 80,
    },
  });
  const [args, setArgs] = useState<CloneArgs>({
    url: '',
    depth: 0,
    mirror: false,
    target: '',
    recursive: false,
  });

  if (isCloning) {
    return (
      <>
        <div className="h-32 w-full">
          <div
            ref={r => {
              ref(r);
            }}
          />
        </div>
        <Button variant={'destructive'} disabled>
          <CgSpinner className="mr-2 inline-block animate-spin" />
          {t('cancel clone')}
        </Button>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <VscRepo className="h-6 w-6" />
        <Input
          type="url"
          value={args.url}
          onChange={e =>
            setArgs(
              produce(d => {
                d.url = e.target.value;
              }),
            )
          }
        />
      </div>
      <div className="flex items-center gap-2">
        <FaFolder className="h-6 w-6" />
        <Input
          value={args.target}
          onChange={e =>
            setArgs(
              produce(d => {
                d.target = e.target.value;
              }),
            )
          }
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <Label>{t('depth')}</Label>
        <Input
          type="number"
          value={args.depth}
          onChange={e =>
            setArgs(
              produce(d => {
                d.depth = Number.parseInt(e.target.value);
              }),
            )
          }
        />
      </div>
      <div className="flex justify-between gap-2">
        <Label>{t('recursive')}</Label>
        <Switch
          checked={args.recursive}
          onCheckedChange={e =>
            setArgs(
              produce(d => {
                d.recursive = e.valueOf();
              }),
            )
          }
        />
      </div>
      <div className="flex justify-between gap-2">
        <Label>{t('mirror')}</Label>
        <Switch
          checked={args.mirror}
          onCheckedChange={e =>
            setArgs(
              produce(d => {
                d.mirror = e.valueOf();
              }),
            )
          }
        />
      </div>
      <Button
        onClick={async () => {
          console.log('cloning');
          setIsCloning(true);
          const chan = new Channel<string>();
          chan.onmessage = rep => {
            writeText(rep);
          };

          const res = await commands?.gitClone(args, chan);
          if (res.status === 'error') {
            NOTIFY.error(res.error);
          }
          setIsCloning(false);
        }}
      >
        {t('clone')}
      </Button>
    </div>
  );
}

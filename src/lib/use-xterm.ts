import {
  type ITerminalInitOnlyOptions,
  type ITerminalOptions,
  Terminal,
} from '@xterm/xterm';
import { useEffect, useMemo, useState } from 'react';

export function useXterm({
  options,
}: { options?: ITerminalOptions & ITerminalInitOnlyOptions }) {
  const [buffer, setBuffer] = useState('');
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  const instance = useMemo(() => {
    return new Terminal(options);
  }, [options]);

  instance.dispose();
  useEffect(() => {
    if (!ref) {
      return;
    }
    console.log('open terminal');
    instance.open(ref);
  }, [instance, ref]);

  const writeText = useMemo(() => {
    return (text: string) => {
      if (!ref) {
        setBuffer(s => s + text);
        return;
      }
      if (buffer.length !== 0) {
        instance.write(buffer);
        setBuffer('');
      }
      console.log(`write: ${text}`);
      instance.write(text);
    };
  }, [instance, ref]);

  return { instance, ref: setRef, writeText };
}

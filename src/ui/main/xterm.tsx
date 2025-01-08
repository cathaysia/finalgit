import { Terminal } from '@xterm/xterm';
import { useEffect, useMemo, useRef, useState } from 'react';

export function Xterm({ value }: { value: string }) {
  const term = useMemo(() => {
    return new Terminal();
  }, []);
  const ref = useRef(null);
  const [buf, setBuffer] = useState('');

  useEffect(() => {
    if (ref.current === null) {
      return;
    }
    term.open(ref.current);
  }, [ref]);

  useEffect(() => {
    if (ref.current === null) {
      setBuffer(s => s + value);
      return;
    }
    term.write(buf);
    setBuffer('');
    term.write(value);
  }, [ref, value]);

  return <div ref={ref} />;
}

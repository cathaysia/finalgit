'use client';
import { useAppState } from '@/hooks/state';
import Link from 'next/link';

interface LinkProps extends React.ComponentProps<typeof Link> {
  lang: string;
}

export default function LangLink({ lang, ...props }: LinkProps) {
  const [setLang] = useAppState(s => [s.setLang]);

  return (
    <Link
      {...props}
      onClick={() => {
        setLang(lang);
      }}
    />
  );
}

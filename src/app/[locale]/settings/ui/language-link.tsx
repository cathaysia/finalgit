'use client';
import { useAppStore } from '@/hooks/use-store';
import Link from 'next/link';

interface LinkProps extends React.ComponentProps<typeof Link> {
  lang: string;
}

export default function LangLink({ lang, ...props }: LinkProps) {
  const [setLang] = useAppStore(s => [s.setLang]);

  return (
    <Link
      {...props}
      onClick={() => {
        setLang(lang);
      }}
    />
  );
}

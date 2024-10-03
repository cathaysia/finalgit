'use client';

import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/main/workspace/');
  return <div />;
}

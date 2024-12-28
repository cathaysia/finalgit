import fs from 'node:fs/promises';

export const dynamic = 'force-static';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ lng: string; ns: string }> },
) {
  const { lng, ns } = await params;
  const text = await fs.readFile(`./src/locales/${lng}/${ns}`, 'utf-8');
  return Response.json(JSON.parse(text));
}

export async function generateStaticParams() {
  const lng = ['en_US', 'zh_CN'];
  const ns = ['license-card', 'stage', 'translation'];

  return lng.flatMap(lng => ns.map(ns => ({ lng, ns: `${ns}.json` })));
}

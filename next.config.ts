import os from 'os';
import analyzer from '@next/bundle-analyzer';
import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: 'export',
  devIndicators: {
    appIsrStatus: false,
    buildActivity: true,
  },
  env: {
    os: os.platform(),
  },
};

const withBundleAnalyzer = analyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(withNextIntl(nextConfig));

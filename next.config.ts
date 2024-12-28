import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // output: 'export',
  devIndicators: {
    appIsrStatus: false,
    buildActivity: true,
  },
};

export default withNextIntl(nextConfig);

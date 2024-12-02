import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  devIndicators: {
    appIsrStatus: false,
    buildActivity: true,
  },
};

export default nextConfig;

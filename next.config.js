/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  devIndicators: {
    appIsrStatus: false,
    buildActivity: true,
  },
  distDir: 'dist',
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  experimental: {
    useLightningcss: false,
    parallelServerCompiles: true,
    parallelServerBuildTraces: true,
    webpackBuildWorker: true,
    typedRoutes: true,
  },
  distDir: 'dist',
};

export default nextConfig;

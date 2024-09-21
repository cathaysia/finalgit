/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    experimental: {
        useLightningcss: false,
        parallelServerCompiles: true,
        parallelServerBuildTraces: true,
        webpackBuildWorker: true,
    },
    distDir: "dist",
};

export default nextConfig;

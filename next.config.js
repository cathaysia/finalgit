/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    experimental: {
        useLightningcss: true,
    },
    distDir: "dist",
};

export default nextConfig;

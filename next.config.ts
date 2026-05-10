import type { NextConfig } from "next";

const isStaticPreview = process.env.NEXT_PUBLIC_STATIC_PREVIEW === "true";
const isStaticExport = isStaticPreview || process.env.NEXT_OUTPUT === "export";
const repositoryName = process.env.NEXT_PUBLIC_GITHUB_PAGES_REPOSITORY || "autodrug-website";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : "standalone",
  poweredByHeader: false,
  reactStrictMode: true,
  trailingSlash: false,
  basePath: isStaticPreview ? `/${repositoryName}` : undefined,
  assetPrefix: isStaticPreview ? `/${repositoryName}/` : undefined,
  images: {
    unoptimized: isStaticExport,
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;

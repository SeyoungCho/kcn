import { createMDX } from "fumadocs-mdx/next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const withMDX = createMDX();
const dirname = path.dirname(fileURLToPath(import.meta.url));
const registryPreviewImportsLoader = path.join(
  dirname,
  "loaders/registry-preview-imports.cjs",
);
const registrySources = path.resolve(dirname, "../../packages/registries");

const registryPreviewRule = {
  condition: {
    path: /^packages\/registries\/[^/]+\/src\//,
  },
  loaders: [registryPreviewImportsLoader],
};

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ["@repo/montage", "@repo/seed", "@repo/t-flavored"],
  turbopack: {
    rules: {
      "*.ts": registryPreviewRule,
      "*.tsx": registryPreviewRule,
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.[jt]sx?$/,
      include: registrySources,
      use: [registryPreviewImportsLoader],
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: "/:lang/docs",
        destination: "/:lang/docs/t-flavored",
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);

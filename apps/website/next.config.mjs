import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ["@repo/montage", "@repo/seed", "@repo/t-flavored"],
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

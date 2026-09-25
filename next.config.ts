import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */


const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  // This app depends on the backend API at runtime.
  // Static export is incompatible with dynamic doctor pages that fetch data from an external API,
  // so we keep the normal Next.js server render mode instead of forcing `output: "export"`.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */


const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  output:"export", // static build এর জন্য 
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

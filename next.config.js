/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_WORKSPACE_URL: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  }
};

module.exports = nextConfig;

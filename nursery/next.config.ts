import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 's3.us-east-2.amazonaws.com',
      port: '',
      pathname: '/assets/**'
    }]
  },
}

export default nextConfig;

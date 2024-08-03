import { env } from 'process';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
        {
            protocol: 'http',
            hostname: '**',
        }
      ],
    },
    // ... other configurations
  }

export default nextConfig;


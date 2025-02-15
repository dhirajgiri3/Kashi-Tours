// next.config.ts

import type { NextConfig } from 'next';
import path from 'path';
import type webpack from 'webpack';

/**
 * Next.js Configuration Object
 * @type {NextConfig}
 */
const nextConfig: NextConfig = {
  // Image Optimization Configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows images from any hostname over HTTPS
      },
    ],
  },

  /**
   * Custom Webpack Configuration
   * Extends the default Next.js webpack configuration to handle GLSL shader files
   * and sets up path aliases for cleaner import paths.
   *
   * @param {webpack.Configuration} config - The existing webpack configuration
   * @returns {webpack.Configuration} - The modified webpack configuration
   */
  webpack: (config: webpack.Configuration): webpack.Configuration => {
    // 1. Add a rule to handle GLSL shader files
    config.module?.rules?.push({
      test: /\.(glsl|vs|fs|vert|frag)$/i, // Match shader file extensions
      use: [
        'raw-loader',       // Loads files as a string
        'glslify-loader',   // Processes GLSL modules
      ],
      exclude: /node_modules/, // Exclude node_modules from this rule
    });

    // 2. Resolve alias for clean import paths
    if (config.resolve) {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        '@': path.resolve(__dirname, 'src'), // Points '@' to the 'src' directory
      };
    } else {
      config.resolve = {
        alias: {
          '@': path.resolve(__dirname, 'src'), // Points '@' to the 'src' directory
        },
      };
    }

    return config; // Return the modified config
  },

  // Experimental Features Configuration
  experimental: {
    turbo: {
      rules: {
        // Add Turbopack-specific rules here if needed
      },
    },
  },
};

export default nextConfig; // Export the Next.js configuration
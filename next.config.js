/**
 * @type {import('next').NextConfig}
 */

const isPdrod = process.env.NODE_ENV = 'production'

const nextConfig = {
  basePath: isPdrod ? '/pokedextcg': '', 
  output: 'export',
  distDir: 'dist',
}
 
module.exports = nextConfig
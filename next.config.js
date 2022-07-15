/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      'tobi-bootcamp.s3.eu-west-2.amazonaws.com',
      'tobi-bootcamp.s3.eu-west-2.amazonaws.com',
      'tobi-bootcamp.s3.amazonaws.com',
    ],
  },
}

module.exports = nextConfig

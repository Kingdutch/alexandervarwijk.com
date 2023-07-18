const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});
module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx'],
  webpack: (config) => {
    config.module.rules.push({
      test: /react-spring/,
      sideEffects: true,
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: '/blog/2022-01-17-deploying-rust-on-aws-using-flightcontrol',
        destination:  '/blog/2023-01-17-deploying-rust-on-aws-using-flightcontrol',
        permanent: true,
      },
      {
        source: '/',
        has: [
          {
              type: 'host',
              value: 'ddd23.alexandervarwijk.com',
          },
        ],
        destination: '/talks/2023-07-19 - Drupal Dev Days Vienna - Keeping Drupal Relevant for the Modern Web/index.html',
        permanent: true,
      }
    ];
  },
});

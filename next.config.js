if (!process.env.WORDPRESS_API_URL) {
  throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables WORDPRESS_API_URL.
  `);
}

/** Sass Support https://nextjs.org/docs/basic-features/built-in-css-support */
const path = require('path');
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'seedx.seeddemo.com',
        port: '',
        pathname: '/wp-content/uploads/**',

      },
      {
        hostname: '0.gravatar.com',
      }
      , {
        hostname: '1.gravatar.com',
      },
      {
        hostname: '2.gravatar.com',
      }
      , {
        hostname: 'secure.gravatar.com',
      }
    ],
  },
};

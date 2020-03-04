import path from 'path';
import { config } from 'dotenv';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import DotenvPlugin from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CspHtmlWebpackPlugin from 'csp-html-webpack-plugin';
import LodashWebpackPlugin from 'lodash-webpack-plugin';

// There are some issues between SRI and preload/defer loading
// https://github.com/w3c/preload/issues/127
// You can consider enabling it but test it carefully!
// import PreloadPlugin from 'preload-webpack-plugin';

// Load environment variables to process.env
config({
  path: '.env'
});

export const PUBLIC_FOLDER = path.resolve(__dirname, 'public');
export const SRC_FOLDER = path.resolve(__dirname, 'src');
export const ASSETS_FOLDER = path.resolve(SRC_FOLDER, 'assets');
export const BUILD_FOLDER = path.resolve(__dirname, 'dist');
export const REPORTS_FOLDER = path.resolve(__dirname, 'reports');
export const TOKENS_FOLDER = path.resolve(__dirname, 'tokens');

export default {
  entry: path.resolve(SRC_FOLDER, 'index.js'),
  resolve: {
    alias: {
      'lodash-es': 'lodash'
      // Preact is encouraged (much lighter than React), but can be incompatible with some other dependencies
      // react: 'preact-compat',
      // 'react-dom': 'preact-compat'
    },
    extensions: [
      '.js',
      '.jsx',
      '.mjs',
      '.json',
      '.wasm',
      '.gql',
      '.graphql',
      '.jpg',
      '.jpeg',
      '.png',
      '.gif',
      '.webp',
      '.svg',
      '.woff',
      '.woff2'
    ],
    // https://webpack.js.org/configuration/resolve/#resolvemodules
    // You probably do not want to remove 'node_modules' here (default module resolution behavior)
    modules: [
      'node_modules',
      path.resolve(__dirname), // Allow to reference root files such as config.js
      path.resolve(__dirname, 'src')
    ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|webp|svg|woff2?)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: true,
              name: '[name].[ext]',
              outputPath: 'assets/static'
            }
          }
        ],
        include: ASSETS_FOLDER,
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new DotenvPlugin({
      safe: false, // we might not need all parameters to be defined in all environments
      systemvars: true // only load vars from '.env' file if they are NOT already defined as env variables
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!.gitignore']
    }),
    new CopyWebpackPlugin([
      {
        from: PUBLIC_FOLDER, // Copy all public assets (favicons, splash etc.)
        to: BUILD_FOLDER,
        ignore: [/index.html/] // Do not copy, it would be injected by HtmlWebpackPlugin
      }
    ]),
    new LodashWebpackPlugin({
      // caching: true,
      // collections: true,
      // paths: true,
      // shorthands: true
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(PUBLIC_FOLDER, 'index.html'),
      path: BUILD_FOLDER,
      filename: 'index.html',
      hash: false, // Do not enable: hash conflicts with ServiceWorker cache!
      minify: {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true
      }
    }),
    // new PreloadPlugin({
    //   rel: 'preload',
    //   include: 'allChunks'
    // }),
    new CspHtmlWebpackPlugin(
      {
        'default-src': "'none'",
        'script-src': ["'self'", 'https://storage.googleapis.com/', 'https://polyfill.io/'],
        'style-src': ["'self'", "'unsafe-inline'"],
        'img-src': ["'self'", 'data:'],
        'font-src': "'self'",
        'media-src': "'self'",
        'manifest-src': "'self'",
        'worker-src': "'self'",
        'connect-src': "'self'",
        'object-src': "'none'",
        'frame-src': "'self'",
        'base-uri': "'none'"
      },
      {
        enabled: true,
        hashingMethod: 'sha256',
        hashEnabled: {
          'script-src': true,
          'style-src': true
        },
        nonceEnabled: {
          'script-src': true,
          'style-src': false
        }
      }
    )
  ],
  optimization: {
    splitChunks: {
      // You will probably need to adjust this strategy to your needs
      chunks: 'all'
    }
  }
};

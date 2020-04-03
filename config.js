// Import dependencies.
import path from 'path'

/**
 * Configuration variables for Webpack.
 * Set your own values here.
 */
require('dotenv').config()

const hostName = process.env.HOST // Hostname for the server
const portNumber = process.env.PORT // Port number for the server
const jsOutput = './assets/js/[name].[chunkhash:22].js' // JavaScript file name once built
const cssOutput = './assets/css/[name].[chunkhash:22].css' // CSS file name once built

/**
 * Set config.
 * These don't need to change, but feel free to change to your needs.
 */
const config = {
  CSSOUTPUT: cssOutput,
  DIST: path.resolve(__dirname, 'dist'),
  ENTRY: path.resolve(__dirname, 'src'),
  GITIGNORE: path.resolve(__dirname, '.gitignore'),
  HOST: hostName,
  JSOUTPUT: jsOutput,
  OUTPUT: path.resolve(__dirname, 'public'),
  PORT: portNumber,
}

// Export config.
export default config

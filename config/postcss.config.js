const cssnano = require('cssnano');

module.exports = ({ env } = {}) => ({
  plugins: env === 'production' ? [cssnano({ preset: 'default' })] : [],
});

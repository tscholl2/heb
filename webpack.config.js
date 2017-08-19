let config;
switch (process.env.NODE_ENV) {
    case 'production':
        config = require('./.webpack/production');
        break;
    case 'bundle-analyzer':
        config = require('./.webpack/bundle-analyzer');
        break;
    default:
        config = require('./.webpack/development');
        break;
}
module.exports = config;
/* config-overrides.js */
const webpack = require('webpack');
module.exports = function override(config, env) {
    //do stuff with the webpack config...

    config.resolve.fallback = { 
        os: require.resolve('os-browserify/browser'),
        stream: require.resolve('stream-browserify'),
        path: require.resolve("path-browserify"),
        assert: require.resolve('assert/'),
        constants: require.resolve("constants-browserify"),
        fs: false
    };
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    );

    return config;
}
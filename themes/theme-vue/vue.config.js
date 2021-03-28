"use strict";
exports.__esModule = true;
var path = require("path");
var config_1 = require("@blog/config");
var config = config_1.loadConfig();
var BASE_DIR = path.join(__dirname, 'src');
var DIST_DIR = config.dirs.dest;
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@theme-vue': BASE_DIR
            }
        },
        stats: 'minimal'
    },
    chainWebpack: function (conf) {
        conf.plugin('html').tap(function (args) {
            args[0].minify = {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: false
            };
            return args;
        });
    },
    devServer: {
        contentBase: DIST_DIR,
        hot: true
    },
    pwa: {
        name: config.site.baseTitle,
        manifestOptions: {
            name: config.site.baseTitle,
            short_name: config.site.baseTitle,
            start_url: '/'
        },
        themeColor: '#1A73E8'
    }
};

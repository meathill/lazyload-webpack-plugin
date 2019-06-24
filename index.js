const HtmlWebpackPlugin = require('html-webpack-plugin');
const cheerio = require('cheerio');

const PLUGIN_NAME = 'lazyload-webpack-plugin';

class LazyLoadPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap(PLUGIN_NAME, compilation => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        PLUGIN_NAME,
        (data, cb) => {
          const {html} = data;
          const $ = cheerio.load(html, {
            decodeEntities: false,
          });
          $('img').each((i, item) => {
            $(item).attr('loading', 'lazy');
          });
          data.html = $.html();
          cb(null, data);
        }
      );
    });
  }
}

module.exports = LazyLoadPlugin;

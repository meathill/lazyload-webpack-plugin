const HtmlWebpackPlugin = require('html-webpack-plugin');
const cheerio = require('cheerio');
const {validate} = require('schema-utils');
const isAllSupportLoadingAttribute = require('./caniuse');
const fallback = require('./fallback');

const PLUGIN_NAME = 'lazyload-webpack-plugin';

const schema = {
  type: 'object',
  properties: {
    lazyloadLib: {
      type: 'string',
      description: 'The fallback JS lazyload library',
    },
  },
  additionalProperties: false,
};

const defaultOption = {
  lazyloadLib: 'https://unpkg.com/lazysizes@5.3.2/lazysizes.min.js',
};

class LazyLoadPlugin {
  constructor(options = {}) {
    validate(schema, options, {
      name: PLUGIN_NAME,
      baseDataPath: 'options',
    });
    this.options = {...defaultOption, ...options};
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(PLUGIN_NAME, compilation => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        PLUGIN_NAME,
        (data, cb) => {
          const {html} = data;
          const $ = cheerio.load(html, {
            decodeEntities: false,
          });
          $('img, iframe').each((i, item) => {
            item = $(item);
            if (item.is('[loading]')) {
              return;
            }
            // if NOT all target browsers support `loading="lazy"`, fallback to
            // [lazysizes](https://github.com/aFarkas/lazysizes)
            if (!isAllSupportLoadingAttribute) {
              const src = item.attr('src');
              item.attr('data-src', src);
              item.removeAttr('src');
              item.addClass('lazyload');
            }
            item.attr('loading', 'lazy');
          });

          // and we need to insert a script
          if (!isAllSupportLoadingAttribute) {
            const script = $('script').last();
            const funcBody = fallback.toString().replace('{{lazyloadLib}}', this.options.lazyloadLib);
            script.after(`<script>(${funcBody})()</script>`);
          }

          data.html = $.html();
          cb(null, data);
        },
      );
    });
  }
}

module.exports = LazyLoadPlugin;

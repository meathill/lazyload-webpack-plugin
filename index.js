const http = require('http');
const https = require('https');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cheerio = require('cheerio');
const {validate} = require('schema-utils');
const sizeOf = require('image-size');
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
    imageSize: {
      type: 'boolean',
      description: 'Whether to load the image size',
    },
  },
  additionalProperties: false,
};

const defaultOption = {
  lazyloadLib: 'https://unpkg.com/lazysizes@5.3.2/lazysizes.min.js',
  imageSize: true,
};

function fetch(src) {
  const protocol = src.startsWith('https') ? https : http;
  return new Promise((resolve, reject) => {
    protocol.get(src, response => {
      const chunks = [];
      response.on('data', chunk => {
        chunks.push(chunk);
      });
      response.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve(buffer);
      });
    }).on('error', reject);
  });
}

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
        async (data, cb) => {
          const {html} = data;
          const $ = cheerio.load(html, {
            decodeEntities: false,
          });
          const {imageSize} = this.options;
          for (let item of $('img, iframe')) {
            item = $(item);
            if (item.is('[loading]')) {
              continue;
            }
            // if NOT all target browsers support `loading="lazy"`, fallback to
            // [lazysizes](https://github.com/aFarkas/lazysizes)
            if (!isAllSupportLoadingAttribute) {
              const src = item.attr('src');
              const noDimensions = !item.attr('width') || !item.attr('height');
              if (/img/i.test(item[0].name) && noDimensions && imageSize) {
                try {
                  let dimensions;
                  if (/^https?:\/\//.test(src)) {
                    const data = await fetch(src);
                    dimensions = await sizeOf(data);
                  } else {
                    dimensions = await sizeOf(src);
                  }
                  item.attr('width', dimensions.width);
                  item.attr('height', dimensions.height);
                } catch (e) {
                  console.error(e);
                }
              }
              item.attr('data-src', src);
              item.removeAttr('src');
              item.addClass('lazyload');
            }
            item.attr('loading', 'lazy');
          }

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

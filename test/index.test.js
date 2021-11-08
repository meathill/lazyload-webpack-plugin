/* global beforeAll, test, expect */

const {promises: {readFile}} = require('fs');
const {resolve} = require('path');
const webpack = require('webpack');
const cheerio = require('cheerio');
const webpackConfig = require('../sample/webpack.config.js');

beforeAll(() => {
  const compiler = webpack(webpackConfig);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err);
      } else {
        console.log(stats.toString({
          chunks: false,
          colors: true,
        }));
        resolve(stats);
      }
    });
  });
});

test('check result', async () => {
  const dist = resolve(__dirname, '../dist/index.html');
  const result = await readFile(dist, 'utf8');
  const $ = cheerio.load(result);
  const img = $('img');
  expect(img.attr('loading')).toMatch('lazy');
});

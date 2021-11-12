/* global jest, beforeEach, test, expect */

const {promises: {readFile}} = require('fs');
const {resolve} = require('path');
const cheerio = require('cheerio');

async function compile(extraOptions) {
  const webpack = require('webpack');
  const webpackConfig = require('../sample/webpack.config.js');
  const compiler = webpack({
    ...webpackConfig,
    ...extraOptions,
  });
  await new Promise((resolve, reject) => {
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
  const dist = resolve(__dirname, '../dist/index.html');
  const result = await readFile(dist, 'utf8');
  return cheerio.load(result);
}

beforeEach(() => {
  jest.resetModules();
});

test('should have `loading="lazy"`', async () => {
  process.env.BROWSERSLIST = 'last 5 chrome versions';
  const $ = await compile();
  const img = $('img');
  expect(img.eq(0).attr('loading')).toMatch('eager');
  expect(img.eq(1).attr('loading')).toMatch('lazy');
  const iframe = $('iframe');
  expect(iframe.eq(0).attr('loading')).toMatch('eager');
  expect(iframe.eq(1).attr('loading')).toMatch('lazy');
});

test('should import external lazyload library', async () => {
  process.env.BROWSERSLIST = 'firefox 65';
  const $ = await compile();
  const img = $('img');
  const src = 'https://blog.meathill.com/wp-content/uploads/2021/02/SAM_1291.jpg';
  const url = 'https://bing.com';
  expect(img.eq(0).attr('src')).toBe(src);
  expect(img.eq(1).is('[src]')).toBeFalsy();
  expect(img.eq(1).data('src')).toBe(src);
  expect(img.eq(1).hasClass('lazyload')).toBeTruthy();
  const iframe = $('iframe');
  expect(iframe.eq(0).attr('src')).toBe(url);
  expect(iframe.eq(1).is('[src]')).toBeFalsy();
  expect(iframe.eq(1).data('src')).toBe(url);
  expect(iframe.eq(1).hasClass('lazyload')).toBeTruthy();
});

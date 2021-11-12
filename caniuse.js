const lite = require('caniuse-lite');
const browserslist = require('browserslist');
const {features, feature: unpackFeature} = lite;

const feature = unpackFeature(features['loading-lazy-attr']);
const browsers = browserslist();
const {stats} = feature;
const isSupport = browsers.every(browser => {
  const [name, version] = browser.split(' ');
  const browserData = stats[name];
  const isSupport = browserData && browserData[version] === 'y';
  if (!isSupport) {
    console.log(`[lazyload-webpack-plugin] target browser '${browser}' DOES NOT supported \`loading="lazy"\`.`);
  }
  return isSupport;
});

module.exports = isSupport;

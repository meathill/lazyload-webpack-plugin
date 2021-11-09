const lite = require('caniuse-lite');
const browserslist = require('browserslist');
const {features, feature: unpackFeature} = lite;

const feature = unpackFeature(features['loading-lazy-attr']);
const browsers = browserslist();
const {stats} = feature;
for (const browser of browsers) {
  const [name, version] = browser.split(' ');
  const browserData = stats[name];
  const isSupport = browserData && browserData[version] === 'y';
  console.log(`${browser} is ${isSupport ? '' : 'NOT '}supported.`);
}

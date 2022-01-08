/*
  badJSON
  Creates a batch of URLs that failed because of a non-JSON suffix.
*/
const fs = require('fs');
const makeBatch = () => {
  const badPairs = new Set();
  const reportNames = fs.readdirSync('20sec').map(name => `20sec/${name}`)
  .concat(fs.readdirSync('30sec').map(name => `30sec/${name}`));
  reportNames.forEach(reportName => {
    const reportJSON = fs.readFileSync(reportName, 'utf8');
    const report = JSON.parse(reportJSON);
    if (report.acts[2].result === 'ERROR processing AATT report') {
      const {which, what} = report.acts[1];
      badPairs.add(`${which}##${what}`);
    }
  });
  const badPairArrays = Array.from(badPairs).map(pair => pair.split('##'));
  const badObjs = badPairArrays.map(array => ({
    which: array[0],
    what: array[1]
  }));
  fs.writeFileSync('badJSONs.json', JSON.stringify(badObjs, null, 2));
};
makeBatch();

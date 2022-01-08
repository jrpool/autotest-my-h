/*
  aattURLCheck
  Compares URLs in aattTally.json with URLs in other package data.
*/
const fs = require('fs');
const check = () => {
  const tallyJSON = fs.readFileSync('aattTally.json', 'utf8');
  const tally = JSON.parse(tallyJSON);
  const batchJSON = fs.readFileSync('../../../batches/aattAll.json', 'utf8');
  const batch = JSON.parse(batchJSON);
  const batchURLs = batch.hosts.map(host => host.which);
  Object.keys(tally).forEach(url => {
    if (! batchURLs.includes(url)) {
      console.log(`Not found: ${url}`);
    }
  });
};
check();

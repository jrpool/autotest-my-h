/*
  aattGrossCounts
  Counts totals of issues in tests run.
*/
const fs = require('fs');
const count = () => {
  const tallyJSON = fs.readFileSync('aattTally.json', 'utf8');
  const tally = JSON.parse(tallyJSON);
  const data = {};
  Object.values(tally).forEach(pageTally => {
    const {issues} = pageTally;
    Object.keys(issues).forEach(issue => {
      data[issue] = (data[issue] || 0) + issues[issue];
    });
  });
  fs.writeFileSync('aattGrossCounts.json', JSON.stringify(data, null, 2));
};
count();

/*
  axeTally
  Compiles data on the per-URL distributions of issues in axe tests.
*/
const fs = require('fs');
const tally = () => {
  const data = {};
  const reportNames = fs.readdirSync('reports');
  reportNames.forEach(reportName => {
    const reportJSON = fs.readFileSync(`reports/${reportName}`, 'utf8');
    const report = JSON.parse(reportJSON);
    const {acts} = report;
    const {what, which} = acts[1];
    if (data[which]) {
      console.log(`ERROR: Duplicate reports for ${what}`);
    }
    else {
      data[which] = {
        what,
        issues: {}
      }
    }
    const {result} = acts[2];
    result.forEach(issue => {
      const {type, id} = issue;
      if (type && id) {
        const typeID = `${type}:${id}`;
        const {issues} = data[which];
        if (issues[typeID]) {
          issues[typeID]++;
        }
        else {
          issues[typeID] = 1;
        }
      }
    });
  });
  fs.writeFileSync('aattTally.json', JSON.stringify(data, null, 2));
};
tally();

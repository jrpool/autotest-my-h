/*
  moreThan20
  Creates a batch of URLs that timed out at 20 seconds.
*/
const fs = require('fs');
const makeBatch = () => {
  const tooLongs = [];
  const reportNames = fs.readdirSync('20sec');
  reportNames.forEach(reportName => {
    const reportJSON = fs.readFileSync(`20sec/${reportName}`, 'utf8');
    const report = JSON.parse(reportJSON);
    if (report.acts[2].result === 'ERROR: getting AATT report took too long') {
      const {which, what} = report.acts[1];
      tooLongs.push({
        which,
        what
      });
    }
  });
  fs.writeFileSync('moreThan20.json', JSON.stringify(tooLongs, null, 2));
};
makeBatch();
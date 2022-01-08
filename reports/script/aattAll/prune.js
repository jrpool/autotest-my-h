/*
  prune
  Removes obsolete failure reports.
*/
const fs = require('fs');
const prune = () => {
  const reportNames = fs.readdirSync('reports');
  const data = {};
  reportNames.forEach(reportName => {
    const reportJSON = fs.readFileSync(`reports/${reportName}`, 'utf8');
    const report = JSON.parse(reportJSON);
    const {which, what} = report.acts[1];
    if (! data[what]) {
      data[what] = {
        which,
        reports: []
      };
    }
    const {result} = report.acts[2];
    data[what].reports.push({
      reportName,
      result: typeof result === 'string' ? result : 'OK'
    });
  });
  fs.writeFileSync('prePruneData.json', JSON.stringify(data, null, 2));
  Object.keys(data).forEach(what => {
    const {reports} = data[what];
    const okReports = reports.filter(report => report.result === 'OK');
    if (okReports.length) {
      const badReportNames = reports
      .filter(report => report.result !== 'OK')
      .map(report => report.reportName);
      badReportNames.forEach(reportName => {
        fs.rmSync(`reports/${reportName}`);
        console.log(`Deleted ${reportName}`);
      });
      if (okReports.length > 1) {
        console.log(`WARNING: Too many good reports for ${what}`);
      }
    }
  });
};
prune();

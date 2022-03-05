// exec0.js
// Executor 0 for Testaro

const options = {
  reports: '../../reports/testaro',
  script: '../../scripts/testaro.json'
};
const {handleRequest} = require('../../../testaro/index');
handleRequest(options).then(() => {
  console.log('Executor run');
});

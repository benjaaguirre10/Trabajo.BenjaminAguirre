const fs = require('fs');
const data = require('./data.json');

function removeIdAndAlgorithms(data) {
  return data.map(({id ,specs, ...rest }) => rest);
}

const cleanedData = removeIdAndAlgorithms(data);

fs.writeFileSync('./data.json', JSON.stringify(cleanedData, null, 2));

console.log(cleanedData);
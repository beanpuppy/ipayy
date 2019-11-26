const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'CMU.in.IPA.txt');

fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) throw err;
  const lines = data.split('\n');
  const json = {};

  lines.forEach((line) => {
    const [key, value] = line.split(/\s+/g);
    json[key.slice(0, -1)] = value;
  });

  const string = JSON.stringify(json);
  fs.writeFile(path.join(__dirname, 'ipa.json'), string, (error) => {
    if (error) throw error;
  });
});

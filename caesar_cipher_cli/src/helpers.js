const fs = require('fs');

isFileExists = (filePath) => {
  return fs.existsSync(filePath);
};

module.exports = isFileExists;

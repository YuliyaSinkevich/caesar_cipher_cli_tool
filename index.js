const cipher = require('commander');

cipher
  .storeOptionsAsProperties(false)
  .requiredOption('-a, --action <type>', 'an action encode/decode')
  .requiredOption('-s, --shift <number>', 'a shift')
  .option('-i, --input <file>', 'an input file')
  .option('-o, --output <file>', 'an output file');

cipher.parse(process.argv);

const option = cipher.opts();

console.log(`Caesar_cipher_cli_tool starts...`);

// For cases when the required option is not marked as .requiredOption
if (!option.action) {
  process.stderr.write('There is no option action \n');
  process.exit(1);
} else if (!option.shift) {
  process.stderr.write('There is no option shift \n');
  process.exit(1);
}

console.log(`Action: -->`, option.action);
console.log(`Shift: -->`, option.shift);
console.log(`Input file: -->`, option.input);
console.log(`Output file: -->`, option.output);

caesarShift = (text, shift) => {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    let c = text.charCodeAt(i);
    if (65 <= c && c <= 90) result += String.fromCharCode((c - 65 + shift) % 26 + 65);
    else if (97 <= c && c <= 122) result += String.fromCharCode((c - 97 + shift) % 26 + 97);  // Lowercase
    else result += text.charAt(i);  // Copy
  }
  return result;
};

///// Transform Stream starts
const { Transform } = require('stream');

const myTransform = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,

  transform (chunk, encoding, callback) {
    console.log('Input data: -->', chunk);

    const encodedData = caesarShift(chunk, Number(option.shift));

    // Push the data onto the readable queue.
    callback(null, encodedData);
  }
});
///// Transform Stream ends

const { pipeline } = require('stream');
// Use the pipeline API to easily pipe a series of streams
// together and get notified when the pipeline is fully done.
const fs = require('fs');
pipeline(
  fs.createReadStream(`caesar_cipher_cli_tool/${option.input}`, 'utf8'),
  myTransform.on(`data`, (chunk) => console.log('Output encoded data: -->', chunk)),
  fs.createWriteStream(`caesar_cipher_cli_tool/${option.output}`),
  (err) => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  }
);

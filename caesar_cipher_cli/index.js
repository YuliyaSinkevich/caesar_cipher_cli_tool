const cipher = require('commander');
const fs = require('fs');
const { pipeline } = require('stream');
const isFileExists = require('./src/helpers');
const { encode, decode } = require('./src/cipher');

cipher
  .storeOptionsAsProperties(false)
  .requiredOption('-a, --action <type>', 'an action encode/decode')
  .requiredOption('-s, --shift <number>', 'a shift')
  .option('-i, --input <file>', 'an input file')
  .option('-o, --output <file>', 'an output file')
  .parse(process.argv);

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

if (option.input && !fs.existsSync(`${__dirname}/${option.input}`)) {
  process.stderr.write(`There is no input file ${option.input}\n`);
  process.exit(1);
}
if (option.output && !fs.existsSync(`${__dirname}/${option.output}`)) {
  process.stderr.write(`There is no output file ${option.output}\n`);
  process.exit(1);
}

console.log(`Action: -->`, option.action);
console.log(`Shift: -->`, option.shift);
console.log(`Input file: -->`, option.input);
console.log(`Output file: -->`, option.output);

let action = option.action === 'encode' ? encode :
  option.action === 'decode' ? decode :
    null;

///// Transform Stream starts
const { Transform } = require('stream');

const myTransform = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,

  transform: (chunk, encoding, callback) => {
    console.log('Input data: -->', chunk.toString());

    callback(null, action(chunk.toString(), Number(option.shift)));
  }
});
///// Transform Stream ends

pipeline(
  option.input ? fs.createReadStream(`${__dirname}/${option.input}`, 'utf8')
    : process.stdin.on('readable', () => process.stdin.read()),
  myTransform.on('data', (chunk) => console.log('Output encoded data: -->', chunk)),
  option.output ? fs.createWriteStream(`${__dirname}/${option.output}`)
    : process.stdout.on('end', (chunk) => process.stdout.write(`Output from stdout ${chunk}`)),
);

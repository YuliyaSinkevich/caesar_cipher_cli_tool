# Caesar_cipher_cli_tool

## CLI tool that will encode and decode a text by [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher).

To run Caesar_cipher_cli_tool you need [node.js](http://nodejs.org) 

Then install dependencies:

`yarn`

To use Caesar_cipher_cli_tool from command line write:

`node caesar_cipher_cli -a encode -s 8 -i "input.txt" -o "output.txt"`

CLI tool accept 4 options (short alias and full name):
```
-s, --shift: a shift
-i, --input: an input file
-o, --output: an output file
-a, --action: an action encode/decode
```
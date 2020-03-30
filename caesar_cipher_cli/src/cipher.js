encode = (text, shift) => {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    let c = text.charCodeAt(i);
    if (65 <= c && c <= 90) result += String.fromCharCode((c - 65 + shift) % 26 + 65);
    else if (97 <= c && c <= 122) result += String.fromCharCode((c - 97 + shift) % 26 + 97);
    else result += text.charAt(i);
  }
  return result;
};

decode = (text, shift) => {
  let result = '';
  shift = (26 - shift) % 26;
  result = encode(text, shift);
  return result;
};

module.exports = { encode, decode };

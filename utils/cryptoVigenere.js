export const vigenereEncrypt = (text, key) => {
  let result = "";
  let generateKey = key;

  for (let i = 0; i < text.length - key.length; i++) {
    generateKey += key[i % key.length];
  }

  for (let i = 0; i < text.length; i++) {
    if (text[i] === " ") {
      result += " ";
    } else {
      let x = (text[i].charCodeAt(0) + generateKey[i].charCodeAt(0)) % 26;
      x += "A".charCodeAt(0);
      result += String.fromCharCode(x);
    }
  }
  return result;
};

export const vigenereDecrypt = (text, key) => {
  let result = "";
  let generateKey = key;

  for (let i = 0; i < text.length - key.length; i++) {
    generateKey += key[i % key.length];
  }
  for (let i = 0; i < text.length; i++) {
    if (text[i] === " ") {
      result += " ";
    } else {
      let x = (text[i].charCodeAt(0) - generateKey[i].charCodeAt(0) + 26) % 26;
      x += "A".charCodeAt(0);
      result += String.fromCharCode(x);
    }
  }
  return result;
};

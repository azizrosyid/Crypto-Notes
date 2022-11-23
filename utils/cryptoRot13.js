export const rot13 = (text) => {
  // using map
  return text
    .split("")
    .map((char) => {
      let code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        code = ((code - 65 + 13) % 26) + 65;
      } else if (code >= 97 && code <= 122) {
        code = ((code - 97 + 13) % 26) + 97;
      }
      return String.fromCharCode(code);
    })
    .join("");
};

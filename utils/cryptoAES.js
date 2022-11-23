const crypto = require("crypto");
const aesjs = require("aes-js");
import fs from "fs";
import { uploadS3 } from "./uploadS3";

export const saveFile = async (file, key) => {
  const data = fs.readFileSync(file.filepath);

  const aesKey = crypto.pbkdf2Sync(key, "salt", 100000, 16, "sha512");
  const text = data.toString("hex");
  const textBytes = aesjs.utils.utf8.toBytes(text);
  const aesCtr = new aesjs.ModeOfOperation.ctr(aesKey, new aesjs.Counter(5));
  const encryptedBytes = aesCtr.encrypt(textBytes);
  const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

  const name = `${new Date().getTime()}-${file.originalFilename}`;
  const encryptedFileName = name + ".enc";

  const location = await uploadS3({
    data: encryptedHex,
    fileName: encryptedFileName,
  });
  fs.unlinkSync(file.filepath);
  return location;
};

export const decryptFile = async (encryptedHex, key) => {
  const encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
  const aesKey = crypto.pbkdf2Sync(key, "salt", 100000, 16, "sha512");
  const aesCtr = new aesjs.ModeOfOperation.ctr(aesKey, new aesjs.Counter(5));
  const decryptedBytes = aesCtr.decrypt(encryptedBytes);
  const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
  const base64 = Buffer.from(decryptedText, "hex").toString("base64");
  return base64;
};

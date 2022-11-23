const notes = [];

import formidable from "formidable";
import fs from "fs";
import { decryptFile, saveFile } from "../../utils/cryptoFile";
import { rot13 } from "../../utils/cryptoRot13";
import { vigenereDecrypt, vigenereEncrypt } from "../../utils/cryptoVigenere";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();
    return form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error", err);
        return res.status(500).json({ error: err.message });
      }
      const { title, description, key } = fields;

      const encTitle = vigenereEncrypt(title.toUpperCase(), key.toUpperCase());
      const encDescription = rot13(description);
      const encFile = await saveFile(files.image, key);

      const note = {
        id: notes.length + 1,
        title: encTitle,
        description: encDescription,
        image: encFile,
      };

      notes.push(note);
      return res.status(201).json({ status: "success", data: note });
    });
  }

  if (req.method === "GET") {
    if (req.query.id) {
      const note = notes.find((note) => note.id === parseInt(req.query.id));
      const key = req.query.key;
      const encryptedHex = fs.readFileSync(
        `./public/${note.image.replace("/", "")}`,
        "utf8"
      );

      const base64 = await decryptFile(encryptedHex, key);

      const noteDecrypted = {
        ...note,
        title: vigenereDecrypt(note.title, key.toUpperCase()),
        description: rot13(note.description),
        image: `data:image/jpeg;base64,${base64}`,
      };
      return res.status(200).json({ status: "success", data: noteDecrypted });
    }

    const notesResponse = notes.map((note) => {
      return {
        ...note,
        image: null,
      };
    });

    return res.status(200).json({ status: "success", data: notesResponse });
  }
}

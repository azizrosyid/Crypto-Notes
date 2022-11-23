const notes = [
  {
    id: 1,
    title: "AFUC QD PYWAB BYCDY",
    description: "Bqvg fbyhgn qrovgvf ",
    image:
      "https://rosyid.sgp1.digitaloceanspaces.com/encrypted_file/1669190087627-doc_5_page-0001.jpg.enc",
  },
];

import formidable from "formidable";
import fs from "fs";
import { decryptFile, saveFile } from "../../utils/cryptoAES";
import { rot13 } from "../../utils/cryptoRot13";
import { vigenereDecrypt, vigenereEncrypt } from "../../utils/cryptoVigenere";
import { readFileS3 } from "../../utils/uploadS3";

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
      if (!note) {
        return res
          .status(404)
          .json({ status: "error", message: "Note not found" });
      }
      const key = req.query.key;
      const buffer = await readFileS3(note.image.split("/").pop());

      const base64 = await decryptFile(buffer, key);

      if (!base64) {
        return res.status(400).json({ status: "error", message: "Wrong key" });
      }

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

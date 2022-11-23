import { Button, Modal } from "flowbite-react";
import { useState } from "react";

export default function AddNoteModal({ open, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [key, setKey] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "key") {
      setKey(value);
    }
  };

  const handleAddNote = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("key", key);

    const response = await fetch("/api/notes", {
      method: "POST",
      body: formData,
    });
    onClose();
  };

  return (
    <Modal show={open} onClose={onClose}>
      <div className="flex flex-col p-4">
        <h1 className="text-2xl font-bold">Add Note</h1>
        <label className="text-sm font-semibold text-gray-600 py-2">
          Title
        </label>
        <input
          type="text"
          className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
          name="title"
          value={title}
          onChange={handleInput}
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          Description
        </label>
        <textarea
          className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
          value={description}
          name="description"
          onChange={handleInput}
          rows="3"
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          Image
        </label>
        <input
          type="file"
          className="border rounded-lg mt-1 mb-5 text-sm w-full"
          accept="image/*"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label className="text-sm font-semibold text-gray-600 py-2">Key</label>
        <input
          type="password"
          className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
          name="key"
          value={key}
          onChange={handleInput}
        />
        <div className="flex justify-end">
          <Button
            color="gray"
            onClick={() => {
              onClose();
            }}
            className="mr-2 border w-24"
          >
            Cancel
          </Button>
          <Button onClick={() => handleAddNote()} className="w-24">
            Add
          </Button>
        </div>
      </div>
    </Modal>
  );
}

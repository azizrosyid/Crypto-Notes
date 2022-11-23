import { Modal } from "flowbite-react";
import { useState } from "react";

export default function PasswordModal({ open, onClose }) {
    const [key, setKey] = useState("");
  
    const handleInput = (e) => {
      const { value } = e.target;
      setKey(value);
    };
  
    const handleKey = async () => {
      onClose(key);
    };
  
    return (
      <Modal show={open} onClose={onClose}>
        <div className="flex flex-col p-4">
          <h1 className="text-2xl font-bold mb-3">Enter Key</h1>
          <input
            type="password"
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            name="password"
            value={key}
            onChange={handleInput}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={handleKey}
          >
            Submit
          </button>
        </div>
      </Modal>
    );
  }
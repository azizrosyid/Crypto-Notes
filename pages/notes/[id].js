import { Button, Modal } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainNavbar from "../../components/Navbar";
import PasswordModal from "../../components/PasswordModal";

export default function Notes() {
  const router = useRouter();
  const { id } = router.query;

  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(true);
  const [key, setKey] = useState(null);

  useEffect(() => {
    const getNote = async (id, key) => {
      const response = await fetch(`/api/notes?id=${id}&key=${key}`);
      if (response.ok) {
        const responseJson = await response.json();
        const { data } = responseJson;
        setNote(data);
      } else {
        const { message } = await response.json();
        setError({ message });
      }
    };

    if (id && key) {
      getNote(id, key);
    }
  }, [id, key]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-5xl font-bold mb-3">Error</h1>
        <p className="text-gray-600 text-3xl">{error.message}</p>
        <Button
          className="mt-5"
          onClick={() => {
            router.push("/");
          }}
        >
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <>
      <MainNavbar />
      <div className="flex flex-col justify-center py-2 items-start container mx-auto">
        <main className="flex flex-col justify-center items-start w-full flex-1 px-1 text-center">
          <h1 className="text-4xl font-bold  my-3">
            {note ? note.title : "Loading..."}
          </h1>
          <img src={note?.image} className="w-1/2 mx-auto" />
          <p className="mt-3 text-xl text-left">
            {note ? note.description : "Loading..."}
          </p>
        </main>
      </div>
      <PasswordModal
        open={open}
        onClose={(key) => {
          setKey(key);
          setOpen(false);
        }}
      />
    </>
  );
}

import { Button, Card, Modal } from "flowbite-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import AddNoteModal from "../components/AddNoteModal";
import MainNavbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [notes, setNotes] = useState([]);

  const onClickAddNote = () => {
    setOpenModal(true);
  };

  const fetchNotes = useCallback(async () => {
    const response = await fetch("/api/notes");
    const responseJson = await response.json();
    const { data } = responseJson;
    setNotes(data);
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <div>
      <Head>
        <title>Crypto Notes</title>
        <link
          rel="icon"
          href="https://services.garmin.com/appsLibraryBusinessServices_v0/rest/apps/42369127-b237-4cf9-935b-2b2dad85da97/icon/023aacec-e5cc-4973-95c6-46d75714a2d3"
        />
      </Head>
      <MainNavbar />
      <main style={{ width: "80%", margin: "0 auto" }}>
        <div className="flex flex-row justify-center py-2 items-start container mx-auto">
          <h1 className="text-4xl font-bold  my-3">List Notes</h1>
          <Button className="my-3 ml-auto" onClick={() => onClickAddNote()}>
            Add Note
          </Button>
        </div>
        <div className="grid gap-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 ">
          {notes.map((note) => (
            <NoteCard note={note} key={note.id} />
          ))}
        </div>
      </main>
      <AddNoteModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          fetchNotes();
        }}
      />
    </div>
  );
}

import { Card } from "flowbite-react";
import Link from "next/link";

function NoteImage({ src }) {
  if (src) {
    return <img src={src} className="h-48 w-full object-cover" />;
  }
  return <div className="h-48 w-full bg-gray-200">
    <div className="flex items-center justify-center h-full">
      <p className="text-gray-500">Image Encrypted</p>
    </div>
  </div>;
}

export default function NoteCard({ note }) {
  return (
    <Link href={`/notes/${note.id}`}>
      <Card className="cursor-pointer">
        <NoteImage src={note.image} />
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {note.title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400 text-left">
          {note.description}
        </p>
      </Card>
    </Link>
  );
}

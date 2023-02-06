import React, { useEffect, useState, useContext } from "react";
import NoteItem from "./NoteItem";
import axios from "axios";
import noteContext from "../Context/noteContext";
import AddNoteModal from "./AddNoteModal";

const Notes = () => {
  const context = useContext(noteContext)
  const { notes, setNotes } = context;
  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const res = await axios.get("http://localhost:8800/notes");
        console.log(res);
        setNotes(res.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchAllNotes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <AddNoteModal />

      <div className="notesContaineer row mx-1 my-5 py-5 px-1">
        {notes.map((note) => {
          return (
            <div className="noteItem col-sm-3" key={note.id}>
              <NoteItem note={note} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notes;

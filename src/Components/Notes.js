import React, { useEffect, useContext, useState } from "react";
import NoteItem from "./NoteItem";
import axios from "axios";
import noteContext from "../Context/noteContext";
import AddNoteModal from "./AddNoteModal";
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom";

const Notes = () => {
  const context = useContext(noteContext)
  const { notes, setNotes, endpoint, darkMode } = context;
  const cookies = new Cookies();

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        if(cookies.get('jwtToken', { path: '/' })){
        const res = await axios.get(`${endpoint}/api/fetchNotes`, {
          headers: {
            "Content-Type": "application/json",
            "auth-token": cookies.get('jwtToken', { path: '/' })
          }
        });
        setNotes(res.data);
        }
        else{
          return
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchAllNotes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {cookies.get('jwtToken', { path: '/' }) ? 
      <div>
        <AddNoteModal />

        <div className="notesContaineer row mx-1 my-5 py-5 px-1">
          {notes.map((note) => {
            return (
              <div className="noteItem col-sm-3" key={note._id}>
                <NoteItem note={note} />
              </div>
            );
          })}
        </div>
      </div>
      :
      <div>
      <div className="h-screen flex flex-col justify-center items-center -my-10 px-2">
        <p className={darkMode ? "text-center text-navbarColor text-lg desktop:text-4xl" : "text-center text-green-400 text-lg desktop:text-4xl"}>
          Please login first to access your notes.
        </p>
        <Link
          to="/"
          className="text-bgColor hover:text-bgColor font-bold text-2xl desktop:text-5xl bg-cardColor px-4 py-2 my-10 rounded-full cursor-pointer no-underline"
        >
          Go Home
        </Link>
      </div>
    </div>
      }
    </>
  );
};

export default Notes;

import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const [notes, setNotes] = useState([])

    const addNote = () => {
        window.location.reload()
    }

    const deleteNote = () => {
        window.location.reload()
    }

    const editNote = () => {

    }

    return(
        <noteContext.Provider value={{notes, setNotes, addNote, deleteNote, editNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;
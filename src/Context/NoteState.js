import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const endpoint = "https://inotebook-backend-server.up.railway.app"
    const [progress, setProgress] = useState(0)
    const [navHeading, setNavHeading] = useState("iNotebook")
    const [notes, setNotes] = useState([])
    const [darkMode, setDarkMode] = useState(false)

    return(
        <noteContext.Provider value={{navHeading, setNavHeading, notes, setNotes, endpoint, progress, setProgress, darkMode, setDarkMode}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;
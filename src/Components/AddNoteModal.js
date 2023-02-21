import axios from 'axios';
import React, { useState, useContext } from 'react';
import noteContext from "../Context/noteContext";
import Modal from 'react-bootstrap/Modal';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

function AddNoteModal() {
  const context = useContext(noteContext)
  const { endpoint, setProgress, notes, setNotes } = context
  const cookies = new Cookies()
  const navigate = useNavigate()

  const [show, setShow] = useState(false);
  const date = new Date();
  let dateAsText = date.toString();
  let noteDate = dateAsText.slice(4,24)
  const [newNote, setNewNote] = useState({
    title:"",
    description:"",
    tag:"",
    date: noteDate
  })
  const [inputError, setInputError] = useState("")

  const handleClose = () => {
    setNewNote({title:"", description:"", tag:""})
    setInputError(" ")
    setShow(false);
  }
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    let inputName = e.target.name
    let inputValue = e.target.value

    setNewNote({...newNote, [inputName]:inputValue})
  }

  const handleAddNoteSubmit = async (e) => {
    e.preventDefault()

    try{
        if(!newNote.title && !newNote.description){
            setInputError("Note cannot be empty")
            return setTimeout(() => {setInputError("")}, 1250)
        }
        
        setProgress(10)
        if(cookies.get('jwtToken', { path: '/' })){
          await axios.post(`${endpoint}/api/newNote`, {
            title: newNote.title,
            description: newNote.description,
            tag: newNote.tag
          }, {
            headers: {
              "Content-Type": "application/json",
              "auth-token": cookies.get('jwtToken', { path: '/' })
            }
          })
        
        setProgress(60)

        const notesAfterAdding = await notes.concat(newNote)
        await setNotes(notesAfterAdding)
        setNewNote({title:"", description:"", tag:""})
        setInputError("Note added successfully")
        setTimeout(() => {setInputError(""); handleClose()}, 1250)
        setProgress(100)

        //window.location.reload()
      }
      else{
        setNewNote({title:"", description:"", tag:""})
        setInputError("Token deleted unexpectedly. Logging out now")
        setTimeout(() => {setInputError(""); handleClose()}, 5000)
        setTimeout(() => {navigate("/")}, 6000)
        setProgress(100)
      }
    }
    catch(err){
        console.log(err.message)
    }
  }

  return (
    <>
            <div className="flex justify-center">
        <div
          onClick={handleShow}
          className="bg-cardColor mt-10 w-full mx-4 text-2xl text-cardBody px-4 py-6 rounded-3xl cursor-text"
        >
          Take a note...
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <div>
          <div className='bg-cardColor px-4 py-4 rounded-t-xl'><p className='text-2xl font-bold text-cardHeading'>Add Note</p></div>
        </div>

        <div className='bg-cardColor px-4 pb-4 pl-auto rounded-b-xl space-x-3'>
          <form onSubmit={handleAddNoteSubmit}>
            <div className="inputDiv py-2">
                <input type="text" name="title" id="titleId" value={newNote.title} onChange={handleInputChange} autoCapitalize='off' autoComplete='off' className="px-3 py-2 w-full text-lg text-navbarText bg-cardHeading focus:outline-none my-1 rounded-xl" placeholder='Title' />

                <input type="text" name="description" id="descriptionId" value={newNote.description} onChange={handleInputChange} autoCapitalize='off' autoComplete='off' className="px-3 py-2 w-full text-lg text-navbarText bg-cardHeading focus:outline-none my-1 rounded-xl" placeholder='Description' />

                <input type="text" name="tag" id="tag" value={newNote.tag} onChange={handleInputChange} autoCapitalize='off' autoComplete='off' className="px-3 py-2 w-full text-lg text-navbarText bg-cardHeading focus:outline-none my-1 rounded-xl" placeholder='Tag' />

                <small className='text-base text-cardBody py-1'>{inputError}</small>
            </div>

            <div className='bg-cardColor px-4 pb-4 pl-auto rounded-b-xl space-x-3'>
          <button className='bg-cardHeading text-cardColor text-lg py-1 px-3 rounded-lg' onClick={handleClose}>
            Cancel
          </button>
          <button type="submit" onClick={handleAddNoteSubmit}className='bg-navbarColor text-navbarText text-lg py-1 px-3 rounded-lg'>Note</button>
        </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default AddNoteModal;
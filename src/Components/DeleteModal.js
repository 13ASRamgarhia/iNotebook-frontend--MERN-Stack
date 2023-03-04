import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Icon } from 'semantic-ui-react';
import noteContext from '../Context/noteContext';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

function DeleteModal(props) {
  const context = useContext(noteContext)
  const { endpoint, setProgress, notes, setNotes } = context
  const navigate = useNavigate()
  const cookies = new Cookies()

  const [show, setShow] = useState(false);
  const [err, setErr] = useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteConfirmed = async () => {
    try{
      setProgress(10)
      if(cookies.get('jwtToken', { path: '/' })){
        if(props.note._id === undefined){
          return window.alert("Internal server error. Please try again later")
        }
  
        await axios.delete(`${endpoint}/api/deleteNote/${props.note._id}`, {
          headers: {
            "Content-Type": "application/json",
            "auth-token": cookies.get('jwtToken', { path: '/' })
          }
        })
        setProgress(100)
        handleClose()
  
        const notesAfterDeletion = notes.filter((note) => {return note._id !== props.note._id})
        setNotes(notesAfterDeletion)
        window.location.reload()
      }
      else{
        setErr("Token deleted unexpectedly. Logging out now")
        setTimeout(() => {setErr(); handleClose()}, 5000)
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
      <button onClick={handleShow} className='p-0 m-0'><Icon name="trash" size='large' className='text-cardBodyLight' /></button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <div>
          <div className='bg-cardColor px-4 py-4 rounded-t-xl'><p className='text-xl text-cardHeading'>Deleting <span className="font-bold">{props.note.title}</span>. Click "Delete Note" to confirm</p></div>
        </div>
        <small className='text-base px-4 bg-cardColor text-cardBody py-1'>{err}</small>
        <div className='bg-cardColor px-4 pb-4 pl-auto rounded-b-xl space-x-3 flex justify-end'>
          <button className='bg-cardHeading text-cardColor text-lg py-1 px-3 rounded-lg' onClick={handleClose}>
            Cancel
          </button>
          <button onClick={handleDeleteConfirmed}  className='bg-navbarColor text-navbarText text-lg py-1 px-3 rounded-lg'>Delete Note</button>
        </div>
      </Modal>
    </>
  );
}

export default DeleteModal;

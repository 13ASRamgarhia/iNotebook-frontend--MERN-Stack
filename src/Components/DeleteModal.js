import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Icon } from 'semantic-ui-react';
import noteContext from '../Context/noteContext';
import axios from 'axios';

function DeleteModal(props) {
  const context = useContext(noteContext)
  const { deleteNote } = context

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteConfirmed = async () => {
    try{
      await axios.delete(`http://localhost:8800/deleteNote/${props.id}`)
      handleClose()
      deleteNote()
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
          <div className='bg-cardColor px-4 py-4 rounded-t-xl'><p className='text-xl text-cardHeading'>Deleting <span className="font-bold">{props.title}</span>. Click "Delete Note" to confirm</p></div>
        </div>
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
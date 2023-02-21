import React from 'react'
import DeleteModal from './DeleteModal'
import { Badge } from 'react-bootstrap'

const NoteItem = (props) => {
    const {note} = props
  return (
    <div className='noteItem bg-cardColor rounded-xl px-4 py-3 mx-2 my-3 shadow-sm shadow-cardColor'>
      <div className='noteItemHeader flex'>
        <p className="font-bold text-2xl text-cardHeading mb-1">{note.title}</p>
        {note.tag && <p className='bg-navbarColor text-navbarText w-fit text-sm ml-4 my-auto justify-center items-center p-1 rounded-lg'>
          {note.tag}
          </p>}
      </div>
      <p className="text-lg text-cardBody mb-6">{note.description}</p>
      <div className="infoDiv flex flex-row justify-between items-center">
        <p className="text-base text-cardBodyLight font-semibold my-auto">{note.date}</p>
        <DeleteModal note = {note}/>
      </div>
    </div>
  )
}

export default NoteItem
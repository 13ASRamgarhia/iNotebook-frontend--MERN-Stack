import React from 'react'
import DeleteModal from './DeleteModal'

const NoteItem = (props) => {
    const {note} = props
  return (
    <div className='noteItem bg-cardColor rounded-xl px-4 py-3 mx-2 my-3 shadow-sm shadow-cardColor'>
      <p className="font-bold text-2xl text-cardHeading mb-1">{note.title}</p>
      <p className="text-lg text-cardBody mb-6">{note.description}</p>
      <div className="infoDiv flex flex-row justify-between items-center">
        <p className="text-base text-cardBodyLight font-semibold my-auto">{note.date}</p>
        <DeleteModal title={note.title} id={note.id}/>
      </div>
    </div>
  )
}

export default NoteItem
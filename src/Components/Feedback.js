import React, { useState, useContext } from 'react'
import noteContext from "../Context/noteContext";
import Modal from "react-bootstrap/Modal";
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import axios from 'axios';

const Feedback = () => {
  document.title = "Feedback - iNotebook"

  const context = useContext(noteContext)
  const { darkMode, setProgress, endpoint } = context
  
  const [feedbackInput, setFeedbackInput] = useState({
    name:"", feedback:"", rating:0
  })
  const [err, setErr] = useState("")

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputs = (e) => {
    let inputName = e.target.name
    let inputValue = e.target.value

    setFeedbackInput({...feedbackInput,[inputName]:inputValue})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { name, feedback, rating } = feedbackInput

    if(!name && !feedback && !rating){
      setErr("Feedback cannot be empty")
      setTimeout(() => {setErr("")}, 2500)
      return
    }

    try{
      await axios.post(`${endpoint}/api/feedback`, {
        name, feedback, rating
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      setFeedbackInput({name:"", feedback:"", rating:0})
    }
    catch(error){
      setErr(err.message)
      setTimeout(() => {setErr("")}, 4000)
    }   
  }

  return (<>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <div>
          <div className='bg-cardColor px-4 py-4 rounded-t-xl'><p className='text-2xl desktop:text-3xl font-bold text-cardHeading'>Sign up successfull</p></div>
        </div>

        <div className='bg-cardColor px-4 pb-4 rounded-b-xl space-x-3'>
            <div className='bg-cardColor px-4 pb-4 rounded-b-xl tablet:space-x-3 space-y-3 tablet:space-y-0 flex tablet:flex-row flex-col'>
              <button className='bg-cardHeading text-cardColor text-lg desktop:text-2xl  py-1 desktop:py-2 px-3 desktop:px-4 rounded-lg w-fit' onClick={handleClose}>Okay</button>
              <button className='bg-navbarColor py-1 desktop:py-2 px-3 desktop:px-4 rounded-lg w-fit'><Link to="/Login" className="text-navbarText no-underline hover:no-underline hover:text-navbarText text-lg desktop:text-2xl">Move to login page</Link></button>
            </div>
        </div>
      </Modal>

    <div className="min-h-screen flex flex-col justify-center items-center -my-14 px-1 mx-1">
      <div className="w-[95%] flex laptop:justify-center laptop:items-center">
      <div className="bg-cardColor px-4 py-4 h-full rounded-xl w-full laptop:w-[50%]">
        <h2 className="text-3xl desktop:text-5xl font-bold text-cardHeading mb-6">
          Feedback form
        </h2>
        <p className="text-xl desktop:text-3xl text-cardHeading mb-2">Have anything to say about the app?<br/>Leave your valuable feedback to us.</p>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col laptop:flex-row laptop:justify-between'>
            <div className="formGroup w-full laptop:w-[60%] mt-3 py-1 text-lg desktop:text-2xl space-x-2 border-b border-cardBody">
                <input
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                autoCapitalize="off"
                value={feedbackInput.name}
                onChange={handleInputs}
                placeholder="Your name"
                className="formInput bg-transparent px-1 desktop:px-2 focus:outline-0 w-[80%]"
                />
            </div>
            <div className="formGroup w-full laptop:w-[40%] text-center mt-3 py-1 text-lg desktop:text-2xl space-x-2">
              <Rating
                name="rating"
                value={feedbackInput.rating}
                onChange={handleInputs}
                size="large"
              />
            </div>
          </div>

          <div className="formGroup m-auto mt-3 py-1 text-lg desktop:text-2xl space-x-2 border-b border-cardBody">
            <input
              type="text"
              name="feedback"
              id="feedback"
              autoComplete="off"
              autoCapitalize="off"
              value={feedbackInput.feedback}
              onChange={handleInputs}
              placeholder="Feedback"
              className="formInput bg-transparent px-1 desktop:px-2 focus:outline-0 w-[80%]"
            />
          </div>
          <p className="text-cardBodyLight text-sm desktop:text-lg mb-3">{err}</p>
          
          <div className="flex flex-col laptop:flex-row space-x-0 laptop:space-x-4 space-y-4 laptop:space-y-0 text-center mt-10 justify-center items-center">
            <button type="submit" className="submitBtn w-fit bg-cardHeading text-navbarText text-lg desktop:text-2xl rounded-lg px-12 py-2.5">Submit</button>
            <button type="submit" className="submitBtn w-fit bg-transparent text-navbarText text-lg desktop:text-2xl rounded-lg"><Link to="/" className="bg-transparent text-cardHeading border-2 border-cardHeading text-lg desktop:text-2xl rounded-lg px-12 py-2 no-underline hover:no-underline hover:text-cardHeading focus:text-cardHeading">Home</Link></button>
          </div>
        </form>
      </div>
      </div>
    </div>
    </>
  )
}

export default Feedback

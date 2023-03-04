import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import noteContext from "../Context/noteContext";
import axios from "axios";

const Signup = () => {
  document.title = "Sign up - iNotebook";

  const context = useContext(noteContext);
  const { endpoint, setProgress } = context;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [fullNameErr, setFullNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");

  const clearForm = () => {
    setUser({ fullName: "", email: "", password: "", confirmPassword: "" });
  };

  const handleInputs = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;

    setUser({ ...user, [inputName]: inputValue });
    setFullNameErr("");
    setEmailErr("");
    setPasswordErr("");
    setConfirmPasswordErr("");
  };

  const signupvalidation = () => {
    if (user.fullName === "") {
      setFullNameErr("Your name is required");
      return true;
    } else if (user.fullName.length < 3) {
      setFullNameErr("Your name must contain at least three characters");
      return true;
    }

    if (user.email === "") {
      setEmailErr("Your email is required");
      return true;
    } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(user.email)) {
      setEmailErr("Please enter a valid email");
      return true;
    }

    if (user.password === "") {
      setPasswordErr("Please create a password");
      return true;
    } else if (user.password.length < 8) {
      setPasswordErr("Your password must contain at least eight characters");
      return true;
    }

    if (user.confirmPassword === "") {
      setConfirmPasswordErr("Please enter password");
      return true;
    } else if (user.confirmPassword !== user.password) {
      setConfirmPasswordErr("Confirm password must match your password");
      return true;
    }

    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    signupvalidation();
    if (signupvalidation()) {
      return;
    }

    try {
      setProgress(10);
      const res = await axios.post(`${endpoint}/api/signup`, {
        fullName: user.fullName,
        email: user.email,
        password: user.password,
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      }
      );
      const statusCode = res.data.statusCode
      setProgress(60);
      if(statusCode === 200){
        setUser({ fullName: "", email: "", password: "", confirmPassword: "" });
        setProgress(100);
        handleShow();
      }
      else if(statusCode === 201){
        setConfirmPasswordErr("User already registered")
        setProgress(100);
        setTimeout(() => {setConfirmPasswordErr("")}, 6000)
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
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
            <h2 className="text-3xl desktop:text-5xl font-bold text-cardHeading mb-10">
              Create an account to get started
            </h2>
            <form onSubmit={handleSubmit} id="signUpForm">
              <div className="formGroup m-auto mt-3 py-1 text-lg desktop:text-2xl space-x-2 border-b border-cardBody">
                <label htmlFor="fullName">
                  <Icon name="user" size="large" className="text-cardBody" />
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  autoComplete="off"
                  autoCapitalize="off"
                  value={user.fullName}
                  onChange={handleInputs}
                  placeholder="Your name"
                  className="formInput bg-transparent focus:outline-0 w-[80%]"
                />
              </div>
              <p className="text-cardBodyLight text-sm desktop:text-lg mb-3">{fullNameErr}</p>

              <div className="formGroup m-auto mt-3 py-1 text-lg desktop:text-2xl space-x-2 border-b border-cardBody">
                <label htmlFor="email">
                  <Icon name="mail" size="large" className="text-cardBody" />
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  autoComplete="off"
                  autoCapitalize="off"
                  value={user.email}
                  onChange={handleInputs}
                  placeholder="Your email"
                  className="formInput bg-transparent focus:outline-0 w-[80%]"
                />
              </div>
              <p className="text-cardBodyLight text-sm desktop:text-lg mb-3">{emailErr}</p>

              <div className="formGroup m-auto mt-3 py-1 text-lg desktop:text-2xl space-x-2 border-b border-cardBody">
                <label htmlFor="password">
                  <Icon name="lock" size="large" className="text-cardBody" />
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  autoCapitalize="off"
                  value={user.password}
                  onChange={handleInputs}
                  placeholder="Create password"
                  className="formInput bg-transparent focus:outline-0 w-[80%]"
                />
              </div>
              <p className="text-cardBodyLight text-sm desktop:text-lg mb-3">{passwordErr}</p>

              <div className="formGroup m-auto mt-3 py-1 text-lg desktop:text-2xl space-x-2 border-b border-cardBody">
                <label htmlFor="password">
                  <Icon name="lock" size="large" className="text-cardBody" />
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  autoComplete="off"
                  autoCapitalize="off"
                  value={user.confirmPassword}
                  onChange={handleInputs}
                  placeholder="Confirm password"
                  className="formInput bg-transparent focus:outline-0 w-[80%]"
                />
              </div>
              <p className="text-cardBodyLight text-sm desktop:text-lg mb-3">
                {confirmPasswordErr}
              </p>

              <div className="mt-3 w-fit">
                <button
                  type="button"
                  onClick={clearForm}
                  className="clearBtn bg-transparent text-cardBody text-base desktop:text-xl underline"
                >
                  click here to clear form
                </button>
              </div>

              <div className="flex flex-col space-y-3 justify-center items-center mt-6">
                <button
                  type="submit"
                  className="submitBtn bg-cardHeading text-navbarText text-lg desktop:text-2xl rounded-lg px-12 py-2 mx-auto"
                >
                  Sign Up
                </button>
              </div>
              <div className="flex justify-center items-center mt-6">
                <Link
                  to="/Login"
                  className="text-cardHeading hover:text-cardHeading underline hover:underline text-base desktop:text-xl"
                >
                  I already have an account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

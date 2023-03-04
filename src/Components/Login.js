import axios from 'axios';
import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import Cookies from 'universal-cookie';
import noteContext from "../Context/noteContext";

const Login = () => {
  document.title = "Login - iNotebook"
  const cookies = new Cookies();
  const navigate = useNavigate()

  const context = useContext(noteContext)
  const { endpoint, setProgress } = context
  const [user,setUser] = useState({
    email:"",password:""
  })
  const [err, setErr] = useState("")

  const handleInputs = (e) => {
    let inputName = e.target.name
    let inputValue = e.target.value

    setUser({...user,[inputName]:inputValue})
  }

  const loginValidation = () => {
    if(user.email === "" || user.password === ""){
      setErr("Please enter your email and password")
      return true
    }

    return false
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    loginValidation();
    if(loginValidation()){
      return
    }

    try{
      setProgress(10)
      const response = await axios.post(`${endpoint}/api/login`, {
        email:user.email, password:user.password
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      setProgress(60)
      const statusCode = response.data.statusCode
      if(statusCode === 200){
        const stringifiedResponse = JSON.stringify(response)
        setProgress(80)
        const userData = JSON.parse(stringifiedResponse)
        cookies.set('jwtToken', userData.data.token, { path: '/' });
        setProgress(100)
        navigate("/Notes")
      }
      else if(statusCode === 201){
        setErr("Invalid email or password")
        setProgress(100);
        setTimeout(() => {setErr("")}, 6000)
      }
      
    }
    catch(err){
      setErr(err.message)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center -my-14 px-1 mx-1">
      <div className="w-[95%] flex laptop:justify-center laptop:items-center">
      <div className="bg-cardColor px-4 py-4 h-full rounded-xl w-full laptop:w-[50%]">
        <h2 className="text-3xl desktop:text-5xl font-bold text-cardHeading mb-10">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
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
              placeholder="Email"
              className="formInput bg-transparent focus:outline-0 w-[80%]"
            />
          </div>

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
              placeholder="Password"
              className="formInput bg-transparent focus:outline-0 w-[80%]"
            />
          </div>
          <p className="text-cardBodyLight text-sm desktop:text-lg mb-3">{err}</p>
          
          <div className="flex justify-center items-center mt-6">

          <button type="submit" className="submitBtn bg-cardHeading text-navbarText text-lg desktop:text-2xl rounded-lg px-12 py-2 mx-auto">Login</button>
          </div>
          <div className="flex justify-center items-center mt-6">

          <Link to="/Signup" className="text-cardHeading hover:text-cardHeading underline hover:underline text-base desktop:text-xl">I don't have an account</Link>
          </div>

        </form>
      </div>
      </div>
    </div>
      );
}

export default Login
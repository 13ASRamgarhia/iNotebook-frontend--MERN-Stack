import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

const Login = () => {
  const [user,setUser] = useState({
    email:"",password:""
  })

  const handleInputs = (e) => {
    let inputName = e.target.name
    let inputValue = e.target.value

    setUser({...user,[inputName]:inputValue})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(user)
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center -my-14 px-1 mx-1">
      <div className="w-[95%]">
      <div className="bg-cardColor px-4 py-4 h-full rounded-xl">
        <h2 className="text-3xl font-bold text-cardHeading mb-10">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="formGroup m-auto mt-3 py-1 text-lg space-x-2 border-b border-cardBody">
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
          <p className="text-cardBodyLight text-sm mb-3">Invalid email</p>

          <div className="formGroup m-auto mt-3 py-1 text-lg space-x-2 border-b border-cardBody">
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
          <p className="text-cardBodyLight text-sm mb-3">Invalid email</p>
          
          <div className="flex justify-center items-center mt-6">

          <button type="submit" className="submitBtn bg-cardHeading text-navbarText text-lg rounded-lg px-12 py-2 mx-auto">Login</button>
          </div>
          <div className="flex justify-center items-center mt-6">

          <Link to="/Signup" className="text-cardHeading hover:text-cardHeading underline hover:underline text-base">I don't have an account</Link>
          </div>

        </form>
      </div>
      </div>
    </div>
      );
}

export default Login
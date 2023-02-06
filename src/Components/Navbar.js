import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

const Navbar = () => {

  const toggleHamburger = () => {
    document.getElementById("slideoverBG").classList.toggle("invisible");
    document
      .getElementById("slideroverContainer")
      .classList.toggle("invisible");
    document.getElementById("slideover").classList.toggle("translate-x-full");
  }

  return (
    <div className='bg-navbarColor text-white flex flex-row sticky top-0 z-50 w-full'>
      <div className="hamburger py-3 px-2">
        <button className="hamburgerBtn" onClick={toggleHamburger}>
        <div className="bg-navbarText my-1 mx-1 h-1 w-6 rounded-lg"></div>
        <div className="bg-navbarText my-1 mx-1 h-1 w-6 rounded-lg"></div>
        <div className="bg-navbarText my-1 mx-1 h-1 w-4 rounded-lg"></div>
        </button>
      </div>
      <div className="text-navbarText my-auto font-bold text-xl cursor-pointer">
        <Link to="/" className='focus:text-navbarText hover:text-navbarText text-navbarText no-underline'>Notes</Link>
      </div>

      <div
          className="mobileNavbar fixed inset-0 w-full z-50 h-screen invisible"
          id="slideroverContainer"
        >
          <div
            className="slideoverBG absolute duration-500 ease-out transition-all w-full h-screen bg-white opacity-50 right-0 top-0 translate-x-full"
            id="slideoverBG"
          ></div>
          <div
            className="absolute duration-500 ease-out transition-all w-full h-full bg-navbarColor right-0 top-0 translate-x-full"
            id="slideover"
          >
            <div className="HBheader flex w-fit ml-3 mr-auto mt-3">
              <button onClick={toggleHamburger}>
                <Icon name="close" size="big" className="text-white" />
              </button>
            </div>
            <div className="HBcontent mt-10">
              <div
                to="/god4l"
                className="linkRouter no-underline hover:text-white hover:no-underline"
              >
                <div className="HBContentItem text-white text-2xl text-center py-5">
                  <p className='text-2xl text-semibold'>Notes</p>
                  <p className='text-sm'>A cloud notebook</p>
                </div>
              </div>
              <Link
                to="/god4l"
                className="linkRouter no-underline hover:text-white hover:no-underline"
              >
                <div className="HBContentItem text-white hover:text-navbarColor text-2xl text-center py-5 hover:bg-navbarText">
                  Home
                </div>
              </Link>
              <Link
                to="/god4l"
                className="linkRouter no-underline hover:text-white hover:no-underline"
              >
                <div className="HBContentItem text-white hover:text-navbarColor text-2xl text-center py-5 hover:bg-navbarText">
                  Login
                </div>
              </Link>
              <Link
                to="/god4l"
                className="linkRouter no-underline hover:text-white hover:no-underline"
              >
                <div className="HBContentItem text-white hover:text-navbarColor text-2xl text-center py-5 hover:bg-navbarText">
                  Sign Up
                </div>
              </Link>
              <Link
                to="/god4l"
                className="linkRouter no-underline hover:text-white hover:no-underline"
              >
                <div className="HBContentItem text-white hover:text-navbarColor text-2xl text-center py-5 hover:bg-navbarText">
                  Logout
                </div>
              </Link>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Navbar

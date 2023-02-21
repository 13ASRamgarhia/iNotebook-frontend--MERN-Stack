import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import noteContext from "../Context/noteContext";
import LoadingBar from 'react-top-loading-bar';
import Cookies from 'universal-cookie';

const Navbar = () => {
  const context = useContext(noteContext)
  const { progress, setProgress } = context
  let location = useLocation()
  const cookies = new Cookies()
  const navigate = useNavigate()

  const toggleHamburger = () => {
    document.getElementById("slideoverBG").classList.toggle("invisible");
    document
      .getElementById("slideroverContainer")
      .classList.toggle("invisible");
    document.getElementById("slideover").classList.toggle("translate-x-full");
  }

  const handleLogoutClick = () => {
    setProgress(10)
    cookies.remove('jwtToken', { path: '/' })
    setProgress(60)
    navigate("/")
    setProgress(100)
  }

  return (<>
    <LoadingBar
    color='#e6ded3'
    progress={progress}
    onLoaderFinished={() => setProgress(0)}
  />
    <div className='bg-navbarColor text-white flex flex-row top-0 z-50 w-full justify-between laptop:h-14 desktop:h-20'>
      <div className={"flex laptop:mx-4"}>
      <div className="hamburger py-3 px-2 flex flex-col laptop:hidden">
        <button className="hamburgerBtn" onClick={toggleHamburger}>
        <div className="bg-navbarText my-1 desktop:my-1.5 mx-1 desktop:mx-1.5 h-1 desktop:h-1.5 w-6 desktop:w-8 rounded-lg"></div>
        <div className="bg-navbarText my-1 desktop:my-1.5 mx-1 desktop:mx-1.5 h-1 desktop:h-1.5 w-6 desktop:w-8 rounded-lg"></div>
        <div className="bg-navbarText my-1 desktop:my-1.5 mx-1 desktop:mx-1.5 h-1 desktop:h-1.5 w-4 desktop:w-6 rounded-lg"></div>
        </button>
      </div>
      <div className="text-navbarText align-center my-auto font-bold text-xl cursor-pointer">
        <p className='focus:text-navbarText hover:text-navbarText text-navbarText no-underline desktop:text-3xl'>{location.pathname === "/Notes" ? "Notes" : "iNotebook"}</p>
      </div>
      </div>
      <div className="navItems text-navbarText align-center my-auto font-bold text-xl cursor-pointer laptop:mx-4 space-x-6 hidden laptop:flex">
        <Link to="/About" className='focus:text-navbarText hover:scale-110 ease-linear duration-75 hover:text-navbarText text-navbarText no-underline desktop:text-3xl py-2 px-3'>About</Link>
        <Link to="/Feedback" className='focus:text-navbarText hover:scale-110 ease-linear duration-75 hover:text-navbarText text-navbarText no-underline desktop:text-3xl py-2 px-3'>Feedback</Link>

        {cookies.get('jwtToken', { path: '/' }) ? 
        <button className='focus:text-navbarText hover:scale-110 ease-linear duration-75 hover:text-navbarText text-navbarText no-underline desktop:text-3xl py-2 px-3 border-2 border-navbarText' onClick={handleLogoutClick}>Logout</button>
        :
        <><Link to="/Login" className='focus:text-navbarText hover:text-navbarText text-navbarText no-underline desktop:text-3xl py-2 px-3 border-2 border-navbarText rounded-full'>Login</Link>
        <Link to="/SignUp" className='focus:text-navbarColor bg-navbarText hover:text-navbarColor text-navbarColor no-underline desktop:text-3xl py-2 px-3 rounded-full'>Sign up</Link></>}
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
    </>
  )
}

export default Navbar

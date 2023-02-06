import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <div className="h-screen flex flex-col justify-center items-center -my-10 px-2">
        <div className="text-center text-navbarColor font-bold text-4xl mb-2">
          Welcome to Notes
        </div>
        <p className="text-center text-navbarColor text-lg">
          A cloud notebook app in your device, accessible anywhere, anytime
        </p>
        <Link
          to="/Signup"
          className="text-bgColor hover:text-bgColor font-bold text-2xl bg-cardColor px-4 py-2 my-10 rounded-full cursor-pointer no-underline"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Landing;

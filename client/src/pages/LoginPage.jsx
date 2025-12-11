import React from "react";
import assets from "../assets/assets";
import { useState } from "react";
const LoginPage = () => {
    const [currState, setCurrState] = useState("Sign Up");
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      {/* ----- left */}
      <img src={assets.logo_big} alt="" className="w-[min(30vw,250px)]" />
      {/* right */}
      {currState === "Sign Up" ? 
        <form action="">
        <div className="bg-[#282142]/70 backdrop-blur-xl border border-gray-600 rounded-2xl p-8 flex flex-col gap-6 w-[300px] max-sm:w-[90vw]">
          <h1 className="text-white text-2xl font-semibold text-center">
            {currState}    
            </h1>
            <input
                type="text"
                placeholder="Full Name"
                className="bg-transparent border border-gray-600 rounded-full py-2 px-4 text-white outline-none placeholder:text-gray-400 text-sm shadow-lg" required
            />
            <input
                type="email"
                placeholder="Email"
                className="bg-transparent border border-gray-600 rounded-full py-2 px-4 text-white outline-none placeholder:text-gray-400 text-sm shadow-lg" required
            />
            <input
                type="password"
                placeholder="Password"
                className="bg-transparent border border-gray-600 rounded-full py-2 px-4 text-white outline-none placeholder:text-gray-400 text-sm" required
            />
            <button className="bg-linear-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer">
                {currState}
            </button>
            <p className="text-xs text-gray-400 text-center">
                Already have an account? <span onClick={()=>setCurrState("Login")} className="text-white cursor-pointer">Login</span>
            </p>
        </div>
      </form> :
        <form action="">
        <div className="bg-[#282142]/70 backdrop-blur-xl border border-gray-600 rounded-2xl p-8 flex flex-col gap-6 w-[300px] max-sm:w-[90vw]">
            <h1 className="text-white text-2xl font-semibold text-center">
                {currState}
            </h1>
            <input
                type="email"
                placeholder="Email"
                className="bg-transparent border border-gray-600 rounded-full py-2 px-4 text-white outline-none placeholder:text-gray-400 text-sm shadow-lg" required
            />
            <input
                type="password"
                placeholder="Password"
                className="bg-transparent border border-gray-600 rounded-full py-2 px-4 text-white outline-none placeholder:text-gray-400 text-sm" required
            />
            <button className="bg-linear-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer">
                {currState}
            </button>
            <p className="text-xs text-gray-400 text-center">
                Don't have an account? <span onClick={()=>setCurrState("Sign Up")} className="text-white cursor-pointer">Sign Up</span>

            </p>
        </div>
      </form>
      
    }
    </div>
  );
};

export default LoginPage;

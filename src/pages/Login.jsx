import React, { useState } from "react";
import LoginBackground from "../data/LoginBackground.jpg";
import Logo from "../data/mediroster.png";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios";
import server from "../server"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useStateContext();

  const handleMainAppPage = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }
    try{
      const res = await axios.post(`${server}/api/user/login`, {
        email: email,
        password: password,
      });
      if(res.data.message){
        console.log(res.message)
      alert(res.data.message)
      }
      else if (res.data) {
        login(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
   
            console.log(res.data);
            if (res.data.role === "consultant") {
              navigate("/consultantAcceptRequest");
            } else if (res.data.role === "admin") {
              navigate("/wards");
            } else if (res.data.role === "doctor") {
              navigate("/schedule");
            }
          } 
        
    }
    catch(e){
      console.log(e)
     
    }
    
  };

  return (
    <div className="bg-cover bg-center min-h-screen w-full">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${LoginBackground})`,
          zIndex: -2,
        }}
      ></div>

      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full backdrop-blur-md bg-opacity-80 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-center pt-7 ">
            <a
              href="#"
              className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <img className="w-40 h-30 mr-2" src={`${Logo}`} alt="logo" />
            </a>
          </div>

          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#016285] focus:border-[#016285] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#016285] focus:border-[#016285] block w-full p-2.5 dark:bg-[#016285] dark:border-[#016285] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-[#016285] hover:bg-[#203d59] focus:ring-4 focus:outline-none focus:ring-[#016285] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={handleMainAppPage}
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default Login;

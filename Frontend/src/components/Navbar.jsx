import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import myimg from '../assets/urllogo.png'

const Navbar = ({logged,setlogged}) => {
  const navigate = useNavigate()
  const handlelogout=async()=>{
    let res = await axios.get('http://localhost:5050/logout', { withCredentials: true, validateStatus: () => true })
    if (res.status === 200) {
      setlogged(false)
      navigate('/')
    }
  }
  return (
    <div className='w-[100%] relative'>

      <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed w-full z-10">
        <div className="flex flex-wrap items-center justify-between p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={myimg} className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">URL SHORTNER BY ADX</span>
          </a>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink to="/" className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</NavLink>
              </li>
              {!logged && <li>
                <NavLink to="/login" className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Login</NavLink>
              </li>}
              {logged && <li>
                <button
                    onClick={handlelogout}
                    className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  >
                    Logout
                  </button>
              </li>}

            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
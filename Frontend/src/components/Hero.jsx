import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'



const Hero = ({logged,setlogged}) => {
  const navigate = useNavigate()
  useEffect(()=>{
    if (logged) {
    navigate('/task')
  }
  })

  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-pink-100">
        <div className="text-center h-[60%] w-[80%] bg-white p-8 rounded-lg shadow-lg flex justify-center items-center flex-col">
          <h1 className="text-7xl font-bold bg-linear-to-r/longer from-indigo-500 to-teal-400 text-transparent bg-clip-text">Welcome to URL shortner by ADX</h1>
          <p className="text-lg mt-4">A simple todo app to manage your tasks</p>
          <div className="btn flex justify-center items-center">
            <a href="/Register"><button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-10 text-center me-2 mb-2">Get Started</button>
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Hero

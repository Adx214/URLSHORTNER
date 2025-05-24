import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Login from './pages/Login'
import Register from './pages/Register'
import Task from './pages/Task'
import axios from 'axios'
const App = () => {
  const [logged, setlogged] = useState(false)
  const [id, setid] = useState('')


  const checklogged = async () => {
    while (true) {
      let res = await axios.get('http://localhost:5050/logged', { withCredentials: true, validateStatus: () => true })
      if (res.status === 200) {
        setlogged(true)
        setid(res.data.user._id)
        break
      } else {
        setlogged(false)
        continue
      }
    }
  }
  useEffect(() => {
    checklogged()
  }, [])
  return (

    <>
      <Navbar logged={logged} setlogged={setlogged} />

      <Routes>
        <Route path="/" element={<Hero logged={logged} setlogged={setlogged} />} />
        <Route path="/login" element={<Login logged={logged} setlogged={setlogged} />} />
        <Route path='/register' element={<Register logged={logged} setlogged={setlogged} />}></Route>
        <Route path='/task' element={<Task logged={logged} setlogged={setlogged} id={id} setid={setid} />}></Route>

      </Routes>

    </>
  )
}

export default App

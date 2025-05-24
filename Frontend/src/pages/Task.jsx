import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { useForm } from "react-hook-form";
import axios from 'axios';

const Task = ({ logged, setlogged, id, setid }) => {
  const [query, setquery] = useState('')
  const [dquery, setdquery] = useState(query)
  const [result, setresult] = useState([])
  const [data, setdata] = useState([])
  const navigate = useNavigate()
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const handleSearch = async (id, name) => {
    const res = await axios.get(`http://localhost:5050/search?name=${name}&createdBy=${id}`,
      { withCredentials: true, validateStatus: () => true })
    if (res.status === 200) {
      console.log("SEARCHED");
      setresult(res.data.data)
      console.log(result.length);
    }

  }
  const handleDelete = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5050/delete/${id}`,
        { withCredentials: true, validateStatus: () => true })
      console.log(res.status);
      if (res.status === 200) {
        console.log("Deleted");
        geturl()
      } else {
        console.log("Error deleting");

      }
    } catch {
      console.log("Error deleting");
    }
  }
  const geturl = async () => {
    const uid = id
    try {
      const res = await axios.get(`http://localhost:5050/geturls/${uid}`, { withCredentials: true, validateStatus: () => true })
      if (res.status === 200) {

        setdata(res.data)

      }
    } catch (err) {
      console.log(err);
    }
  }
  const submiturl = async (data) => {
    const uid = id


    try {
      const res = await axios.post("http://localhost:5050/shorturl", {
        url: data.url,
        name: data.name,
        id: uid
      }, { withCredentials: true, validateStatus: () => true })
      if (res.status === 200) {
        console.log("Submitted");
        geturl()



      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (id) {
      geturl()
    }
  }, [id])

  useEffect(() => {

    if (logged === false) {
      navigate('/')
    }
  }, [logged, navigate])

  useEffect(() => {
    const handler = setTimeout(() => {
      setdquery(query)
    }, 500);

    return () => clearTimeout(handler)
  }, [query])

  useEffect(() => {
    if (dquery.trim() !== '') {
      handleSearch(id, dquery);
    }
    if(dquery.trim() == ''){
      setresult([])
    }
  }, [dquery, id])

  return (
    <div className="min-h-screen bg-pink-200 flex flex-col items-center justify-start gap-6 py-[2vh]">

      {/* Hero Section */}
      <div className="bg-purple-400 rounded-[2vw] w-[95vw] h-[75vh] flex flex-col items-center justify-center text-center gap-[2vh]">
        <h1 className="text-[3.5vw] font-extrabold tracking-widest text-black drop-shadow-sm uppercase leading-tight">
          Welcome to URL Shortner by <br /> ADX
        </h1>

        <div>
          <div className="flex items-center w-[50vw] h-[10vh] mb-0">
            <input
              type="text"
              placeholder="Search ..."
              className="w-full h-full py-[1.2vh] px-[1.5vw] rounded-l-md text-[1vw] outline-none"
              value={query}
              onChange={(e) => setquery(e.target.value)}
            />
            <button className="bg-teal-400 p-[1.2vh] px-[1.5vw] rounded-r-md" onClick={() => handleSearch(id, dquery)}>
              <FaSearch className="text-white text-[7.5vh]" />
            </button>
          </div>
          <div className='mt-0 w-[43.5vw]' id='tabr'>
            <table className="w-full">
              {result.length > 0 && (<tbody className='mt-0  border-t-0 w-full'>
                {result.map((i) => (
                  <tr key={i._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 w-full">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {i.name}
                    </td>
                    <td className="px-6 py-4">
                      <a href={i.shortenurl} className="text-blue-500 hover:underline" target='_blank' rel="noopener noreferrer">{i.shortenurl}</a>
                    </td>

                  </tr>
                ))}
              </tbody>)}
            </table>
          </div>

        </div>
      </div>
      {/* Table + Form Section */}
      <div className="flex flex-col lg:flex-row gap-[3vw] w-[90vw] justify-between">



        {/* URL Table */}
        <div className="bg-white rounded-[1.5vw] flex-1 overflow-hidden">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="border-b border-black">
                <th className="text-left py-[1.5vh] px-[1vw] text-[1.2vw] font-semibold">Name</th>
                <th className="text-left py-[1.5vh] px-[1vw] text-[1.2vw] font-semibold">URLS</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-[1vh] px-[1vw] text-[1vw]">{item.name}</td>
                  <td className="py-[1vh] px-[1vw] text-[1vw]">
                    <a href={item.shortenurl} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                      {item.shortenurl}
                    </a>
                  </td>
                  <td className="py-[1vh] px-[1vw] text-[1vw]">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* URL Form */}
        <div className="bg-white rounded-[1.5vw] p-[2vw] w-full lg:w-[30vw]">
          <form onSubmit={handleSubmit(submiturl)}>
            <label className="block mb-[1vh] text-[1.1vw] font-semibold">Name</label>
            <input
              type="text"
              placeholder="Name of the url"
              className="w-full mb-[2vh] py-[1.2vh] px-[1vw] border rounded text-[1vw]"
              {...register("name", { required: true, message: "Name is required" })}
            />

            <label className="block mb-[1vh] text-[1.1vw] font-semibold">URL</label>
            <input
              type="text"
              placeholder="URL"
              className="w-full mb-[2vh] py-[1.2vh] px-[1vw] border rounded text-[1vw]"
              {...register("url", { required: true, pattern: { value: /^(ftp|http|https):\/\/[^ "]+$/, message: "Invalid URL" } })}
            />

            <button type='submit' className="w-full bg-black text-white py-[1.5vh] text-[1.1vw] rounded hover:bg-gray-800 transition">
              Create URL
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Task;

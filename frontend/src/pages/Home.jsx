import React from 'react'
import { useNavigate } from "react-router";

const Home = () => {

    const navigate = useNavigate();

    const Add_School =()=>{
        navigate("/add-school");
    }

    const List_Schools =()=>{
        navigate("/list-schools");
    }

  return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center space-y-4 ">
      <h1 className="text-3xl font-bold text-white">School API</h1>
      <div className="flex space-x-4">
        <button onClick={Add_School} className="btn btn-outline btn-warning btn-sm sm:btn-md md:btn-lg">
          Add School
        </button>
        <button onClick={List_Schools}  className="btn btn-outline btn-secondary btn-sm sm:btn-md md:btn-lg">
          List Schools
        </button>
      </div>
    </div>
  )
}

export default Home

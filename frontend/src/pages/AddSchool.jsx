import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";




const AddSchool = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !address || !latitude || !longitude) {
        toast.error("All fields are required!");
        return;
      }
  
      try {
        const response = await axios.post("http://localhost:5000/schoolAPI/addSchool", {
          name,
          address,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        });
  
        toast.success(response.data.message);
        

      } catch (error) {
        console.error("Error response:", error.response);
        console.error("Error data:", error.response?.data);
        toast.error(error.response?.data?.error || "Failed to add school");
      }




  };


  return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center space-y-4 ">

        <div className="absolute top-4 left-4">
          <button onClick={() => navigate("/")}>
           <img src="/previous.png" alt="Back" className="w-15 h-15 cursor-pointer" />
          </button>
         </div>

        <form
        onSubmit={handleSubmit}
        className="bg-neutral-900 shadow-custom lg:pr-6 lg:pl-6 lg:pt-3 lg:pb-5 rounded-md lg:w-96 lg:h-auto text-white  w-[21.8rem] pl-4 pr-4 pt-5 pb-6"
      >
        <h1 className="text-center text-3xl mt-2 mb-2 font-medium">ADD SCHOOLS</h1>

        <div className="flex flex-col mb-5 mt-5">
          <label htmlFor="name" className="mb-2 text-md">School Name</label>
          <input
            className="p-[9px] pt-3 pb-3 bg-inputBg outline-none rounded-md text-sm border border-inputBr placeholder-stone-600"
            type="text"
            placeholder="Enter School name"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col mb-5">
          <label htmlFor="address" className="mb-2 text-md">Address</label>
          <input
            className="p-[9px] pt-3 pb-3 bg-inputBg outline-none rounded-md border text-sm border-inputBr placeholder-stone-600"
            type="text"
            placeholder="Enter School Address"
            name="address"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

       
        <div className="flex flex-col mb-5">
          <label htmlFor="latitude" className="mb-2 text-md">Latitude</label>
          <input
            className="p-[9px] bg-inputBg outline-none rounded-md border border-inputBr placeholder-stone-600 appearance-none no-spinner"
            type="number"
            placeholder="Enter Latitude"
            name="latitude"
            id="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </div>



        <div className="flex flex-col mb-5">
          <label htmlFor="longitude" className="mb-2 text-md">Longitude</label>
          <input
            className="p-[9px] bg-inputBg outline-none rounded-md border border-inputBr placeholder-stone-600 appearance-none no-spinner"
            type="number"
            placeholder="Enter longitude"
            name="longitude"
            id="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </div>

        <button type="submit" className="ml-27 mt-3 btn  btn-success"> Add School</button>

    


      </form>
    </div>
  )
}

export default AddSchool

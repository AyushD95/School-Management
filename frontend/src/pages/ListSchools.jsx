import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const ListSchools = () => {
  const navigate = useNavigate();

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!latitude || !longitude) {
      toast.error("All fields are required!");
      return;
    }
  
    try {
      // Send request to backend API
      const response = await axios.get("http://localhost:5000/schoolAPI/listSchools", {
        params: { latitude, longitude },
      });
  
      toast.success("Schools fetched successfully!");
      navigate("/school-results", { state: { schools: response.data } });
  
    } catch (error) {
      console.error("Error fetching schools:", error);
      toast.error(error.response?.data?.error || "Failed to fetch schools");
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
        <h1 className="text-center text-3xl mt-2 mb-2 font-medium">LIST SCHOOLS</h1>

       
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

        <button type="submit" className="ml-27 mt-3 btn  btn-success">List School</button>

    


      </form>
    </div>
  )
}

export default ListSchools

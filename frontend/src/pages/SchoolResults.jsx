import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SchoolResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { schools } = location.state || { schools: [] };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center text-white relative p-6">
      {/* Back Button */}
      <button onClick={() => navigate("/list-schools")} className="absolute top-4 left-4">
        <img src="/previous.png" alt="Back" className="w-15 h-15 cursor-pointer" />
      </button>

      {/* Title */}
      <h1 className="text-4xl font-extrabold mt-12 mb-6 text-center text-yellow-400 tracking-wide">
        Nearby Schools
      </h1>

      {/* Schools List */}
      {schools.length > 0 ? (
        <ul className=" p-6 rounded-md w-[90%] max-w-2xl border border-gray-700 shadow-xl">
          {schools.map((school, index) => (
            <li 
              key={index} 
              className="mb-4 p-4 border border-gray-600 rounded-lg transition-transform hover:scale-105 bg-gray-800 shadow-md"
            >
              <h2 className="text-lg font-bold text-yellow-300">{school.name}</h2>
              <p className="text-gray-300 text-sm">{school.address}</p>
              <p className="mt-1 text-sm font-semibold text-gray-400">Distance: {school.distance} km</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-lg text-gray-300">No schools found near this location.</p>
      )}
    </div>
  );
};

export default SchoolResults;

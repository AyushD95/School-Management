import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from 'react-hot-toast';
import Home from "./pages/Home";
import AddSchool from "./pages/AddSchool";
import ListSchools from "./pages/ListSchools";
import SchoolResults from "./pages/SchoolResults";

function App() {
  return (
    <div className="App">

    <Toaster
    position="top-right"
    reverseOrder={false}
    />

    <BrowserRouter>
      <Routes>
          
          <Route path='/' element={<Home />} />
          <Route path="/add-school" element={<AddSchool />} />
          <Route path="/list-schools" element={<ListSchools />} />
          <Route path="/school-results" element={<SchoolResults />} />

          
      </Routes>
    </BrowserRouter>
  </div>

  );
}

export default App;

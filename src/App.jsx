import "./App.css";
import AllPost from "./Components/AllPost";
import Create from "./Components/Create";
import CreatePost from "./Components/CreatePost";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Read from "./Components/Read";
import Edit from "./Components/Edit";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={""}>
            <Route index element={<Create />} />
            <Route path="createpost" element={<CreatePost />} />
            <Route path="allpost" element={<AllPost />} />
            <Route path="read" element={<Read />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

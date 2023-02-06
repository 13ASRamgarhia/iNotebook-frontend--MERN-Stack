import { Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Landing from "./Components/Landing";
import Login from "./Components/Login";
import Signup from "./Components/Singup";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Notes from "./Components/Notes";
import NoteState from "./Context/NoteState";

function App() {
  return (
    <div className="App bg-bgColor min-w-screen min-h-screen">
      <NoteState>
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/SignUp" element={<Signup />} />
        <Route exact path="/Home" element={<Home />} />
        <Route exact path="/Notes" element={<Notes />} />
      </Routes>

      <Footer />
      </NoteState>
    </div>
  );
}

export default App;

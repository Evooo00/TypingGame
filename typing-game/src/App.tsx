import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Game from "./game";
import Login from "./login";
import Register from "./register";

function App() {
  return (
    <Router>
      <div className=" container mx-auto p-0 flex  items-center flex-col h-screen w-screen">
        <header className="bg-darkGray text-white h-16 w-screen mb-16 text-center flex p-2 items-center justify-between">
          <p className="">
            <a href="/">Typing Game!</a>
          </p>
          <div>
            <a href="./login">
              <button className="border-2 rounded-2xl w-16 mx-2">Login</button>
            </a>
            <a href="./register">
              <button className="border-2 rounded-2xl w-16 mx-2">
                Sign up
              </button>
            </a>
            <button>asdasd</button>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Game />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

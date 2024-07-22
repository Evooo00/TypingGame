import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Game from "./game";
import Login from "./login";
import Register from "./register";
import Ranking from "./ranking";
import React, { useState, useEffect } from "react";

function App() {
  const [token, setToken] = useState<any>(false);

  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    const tokenString: any = sessionStorage.getItem("token");

    if (tokenString !== null) {
      try {
        const data: any = JSON.parse(tokenString);
        setToken(data);
        console.log(data, "asd");
        console.log(token.user.email);
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setToken(false);
  };
  return (
    <Router>
      <div className=" container mx-auto p-0 flex  items-center flex-col h-screen w-screen">
        <header className="bg-darkGray text-white h-16 w-screen mb-16 text-center flex p-2 items-center justify-between">
          <p className="">
            <a href="/">Typing Game!</a>
            {token ? <p>Player: {token.user.user_metadata.name}</p> : ""}
          </p>
          <div>
            {!token ? (
              <>
                <a href="./login">
                  <button className="border-2 rounded-2xl w-20 mx-2 p-1 hover:border-strongYellow hover:bg-strongYellow hover:text-darkGray font-semibold">
                    Login
                  </button>
                </a>
                <a href="./register">
                  <button className="border-2 rounded-2xl w-20 mx-2 p-1 hover:border-strongYellow hover:bg-strongYellow hover:text-darkGray font-semibold">
                    Sign up
                  </button>
                </a>{" "}
              </>
            ) : (
              <>
                <a href="/ranking">
                  <button className="border-2 rounded-2xl w-20 mx-2 p-1 hover:border-strongYellow hover:bg-strongYellow hover:text-darkGray font-semibold">
                    Ranking
                  </button>
                </a>
                <a href="/home">
                  <button
                    className="border-2 rounded-2xl w-20 mx-2 p-1 hover:border-strongYellow hover:bg-strongYellow hover:text-darkGray font-semibold"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </a>
              </>
            )}
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Game token={token} />}></Route>
          <Route path="/login" element={<Login setToken={setToken} />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/ranking" element={<Ranking />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from "react";

import "./App.css";

function App() {
  return (
    <div className="container mx-auto p-2 items-center">
      <div className="bg-grey-500 box-border h-60 w-100 p-4 border-2 rounded-3xl shadow-md mx-auto flex justify-center items-center">
        <p>Tekst który użytkownik widzi i ma za zadanie go wpisać</p>
      </div>
      <div className="bg-grey-500 box-border h-60 w-100 p-4 border-4 shadow-md mx-auto flex justify-center items-center">
        <p>Tekst który użytkownik widzi i ma za zadanie go wpisać</p>
      </div>
    </div>
  );
}

export default App;

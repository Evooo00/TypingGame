import React, { useState } from "react";

import "./App.css";

function App() {
  const wordsOfCode: string[] = ["<div>", "<br>"];

  const [input, setInput] = useState("");
  const [game, setGame] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //console.log(e.target.value);
    setInput(e.target.value);
  };

  const handleGameStart = (e: any) => {
    console.log(game);
    setGame(true);

    if (currentIndex >= wordsOfCode.length) {
      setCurrentIndex(0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (input === wordsOfCode[currentIndex]) {
        setInput("");
        setCurrentIndex(currentIndex + 1);
      }
      if (currentIndex >= wordsOfCode.length) {
        setGame(false);
      }
    }
  };
  return (
    <div className="container mx-auto p-2 flex  items-center flex-col border-4 h-screen w-screen">
      <div className="border-4 h-28 w-1/2 flex justify-center items-center rounded-md">
        {game && currentIndex < wordsOfCode.length
          ? wordsOfCode[currentIndex]
          : ""}
      </div>
      <input
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        value={input}
        type="text"
        placeholder="Write here!"
        className="border-4"
      />
      <button onClick={handleGameStart} className="border-2 w-16">
        Start
      </button>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import supabase from "./config/supabaseClient";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [game, setGame] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wordsFromBase, setWordsFromBase] = useState<string[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [time, setTime] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null); // Dodajemy state do przechowywania interwału

  interface WordWithCode {
    id: any;
    created_at: any;
    code: any;
  }

  useEffect(() => {
    const fetchWordsWithCode = async () => {
      const { data, error } = await supabase.from("wordsOfCode").select();

      if (error) {
        setFetchError("Could not fetch data");
        console.log(error);
      }

      if (data) {
        const codes = data.map((value: any) => value.code);
        setWordsFromBase(codes);
      }
    };

    fetchWordsWithCode();
  }, []);
  console.log(10, 2);
  const startGame = () => {
    setGame(true);
    setCurrentIndex(0);
    setTime(0); // Zeruj czas po rozpoczęciu gry
    const id = setInterval(() => {
      setTime((prevTime) => prevTime + 1); // Zwiększaj czas co sekundę
    }, 1000);
    setIntervalId(id); // Zapisz identyfikator interwału
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (input === wordsFromBase[currentIndex]) {
        setInput("");
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
      if (currentIndex >= wordsFromBase.length - 1) {
        setGame(false);
      }
    }
  };

  const handleGameStart = () => {
    startGame();
  };

  useEffect(() => {
    // Sprawdź, czy gra się zakończyła i wyczyść interwał
    if (!game && intervalId) {
      clearInterval(intervalId);
    }
  }, [game, intervalId]);

  return (
    <div className="container mx-auto p-2 flex  items-center flex-col border-4 h-screen w-screen">
      <div className="border-4 h-28 w-1/2 flex justify-center items-center rounded-md">
        {game && currentIndex < wordsFromBase.length
          ? wordsFromBase[currentIndex]
          : ""}
      </div>
      <input
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        value={input}
        type="text"
        placeholder="Write here!"
        className="border-4"
        disabled={!game} // Wyłącz input, gdy gra nie jest uruchomiona
      />
      <button
        onClick={handleGameStart}
        disabled={game}
        className="border-2 w-16"
      >
        Start
      </button>
      <p>Time: {time} s</p>
    </div>
  );
}

export default App;

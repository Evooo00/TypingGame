import React, { useState, useEffect } from "react";
import supabase from "./config/supabaseClient";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [game, setGame] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wordsFromBase, setWordsFromBase] = useState<string[]>([]);
  interface WordWithCode {
    id: any;
    created_at: any;
    code: any;
  }

  const [fetchError, setFetchError] = useState<string | null>(null);
  const [wordsWithCode, setWordsWithCode] = useState<WordWithCode[] | null>(
    null,
  );

  useEffect(() => {
    const fetchWordsWithCode = async () => {
      const { data, error } = await supabase.from("wordsOfCode").select();

      if (error) {
        setFetchError("Could not fetch data");
        setWordsWithCode(null);
        console.log(error);
      }

      if (data) {
        setFetchError(null);
        setWordsWithCode(data);
        // console.log(wordsWithCode);
      }
    };
    const x: string[] = [];
    wordsWithCode?.map((value) => {
      x.push(value.code);
      setWordsFromBase(x);
      console.log(wordsFromBase);
    });

    fetchWordsWithCode();
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //console.log(e.target.value);
    setInput(e.target.value);
  };

  const handleGameStart = (e: any) => {
    console.log(game);
    console.log(supabase);
    setGame(true);

    if (currentIndex >= wordsFromBase.length) {
      setCurrentIndex(0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (input === wordsFromBase[currentIndex]) {
        setInput("");
        setCurrentIndex(currentIndex + 1);
      }
      if (currentIndex >= wordsFromBase.length) {
        setGame(false);
      }
    }
  };
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
      />
      <button onClick={handleGameStart} className="border-2 w-16">
        Start
      </button>
    </div>
  );
}

export default App;

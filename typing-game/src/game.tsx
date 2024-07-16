import React, { useState, useEffect } from "react";
import supabase from "./config/supabaseClient";
import useTimer from "./timer";
const Game = () => {
  const [input, setInput] = useState("");
  const [game, setGame] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wordsFromBase, setWordsFromBase] = useState<string[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const { elapsedTime, setElapsedTime, isRunning, handleStart, handleStop } =
    useTimer();

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

  const startGame = () => {
    setGame(true);
    setCurrentIndex(0);
    handleStart();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const addRowToTable = async (record: { writeTime: any }) => {
    const { data, error } = await supabase.from("Ranking").insert([record]);
    if (error) {
      console.log("Error inserting row:", error);
    } else {
      console.log("Row inserted:", data);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (input === wordsFromBase[currentIndex]) {
        setInput("");
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
      if (currentIndex >= wordsFromBase.length - 1) {
        setGame(false);
        handleStop();
        const gameTime: any = elapsedTime / 1000;
        console.log(gameTime);
        await addRowToTable({ writeTime: gameTime });
        setElapsedTime(0);
      }
    }
  };

  return (
    <div className=" container mx-auto p-0 flex  items-center flex-col h-screen w-screen">
      <div className="shadow-xl bg-white h-28 w-1/2 flex justify-center items-center rounded-md ">
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
        className="mt-16 bg-white color-black rounded-2xl h-16 w-64 text-center"
        disabled={!game}
      />
      <button
        onClick={startGame}
        disabled={game}
        className="border-2 w-24 h-12 my-2 rounded-2xl bg-green-400 hover:bg-green-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 "
      >
        Start
      </button>
      <p>Time: {elapsedTime / 1000} s</p>
    </div>
  );
};

export default Game;

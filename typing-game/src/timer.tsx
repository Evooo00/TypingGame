import { useState, useRef } from "react";

const useTimer = (initialState: number = 0) => {
  const [elapsedTime, setElapsedTime] = useState<number>(initialState);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const countRef: any = useRef<NodeJS.Timeout | null>(null);

  const handleStart = () => {
    const startTime = Date.now() - elapsedTime;
    countRef.current = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 10);
    setIsRunning(true);
  };

  return { elapsedTime, isRunning, handleStart };
};

export default useTimer;

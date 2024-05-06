import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import AddUser from "./AddUser";

const CounterApp = (props) => {
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [color, setColor] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerRunning) {
        setCount((prev) => prev + 1);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [timerRunning]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerRunning) {
        setTimer((prev) => prev + 1);
      }
    },1000);
    return () => clearInterval(interval)
  }, [timerRunning]);

  const setCookie = (data) => {
    Cookies.set("counterValue", data);
  };

  const deleteCookie = () => {
    setTimerRunning(false);
    Cookies.remove("counterValue");
  };

  const startCount = () => {
    setCookie(count);
    setTimerRunning(true);
  };

  const pauseCount = () => {
    setTimerRunning(false);
    setPause(true);
  };

  const restartCount = () => {
    setCount(0)
  }

  useEffect(() => {
    if (pause) {
      clearInterval();
    }
  }, [pause]);

  useEffect(() => {
    if (count % 2 === 0) {
      setColor(true);
    } else {
      setColor(false);
    }
  }, [count]);

  return (
    <>
    <AddUser count={count} />
    <br />
    <p>Timer: {timer}</p>
      <p style={color ? { color: "red" } : { color: "green" }}>{count}</p>
      
      <button onClick={startCount}>Start</button>
      <button onClick={pauseCount}>Pause</button>
      <button onClick={deleteCookie}>Stop</button>
      <button onClick={restartCount}>Restart</button>
      
    </>
  );
};

export default CounterApp;

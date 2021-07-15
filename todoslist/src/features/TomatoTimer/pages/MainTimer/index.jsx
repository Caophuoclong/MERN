import React, { useState } from "react";
import Helmet from "react-helmet";
import BarChoose from "../../components/BarChoose";
import CountDownTimer from "../../components/CountDownTimer";
import "./mainTimer.css";

function Main() {
  Notification.requestPermission();

  const [time, setTime] = useState(25);
  const [status, setStatus] = useState(true);
  const [counter, setCounter] = useState(0);
  const [inProgress, setInProgress] = useState("pomodoro");
  const handlePomoroClick = () => {
    new Notification("New Pomodoro")
    setTime(25);
    setStatus(true);
    setInProgress("pomodoro");
  };
  const handleShortBreakClick = () => {
    new Notification("Take a short rest");
    setInProgress("short-break")
    setTime(5);
    setStatus(false);
  };
  const handleLongBreakClick = () => {
    new Notification("Take a longer rest");
    setInProgress("long-break");
    setTime(10);
    setStatus(false);
  };
  const handleBreak = () => {
    if (counter !== 4) handleShortBreakClick();
    if (counter === 4) {
      handleLongBreakClick();
      setCounter(0);
    }
  };
  const handleRestart = () => {
    handlePomoroClick();
    setCounter(counter + 1);
  };
  return (
    <div className="mainTimer">
      <Helmet>
        <link rel="shortcut icon"  href="https://img.icons8.com/plasticine/100/000000/tomato.png" />
        <title>TomatoTimer</title>
      </Helmet>
      <BarChoose
        handleLongBreakClick={handleLongBreakClick}
        handleShortBreakClick={handleShortBreakClick}
        handlePomoroClick={handlePomoroClick}
        inProgress={inProgress}

      />

      <CountDownTimer
        break_Pomodoro={handleBreak}
        restart={handleRestart}
        status={status}
        Time={time}
      />
    </div>
  );
}

export default Main;

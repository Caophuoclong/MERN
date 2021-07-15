import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import useInterval from "@use-it/interval";
import "./countdown.css";

CountDownTimer.propTypes = {
  Time: PropTypes.number,
  checkTimeOut: PropTypes.func,
};
CountDownTimer.defaultProps = {
  Time: "",
  checkTimeOut: null,
};

function CountDownTimer(props) {
  const { Time, status, break_Pomodoro, restart } = props;
  const [minutes, setMinutes] = useState(Time);
  const [start, setStart] = useState(false);
  const [seconds, setSeconds] = useState(59);
  const [timeString, setTimeString] = useState(`${minutes}:00`);
  const setTitle = () => {
    document.title = `(${timeString})TomatoTimer`;
  };
  useEffect(() => {
    setTitle();
  }, [timeString, minutes, seconds]);
  useEffect(() => {
    setMinutes(Time);
    setSeconds(59);
    setTimeString(`${Time < 10 ? `0${Time}` : Time}:00`);
    setStart(true);
    document.title = "TomatoTimer";
  }, [Time]);
  useEffect(() => {
    setStart(false);
  }, []);

  useInterval(
    () => {
      setTitle();
      if (seconds === 0) {
        if (minutes > 0) setMinutes(minutes - 1);
        setSeconds(59);
      }
      if (seconds > 0) setSeconds(seconds - 1);
      setTimeString(
        `${minutes - 1 < 10 ? `0${minutes - 1}` : minutes - 1}:${
          seconds < 10 ? `0${seconds}` : seconds
        }`
      );
      if (minutes <= 1 && seconds === 0) {
        setStart(false);
        if (status) break_Pomodoro();
        if (!status) restart();
      }
      if (minutes < 0) {
        setStart(false);
      }
    },
    start ? 1000 : null
  );
  const handleStartCountDown = () => {
    if (minutes > 0) setStart(true);
  };

  const handleStopCountDown = () => {
    setStart(false);
  };
  const handleResetCountDown = () => {
    setMinutes(Time);
    setSeconds(59);
    setStart(true);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "15px" }}>
      <p className="timeString">{timeString}</p>
      <button className="btn-fn start" onClick={handleStartCountDown}>
        Start
      </button>
      <button className="btn-fn stop" onClick={handleStopCountDown}>
        Stop
      </button>
      <button className="btn-fn reset" onClick={handleResetCountDown}>
        Reset
      </button>
    </div>
  );
}

export default CountDownTimer;

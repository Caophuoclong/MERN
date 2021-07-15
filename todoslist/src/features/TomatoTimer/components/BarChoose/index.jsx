import React, { useEffect } from "react";
import { useState } from "react";
import "./barchoose.css";
import "./check.js";
BarChoose.propTypes = {};

function BarChoose(props) {
  const { handlePomoroClick, handleShortBreakClick, handleLongBreakClick, inProgress } =
    props;
    const [before, setBefore] = useState("pomodoro");
    const [now, setNow] = useState(inProgress);
    useEffect(() => {
      document.querySelectorAll("p").forEach(item=>item.classList.remove("selected"));
      setNow(inProgress);
    },[inProgress]);
    useEffect(() => {
      document.querySelector(`#${now}`).classList.add("selected");
    },[now])
  useEffect(()=>{
    console.log(document.querySelectorAll(".bar-choose").forEach(item=>{
      item.addEventListener("click",(value)=>{
        document.querySelector(`#${before}`).classList.remove("selected");
        document.querySelector(`#${value.target.id}`).classList.add("selected");
        setBefore(value.target.id);
        if(value.target.id === "short-break"){
          document.querySelector(`#${value.target.id}`).style.borderLeft = "1px solid black";
          document.querySelector(`#pomodoro`).style.borderRight = "none";
          document.querySelector(`#${value.target.id}`).style.borderRight = "1px solid black";
          document.querySelector(`#long-break`).style.borderLeft = "none";
        }
        else{
          document.querySelector(`#pomodoro`).style.borderLeft = "1px solid black";
          document.querySelector(`#pomodoro`).style.borderRight = "1px solid black";
          document.querySelector(`#long-break`).style.borderLeft = "1px solid black";
          document.querySelector(`#long-break`).style.borderRight = "1px solid black";
          document.querySelector(`#short-break`).style.borderRight = "none";
          document.querySelector(`#short-break`).style.borderLeft = "none";

        }
      })
    }));
  },[before])
  return (
    <div className="bar-tomato-timer">
      <p id="pomodoro"onClick={handlePomoroClick} className="bar-choose pomodoro selected">
        Pomodoro
      </p>
      <p id="short-break" onClick={handleShortBreakClick} className="bar-choose short-break">
        Short Break
      </p>
      <p id="long-break"onClick={handleLongBreakClick} className="bar-choose long-break">
        Long Break
      </p>
    </div>
  );
}

export default BarChoose;

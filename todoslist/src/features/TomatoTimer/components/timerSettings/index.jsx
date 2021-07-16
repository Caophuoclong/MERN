import React, { useState } from "react";
import PropTypes from "prop-types";
import "./timerSettings.css";
import { useForm } from "react-hook-form";
import { Input } from "reactstrap";

TimerSettings.propTypes = {
  changeTime: PropTypes.func,
  changeBackground: PropTypes.func,
  changeSound: PropTypes.func,
};

function TimerSettings(props) {
  const {changeTime} = props;
  const [settingClicked, setSettingClicked] = useState(false);
  const defaultValue = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 10,
  }
  const { register, handleSubmit, reset } = useForm({
    defaultValue,
  });
  const handleSettingClicked = () => {
    setSettingClicked(true);
  };
  const handleSettingClickedClose = () => {
    setSettingClicked(false);
  };
  const handleOnSubmit = (value) => {
    changeTime(value)
  };
  const handleReset = () => {
    reset(defaultValue);
  };
  
  return (
    <div className="timer-settings">
      <img
        onClick={handleSettingClicked}
        className="timer-settings-icon"
        alt="settings"
        src="https://img.icons8.com/ios-filled/30/000000/settings.png"
      />
      {settingClicked ? (
        <div className="settings-menu">
          <div className="settings-inner">
            <div onClick={handleSettingClickedClose} className="settings-close">
              X
            </div>
            <div className="options-settings">
              <h1 style={{ textAlign: "left" }}>Options</h1>
              <h1 style={{ textAlign: "center"}}>This feature is updating</h1>
              <form onSubmit={handleSubmit(handleOnSubmit)}>
                <div className="form-group-input">
                  <label htmlFor="pomodoro" className=" input-time label-time">
                    Pomodoro
                  </label>
                  <label
                    htmlFor="shortBreak"
                    className=" input-time label-time"
                  >
                    Short Break
                  </label>
                  <label htmlFor="longBreak" className=" input-time label-time">
                    Long Break
                  </label>
                </div>
                <div className="form-group-input">
                  <Input
                    autoFocus
                    {...register("pomodoro")} 
                    id="pomodoro"
                    className="input-time"
                    placeholder="Pomodoro Time"
                    defaultValue="25"

                  />
                  <Input
                    autoFocus
                    {...register("shortBreak")}
                    id="shortBreak"
                    className="input-time"
                    placeholder="Short Break"
                    defaultValue="5"
                  />
                  <Input
                    autoFocus
                    {...register("longBreak")}
                    id="longBreak"
                    className="input-time"
                    placeholder="Long Break"
                    defaultValue="10"
                  />
                </div>
                <div className="form-group-button">
                  <button type="submit" className="btn-save">
                    Save
                  </button>
                  <button onClick={handleReset} className="btn-reset">
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default TimerSettings;

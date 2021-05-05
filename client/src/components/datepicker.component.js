import React, { useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

export default function ReactDayPicker() {
  const [date, setDate] = useState(new Date());

  function onChange(date) {
    setDate(date);
  }

  return <DayPickerInput onDayChange={onChange} />;
}
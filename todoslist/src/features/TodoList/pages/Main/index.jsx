import dateformat from "dateformat";
import $ from "jquery";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import {
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import DatePicker from "reactstrap-date-picker";
import { removeTodo } from "../../../todoSlice";
import "./main.css";
import Popup from "../../components/Popup";
import { Helmet } from "react-helmet";
// import PropTypes from 'prop-types';

TodoList.propTypes = {};

function TodoList(props) {
  const date = new Date().toISOString();
  const [startDate, setStartDate] = useState(date);
  const [trigger, setTrigger] = useState(false);
  const handleChangeDate = (date) => {
    setStartDate(date);
  };
  let todoList = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const handleClickRemoveTodo = (todo) => {
    const x = todoList.filter(({id})=> id !== todo.id);
    window.localStorage.setItem("todoList", JSON.stringify([...x]));
    const action = removeTodo(todo.id);
    dispatch(action);
  };

  useEffect(() => {
    todoList = todoList.slice().sort((b) => {
      const b_day = Date.parse(b.dayend);
      const today = Date.parse(startDate);
      return b_day - today;
    });
    console.log(todoList);
  }, [startDate]); 

  const options = [
    { value: "by-date", label: "Date" },
    { value: "by-level", label: "Muc do" },
  ];
  const handleOnClickShow = (e) => {
    console.log(e);
    if ($(`.${e.target.id}`).css("display") === "none") {
      $(`.${e.target.id}`).css("display", "flex");
    } else {
      $(`.${e.target.id}`).css("display", "none");
    }
  };

  return (
    <div>
      <Helmet>
        <link rel="shortcut icon" href="https://img.icons8.com/ios/50/000000/reminders.png" />
        <title>Todo App</title>
      </Helmet>
      <Container style={{ margin: "auto" }}>
        <Select
          className="select-level"
          defaultValue="--- Sap xep theo ---"
          options={options}
        />
        <div className="long">
          <DatePicker
            value={startDate}
            onChange={(date) => handleChangeDate(date)}
            className="justify-content-end"
          />
        </div>
        <br />
        <div className="items">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Tim kiem</InputGroupText>
            </InputGroupAddon>
            <Input value="xin chao" />
          </InputGroup>

          <ul className="main-todo-list">
            <h3
              style={{
                textAlign: "center",
                backgroundColor: "#fd823e",
                borderRadius: "25px",
              }}
            >
              Những công việc phải hoàn thành
            </h3>
            <div className="status-bar">
              <div className="deadline-status-bar">Thời gian</div>
              <div className="title-status-bar">Tiêu đề</div>
            </div>

            {todoList.map((value) =>
              value.dayend >= startDate ? (
                <li className="status-bar main-todo-items" key={value.id}>
                  <div
                    className={`date ${
                      value.todoSelect === undefined
                        ? "not-selected"
                        : value.todoSelect.value
                    }`}
                  >
                    {value.timeTodoEnd?`${value.timeTodoEnd}-`:null}{dateformat(Date.parse(value.dayend), "dd/mm/yyyy")}
                  </div>
                  <div
                    id={value.id.substring(0, 4)}
                    onClick={handleOnClickShow}
                    className={`title-todo ${
                      value.todoSelect === undefined
                        ? "not-selected"
                        : value.todoSelect.value
                    }`}
                    to={`/todo/edit/${value.id}`}
                  >
                    {value.todoTitle}
                  </div>
                  {/* <Link className={`title-todo ${value.todoSelect === undefined? "not-selected":value.todoSelect.value}`}to={`/todo/edit/${value.id}`} >
             
             
             </Link> */}

                  <ul
                    className={`${value.id.substring(
                      0,
                      4
                    )} title-todo long-ngu edit-menu-items`}
                  >
                    <li className="edit-item" onClick={() => setTrigger(true)}>
                      V
                    </li>
                    <Popup
                      trigger={trigger}
                      setTrigger={setTrigger}
                      content={value.todoContent}
                    ></Popup>

                    <li className="edit-item">
                      <Link to={`/todo/edit/${value.id}`}>E</Link>
                    </li>
                    <li
                      onClick={() => handleClickRemoveTodo(value)}
                      className="edit-item"
                    >
                      R
                    </li>
                  </ul>
                </li>
              ) : null
            )}
          </ul>
        </div>
        <Link to="/todo/add">Add form</Link>
      </Container>
    </div>
  );
}

export default TodoList;

import React, { useEffect, useState } from "react";
import dateformat from "dateformat";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import "./main.css";
import DatePicker from "reactstrap-date-picker";

// import PropTypes from 'prop-types';

TodoList.propTypes = {};

function TodoList(props) {
  const date = new Date().toISOString();
  const [startDate, setStartDate] = useState(date);
  const handleChangeDate = (date) => {
    setStartDate(date);
  };
  let todoList = useSelector((state) => state.todo);

  useEffect(() => {
    todoList = todoList.slice().sort((b) => {
      const b_day = Date.parse(b.dayend);
      const today = Date.parse(startDate);
      return b_day - today;
    });
    console.log(todoList);
  }, [startDate]);

  return (
    <div>
      <Container style={{margin: "auto"}}>
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
              <InputGroupText>Search</InputGroupText>
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
              <div className="deadline-status-bar">Ngày</div>
              <div className="title-status-bar">Tiêu đề</div>
            </div>
            {todoList.map((value) => (
             
             value.dayend >= startDate ?  <li className="status-bar main-todo-items" key={value.id}>
             <div className="date">
               {dateformat(Date.parse(value.dayend), "dd/mm/yyyy")}
             </div>
             <Link className="title-todo" to={`/todo/edit/${value.id}`} >
             <div >{value.todoTitle}</div>
             </Link>
           </li>: null
               
                
            ))}
          </ul>
        </div>
        <Link to="/todo/add">Add form</Link>
      </Container>
    </div>
  );
}

export default TodoList;

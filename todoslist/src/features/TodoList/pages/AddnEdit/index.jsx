import React, { useState } from "react";
import TodoForm from "../../components/todoForm";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, editTodoItem } from "../../../todoSlice";
import casual, { date } from "casual-browserify";
import { Container } from "reactstrap";
import { useHistory } from "react-router-dom";
import "./AddnEdit.css";
AddnEdit.propTypes = {};

function AddnEdit(props) {
  const history = useHistory();
  const [todoList, setTodoList] = useState([]);
  const [editTodo, setEditTodo] = useState({});
  const id = casual.uuid;

  const dispatch = useDispatch();
  const handleOnReturnHome = () => {
    if (!todoList) return history.push("/todo");
    todoList.map((value) => {
      const action = addTodo(value);
      dispatch(action);
    });

    history.push("/todo");
  };
  const handleOnSubmit = (data, e) => {
    const title = data.todoTitle;
    data.id = id;
    if (!title) {
      data.todoTitle = data.todoContent.substring(0, 10) + "...";
    }
    let listTodo = [...todoList];
    listTodo.push(data);
    listTodo = listTodo.slice().sort((a, b) => {
      const a_day = Date.parse(a.dayend);
      const b_day = Date.parse(b.dayend);
      return a_day - b_day;
    });
    setTodoList(listTodo);
    e.target.reset();
  };
  const handleSubmitEdit = (data)=>{
    if(data.todoTitle === undefined){
      data.todoTitle = data.todoContent.substring(0,15);
    }
    const action = editTodoItem(data);
    dispatch(action);
  }
  const todoListReverse = todoList.slice().sort((a, b) => {
    const a_day = Date.parse(a.dayend);
    const b_day = Date.parse(b.dayend);
    return a_day - b_day;
  });
  console.log(todoListReverse);
  const idTodo = props.match.params.id;
  const editTodoList = useSelector((state) => state.todo);
  if (idTodo) {
    editTodoList.map((value) => {
      if (value.id === idTodo)
        if (Object.keys(editTodo).length === 0) setEditTodo(value);
    });
  }
  if (editTodo) {
    console.log(editTodo);
  }

  return (
    <div>
      <TodoForm
        handleOnSubmit={handleOnSubmit}
        handleReturnHome={handleOnReturnHome}
        handleSubmitEdit={handleSubmitEdit}
        todo={editTodo}
      />
      <Container>
        <h2 className="title">Những công việc bạn đã thêm</h2>
        <ul className="todo-list">
          {todoListReverse.map((value) => (
            <li className="todo-items" id={value.id} key={value.id}>
              {value.todoTitle}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

export default AddnEdit;

import { createSlice } from "@reduxjs/toolkit";

const todo = createSlice({
  name: "todo",
  initialState: window.localStorage.getItem("todoList")
    ? JSON.parse(window.localStorage.getItem("todoList"))
    : [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
      window.localStorage.setItem("todoList", JSON.stringify([...state]));
    },
    removeTodo: (state, { payload }) => {
      return state.filter(({ id }) => id !== payload);
    },
    editTodoItem: (state, action) => {
      const id = action.payload.id;
      state.map((value) => {
        if (id === value.id) {
          state[state.indexOf(value)] = action.payload;
          window.localStorage.setItem("todoList", JSON.stringify([...state]));
        }
      });
    },
  },
});

const { reducer, actions } = todo;
export const { addTodo, removeTodo, editTodoItem } = actions;
export default reducer;

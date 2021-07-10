import { createSlice } from "@reduxjs/toolkit";

const todo = createSlice({
  name: "todo",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.splice(state.indexOf(action.payload), 1);
    },
    editTodoItem: (state, action) => {
      const id = action.payload.id;
      state.map((value) => {
        if (id === value.id) {
          state[state.indexOf(value)] = action.payload;
        }
      });
    },
  },
});

const { reducer, actions } = todo;
export const { addTodo, removeTodo, editTodoItem } = actions;
export default reducer;

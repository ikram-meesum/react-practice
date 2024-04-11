import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    // {
    //   id: 1234,
    //   text: "hi developer",
    // },
  ],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
        createdAt: Date.now(),
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      console.log("remove id");
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

// export default todoSlice;
export const { addTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;

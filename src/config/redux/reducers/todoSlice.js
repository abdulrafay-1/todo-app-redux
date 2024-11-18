import { createSlice, nanoid } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "Todos",
    initialState: {
        todos: [],
    },
    reducers: {
        addTodo: (state, action) => {
            state.todos.push({
                title: action.payload.title,
                id: nanoid()
            })
        },
        deleteTodo: (state, action) => {
            const filtered = state.todos.filter(item => item.id != action.payload.id);
            state.todos = filtered
        },
        editTodo: (state, action) => {
            const found = state.todos.find(item => item.id == action.payload.id);
            found.title = action.payload.title
        },
    }
})

export const { addTodo, deleteTodo, editTodo } = todoSlice.actions
export default todoSlice.reducer
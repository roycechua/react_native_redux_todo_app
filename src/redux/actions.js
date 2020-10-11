import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, EDIT_TODO  } from './actionTypes';

let todoID = 0;

export const addTodo = (todoText) => ({
    type: ADD_TODO, 
    payload: { 
        id: ++todoID,
        task: todoText 
    }
});

export const toggleTodo = (id) => ({
    type: TOGGLE_TODO, 
    payload: { 
        id
    }
});

export const deleteTodo = (id) => ({
    type: DELETE_TODO, 
    payload: { 
        id
    }
});

export const editTodo = (id, new_task, isDone) => ({
    type: EDIT_TODO, 
    payload: { 
        id,
        task: new_task,
        isDone,
    }
});
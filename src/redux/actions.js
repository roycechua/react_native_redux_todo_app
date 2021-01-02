import { 
    ADD_TODO, 
    TOGGLE_TODO, 
    DELETE_TODO, 
    EDIT_TODO, 
    SET_TODO,
    ATTEMPTING_SYNCTODO,
} from './actionTypes';

let todoID = 0;

export const attemptSyncTodo = () => ({
    type: ATTEMPTING_SYNCTODO,
    payload: {}
})

export const setTodo = (todo_list) => ({
    type: SET_TODO, 
    payload: todo_list
});


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
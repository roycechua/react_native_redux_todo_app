import { ADD_TODO } from "../actionTypes";

let todoID = 1

const initialState = {
  todos_list: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const { task } = action.payload
      // console.log(action.payload)
      // console.log(todoID)
      // console.log(id)
      // console.log(task)
      return {
        ...state,
        // allTodoIds: [...state, nextTodoId],
        todos_list: [...state.todos_list, {id: ++todoID, task: task, isDone: false}]
      };
    }
    default:
      return state;
  }
}

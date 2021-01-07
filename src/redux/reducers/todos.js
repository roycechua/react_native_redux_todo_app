import {ADD_TODO, TOGGLE_TODO, DELETE_TODO, EDIT_TODO, SET_TODO} from '../actionTypes';

const initialState = {
  todos_list: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TODO: {
      return {
        ...state,
        todos_list: action.payload,
      };
    }
    case ADD_TODO: {
      const {id, task} = action.payload;
      return {
        ...state,
        todos_list: [
          {id, task, isDone: false},
          ...state.todos_list,
        ],
      };
    }
    case TOGGLE_TODO: {
      const {id} = action.payload;
      const updatedItem = state.todos_list.find((element) => element.id === id);
      updatedItem.isDone = !updatedItem.isDone;

      return {
        ...state,
        todos_list: [
          ...state.todos_list.filter((element) => element.id != id),
          updatedItem,
        ],
      };
    }
    case DELETE_TODO: {
      const {id} = action.payload;

      return {
        ...state,
        todos_list: [...state.todos_list.filter((element) => element.id != id)],
      };
    }
    case EDIT_TODO: {
      const { id, task, isDone } = action.payload;
      return {
        ...state,
        todos_list: [
          {id, task, isDone},
          ...state.todos_list.filter((element) => element.id != id),
        ],
      };
    }
    default:
      return state;
  }
}

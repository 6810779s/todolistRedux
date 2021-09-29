import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CHANGE_INPUT = 'todos/CHANGE_INPUT';
const INSERT = 'todos/INSERT';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';

export const changeInput = createAction(CHANGE_INPUT, (input) => input);

let id = 3;
export const insert = createAction(INSERT, (text) => ({
  id: id++,
  text,
  done: false,
}));
// export const insert = (text) => ({
//   type: INSERT,
//   todo: {
//     id: id++,
//     text,
//     done: false,
//   },
// });

export const toggle = createAction(TOGGLE, (id) => id);

// export const toggle = (id) => ({
//   type: TOGGLE,
//   id,
// });

export const remove = createAction(REMOVE, (id) => id);
// export const remove = (id) => ({
//   type: REMOVE,
//   id,
// });

const initialState = {
  input: '',
  todos: [
    {
      id: 1,
      text: '할일 1',
      done: true,
    },
    {
      id: 2,
      text: '할일 2',
      done: false,
    },
  ],
};

const todos = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: input }) =>
      produce(state, (draft) => {
        draft.input = input;
      }),
    // ...state,
    // input: action.payload,
    [INSERT]: (state, { payload: todo }) =>
      produce(state, (draft) => {
        draft.todos.push(todo);
      }),
    // ...state,
    // todos: state.todos.concat(action.payload),

    [TOGGLE]: (state, { payload: id }) =>
      produce(state, (draft) => {
        const todo = draft.todos.find((todo) => todo.id === id);
        todo.done = !todo.done;
      }),
    // ...state,
    // todos: state.todos.map((todo) =>
    //   todo.id === action.payload ? { ...todo, done: !todo.done } : todo,
    // ),

    [REMOVE]: (state, { payload: id }) =>
      produce(state, (draft) => {
        const index = draft.todos.findIndex((todo) => todo.id === id);
        draft.todos.splice(index, 1);
      }),
    // ({
    //   ...state,
    //   todos: state.todos.filter((todo) => todo.id !== action.payload),
    // }),
  },
  initialState,
);

// function todos(state = initialState, action) {
//   switch (action.type) {
//     case CHANGE_INPUT:
//       return { ...state, input: action.input };
//     case INSERT:
//       return { ...state, todos: state.todos.concat(action.todo) };
//     case TOGGLE:
//       return {
//         ...state,
//         todos: state.todos.map((todo) =>
//           todo.id === action.id ? { ...todo, done: !todo.done } : todo,
//         ),
//       };
//     case REMOVE:
//       return {
//         ...state,
//         todos: state.todos.filter((todo) => todo.id !== action.id),
//       };
//     default:
//       return state;
//   }
// }

export default todos;

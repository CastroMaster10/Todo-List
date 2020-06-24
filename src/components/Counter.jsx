import React,{useReducer} from 'react';
import {Button} from 'react-bootstrap';
import Todos from './Todos';
import {v4 as uuidv4} from 'uuid'

const toDoInitialState = {
    todos:[]
}


export const ToDosContext = React.createContext();

function ToDoreducer(state,action) {
    switch (action.type) {
      case "get":
        return { ...state, todos: action.payload };
      case "delete":
        const filterToDos = state.todos.filter(
          (todo) => todo.id !== action.payload.id
        );
        return { ...state, todos: filterToDos };
      case "add":
        
        const addingToDos = [...state.todos, action.payload];
        return { ...state, todos: addingToDos };
      case "edit":
        const updatedToDo = { ...action.payload };
        const updatedToDoIndex = state.todos.findIndex(
          (t) => t.id === action.payload.id
        );
        const updatedToDos = [
          ...state.todos.slice(0, updatedToDoIndex),
          updatedToDo,
          ...state.todos.slice(updatedToDoIndex + 1),
        ];
        return { ...state, todos: updatedToDos };

      default:
        return toDoInitialState;
    }
}

const Counter = () => {

    const[state,dispatch] = useReducer(ToDoreducer,toDoInitialState);

    
    return(
       <ToDosContext.Provider value={{state, dispatch}}>
           <Todos/>
       </ToDosContext.Provider>
    );
}

export default Counter;
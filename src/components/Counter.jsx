import React,{useReducer} from 'react';
import {Button} from 'react-bootstrap';
import Todos from './Todos';
import {v4 as uuidv4} from 'uuid'

const toDoInitialState = {
   todos: [ {id:1, text: 'Do the laundry'},
    {id:2 , text: 'Do the homework'},
    {id:3, text: 'Create a Node application from scratch due to Monday'}
]
};

export const ToDosContext = React.createContext();

function ToDoreducer(state,action) {
    switch(action.type){  
            case 'delete':
            const filterToDos = state.todos.filter(todo => todo.id !== action.payload.id)
            return {...state, todos: filterToDos}
            case 'add':
            const newTodo = {id: uuidv4(), text: action.payload};
            const addingToDos = [...state.todos, newTodo]
            return {...state, todos: addingToDos}; 

            
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
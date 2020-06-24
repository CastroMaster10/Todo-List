import React, {useContext, useState, useEffect} from 'react'
import {ToDosContext} from './Counter';
import {Table, Button, Form,Container,Row,Col} from 'react-bootstrap';
import useApi from '../containers/UseApi';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid'

const Todos = () => {

    const styles = {
        FormStyle: {
            marginBottom: '50px',
            marginTop: '25px'
        }
    }
    
    const {state,dispatch} = useContext(ToDosContext);
    const [TodoText,setTodoText] = useState("");
    const [editMode,setEditMode] = useState(false);
    const [editTodo,setEditTodo] = useState(null);
    const buttonEdit = editMode ? 'Edit': 'Add'

    const endpoint = "http://localhost:3000/todos/";
    const getTodos = useApi(endpoint)

    useEffect(() => {
        dispatch({type: 'get', payload: getTodos})
    }, [getTodos])

    const handleSubmit = async event => {
        event.preventDefault();
        
        setTodoText("")  // clear out the input form adter submitting
        if(editMode){
            await axios.patch(endpoint + editTodo.id, {text: TodoText})  // the seconds arguments specifies what element of the object is going to be edited.
            dispatch({type: 'edit', payload: {...editTodo, text:TodoText}})
            setEditMode(false)
            setEditTodo(null)

            
        } else {
            const newTodos = {id:uuidv4(), text: TodoText }
            await axios.post(endpoint, newTodos)
            dispatch({ type: 'add', payload: newTodos})
        }
        setTodoText("");
    }
    
    return(
        <div>
                <Container style= {styles.FormStyle}  >

                        <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs= {6} md={{span: 5,offset:3}}>
                            <Form.Control type="text" placeholder= "To do..." onChange={event => setTodoText(event.target.value)} value={TodoText}/>
                            </Col>
                            <Col xs= {6} md={{span:2}}>
                                <Button type="submit" className= "btn-primary"> {buttonEdit} </Button>
                            </Col>

                        </Row>
                        </Form>
                </Container>
              
                <Table striped bordered hover >
                <thead>
                  <tr>
                    <th>To do</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    
                  </tr>
                </thead>
                <tbody>
                {state.todos.map(todo => {
                    return(
                        <tr key= {todo.id}>
                            <td> 
                                {todo.text}
                            </td>
                            <td>
                            <Button className= "btn-warning " onClick= {() => { 
                                setTodoText(todo.text);
                                setEditMode(true);
                                setEditTodo(todo)
                            }}> Edit </Button>
                            </td>
                            <td >
                                <Button className="btn-danger" onClick= { async() => {
                                    await axios.delete(endpoint + todo.id)
                                    dispatch({type: 'delete', payload: todo })
                                   }
                                   }> Delete </Button>
                            </td>
                        </tr>
                    )
                })}
                   
                </tbody>
              </Table>
               

        </div>

         

    );
}

export default Todos;
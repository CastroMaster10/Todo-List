import React, {useContext, useState} from 'react'
import {ToDosContext} from './Counter';
import {Table, Button, Form,Container,Row,Col} from 'react-bootstrap';

const Todos = () => {

    const styles = {
        FormStyle: {
            marginBottom: '50px',
            marginTop: '25px'
        }
    }
    
    const {state,dispatch} = useContext(ToDosContext);
    const [TodoText,setTodoText] = useState("")

    const handleSubmit = event => {
        event.preventDefault();
        dispatch({type: 'add', payload: TodoText})
        setTodoText("")  // clear out the input form adter submitting
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
                                <Button type="submit" className= "btn-primary"> Add </Button>
                            </Col>

                        </Row>
                        </Form>
                </Container>
              
                <Table >
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
                                Edit
                            </td>
                            <td >
                                <Button onClick= {() => dispatch({type: 'delete', payload: todo })}> Delete </Button>
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
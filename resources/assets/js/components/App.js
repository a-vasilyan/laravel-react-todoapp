import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import axios from 'axios';

class App extends Component {    

    constructor(props)
    {
        super(props);
        this.state = {
            inputText: '',
            todos: [],
            fetching: true
        }
    }
    
    componentDidMount(){
        axios.get('todo/').then((res) => {
            this.setState((prevState,props) => {
                return {
                    todos: res.data,
                    fetching: false
                } 
            });
        });
    }

    updateInput(inputText){
        this.setState({inputText});
    }

    addTodo()
    {
        if(this.state.inputText.length >= 1)
        {
            axios.post('todo/', {
                description: this.state.inputText,
                _token: window.csrf_token
            }).then((res) => {
                this.setState((prevState, props) => {
                    return {
                        todos: [...prevState.todos, {description: this.state.inputText, id: res.data}],
                        inputText: ''
                    };
                });
                console.log(this.state.todos);
            });
        }
    }

    deleteTodo(id)
    {
        axios.delete('todo/destroy', {params: {
            id,
            _token: window.csrf_token
        }}).then(() => {
            this.setState((prevState, props) => {
                return {
                    todos: prevState.todos.filter((item) => id != item.id)
                }
            });
        })
    }

    updateTodo(id, text)
    {
        axios.put('todo/update', {
            id,
            description: text,
            _token: window.csrf_token
        }).then((res) => {
            this.setState((prevState, props) => {
                return {
                    todos: prevState.todos.map((item) => item.id == id ? item = {description: text, id: res.data} : item)
                }
            })
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12">
                        {this.state.fetching ? <h1 className="text-center">Loading...</h1> : 
                        [<h1 key="todoHeading" className="text-center">To-Do List</h1>,
                        <TodoInput key="todoInput" 
                                currentInput={this.state.inputText}
                                update={this.updateInput.bind(this)}
                                add={this.addTodo.bind(this)} />,
                        <TodoList key="todoList" 
                                todos={this.state.todos}
                                deleteTodo={this.deleteTodo.bind(this)}
                                updateTodo={this.updateTodo.bind(this)} />] }
                    </div>
                </div>
            </div>
            );
        }
    }

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}


export default App;
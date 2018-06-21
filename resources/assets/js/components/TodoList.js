import React from 'react';
import Todo from './Todo';

function TodoList(props){
    const tasks = [];
    
    if(props.todos && props.todos.length > 0)
    {
        props.todos.forEach(todo => {
            tasks.push(<Todo deleteTodo={props.deleteTodo}
                             updateTodo={props.updateTodo}
                             id={todo.id}
                             key={todo.id}
                             description={todo.description} />);
        });
    }

    return (
        <div className="col-6 mx-auto mt-3">
            <ul className="list-group list-group-flush">
                {tasks}
            </ul>
        </div>
    );
}

export default TodoList;
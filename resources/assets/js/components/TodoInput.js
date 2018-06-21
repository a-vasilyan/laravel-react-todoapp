import React, { Component } from 'react';

class TodoInput extends Component{
    handleChange(e){
        this.props.update(e.target.value);
    }

    handleAdd(e){
        if(e.key === 'Enter')
        {
            this.props.add()
        }
    }

    render(){
        return (
        <div className="col-12">
            <input placeholder="Add Todo.."
                type="text" 
                className="form-control"
                onChange={this.handleChange.bind(this)}
                onKeyPress={this.handleAdd.bind(this)}
                value={this.props.currentInput}
            />
    </div>)
    }
}

export default TodoInput;
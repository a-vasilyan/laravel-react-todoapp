import React, { Component } from 'react';

class Todo extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            isUpdating: false,
            localInput: this.props.description
        }
    }

    updateLocalInput(e){
        e.persist();
        this.setState((prevState, props) => {
            return {
                localInput: e.target.value
            }
        });
    }

    deleteSelf(){
        this.props.deleteTodo(this.props.id);
    }

    updateSelf(e){
        if(this.state.isUpdating)
        {
            this.props.updateTodo(this.props.id, this.state.localInput);
        }
        
        this.setState((prevState,props) => {
            return {
                isUpdating: !prevState.isUpdating
            }
        });
    }

    finishEditing(e)
    {
        if(e.key === 'Enter'){
            this.setState((prevState,props) => {
                return {
                    isUpdating: false
                }
            });
            this.props.updateTodo(this.props.id, this.state.localInput);
        }
    }

    render()
    {
        return(
            <li className="list-group-item" >
                <div className="row d-flex flex-row">
                    <div className="col-sm-6 d-flex">
                        <input type="text"
                                className={this.state.isUpdating ? "form-control d-flex" : "form-control d-none"}
                                value={this.state.localInput}
                                onKeyPress={this.finishEditing.bind(this)}
                                onChange={this.updateLocalInput.bind(this)} /> 
                        {this.state.isUpdating ? null : this.state.localInput}
                    </div>
                    <div className="col-sm-6 d-flex justify-content-end">
                        <button className="btn btn-primary d-flex mr-3"
                                onClick={this.updateSelf.bind(this)}>Update</button>
                        <button className="btn btn-danger d-flex"
                                onClick={this.deleteSelf.bind(this)}>Delete</button>
                    </div>
                </div>
            </li>
        )
    }
}

export default Todo;
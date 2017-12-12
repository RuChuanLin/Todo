import React, { Component } from 'react';
import { FILTER } from './constants';
class Todo {
  constructor(id, content, isDone) {
    this.id = id;
    this.content = content;
    this.isDone = isDone;
  }
}

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      formValue: '',
      isEditing: null,
      editingTodoValue: '',
      filter: FILTER.ALL
    };
  }
  onInputChange(formValue) {
    this.setState({ formValue });
  }
  onFormSubmit(e) {
    e.preventDefault();
    const id = Math.random()
      .toString(36)
      .slice(-12);
    this.setState({
      todos: [new Todo(id, this.state.formValue, false), ...this.state.todos]
    });
  }
  onDeleteClick(id) {
    console.log(id);
    this.setState({ todos: this.state.todos.filter(todo => todo.id !== id) });
  }

  onTodoContentSubmit = (todoId, done) => e => {
    e.preventDefault();
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todoId === todo.id) {
          todo.content = this.state.editingTodoValue;
        }
        return todo;
      })
    });
    this.setState({ isEditing: null });
  };
  onTodoContentChange(value) {
    this.setState({ editingTodoValue: value });
  }

  onTodoToggleDone(todoId) {
    this.setState({
      todos: this.state.todos.map(todo => {
        return todoId !== todo.id
          ? todo
          : new Todo(todo.id, todo.content, !todo.isDone);
      })
    });
  }

  renderList() {
    const { todos } = this.state;
    return todos
      .filter(({ isDone }) => {
        switch (this.state.filter) {
          case FILTER.ALL:
            return true;
          case FILTER.DONE:
            return isDone;
          case FILTER.UNDONE:
            return !isDone;
        }
      })
      .map(({ id, content, isDone }) => {
        return (
          <li key={id}>
            {id === this.state.isEditing ? (
              <form onSubmit={this.onTodoContentSubmit(id, isDone)}>
                <input
                  value={this.state.editingTodoValue}
                  onChange={e => this.onTodoContentChange(e.target.value)}
                />
              </form>
            ) : (
              <div>
                <span onClick={() => this.onTodoToggleDone(id)}>
                  {isDone ? '已完成' : '未完成'} {content}
                </span>
                <button
                  onClick={() =>
                    this.setState({ isEditing: id, editingTodoValue: content })
                  }
                >
                  Edit
                </button>
                <button onClick={() => this.onDeleteClick(id)}>Delete</button>
              </div>
            )}
          </li>
        );
      });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <input
            value={this.state.formValue}
            onChange={e => this.onInputChange(e.target.value)}
          />
        </form>
        <div>
          <button onClick={() => this.setState({ filter: FILTER.ALL })}>
            顯示全部Todos
          </button>
          <button onClick={() => this.setState({ filter: FILTER.DONE })}>
            顯示已完成Todos
          </button>
          <button onClick={() => this.setState({ filter: FILTER.UNDONE })}>
            顯示未完成Todos
          </button>
          <button
            onClick={() =>
              this.setState({
                todos: this.state.todos.filter(({ isDone }) => !isDone)
              })
            }
          >
            清除已完成Todos
          </button>
        </div>
        <ul>{this.renderList()}</ul>
        {/* <SubmitForm />
        <TodoList /> */}
      </div>
    );
  }
}

export default Todos;

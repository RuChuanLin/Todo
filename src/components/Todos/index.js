import React, { Component } from 'react';
import {
  Menu,
  Form,
  Checkbox,
  Button,
  Input,
  Grid,
  List,
  Icon,
  Header
} from 'semantic-ui-react';

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
      todos: [new Todo(id, this.state.formValue, false), ...this.state.todos],
      formValue: ''
    });
  }
  onDeleteClick(id) {
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
          <List.Item key={id}>
            {id === this.state.isEditing ? (
              <Form onSubmit={this.onTodoContentSubmit(id, isDone)}>
                <Input
                  fluid
                  value={this.state.editingTodoValue}
                  onChange={e => this.onTodoContentChange(e.target.value)}
                />
              </Form>
            ) : (
              <Grid>
                <Grid.Column
                  computer={11}
                  onClick={() => this.onTodoToggleDone(id)}
                  style={isDone ? { color: 'green' } : { color: 'DarkOrange' }}
                >
                  <div style={{ display: 'inline-block' }}>
                    {isDone ? (
                      <Icon name="check circle" size="big" />
                    ) : (
                      <Icon name="radio" size="big" />
                    )}{' '}
                  </div>
                  <label
                    style={{
                      'word-break': 'break-all',
                      display: 'inline-block'
                    }}
                  >
                    {content}
                  </label>
                </Grid.Column>
                <Grid.Column computer={5}>
                  <Button
                    color="red"
                    floated="right"
                    onClick={() => this.onDeleteClick(id)}
                  >
                    <Icon name="delete" /> 刪除
                  </Button>
                  <Button
                    color="blue"
                    floated="right"
                    onClick={() =>
                      this.setState({
                        isEditing: id,
                        editingTodoValue: content
                      })
                    }
                  >
                    <Icon name="edit" /> 編輯
                  </Button>
                </Grid.Column>
              </Grid>
            )}
          </List.Item>
        );
      });
  }

  render() {
    return (
      <div>
        <Menu inverted>
          <Menu.Item>
            <Form onSubmit={this.onFormSubmit.bind(this)}>
              <Form.Field>
                <Input
                  placeholder="Please enter todo list"
                  value={this.state.formValue}
                  onChange={e => this.onInputChange(e.target.value)}
                />
              </Form.Field>
            </Form>
          </Menu.Item>
        </Menu>
        <Grid>
          <Grid>
            <Grid.Column mobile={16} tablet={4} computer={4}>
              <Button
                color="black"
                onClick={() => this.setState({ filter: FILTER.ALL })}
              >
                <Icon name="tasks" size="big" />
                顯示全部Todos
              </Button>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={4} computer={4}>
              <Button
                color="green"
                onClick={() => this.setState({ filter: FILTER.DONE })}
              >
                <Icon name="check circle" size="big" />
                顯示已完成Todos
              </Button>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={4} computer={4}>
              <Button
                color="orange"
                onClick={() => this.setState({ filter: FILTER.UNDONE })}
              >
                <Icon name="radio" size="big" />
                顯示未完成Todos
              </Button>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={4} computer={4}>
              <Button
                color="red"
                onClick={() =>
                  this.setState({
                    todos: this.state.todos.filter(({ isDone }) => !isDone)
                  })
                }
              >
                <Icon name="remove user" size="big" />
                清除已完成Todos
              </Button>
            </Grid.Column>
          </Grid>
          <Grid.Column computer={9}>
            <List>{this.renderList()}</List>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Todos;

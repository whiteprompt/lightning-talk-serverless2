import React, {Component} from 'react';
import './App.css';
import gql from "graphql-tag";
import {graphql, compose} from "react-apollo";
import {graphqlMutation} from "aws-appsync-react/lib";
import {buildSubscription} from "aws-appsync/lib";
import uuidV4 from 'uuid/v4'

const ListTodos = gql`
  query listTodos {
    listTodos {
      items {
        id
        title
        completed
      }
    }
  }
`;

const CreateTodo = gql`
  mutation($id: ID!, $title: String!, $completed: Boolean) {
    createTodo(input: {
      id: $id
      title: $title
      completed: $completed
    }) {
      id title completed
    }
  }
`;

const SubscribeToTodos = gql`
  subscription onCreateTodo {
    onCreateTodo {
      id
      title
      completed
    }
  }
`;

class App extends Component {
  state = { todo: '' };

  componentDidMount() {
    this.props.data.subscribeToMore(
      buildSubscription(SubscribeToTodos, ListTodos)
    )
  }

  addTodo = () => {
    if (this.state.todo === '') return;
    const todo = {
      id: uuidV4(),
      title: this.state.todo,
      completed: false
    };
    this.props.createTodo(todo);
    this.setState({ todo: '' });
  };

  render() {
    return (
      <div className="App">
        <input
          onChange={e => this.setState({ todo: e.target.value })}
          value={this.state.todo}
        />
        <button onClick={this.addTodo}>
          Add Todo
        </button>
        {
          this.props.todos.map((todo, index) => (
            <p key={index}>{todo.title}</p>
          ))
        }
      </div>
    );
  }
}


export default compose(
  graphqlMutation(CreateTodo, ListTodos, 'Todo'),
  graphql(ListTodos, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      subscribeToMore: props.data.subscribeToMore,
      todos: props.data.listTodos ? props.data.listTodos.items : [],
      data: props.data
    })
  })
)(App);

import React from 'react';
import { useLocalStorage } from './useLocalStorage';

const TodoContext = React.createContext();

function TodoProvider({ children }) {

    const removeAccents = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const {item: todos, saveItem: saveTodos, loading, error} = useLocalStorage('TODOS_V1', []);

  const [searchValue, setSearchValue] = React.useState('');

  const [openModal, setOpenModal] = React.useState(false);

  const completedTodos = todos.filter(todo => !!todo.completed).length;

  const totalTodos =  todos.length;

  const filteredTodos = todos.filter(todo => {
    const todoText = removeAccents(todo.text.toLowerCase());
    const searchText = removeAccents(searchValue.toLowerCase());
    return todoText.includes(searchText);
  })


  const completeTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text === text
    );
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  }

  const deleteTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text === text
    );
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  }

  const addTodo = (text) => {
    const newTodos = [...todos];
    newTodos.push({
    text,
    completed: false
    });
    saveTodos(newTodos);
  }

    return (
        <TodoContext.Provider value={
            {
                completedTodos, 
                totalTodos,
                searchValue,
                setSearchValue,
                filteredTodos,
                completeTodo,
                deleteTodo,
                loading,
                error,
                openModal,
                setOpenModal,
                addTodo
            }
        }>
            {children}
        </TodoContext.Provider>
    );
}


export { TodoContext, TodoProvider };
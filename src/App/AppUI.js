import { TodoCounter } from '../components/TodoCounter/';
import { TodoSearch } from '../components/TodoSearch/';
import { TodoList } from '../components/TodoList/';
import { TodoItem } from '../components/TodoItem/';
import { CreateTodoButton } from '../components/CreateTodoButton/';
import { TodosLoading } from '../components/TodosLoading/';
import { TodosError } from '../components/TodosError/';
import { EmptyTodos } from '../components/EmptyTodos/';
import { TodoForm } from '../components/TodoForm';
import './styles/AppUI.css';
import { TodoContext } from '../components/TodoContext';
import React from 'react';
import { Modal } from '../components/Modal';


function AppUI() {

  const {
    loading,
    error,
    filteredTodos,
    completeTodo,
    deleteTodo,
    openModal,
    setOpenModal
  } = React.useContext(TodoContext);

    return (
        <>
    
          <TodoCounter />
          <TodoSearch />
    
          
              <TodoList>

              {loading && (
                <>
                  <TodosLoading />
                </>
              )}
              {error && <TodosError/>}
              {(!loading && filteredTodos.length === 0) && <EmptyTodos/>}

              {filteredTodos.map(todo => (
                <TodoItem 
                  key={todo.text} 
                  text={todo.text}
                  completed={todo.completed}
                  onComplete={() => completeTodo(todo.text)}
                  onDelete={() => deleteTodo(todo.text)}
                />
              ))}
            </TodoList>
          
            <CreateTodoButton
              setOpenModal={setOpenModal}
            />

          {openModal && (
            <Modal>
              <TodoForm />
            </Modal>
          )}
        </>
      );
}

export { AppUI };
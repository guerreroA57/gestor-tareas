import { createContext, useContext, useReducer, useEffect } from 'react';
import { taskReducer, initialState } from './taskReducer';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState, (initial) => {
    try {
      const savedTasks = localStorage.getItem('gestor_tareas_data');
      return savedTasks
        ? { ...initial, tasks: JSON.parse(savedTasks) }
        : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('gestor_tareas_data', JSON.stringify(state.tasks));
    } catch {
      // Ignorar errores de almacenamiento en entornos de prueba
    }
  }, [state.tasks]);

  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  const updateTask = (updatedTask) => {
    dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
  };

  const deleteTask = (id) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const setEditingTask = (task) => {
    dispatch({ type: 'SET_EDITING_TASK', payload: task });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        editingTask: state.editingTask,
        addTask,
        updateTask,
        deleteTask,
        setEditingTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks debe usarse dentro de un TaskProvider');
  }
  return context;
}
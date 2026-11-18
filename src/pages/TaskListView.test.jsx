import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskProvider } from '../context/TaskContext';
import TaskListView from './TaskListView';

describe('TaskListView Integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('permite crear una tarea y mostrarla en la lista', () => {
    render(
      <TaskProvider>
        <TaskListView />
      </TaskProvider>
    );

    const titleInput = screen.getByLabelText(/título/i);
    const dateInput = screen.getByLabelText(/fecha límite/i);
    const submitButton = screen.getByRole('button', { name: /agregar tarea/i });

    fireEvent.change(titleInput, { target: { value: 'Preparar exposición' } });
    fireEvent.change(dateInput, { target: { value: '2026-11-28' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('Preparar exposición')).toBeInTheDocument();
  });

  test('filtra tareas por estado correctamente', () => {
    render(
      <TaskProvider>
        <TaskListView />
      </TaskProvider>
    );

    const completedFilterBtn = screen.getByRole('button', { name: 'Completadas' });
    fireEvent.click(completedFilterBtn);

    expect(
      screen.getByText('Configurar entorno con Vite y Tailwind')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Escribir pruebas unitarias con Jest')
    ).not.toBeInTheDocument();
  });

  test('elimina una tarea al hacer clic en el botón eliminar', () => {
    render(
      <TaskProvider>
        <TaskListView />
      </TaskProvider>
    );

    const taskTitle = 'Escribir pruebas unitarias con Jest';
    expect(screen.getByText(taskTitle)).toBeInTheDocument();

    const deleteButton = screen.getByRole('button', {
      name: `Eliminar ${taskTitle}`,
    });
    fireEvent.click(deleteButton);

    expect(screen.queryByText(taskTitle)).not.toBeInTheDocument();
  });
});
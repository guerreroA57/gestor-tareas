import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskProvider } from '../context/TaskContext';
import TaskForm from './TaskForm';

describe('TaskForm Component', () => {
  test('renderiza correctamente los campos del formulario', () => {
    render(
      <TaskProvider>
        <TaskForm />
      </TaskProvider>
    );

    expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/fecha límite/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/estado/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /agregar tarea/i })).toBeInTheDocument();
  });

  test('muestra un mensaje de error si se envía el formulario vacío', async () => {
    const user = userEvent.setup();
    render(
      <TaskProvider>
        <TaskForm />
      </TaskProvider>
    );

    const submitButton = screen.getByRole('button', { name: /agregar tarea/i });
    await user.click(submitButton);

    expect(screen.getByRole('alert')).toHaveTextContent(
      /el título de la tarea es obligatorio/i
    );
  });

  test('limpia los campos después de agregar una tarea válida', async () => {
    const user = userEvent.setup();
    render(
      <TaskProvider>
        <TaskForm />
      </TaskProvider>
    );

    const titleInput = screen.getByLabelText(/título/i);
    const dateInput = screen.getByLabelText(/fecha límite/i);
    const submitButton = screen.getByRole('button', { name: /agregar tarea/i });

    await user.type(titleInput, 'Nueva tarea de prueba');
    await user.type(dateInput, '2026-11-25');
    await user.click(submitButton);

    expect(titleInput).toHaveValue('');
  });
});
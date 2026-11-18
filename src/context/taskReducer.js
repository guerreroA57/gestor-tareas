export const initialState = {
  tasks: [
    {
      id: '1',
      title: 'Configurar entorno con Vite y Tailwind',
      description: 'Instalar dependencias base y configurar estilos globales.',
      status: 'completada',
      dueDate: '2026-11-15',
      priority: 'alta',
    },
    {
      id: '2',
      title: 'Implementar Context y useReducer',
      description: 'Crear el estado global para sincronizar la lista y el calendario.',
      status: 'en-progreso',
      dueDate: '2026-11-17',
      priority: 'alta',
    },
    {
      id: '3',
      title: 'Escribir pruebas unitarias con Jest',
      description: 'Validar renderizado y envío de formularios con React Testing Library.',
      status: 'por-hacer',
      dueDate: '2026-11-20',
      priority: 'media',
    },
  ],
  editingTask: null,
};

export function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
        editingTask: null,
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        editingTask:
          state.editingTask && state.editingTask.id === action.payload
            ? null
            : state.editingTask,
      };

    case 'SET_EDITING_TASK':
      return {
        ...state,
        editingTask: action.payload,
      };

    default:
      return state;
  }
}
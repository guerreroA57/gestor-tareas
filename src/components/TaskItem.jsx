import { useTasks } from '../context/TaskContext';
import { Edit2, Trash2, Calendar as CalendarIcon, Flag } from 'lucide-react';

const statusConfig = {
  'por-hacer': {
    label: 'Por hacer',
    badge: 'bg-[#f5effa] text-[#461b66] border-[#461b66]',
    accent: 'border-l-[6px] border-l-[#461b66]',
  },
  'en-progreso': {
    label: 'En progreso',
    badge: 'bg-[#f8c22e] text-[#1e1b2e] border-[#461b66]',
    accent: 'border-l-[6px] border-l-[#f8c22e]',
  },
  completada: {
    label: 'Completada',
    badge: 'bg-[#00b8c4] text-white border-[#461b66]',
    accent: 'border-l-[6px] border-l-[#00b8c4]',
  },
};

const priorityConfig = {
  baja: {
    label: 'Baja',
    style: 'text-[#5a556b] bg-slate-100',
  },
  media: {
    label: 'Media',
    style: 'text-[#0099a3] bg-[#e6f8f9]',
  },
  alta: {
    label: 'Alta',
    style: 'text-[#e91e63] bg-[#fde8ef]',
  },
};

export default function TaskItem({ task }) {
  const { updateTask, deleteTask, setEditingTask } = useTasks();

  const handleQuickStatusChange = (e) => {
    updateTask({ ...task, status: e.target.value });
  };

  const handleEdit = () => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <article
      className={`card-vector card-vector-interactive p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        statusConfig[task.status].accent
      }`}
    >
      <div className="space-y-2 flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3
            className={`font-extrabold text-base sm:text-lg leading-snug ${
              task.status === 'completada'
                ? 'line-through text-[#5a556b]'
                : 'text-[#461b66]'
            }`}
          >
            {task.title}
          </h3>

          <span
            className={`text-xs px-2.5 py-0.5 rounded-full border font-bold ${
              statusConfig[task.status].badge
            }`}
          >
            {statusConfig[task.status].label}
          </span>

          <span
            className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md font-bold ${
              priorityConfig[task.priority].style
            }`}
          >
            <Flag className="w-3 h-3" />
            {priorityConfig[task.priority].label}
          </span>
        </div>

        {task.description && (
          <p className="text-[#5a556b] text-sm leading-relaxed">
            {task.description}
          </p>
        )}

        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#461b66] pt-0.5">
          <CalendarIcon className="w-3.5 h-3.5 text-[#00b8c4]" />
          <span>Fecha límite: {task.dueDate}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 w-full sm:w-auto justify-end">
        <select
          aria-label={`Cambiar estado de ${task.title}`}
          value={task.status}
          onChange={handleQuickStatusChange}
          className="text-xs sm:text-sm font-bold border-2 border-[#461b66] rounded-xl px-3 py-1.5 bg-[#f4f9fa] text-[#461b66] focus:outline-none focus:border-[#00b8c4] cursor-pointer"
        >
          <option value="por-hacer">Por hacer</option>
          <option value="en-progreso">En progreso</option>
          <option value="completada">Completada</option>
        </select>

        <button
          type="button"
          onClick={handleEdit}
          aria-label={`Editar ${task.title}`}
          title="Editar tarea"
          className="p-2 text-[#461b66] bg-[#fef8e4] hover:bg-[#f8c22e] border-2 border-[#461b66] rounded-xl transition-colors"
        >
          <Edit2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => deleteTask(task.id)}
          aria-label={`Eliminar ${task.title}`}
          title="Eliminar tarea"
          className="p-2 text-[#e91e63] bg-[#fde8ef] hover:bg-[#e91e63] hover:text-white border-2 border-[#461b66] rounded-xl transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
}
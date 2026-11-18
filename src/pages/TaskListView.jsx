import { useState, useMemo } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import { Filter, ArrowUpDown, Layers } from 'lucide-react';

export default function TaskListView() {
  const { tasks } = useTasks();
  const [statusFilter, setStatusFilter] = useState('todas');
  const [sortOrder, setSortOrder] = useState('asc');

  const counts = useMemo(() => {
    return {
      todas: tasks.length,
      'por-hacer': tasks.filter((t) => t.status === 'por-hacer').length,
      'en-progreso': tasks.filter((t) => t.status === 'en-progreso').length,
      completada: tasks.filter((t) => t.status === 'completada').length,
    };
  }, [tasks]);

  const filteredAndSortedTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (statusFilter === 'todas') return true;
        return task.status === statusFilter;
      })
      .sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.dueDate.localeCompare(b.dueDate);
        }
        return b.dueDate.localeCompare(a.dueDate);
      });
  }, [tasks, statusFilter, sortOrder]);

  const filterButtons = [
    { id: 'todas', label: 'Todas', count: counts.todas },
    { id: 'por-hacer', label: 'Por hacer', count: counts['por-hacer'] },
    { id: 'en-progreso', label: 'En progreso', count: counts['en-progreso'] },
    { id: 'completada', label: 'Completadas', count: counts.completada },
  ];

  return (
    <section>
      <TaskForm />

      <div className="card-vector p-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#461b66] mr-1">
            <Filter className="w-4 h-4 text-[#00b8c4]" />
            Estado:
          </span>
          {filterButtons.map((btn) => {
            const active = statusFilter === btn.id;
            return (
              <button
                key={btn.id}
                type="button"
                onClick={() => setStatusFilter(btn.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold border-2 transition-all ${
                  active
                    ? 'bg-[#461b66] text-[#f8c22e] border-[#461b66] shadow-[2px_2px_0px_#00b8c4]'
                    : 'bg-[#e6f8f9] text-[#461b66] border-[#00b8c4] hover:bg-[#fef8e4] hover:border-[#f8c22e]'
                }`}
              >
                <span>{btn.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                    active
                      ? 'bg-[#f8c22e] text-[#461b66]'
                      : 'bg-white text-[#461b66]'
                  }`}
                >
                  {btn.count}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() =>
            setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
          }
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#461b66] bg-[#fef8e4] hover:bg-[#f8c22e] border-2 border-[#461b66] px-3.5 py-1.5 rounded-xl self-start md:self-auto transition-colors"
        >
          <ArrowUpDown className="w-4 h-4" />
          <span>
            Orden: {sortOrder === 'asc' ? 'Más próximas' : 'Más lejanas'}
          </span>
        </button>
      </div>

      {filteredAndSortedTasks.length === 0 ? (
        <div className="card-vector text-center py-14 px-4">
          <div className="w-12 h-12 rounded-2xl bg-[#f5effa] border-2 border-[#461b66] flex items-center justify-center mx-auto mb-3">
            <Layers className="w-6 h-6 text-[#461b66]" />
          </div>
          <h3 className="font-extrabold text-[#461b66] text-base mb-1">
            Sin tareas en esta vista
          </h3>
          <p className="text-[#5a556b] text-sm">
            No hay tareas que coincidan con el filtro seleccionado.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAndSortedTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </section>
  );
}
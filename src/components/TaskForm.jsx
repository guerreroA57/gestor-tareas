import { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import { PlusCircle, Save, X, FileEdit } from 'lucide-react';

const emptyForm = {
  title: '',
  description: '',
  status: 'por-hacer',
  dueDate: '',
  priority: 'media',
};

export default function TaskForm() {
  const { addTask, updateTask, editingTask, setEditingTask } = useTasks();
  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setFormData(editingTask);
      setError('');
    } else {
      setFormData(emptyForm);
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('El título de la tarea es obligatorio.');
      return;
    }
    if (!formData.dueDate) {
      setError('La fecha límite es obligatoria.');
      return;
    }

    if (editingTask) {
      updateTask(formData);
    } else {
      addTask(formData);
    }

    setFormData(emptyForm);
    setError('');
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setFormData(emptyForm);
    setError('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card-vector p-6 mb-7"
      aria-label="Formulario de tarea"
    >
      <div className="flex items-center justify-between pb-3 mb-5 border-b-2 border-[#f5effa]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#00b8c4] border border-[#461b66]" />
          <span className="w-3 h-3 rounded-full bg-[#f8c22e] border border-[#461b66]" />
          <span className="w-3 h-3 rounded-full bg-[#e91e63] border border-[#461b66]" />
          <h2 className="text-lg font-extrabold text-[#461b66] ml-1.5 flex items-center gap-2">
            {editingTask ? (
              <>
                <FileEdit className="w-5 h-5 text-[#e91e63]" />
                <span>Editar Tarea</span>
              </>
            ) : (
              <span>Nueva Tarea</span>
            )}
          </h2>
        </div>
        <span className="text-xs font-semibold text-[#5a556b]">
          Campos obligatorios (*)
        </span>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-5 p-3 rounded-xl bg-[#fde8ef] text-[#e91e63] text-sm font-bold border-2 border-[#e91e63]"
        >
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-6">
          <label
            htmlFor="title"
            className="block text-xs font-bold uppercase tracking-wide text-[#461b66] mb-1.5"
          >
            Título *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Ej. Entregar proyecto final"
            value={formData.title}
            onChange={handleChange}
            className="input-vector"
          />
        </div>

        <div className="md:col-span-6">
          <label
            htmlFor="dueDate"
            className="block text-xs font-bold uppercase tracking-wide text-[#461b66] mb-1.5"
          >
            Fecha límite *
          </label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            className="input-vector"
          />
        </div>

        <div className="md:col-span-4">
          <label
            htmlFor="status"
            className="block text-xs font-bold uppercase tracking-wide text-[#461b66] mb-1.5"
          >
            Estado
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input-vector"
          >
            <option value="por-hacer">Por hacer</option>
            <option value="en-progreso">En progreso</option>
            <option value="completada">Completada</option>
          </select>
        </div>

        <div className="md:col-span-4">
          <label
            htmlFor="priority"
            className="block text-xs font-bold uppercase tracking-wide text-[#461b66] mb-1.5"
          >
            Prioridad
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="input-vector"
          >
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </div>

        <div className="md:col-span-4 flex items-end justify-end gap-2 pt-2 md:pt-0">
          {editingTask && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-[#461b66] bg-white text-[#461b66] hover:bg-[#f5effa] font-bold text-sm transition-colors"
            >
              <X className="w-4 h-4" />
              Cancelar
            </button>
          )}

          <button
            type="submit"
            className="btn-primary w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-sm"
          >
            {editingTask ? (
              <>
                <Save className="w-4 h-4" />
                Guardar Cambios
              </>
            ) : (
              <>
                <PlusCircle className="w-4 h-4" />
                Agregar Tarea
              </>
            )}
          </button>
        </div>

        <div className="md:col-span-12">
          <label
            htmlFor="description"
            className="block text-xs font-bold uppercase tracking-wide text-[#461b66] mb-1.5"
          >
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            rows="2"
            placeholder="Detalles adicionales o notas de la tarea..."
            value={formData.description}
            onChange={handleChange}
            className="input-vector resize-none"
          />
        </div>
      </div>
    </form>
  );
}
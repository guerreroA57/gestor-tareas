import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

const statusStyle = {
  'por-hacer': {
    dot: 'bg-[#461b66]',
    pill: 'bg-[#f5effa] text-[#461b66] border-[#461b66]',
  },
  'en-progreso': {
    dot: 'bg-[#f8c22e] border border-[#461b66]',
    pill: 'bg-[#fef8e4] text-[#1e1b2e] border-[#f8c22e]',
  },
  completada: {
    dot: 'bg-[#00b8c4]',
    pill: 'bg-[#e6f8f9] text-[#461b66] border-[#00b8c4]',
  },
};

export default function CalendarView() {
  const { tasks } = useTasks();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 10, 1));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getTasksForDay = (day) => {
    const formattedMonth = String(month + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
    return tasks.filter((task) => task.dueDate === dateStr);
  };

  const calendarCells = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarCells.push(
      <div
        key={`empty-${i}`}
        className="h-28 bg-[#f4f9fa]/80 border-b border-r border-[#461b66]/20"
      />
    );
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayTasks = getTasksForDay(day);
    calendarCells.push(
      <div
        key={day}
        className="h-28 bg-white border-b border-r border-[#461b66]/20 p-2 overflow-y-auto flex flex-col hover:bg-[#e6f8f9]/30 transition-colors"
      >
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg text-xs font-extrabold text-[#461b66] bg-[#f5effa] mb-1.5 shrink-0">
          {day}
        </span>
        <div className="space-y-1">
          {dayTasks.map((task) => (
            <div
              key={task.id}
              title={`${task.title} (${task.status})`}
              className={`flex items-center gap-1.5 text-[11px] font-bold border px-1.5 py-0.5 rounded-md truncate ${
                statusStyle[task.status].pill
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  statusStyle[task.status].dot
                }`}
              />
              <span className="truncate">{task.title}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="card-vector p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-5 border-b-2 border-[#f5effa]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#e6f8f9] border-2 border-[#461b66] flex items-center justify-center">
            <CalendarIcon className="w-5 h-5 text-[#461b66]" />
          </div>
          <h2 className="text-xl font-extrabold text-[#461b66]">
            {monthNames[month]} {year}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevMonth}
            aria-label="Mes anterior"
            className="p-2 rounded-xl border-2 border-[#461b66] bg-white hover:bg-[#f8c22e] text-[#461b66] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            aria-label="Mes siguiente"
            className="p-2 rounded-xl border-2 border-[#461b66] bg-white hover:bg-[#f8c22e] text-[#461b66] transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden border-2 border-[#461b66]">
        <div className="grid grid-cols-7 bg-[#461b66] text-white text-center text-xs font-extrabold uppercase tracking-wider">
          {weekDays.map((day) => (
            <div key={day} className="py-2.5">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 bg-white">{calendarCells}</div>
      </div>

      <div className="mt-5 pt-4 border-t-2 border-[#f5effa] flex flex-wrap items-center gap-5 text-xs font-bold text-[#461b66]">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#461b66]" /> Por hacer
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#f8c22e] border border-[#461b66]" /> En progreso
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#00b8c4]" /> Completada
        </span>
      </div>
    </section>
  );
}
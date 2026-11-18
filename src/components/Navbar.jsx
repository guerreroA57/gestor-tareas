import { NavLink } from 'react-router-dom';
import { CheckSquare, Calendar, ListTodo } from 'lucide-react';

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${
      isActive
        ? 'bg-[#00b8c4] text-white border-[#461b66] shadow-[3px_3px_0px_#461b66]'
        : 'bg-white text-[#461b66] border-transparent hover:bg-[#e6f8f9] hover:border-[#00b8c4]'
    }`;

  return (
    <header className="bg-white border-b-2 border-[#461b66] sticky top-0 z-20 shadow-[0_3px_0_rgba(70,27,102,0.08)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#461b66] flex items-center justify-center shadow-[2px_2px_0px_#00b8c4]">
            <CheckSquare className="w-5 h-5 text-[#f8c22e]" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-[#461b66] block leading-none">
              TaskFlow
            </span>
            <span className="text-[11px] font-semibold text-[#00b8c4] uppercase tracking-wider">
              Gestor Personal
            </span>
          </div>
        </div>

        <nav className="flex items-center gap-2 sm:gap-3" aria-label="Navegación principal">
          <NavLink to="/" className={linkClass}>
            <ListTodo className="w-4 h-4" />
            <span>Lista de Tareas</span>
          </NavLink>
          <NavLink to="/calendario" className={linkClass}>
            <Calendar className="w-4 h-4" />
            <span>Calendario</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
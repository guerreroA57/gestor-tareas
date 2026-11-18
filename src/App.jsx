import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Navbar from './components/Navbar';
import TaskListView from './pages/TaskListView';
import CalendarView from './pages/CalendarView';

export default function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8">
            <Routes>
              <Route path="/" element={<TaskListView />} />
              <Route path="/calendario" element={<CalendarView />} />
            </Routes>
          </main>
          <footer className="py-4 text-center text-xs font-semibold text-[#5a556b]">
            TaskFlow — Gestión de Tareas Personales
          </footer>
        </div>
      </BrowserRouter>
    </TaskProvider>
  );
}
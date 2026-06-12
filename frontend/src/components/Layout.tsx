import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, Bell, LogOut } from "lucide-react";
import { useAuthStore } from "@/lib/authStore";
import clsx from "clsx";

const nav = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/licitaciones", icon: FileText, label: "Licitaciones" },
  { to: "/alertas", icon: Bell, label: "Alertas" },
];

export default function Layout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
  <div className="flex h-screen bg-slate-950">
      {/* Sidebar */}
     <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800">
        <h1 className="text-3xl font-bold text-cyan-400">LicitAR</h1>
          <p className="text-xs text-slate-400 mt-1">Inteligencia de Licitaciones</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {nav.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
  : "text-slate-400 hover:bg-slate-800 hover:text-white"                )
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      <div className="p-4 border-t border-slate-800">
         <p className="text-xs text-slate-400 mb-2 truncate">{user?.email}</p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-red-400 transition-colors"
          >
            <LogOut size={16} /> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

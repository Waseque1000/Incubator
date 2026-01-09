import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import {
  Home,
  Shield,
  Sparkles,
  TrendingUp,
  BarChart3,
  Users,
} from "lucide-react";
import HomePage from "./pages/Home";
import Admin from "./pages/Admin";

function NavItem({ to, children, icon: Icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-5 py-3 rounded-2xl text-base font-medium transition-all duration-300 flex items-center gap-3 shadow-md ${
          isActive
            ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-500/40"
            : "text-gray-600 hover:bg-white hover:text-emerald-600 hover:shadow-lg"
        }`
      }
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </NavLink>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50 to-teal-50 text-gray-900">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 border-b border-gray-200/50 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-5">
            <div className="flex items-center justify-between">
              {/* Logo Section */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="h-14 w-14 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white grid place-items-center font-bold text-2xl shadow-xl shadow-emerald-500/30">
                    T
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <Sparkles className="w-7 h-7 text-yellow-400 animate-pulse drop-shadow-md" />
                  </div>
                </div>
                <div>
                  <h1 className="font-extrabold text-2xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Team Progress Tracker
                  </h1>
                  <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                    <BarChart3 className="w-4 h-4 text-emerald-500" />
                    Track daily achievements & team growth
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex items-center gap-4 bg-gray-100/60 backdrop-blur-md rounded-full px-2 py-2">
                <NavItem to="/" icon={Home}>
                  Submit Progress
                </NavItem>
                <NavItem to="/admin" icon={Shield}>
                  Admin Dashboard
                </NavItem>
              </nav>
            </div>
          </div>

          {/* Subtle gradient accent */}
          <div className="h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 opacity-80"></div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="max-w-7xl mx-auto px-6 pb-12 pt-8">
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl border border-gray-200/50 shadow-xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-gray-600">
                <Users className="w-6 h-6 text-emerald-500" />
                <div>
                  <p className="font-semibold text-lg">Developed by Wasee</p>
                  <p className="text-sm">© 2026 • All rights reserved</p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 animate-pulse"></div>
                  <span className="text-gray-600">Live & Active</span>
                </div>
                <div className="text-2xl">✨</div>
              </div>
            </div>
          </div>
        </footer>

        {/* Background Decorative Elements - Modern & Subtle */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-5 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-10 right-5 w-80 h-80 bg-teal-300/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>
          <div
            className="absolute top-1/3 left-1/3 w-96 h-96 bg-cyan-300/15 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>
      </div>
    </BrowserRouter>
  );
}

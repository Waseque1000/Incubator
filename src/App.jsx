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
        `px-3 py-2 sm:px-4 sm:py-2.5 lg:px-5 lg:py-3 rounded-2xl text-sm sm:text-base font-medium transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 shadow-md whitespace-nowrap w-full sm:w-auto ${
          isActive
            ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-500/40"
            : "text-gray-600 hover:bg-white hover:text-emerald-600 hover:shadow-lg"
        }`
      }
    >
      {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5" />}
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Logo Section */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white grid place-items-center font-bold text-xl sm:text-2xl shadow-xl shadow-emerald-500/30">
                    T
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-400 animate-pulse drop-shadow-md" />
                  </div>
                </div>

                <div className="min-w-0">
                  <h1 className="font-extrabold text-lg sm:text-2xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent leading-tight">
                    Team Progress Tracker
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-2 mt-1">
                    <BarChart3 className="w-4 h-4 text-emerald-500" />
                    <span className="truncate">
                      Track daily achievements & team growth
                    </span>
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex items-center gap-2 sm:gap-4 bg-gray-100/60 backdrop-blur-md rounded-2xl sm:rounded-full px-2 py-2 w-full lg:w-auto">
                <div className="grid grid-cols-2 gap-2 w-full sm:flex sm:items-center sm:gap-4">
                  <NavItem to="/" icon={Home}>
                    Submit Progress
                  </NavItem>
                  <NavItem to="/admin" icon={Shield}>
                    Admin Dashboard
                  </NavItem>
                </div>
              </nav>
            </div>
          </div>

          {/* Subtle gradient accent */}
          <div className="h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 opacity-80"></div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="max-w-7xl mx-auto px-4 sm:px-6 pb-10 sm:pb-12 pt-6 sm:pt-8">
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl border border-gray-200/50 shadow-xl p-5 sm:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
              <div className="flex items-center gap-3 sm:gap-4 text-gray-600">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
                <div className="text-center md:text-left">
                  <p className="font-semibold text-base sm:text-lg">
                    Developed by Wasee
                  </p>
                  <p className="text-xs sm:text-sm">
                    © 2026 • All rights reserved
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 sm:gap-6 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 animate-pulse"></div>
                  <span className="text-gray-600">Live & Active</span>
                </div>
                <div className="text-xl sm:text-2xl">✨</div>
              </div>
            </div>
          </div>
        </footer>

        {/* Background Decorative Elements - Modern & Subtle */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-5 w-64 h-64 sm:w-96 sm:h-96 bg-emerald-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-10 right-5 w-56 h-56 sm:w-80 sm:h-80 bg-teal-300/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>
          <div
            className="absolute top-1/3 left-1/3 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-300/15 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>
      </div>
    </BrowserRouter>
  );
}

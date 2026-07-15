import { useLocation } from "react-router-dom";
import { Bell, CircleUser, Search } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/courses": "Courses",
  "/assignments": "Assignments",
  "/calendar": "Calendar",
  "/study-planner": "Study Planner",
  "/internship-tracker": "Internship Tracker",
  "/settings": "Settings",
};

export default function Navbar() {
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] ?? "CareerOS";
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* Left: current page title */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{pageTitle}</h2>
      </div>

      {/* Center: search field */}
      <div className="relative w-full max-w-md">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Right: notifications and profile */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
        >
          <Bell size={21} />
        </button>

        <button
          type="button"
          aria-label="Open profile"
          className="flex items-center gap-2 rounded-lg p-2 text-gray-700 hover:bg-gray-100"
        >
          <CircleUser size={24} />

          <span className="hidden text-sm font-medium md:inline">
            Ved
          </span>
        </button>
      </div>
    </header>
  );
}
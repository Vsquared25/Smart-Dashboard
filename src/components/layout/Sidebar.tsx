import {
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  Home,
  Settings as SettingsIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Dashboard", route: "/dashboard", icon: Home },
  { name: "Courses", route: "/courses", icon: BookOpen },
  { name: "Assignments", route: "/assignments", icon: ClipboardList },
  { name: "Calendar", route: "/calendar", icon: CalendarDays },
  {
    name: "Study Planner",
    route: "/study-planner",
    icon: GraduationCap,
  },
  {
    name: "Internship Tracker",
    route: "/internship-tracker",
    icon: BriefcaseBusiness,
  },
  { name: "Settings", route: "/settings", icon: SettingsIcon },
];

export default function Sidebar() {
  return (
    <aside className="min-h-screen w-60 border-r border-gray-200 bg-white p-4">
      <h1 className="mb-8 text-2xl font-bold text-blue-600">
        CareerOS
      </h1>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.route}
              to={item.route}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
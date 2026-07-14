import { Link } from "react-router-dom";

const navItems = [
  {
    name: "Dashboard",
    route: "/dashboard",
  },
  {
    name: "Courses",
    route: "/courses",
  },
  {
    name: "Assignments",
    route: "/assignments",
  },
  {
    name: "Calendar",
    route: "/calendar",
  },
  {
  name: "Study Planner",
  route: "/study-planner",
  },
  {
    name: "Internship Tracker",
    route: "/internship-tracker",
  },
  {
    name: "Settings",
    route: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="min-h-screen w-60 border-r border-gray-200 bg-white p-4">
      <h1 className="mb-8 text-2xl font-bold text-blue-600">
  CareerOS
  </h1>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (<Link
          
            key={item.route}
            to={item.route}
            className="rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-blue-600 hover:text-white"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
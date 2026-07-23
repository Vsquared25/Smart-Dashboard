import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bell,
  CircleUser,
  Moon,
  Search,
  Settings,
  Sun,
} from "lucide-react";
import {
  getAssignments,
  type Assignment,
} from "../../services/api";
import { usePreferences } from "../../context/PreferencesContext";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/courses": "Courses",
  "/assignments": "Assignments",
  "/calendar": "Calendar",
  "/study-planner": "Study Planner",
  "/internship-tracker": "Internship Tracker",
  "/settings": "Settings",
};

function formatDueDate(dueDate: string) {
  return new Date(dueDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function Navbar() {
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] ?? "CampusPilot";
  const { theme, setTheme } = usePreferences();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [upcomingAssignments, setUpcomingAssignments] = useState<
    Assignment[]
  >([]);
  const [remindersDisabled, setRemindersDisabled] = useState(false);

  async function loadUpcomingAssignments() {
    const remindersAreDisabled =
      localStorage.getItem("assignmentReminders") === "false";

    setRemindersDisabled(remindersAreDisabled);

    if (remindersAreDisabled) {
      setUpcomingAssignments([]);
      return;
    }

    try {
      const assignments = await getAssignments();

      const activeAssignments = assignments
        .filter((assignment) => !assignment.completed)
        .sort(
          (first, second) =>
            new Date(first.dueDate).getTime() -
            new Date(second.dueDate).getTime(),
        )
        .slice(0, 3);

      setUpcomingAssignments(activeAssignments);
    } catch {
      setUpcomingAssignments([]);
    }
  }

  useEffect(() => {
    void loadUpcomingAssignments();
  }, []);

  function toggleNotifications() {
    const openingNotifications = !notificationsOpen;

    setNotificationsOpen(openingNotifications);
    setProfileOpen(false);

    if (openingNotifications) {
      void loadUpcomingAssignments();
    }
  }

  function toggleProfile() {
    setProfileOpen(!profileOpen);
    setNotificationsOpen(false);
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          {pageTitle}
        </h2>
      </div>

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

      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            type="button"
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
            onClick={toggleNotifications}
            className="relative rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          >
            <Bell size={21} />

            {!remindersDisabled &&
              upcomingAssignments.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-xs font-bold text-white">
                  {upcomingAssignments.length}
                </span>
              )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-12 z-20 w-80 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
              <h3 className="font-semibold text-gray-900">
                Upcoming work
              </h3>

              {remindersDisabled ? (
                <p className="mt-3 text-sm text-gray-600">
                  Assignment reminders are currently turned off in
                  Settings.
                </p>
              ) : upcomingAssignments.length === 0 ? (
                <p className="mt-3 text-sm text-gray-600">
                  You have no active assignment reminders.
                </p>
              ) : (
                <div className="mt-3 space-y-3">
                  {upcomingAssignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="rounded-lg bg-gray-50 p-3"
                    >
                      <p className="text-sm font-medium text-gray-900">
                        {assignment.title}
                      </p>

                      <p className="mt-1 text-xs text-gray-600">
                        {assignment.course} · Due{" "}
                        {formatDueDate(assignment.dueDate)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            aria-label="Open profile"
            aria-expanded={profileOpen}
            onClick={toggleProfile}
            className="flex items-center gap-2 rounded-lg p-2 text-gray-700 hover:bg-gray-100"
          >
            <CircleUser size={24} />

            <span className="hidden text-sm font-medium md:inline">
              Ved
            </span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-12 z-20 w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
              <div className="border-b border-gray-200 pb-3">
                <p className="font-semibold text-gray-900">
                  Ved Vyas
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  Computer Science student
                </p>
              </div>

              <Link
                to="/settings"
                onClick={() => setProfileOpen(false)}
                className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <Settings size={17} />
                Open settings
              </Link>

              <button
                type="button"
                onClick={() =>
                  setTheme(
                    theme === "light" ? "dark" : "light",
                  )
                }
                className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                {theme === "light" ? (
                  <Moon size={17} />
                ) : (
                  <Sun size={17} />
                )}

                Switch to {theme === "light" ? "dark" : "light"} mode
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
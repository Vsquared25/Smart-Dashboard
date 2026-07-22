import { useEffect, useState } from "react";
import {
  getAssignments,
  type Assignment,
} from "../../services/api";

const weekdays = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];



export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
  async function loadAssignments() {
    try {
      const savedAssignments = await getAssignments();
      setAssignments(savedAssignments);
    } catch {
      console.error("Could not load assignments for the calendar.");
    }
  }

  void loadAssignments();
}, []);

  const monthTitle = currentDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const leadingEmptyDays = Array(firstDayOfMonth).fill(null);

const monthDays = Array.from(
  { length: daysInMonth },
  (_, index) => index + 1,
);

const calendarDays = [
  ...leadingEmptyDays,
  ...monthDays,
];

const calendarEvents = assignments.map((assignment) => ({
  id: assignment.id,
  title: assignment.title,
  date: assignment.dueDate.slice(0, 10),
  type: "assignment" as const,
}));

function getEventsForDay(day: number) {
  const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(
    day,
  ).padStart(2, "0")}`;

  return calendarEvents.filter((event) => event.date === dateKey);
}

  function goToPreviousMonth() {
  setCurrentDate(
    (previousDate) =>
      new Date(
        previousDate.getFullYear(),
        previousDate.getMonth() - 1,
        1,
      ),
  );
}

function goToNextMonth() {
  setCurrentDate(
    (previousDate) =>
      new Date(
        previousDate.getFullYear(),
        previousDate.getMonth() + 1,
        1,
      ),
  );
}
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">
        Calendar
      </h1>

      <p className="mt-2 text-gray-600">
        View your assignments, deadlines, and study sessions.
      </p>

      <section className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={goToPreviousMonth}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </button>

          <h2 className="text-xl font-semibold text-gray-900">
            {monthTitle}
          </h2>

          <button
            type="button"
            onClick={goToNextMonth}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="mt-6 grid grid-cols-7 border-b border-gray-200">
          {weekdays.map((weekday) => (
            <div
              key={weekday}
              className="py-3 text-center text-sm font-semibold text-gray-600"
            >
              {weekday}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {calendarDays.map((day, index) => (
            <div
              key={`${day}-${index}`}
              className="min-h-28 border-b border-r border-gray-200 p-3"
            >
              {day !== null && (
  <>
    <span className="text-sm font-medium text-gray-900">
      {day}
    </span>

    <div className="mt-2 space-y-1">
      {getEventsForDay(day).map((event) => (
        <p
          key={event.id}
          className={
            event.type === "assignment"
              ? "rounded bg-red-100 px-1.5 py-1 text-xs font-medium text-red-700"
              : "rounded bg-blue-100 px-1.5 py-1 text-xs font-medium text-blue-700"
          }
        >
          {event.title}
        </p>
      ))}
    </div>
  </>
)}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
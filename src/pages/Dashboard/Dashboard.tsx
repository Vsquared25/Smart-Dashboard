import {
  BookOpen,
  BriefcaseBusiness,
  ClipboardList,
  Clock3,
} from "lucide-react";

import { useEffect, useState } from "react";
import {
  getAssignments,
  getCourses,
  getHealth,
} from "../../services/api";



export default function Dashboard() {
  const [apiMessage, setApiMessage] = useState("Checking API connection...");
const [apiConnected, setApiConnected] = useState(false);
const [courseCount, setCourseCount] = useState(0);
const [upcomingAssignmentCount, setUpcomingAssignmentCount] = useState(0);

useEffect(() => {
  async function loadDashboardData() {
    try {
      const [healthResponse, courses, assignments] = await Promise.all([
        getHealth(),
        getCourses(),
        getAssignments(),
      ]);

      setApiMessage(healthResponse.message);
      setApiConnected(true);

      setCourseCount(courses.length);

      const activeAssignments = assignments.filter(
        (assignment) => !assignment.completed,
      );

      setUpcomingAssignmentCount(activeAssignments.length);
    } catch {
      setApiMessage("CareerOS API is unavailable.");
      setApiConnected(false);
    }
  }

  void loadDashboardData();
}, []);

const summaryCards = [
  {
    title: "Active Assignments",
  value: upcomingAssignmentCount,
  description: "Not completed yet",
  icon: ClipboardList,
  iconColor: "bg-red-100 text-red-600",
  },
  {
    title: "Active Courses",
  value: courseCount,
  description: "Current semester",
  icon: BookOpen,
  iconColor: "bg-blue-100 text-blue-600",
  },
  {
    title: "Study Hours",
    value: "8.5",
    description: "This week",
    icon: Clock3,
    iconColor: "bg-purple-100 text-purple-600",
  },
  {
    title: "Applications",
    value: "12",
    description: "Internships tracked",
    icon: BriefcaseBusiness,
    iconColor: "bg-emerald-100 text-emerald-600",
  },
];
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">
        Welcome back, Ved
      </h1>

      <p className="mt-2 text-gray-600">
        Here is an overview of your academic and career progress.
      </p>

      <div
  className={`mt-6 rounded-lg border px-4 py-3 text-sm font-medium ${
    apiConnected
      ? "border-green-200 bg-green-50 text-green-700"
      : "border-yellow-200 bg-yellow-50 text-yellow-700"
  }`}
>
  {apiMessage}
</div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.title}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <p className="text-sm font-medium text-gray-500">
                  {card.title}
                </p>

                <div className={`rounded-lg p-2 ${card.iconColor}`}>
                  <Icon size={20} />
                </div>
              </div>

              <p className="mt-3 text-3xl font-bold text-gray-900">
                {card.value}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {card.description}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
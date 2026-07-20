import {
  BookOpen,
  BriefcaseBusiness,
  ClipboardList,
  Clock3,
} from "lucide-react";

const summaryCards = [
  {
    title: "Upcoming Assignments",
    value: "4",
    description: "Due this week",
    icon: ClipboardList,
    iconColor: "bg-red-100 text-red-600",
  },
  {
    title: "Active Courses",
    value: "5",
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

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">
        Welcome back, Ved
      </h1>

      <p className="mt-2 text-gray-600">
        Here is an overview of your academic and career progress.
      </p>

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
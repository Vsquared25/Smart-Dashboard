const summaryCards = [
  {
    title: "Upcoming Assignments",
    value: "4",
    description: "Due this week",
  },
  {
    title: "Active Courses",
    value: "5",
    description: "Current semester",
  },
  {
    title: "Study Hours",
    value: "8.5",
    description: "This week",
  },
  {
    title: "Applications",
    value: "12",
    description: "Internships tracked",
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
        {summaryCards.map((card) => (
  <div
    key={card.title}
    className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
  >
    <p className="text-sm font-medium text-gray-500">
      {card.title}
    </p>

    <p className="mt-3 text-3xl font-bold text-gray-900">
      {card.value}
    </p>

    <p className="mt-1 text-sm text-gray-500">
      {card.description}
    </p>
  </div>
))}
      </div>
    </div>
  );
}
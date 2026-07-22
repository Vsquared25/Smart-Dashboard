import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  createApplication,
  deleteApplication as deleteApplicationFromApi,
  getApplications,
  type ApplicationStatus,
  type JobApplication,
} from "../../services/api";

type ApplicationFilter = "All" | ApplicationStatus;

const filterOptions: ApplicationFilter[] = [
  "All",
  "Applied",
  "Interviewing",
  "Offer",
  "Rejected",
];

export default function InternshipTracker() {
  const [company, setCompany] = useState("");
const [role, setRole] = useState("");
const [location, setLocation] = useState("");
const [appliedDate, setAppliedDate] = useState("");
const [status, setStatus] =
  useState<ApplicationStatus>("Applied");
  const [applications, setApplications] =
    useState<JobApplication[]>([]);
    const [filter, setFilter] =
  useState<ApplicationFilter>("All");

  useEffect(() => {
  async function loadApplications() {
    try {
      const savedApplications = await getApplications();
      setApplications(savedApplications);
    } catch {
      console.error("Could not load internship applications.");
    }
  }

  void loadApplications();
}, []);

  async function deleteApplication(id: number) {
  try {
    await deleteApplicationFromApi(id);

    setApplications((currentApplications) =>
      currentApplications.filter(
        (application) => application.id !== id,
      ),
    );
  } catch {
    console.error("Could not delete internship application.");
  }
}

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  if (
    !company.trim() ||
    !role.trim() ||
    !location.trim() ||
    !appliedDate
  ) {
    return;
  }

  try {
    const savedApplication = await createApplication({
      company: company.trim(),
      role: role.trim(),
      location: location.trim(),
      appliedDate,
      status,
    });

    setApplications((currentApplications) => [
      savedApplication,
      ...currentApplications,
    ]);

    setCompany("");
    setRole("");
    setLocation("");
    setAppliedDate("");
    setStatus("Applied");
  } catch {
    console.error("Could not create internship application.");
  }
}
const filteredApplications = applications.filter(
  (application) =>
    filter === "All" || application.status === filter,
);


  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">
        Internship Tracker
      </h1>

      <p className="mt-2 text-gray-600">
        Track internship applications, interviews, and deadlines.
      </p>

      <form
  onSubmit={handleSubmit}
  className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
>
  <h2 className="text-xl font-semibold text-gray-900">
    Add an application
  </h2>

  <div className="mt-5 grid gap-4 md:grid-cols-2">
    <div>
      <label
        htmlFor="company"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Company
      </label>

      <input
        id="company"
        type="text"
        value={company}
        onChange={(event) => setCompany(event.target.value)}
        placeholder="Nationwide"
        required
        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>

    <div>
      <label
        htmlFor="role"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Role
      </label>

      <input
        id="role"
        type="text"
        value={role}
        onChange={(event) => setRole(event.target.value)}
        placeholder="Software Engineering Intern"
        required
        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>

    <div>
      <label
        htmlFor="location"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Location
      </label>

      <input
        id="location"
        type="text"
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        placeholder="Columbus, OH"
        required
        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>

    <div>
      <label
        htmlFor="appliedDate"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Application date
      </label>

      <input
        id="appliedDate"
        type="date"
        value={appliedDate}
        onChange={(event) => setAppliedDate(event.target.value)}
        required
        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>

    <div>
      <label
        htmlFor="status"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Status
      </label>

      <select
        id="status"
        value={status}
        onChange={(event) =>
          setStatus(event.target.value as ApplicationStatus)
        }
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        <option value="Applied">Applied</option>
        <option value="Interviewing">Interviewing</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>
    </div>
  </div>

  <button
    type="submit"
    className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
  >
    Add Application
  </button>
</form>
<div className="mt-6 flex flex-wrap gap-2">
  {filterOptions.map((option) => (
    <button
      key={option}
      type="button"
      onClick={() => setFilter(option)}
      className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
        filter === option
          ? "bg-blue-600 text-white"
          : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
      }`}
    >
      {option}
    </button>
  ))}
</div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredApplications.map((application) => (
          <article
            key={application.id}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {application.company}
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                  {application.role}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  application.status === "Interviewing"
                    ? "bg-blue-100 text-blue-700"
                    : application.status === "Offer"
                      ? "bg-green-100 text-green-700"
                      : application.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {application.status}
              </span>
            </div>

            <div className="mt-5 space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-800">
                  Location:
                </span>{" "}
                {application.location}
              </p>

              <p>
                <span className="font-medium text-gray-800">
                  Applied:
                </span>{" "}
                {application.appliedDate}
              </p>
            </div>

            <button
              type="button"
              onClick={() => deleteApplication(application.id)}
              className="mt-6 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Delete
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
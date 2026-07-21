import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  createAssignment,
  deleteAssignment as deleteAssignmentFromApi,
  getAssignments,
  updateAssignmentCompletion,
  type Assignment,
} from "../../services/api";

type AssignmentFilter = "all" | "active" | "completed";



export default function Assignments() {
  const [assignments, setAssignments] =
    useState<Assignment[]>([]);

    useEffect(() => {
  async function loadAssignments() {
    try {
      const assignmentsFromApi = await getAssignments();
      setAssignments(assignmentsFromApi);
    } catch {
      console.error("Could not load assignments from the API.");
    }
  }

  loadAssignments();
}, []);

  const [filter, setFilter] =
    useState<AssignmentFilter>("all");

  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentCourse, setAssignmentCourse] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] =
    useState<Assignment["priority"]>("Medium");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  if (
    !assignmentTitle.trim() ||
    !assignmentCourse.trim() ||
    !dueDate
  ) {
    return;
  }

  try {
    const newAssignment = await createAssignment({
      title: assignmentTitle.trim(),
      course: assignmentCourse.trim(),
      dueDate,
      priority,
    });

    setAssignments((currentAssignments) => [
      ...currentAssignments,
      newAssignment,
    ]);

    setAssignmentTitle("");
    setAssignmentCourse("");
    setDueDate("");
    setPriority("Medium");
    setFilter("all");
  } catch {
    console.error("Could not create assignment.");
  }
}

  async function toggleAssignment(id: number) {
  const assignment = assignments.find(
    (currentAssignment) => currentAssignment.id === id,
  );

  if (!assignment) {
    return;
  }

  try {
    const updatedAssignment =
      await updateAssignmentCompletion(
        id,
        !assignment.completed,
      );

    setAssignments((currentAssignments) =>
      currentAssignments.map((currentAssignment) =>
        currentAssignment.id === id
          ? updatedAssignment
          : currentAssignment,
      ),
    );
  } catch {
    console.error("Could not update assignment.");
  }
}

  async function deleteAssignment(id: number) {
  try {
    await deleteAssignmentFromApi(id);

    setAssignments((currentAssignments) =>
      currentAssignments.filter(
        (assignment) => assignment.id !== id,
      ),
    );
  } catch {
    console.error("Could not delete assignment.");
  }
}

  const filteredAssignments = assignments.filter((assignment) => {
    if (filter === "active") {
      return !assignment.completed;
    }

    if (filter === "completed") {
      return assignment.completed;
    }

    return true;
  });

  return (
    <div>
      {/* Page heading */}
      <h1 className="text-3xl font-bold text-gray-900">
        Assignments
      </h1>

      <p className="mt-2 text-gray-600">
        Track upcoming work and completed assignments.
      </p>
      <form onSubmit={handleSubmit}
  className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
  <h2 className="text-xl font-semibold text-gray-900">
    Add an assignment
  </h2>

  <div className="mt-5 grid gap-4 md:grid-cols-2">
    <div>
      <label
        htmlFor="assignmentTitle"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Assignment title
      </label>

      <input
        id="assignmentTitle"
        type="text"
        value={assignmentTitle}
        onChange={(event) =>
          setAssignmentTitle(event.target.value)
        }
        placeholder="Homework 3"
        required
        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>

    <div>
      <label
        htmlFor="assignmentCourse"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Course
      </label>

      <input
        id="assignmentCourse"
        type="text"
        value={assignmentCourse}
        onChange={(event) =>
          setAssignmentCourse(event.target.value)
        }
        placeholder="CSE 2231"
        required
        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>

    <div>
      <label
        htmlFor="dueDate"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Due date
      </label>

      <input
        id="dueDate"
        type="date"
        value={dueDate}
        onChange={(event) => setDueDate(event.target.value)}
        required
        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>

    <div>
      <label
        htmlFor="priority"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Priority
      </label>

      <select
        id="priority"
        value={priority}
        onChange={(event) =>
          setPriority(
            event.target.value as Assignment["priority"],
          )
        }
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  </div>

  <button
    type="submit"
    className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-blue-700"
  >
    Add Assignment
  </button>
</form>

      {/* Filter buttons */}
      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === "all"
              ? "bg-blue-600 text-white"
              : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          All
        </button>

        <button
          type="button"
          onClick={() => setFilter("active")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === "active"
              ? "bg-blue-600 text-white"
              : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          Active
        </button>

        <button
          type="button"
          onClick={() => setFilter("completed")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === "completed"
              ? "bg-blue-600 text-white"
              : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          Completed
        </button>
      </div>

      {/* Assignment list */}
      <div className="mt-8 space-y-4">
        {filteredAssignments.map((assignment) => (
          <article
            key={assignment.id}
            className="flex flex-col justify-between gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:flex-row md:items-center"
          >
            {/* Assignment information */}
            <div>
              <h2
                className={`text-lg font-semibold ${
                  assignment.completed
                    ? "text-gray-400 line-through"
                    : "text-gray-900"
                }`}
              >
                {assignment.title}
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                {assignment.course}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Due: {assignment.dueDate}
              </p>
            </div>

            {/* Priority, status, and controls */}
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  assignment.priority === "High"
                    ? "bg-red-100 text-red-700"
                    : assignment.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                }`}
              >
                {assignment.priority}
              </span>

              <span
                className={`text-sm font-medium ${
                  assignment.completed
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {assignment.completed ? "Completed" : "Active"}
              </span>

              <button
                type="button"
                onClick={() => toggleAssignment(assignment.id)}
                className="rounded-lg border border-blue-200 px-3 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
              >
                {assignment.completed
                  ? "Mark Active"
                  : "Complete"}
              </button>

              <button
                type="button"
                onClick={() => deleteAssignment(assignment.id)}
                className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </article>
        ))}

        {/* Empty-state message */}
        {filteredAssignments.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
            <p className="text-gray-500">
              {filter === "all"
                ? "You do not have any assignments."
                : filter === "active"
                  ? "You do not have any active assignments."
                  : "You do not have any completed assignments."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
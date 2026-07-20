import { useState } from "react";
import type { FormEvent } from "react";

export default function StudyPlanner() {
  const [course, setCourse] = useState("");
  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState("");
  const [availableHours, setAvailableHours] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [studyPlan, setStudyPlan] = useState<string[]>([]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const totalHours = Number(availableHours);

    if (
      !course.trim() ||
      !goal.trim() ||
      !deadline ||
      totalHours <= 0
    ) {
      return;
    }

    const focusAreas = [
      "Review core concepts",
      "Practice problems",
      "Analyze mistakes",
      "Complete a final review",
    ];

    const sessionCount = difficulty === "Hard" ? 4 : 3;
    const hoursPerSession = totalHours / sessionCount;

    const sessions = focusAreas
      .slice(0, sessionCount)
      .map(
        (focus, index) =>
          `Session ${index + 1}: ${focus} for ${hoursPerSession.toFixed(1)} hours`,
      );

    setStudyPlan(sessions);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">
        Study Planner
      </h1>

      <p className="mt-2 text-gray-600">
        Create a focused study plan for an upcoming goal.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
  <h2 className="text-xl font-semibold text-gray-900">
    Plan a study session
  </h2>

  <div className="mt-5 grid gap-4 md:grid-cols-2">
    <div>
      <label
        htmlFor="course"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Course
      </label>

      <input
        id="course"
        type="text"
        value={course}
        onChange={(event) => setCourse(event.target.value)}
        placeholder="CSE 2321"
        required
        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>

    <div>
      <label
        htmlFor="goal"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Study goal
      </label>

      <input
        id="goal"
        type="text"
        value={goal}
        onChange={(event) => setGoal(event.target.value)}
        placeholder="Prepare for the midterm"
        required
        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>

    <div>
      <label
        htmlFor="deadline"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Deadline
      </label>

      <input
        id="deadline"
        type="date"
        value={deadline}
        onChange={(event) => setDeadline(event.target.value)}
        required
        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>

    <div>
      <label
        htmlFor="availableHours"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Available hours
      </label>

      <input
        id="availableHours"
        type="number"
        min="1"
        value={availableHours}
        onChange={(event) => setAvailableHours(event.target.value)}
        placeholder="8"
        required
        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>

    <div>
      <label
        htmlFor="difficulty"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Difficulty
      </label>

      <select
        id="difficulty"
        value={difficulty}
        onChange={(event) => setDifficulty(event.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
    </div>
  </div>

  <button
    type="submit"
    className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
  >
    Generate Plan
  </button>
  </form>
  {studyPlan.length > 0 && (
  <section className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-6">
    <h2 className="text-xl font-semibold text-gray-900">
      Your Study Plan
    </h2>

    <p className="mt-1 text-sm text-gray-600">
      {course} - Goal: {goal} - Due: {deadline}
    </p>

    <ol className="mt-5 space-y-3">
      {studyPlan.map((session) => (
        <li
          key={session}
          className="rounded-lg border border-blue-100 bg-white p-4 text-sm text-gray-700"
        >
          {session}
        </li>
      ))}
    </ol>
  </section>
)}
    </div>

    
  );
}
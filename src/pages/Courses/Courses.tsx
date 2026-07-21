import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  createCourse,
  deleteCourse,
  getCourses,
  type Course,
} from "../../services/api";



export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
  async function loadCourses() {
    try {
      const coursesFromApi = await getCourses();
      setCourses(coursesFromApi);
    } catch {
      console.error("Could not load courses from the API.");
    }
  }

  loadCourses();
}, []);

  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [instructor, setInstructor] = useState("");
  const [credits, setCredits] = useState("");

  async function removeCourse(id: number) {
  try {
    await deleteCourse(id);

    setCourses((currentCourses) =>
      currentCourses.filter((course) => course.id !== id),
    );
  } catch {
    console.error("Could not delete the course.");
  }
}
async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const numericCredits = Number(credits);

  if (
    !courseCode.trim() ||
    !courseName.trim() ||
    !instructor.trim() ||
    numericCredits <= 0
  ) {
    return;
  }

  try {
    const newCourse = await createCourse({
      code: courseCode.trim(),
      name: courseName.trim(),
      instructor: instructor.trim(),
      credits: numericCredits,
    });

    setCourses((currentCourses) => [
      ...currentCourses,
      newCourse,
    ]);

    setCourseCode("");
    setCourseName("");
    setInstructor("");
    setCredits("");
  } catch {
    console.error("Could not create the course.");
  }
}

  return (
    <div>
      {/* Page heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Courses
        </h1>

        <p className="mt-2 text-gray-600">
          Manage your current courses and course information.
        </p>
      </div>

      {/* Add-course form */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <h2 className="text-xl font-semibold text-gray-900">
          Add a course
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="courseCode"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Course code
            </label>

            <input
              id="courseCode"
              type="text"
              value={courseCode}
              onChange={(event) =>
                setCourseCode(event.target.value)
              }
              placeholder="CSE 2231"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="courseName"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Course name
            </label>

            <input
              id="courseName"
              type="text"
              value={courseName}
              onChange={(event) =>
                setCourseName(event.target.value)
              }
              placeholder="Software II"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="instructor"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Instructor
            </label>

            <input
              id="instructor"
              type="text"
              value={instructor}
              onChange={(event) =>
                setInstructor(event.target.value)
              }
              placeholder="Professor Smith"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="credits"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Credits
            </label>

            <input
              id="credits"
              type="number"
              min="1"
              max="10"
              value={credits}
              onChange={(event) =>
                setCredits(event.target.value)
              }
              placeholder="3"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-blue-700"
        >
          Add Course
        </button>
      </form>

      {/* Course cards */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <article
            key={course.id}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-semibold text-blue-600">
              {course.code}
            </p>

            <h2 className="mt-2 text-xl font-bold text-gray-900">
              {course.name}
            </h2>

            <div className="mt-5 space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-800">
                  Instructor:
                </span>{" "}
                {course.instructor}
              </p>

              <p>
                <span className="font-medium text-gray-800">
                  Credits:
                </span>{" "}
                {course.credits}
              </p>
            </div>

            <button
              type="button"
              onClick={() => removeCourse(course.id)}
              className="mt-6 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
            >
              Remove
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
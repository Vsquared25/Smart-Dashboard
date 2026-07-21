export type HealthResponse = {
  status: string;
  message: string;
};

export type Course = {
  id: number;
  code: string;
  name: string;
  instructor: string;
  credits: number;
};

const apiBaseUrl =
  import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export async function getHealth(): Promise<HealthResponse> {
  const response = await fetch(`${apiBaseUrl}/api/health`);

  if (!response.ok) {
    throw new Error("Could not connect to the CareerOS API.");
  }

  return response.json();
}

export async function getCourses(): Promise<Course[]> {
  const response = await fetch(`${apiBaseUrl}/api/courses`);

  if (!response.ok) {
    throw new Error("Could not load courses.");
  }

  return response.json();
}

export type NewCourse = Omit<Course, "id">;

export async function createCourse(
  course: NewCourse,
): Promise<Course> {
  const response = await fetch(`${apiBaseUrl}/api/courses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(course),
  });

  if (!response.ok) {
    throw new Error("Could not create course.");
  }

  return response.json();
}

export async function deleteCourse(id: number): Promise<void> {
  const response = await fetch(`${apiBaseUrl}/api/courses/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Could not delete course.");
  }
}
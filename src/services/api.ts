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

export type Assignment = {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
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

export async function getAssignments(): Promise<Assignment[]> {
  const response = await fetch(`${apiBaseUrl}/api/assignments`);

  if (!response.ok) {
    throw new Error("Could not load assignments.");
  }

  return response.json();
}

export type NewAssignment = Omit<
  Assignment,
  "id" | "completed"
>;

export async function createAssignment(
  assignment: NewAssignment,
): Promise<Assignment> {
  const response = await fetch(`${apiBaseUrl}/api/assignments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(assignment),
  });

  if (!response.ok) {
    throw new Error("Could not create assignment.");
  }

  return response.json();
}

export async function updateAssignmentCompletion(
  id: number,
  completed: boolean,
): Promise<Assignment> {
  const response = await fetch(
    `${apiBaseUrl}/api/assignments/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed }),
    },
  );

  if (!response.ok) {
    throw new Error("Could not update assignment.");
  }

  return response.json();
}

export async function deleteAssignment(
  id: number,
): Promise<void> {
  const response = await fetch(
    `${apiBaseUrl}/api/assignments/${id}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error("Could not delete assignment.");
  }
}

export type StudyPlanRequest = {
  course: string;
  goal: string;
  deadline: string;
  availableHours: number;
  difficulty: "Easy" | "Medium" | "Hard";
};

export async function generateStudyPlan(
  studyPlanRequest: StudyPlanRequest,
): Promise<string> {
  const response = await fetch(`${apiBaseUrl}/api/study-plans/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studyPlanRequest),
  });

  if (!response.ok) {
    throw new Error("Could not generate study plan.");
  }

  const data: { plan: string } = await response.json();

  return data.plan;
}

export type SavedStudyPlan = {
  id: number;
  course: string;
  goal: string;
  deadline: string;
  availableHours: number;
  difficulty: "Easy" | "Medium" | "Hard";
  plan: string;
  source: "ai" | "fallback";
  createdAt: string;
};

export type NewSavedStudyPlan = Omit<
  SavedStudyPlan,
  "id" | "createdAt"
>;

export async function getSavedStudyPlans(): Promise<
  SavedStudyPlan[]
> {
  const response = await fetch(`${apiBaseUrl}/api/study-plans`);

  if (!response.ok) {
    throw new Error("Could not load saved study plans.");
  }

  return response.json();
}

export async function saveStudyPlan(
  studyPlan: NewSavedStudyPlan,
): Promise<SavedStudyPlan> {
  const response = await fetch(`${apiBaseUrl}/api/study-plans`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studyPlan),
  });

  if (!response.ok) {
    throw new Error("Could not save study plan.");
  }

  return response.json();
}

export async function deleteSavedStudyPlan(
  id: number,
): Promise<void> {
  const response = await fetch(
    `${apiBaseUrl}/api/study-plans/${id}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error("Could not delete saved study plan.");
  }
}
import "dotenv/config";
import cors from "cors";
import express from "express";

type Course = {
  id: number;
  code: string;
  name: string;
  instructor: string;
  credits: number;
};

const courses: Course[] = [
  {
    id: 1,
    code: "CSE 2231",
    name: "Software II",
    instructor: "Professor Smith",
    credits: 4,
  },
  {
    id: 2,
    code: "CSE 2321",
    name: "Foundations I",
    instructor: "Professor Johnson",
    credits: 3,
  },
];

const app = express();
const port = process.env.PORT ?? 4000;

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.status(200).json({
    status: "ok",
    message: "CareerOS API is running",
  });
});

app.get("/api/courses", (_request, response) => {
  response.status(200).json(courses);
});

app.post("/api/courses", (request, response) => {
  const { code, name, instructor, credits } = request.body;

  if (
    typeof code !== "string" ||
    typeof name !== "string" ||
    typeof instructor !== "string" ||
    typeof credits !== "number" ||
    !code.trim() ||
    !name.trim() ||
    !instructor.trim() ||
    credits <= 0
  ) {
    return response.status(400).json({
      message: "Course code, name, instructor, and valid credits are required.",
    });
  }

  const newCourse: Course = {
    id: Date.now(),
    code: code.trim(),
    name: name.trim(),
    instructor: instructor.trim(),
    credits,
  };

  courses.push(newCourse);

  return response.status(201).json(newCourse);
});

app.delete("/api/courses/:id", (request, response) => {
  const id = Number(request.params.id);

  if (!Number.isInteger(id)) {
    return response.status(400).json({
      message: "Course ID must be a whole number.",
    });
  }

  const courseIndex = courses.findIndex(
    (course) => course.id === id,
  );

  if (courseIndex === -1) {
    return response.status(404).json({
      message: "Course not found.",
    });
  }

  courses.splice(courseIndex, 1);

  return response.status(204).send();
});



app.listen(port, () => {
  console.log(`CareerOS API running at http://localhost:${port}`);
});
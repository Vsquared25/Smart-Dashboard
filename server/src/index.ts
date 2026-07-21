import "dotenv/config";
import cors from "cors";
import express from "express";
import { prisma } from "./lib/prisma.js";



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

app.get("/api/courses", async (_request, response) => {
  const courses = await prisma.course.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  response.status(200).json(courses);
});

app.post("/api/courses", async (request, response) => {
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

  const newCourse = await prisma.course.create({
    data: {
      code: code.trim(),
      name: name.trim(),
      instructor: instructor.trim(),
      credits,
    },
  });

  return response.status(201).json(newCourse);
});

app.delete("/api/courses/:id", async (request, response) => {
  const id = Number(request.params.id);

  if (!Number.isInteger(id)) {
    return response.status(400).json({
      message: "Course ID must be a whole number.",
    });
  }

  const existingCourse = await prisma.course.findUnique({
    where: { id },
  });

  if (!existingCourse) {
    return response.status(404).json({
      message: "Course not found.",
    });
  }

  await prisma.course.delete({
    where: { id },
  });

  return response.status(204).send();
});



app.listen(port, () => {
  console.log(`CareerOS API running at http://localhost:${port}`);
});
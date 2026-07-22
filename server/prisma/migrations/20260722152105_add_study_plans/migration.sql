-- CreateTable
CREATE TABLE "StudyPlan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "course" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "deadline" DATETIME NOT NULL,
    "availableHours" REAL NOT NULL,
    "difficulty" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Assignments from "./pages/Assignments/Assignments";
import Calendar from "./pages/Calendar/Calendar";
import Courses from "./pages/Courses/Courses";
import Dashboard from "./pages/Dashboard/Dashboard";
import InternshipTracker from "./pages/InternshipTracker/InternshipTracker";
import Login from "./pages/Login/Login";
import Settings from "./pages/Settings/Settings";
import StudyPlanner from "./pages/StudyPlanner/StudyPlanner";

function App() {
  return (
    <Routes>
      {/* Login does not use the dashboard layout */}
      <Route path="/login" element={<Login />} />

      {/* These pages share the navbar and sidebar */}
      <Route element={<Layout />}>
        <Route
          index
          element={<Navigate to="/dashboard" replace />}
        />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="study-planner" element={<StudyPlanner />} />
        <Route
          path="internship-tracker"
          element={<InternshipTracker />}
        />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Unknown addresses return to the dashboard */}
      <Route
        path="*"
        element={<Navigate to="/dashboard" replace />}
      />
    </Routes>
  );
}

export default App;
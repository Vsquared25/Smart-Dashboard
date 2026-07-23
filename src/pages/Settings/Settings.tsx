import { useEffect, useState } from "react";

export default function Settings() {
  const [assignmentReminders, setAssignmentReminders] = useState(() => {
  return localStorage.getItem("assignmentReminders") !== "false";
});

const [weeklyStudyReminder, setWeeklyStudyReminder] = useState(() => {
  return localStorage.getItem("weeklyStudyReminder") !== "false";
});

useEffect(() => {
  localStorage.setItem(
    "assignmentReminders",
    String(assignmentReminders),
  );
}, [assignmentReminders]);

useEffect(() => {
  localStorage.setItem(
    "weeklyStudyReminder",
    String(weeklyStudyReminder),
  );
}, [weeklyStudyReminder]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

      <p className="mt-2 text-gray-600">
        Manage your CampusPilot preferences.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Notifications
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            Choose which planning reminders CampusPilot should show.
          </p>

          <div className="mt-6 space-y-5">
  <label className="flex items-center justify-between gap-4">
    <span>
      <span className="block font-medium text-gray-900">
        Assignment reminders
      </span>
      <span className="mt-1 block text-sm text-gray-600">
        Show reminders for upcoming assignment deadlines.
      </span>
    </span>

    <input
      type="checkbox"
      checked={assignmentReminders}
      onChange={(event) =>
        setAssignmentReminders(event.target.checked)
      }
      className="h-5 w-5 accent-blue-600"
    />
  </label>

  <label className="flex items-center justify-between gap-4 border-t border-gray-200 pt-5">
    <span>
      <span className="block font-medium text-gray-900">
        Weekly study reminder
      </span>
      <span className="mt-1 block text-sm text-gray-600">
        Remind me to review my study plan each week.
      </span>
    </span>

    <input
      type="checkbox"
      checked={weeklyStudyReminder}
      onChange={(event) =>
        setWeeklyStudyReminder(event.target.checked)
      }
      className="h-5 w-5 accent-blue-600"
    />
  </label>
</div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Integrations
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            CarmenCanvas course-material sync is planned for a future approved
            OAuth/LTI integration.
          </p>
        </section>
      </div>
    </div>
  );
}
export default function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <section className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-blue-600">
          CampusPilot
        </h1>

        <p className="mt-2 text-gray-600">
          Sign in to manage your courses, study plans, and internship applications.
        </p>
        <form className="mt-8">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div className="mt-5">
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white transition-colors hover:bg-blue-700"
        >
          Sign in
        </button>
        <div className="mt-4 flex items-center justify-between text-sm">
          <a
            href="#"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Forgot password?
          </a>

          <a
            href="#"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Create account
          </a>
        </div>
        </form>
      </section>
    </main>
  );
}
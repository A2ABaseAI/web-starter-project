import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-8xl sm:text-9xl font-bold text-gray-200 dark:text-gray-800 mb-4">
            404
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Page Not Found
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="btn px-8 py-3 text-base"
          >
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-ghost px-8 py-3 text-base"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

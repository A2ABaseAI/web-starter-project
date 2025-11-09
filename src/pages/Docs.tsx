export default function Docs() {
  const sections = [
    {
      title: "Getting Started",
      items: [
        "Install dependencies with `npm install`",
        "Start the development server with `npm run dev`",
        "Open your browser to `http://localhost:5173`",
        "Begin building your agent interface"
      ]
    },
    {
      title: "Project Structure",
      items: [
        "`src/pages/` - Page components",
        "`src/components/` - Reusable components",
        "`src/layouts/` - Layout components",
        "`src/routes/` - Route configuration"
      ]
    },
    {
      title: "Styling",
      items: [
        "Tailwind CSS v4 for utility-first styling",
        "Dark mode support with system preference",
        "Mobile-first responsive design",
        "Custom components in `src/index.css`"
      ]
    },
    {
      title: "Routing",
      items: [
        "React Router v7 for SPA navigation",
        "Lazy-loaded pages for performance",
        "Nested routes support",
        "404 page handling"
      ]
    }
  ];

  return (
    <div className="min-h-screen py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Documentation
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
            Learn how to build amazing agent interfaces with this modern stack.
          </p>
        </div>

        {/* Quick Start */}
        <div className="mb-12 sm:mb-16">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-sky-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Quick Start
            </h2>
            <ol className="list-decimal pl-5 space-y-3 text-gray-700 dark:text-gray-300">
              <li>Install dependencies with <code className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm font-mono">npm install</code></li>
              <li>Set environment variables if needed</li>
              <li>Run the dev server with <code className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm font-mono">npm run dev</code></li>
              <li>Start building your agent interface</li>
            </ol>
          </div>
        </div>

        {/* Documentation Sections */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div
              key={section.title}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-600 dark:text-gray-400"
                  >
                    <span className="text-sky-600 dark:text-sky-400 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

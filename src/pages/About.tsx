export default function About() {
  return (
    <div className="min-h-screen py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            About
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
            A modern, production-ready scaffold for building agent interfaces.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              What is Agent UI?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Agent UI is a lightweight, modern scaffold for building agent-driven web applications. 
              It's designed with developer experience in mind, providing everything you need to get 
              started quickly while maintaining flexibility for customization.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Built with React, TypeScript, and Tailwind CSS v4, this template offers a solid 
              foundation for creating beautiful, accessible, and performant user interfaces.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                🚀 Fast Development
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Get up and running in minutes with a pre-configured development environment 
                and hot module replacement.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                🎨 Modern Design
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Beautiful, responsive design with dark mode support and smooth animations 
                out of the box.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                ♿ Accessible
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Built with accessibility in mind, following best practices for semantic HTML 
                and keyboard navigation.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                🔧 Customizable
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Easy to customize and extend. Modify colors, add components, or integrate 
                with your favorite tools.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

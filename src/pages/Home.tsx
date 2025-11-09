export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 -z-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Modern SPA Framework
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-sky-600 via-purple-600 to-pink-600 dark:from-sky-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Build Amazing
              </span>
              <br />
              <span className="text-gray-900 dark:text-gray-100">
                Agent Interfaces
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              A clean, modern single-page application built with React, TypeScript, and Tailwind CSS v4. 
              Mobile-first, accessible, and production-ready.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <button className="btn w-full sm:w-auto px-8 py-3 text-base">
                Get Started
              </button>
              <button className="btn-ghost w-full sm:w-auto px-8 py-3 text-base">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Everything You Need
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Built with modern tools and best practices for the best developer experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {[
              { 
                title: "Blazing Fast", 
                description: "Vite-powered development with instant HMR and lightning-fast builds.",
                icon: "⚡",
                gradient: "from-yellow-400 to-orange-500"
              },
              { 
                title: "Type Safe", 
                description: "Full TypeScript support for better developer experience and fewer bugs.",
                icon: "🔒",
                gradient: "from-blue-400 to-cyan-500"
              },
              { 
                title: "Mobile First", 
                description: "Responsive design that works beautifully on all devices and screen sizes.",
                icon: "📱",
                gradient: "from-purple-400 to-pink-500"
              },
              { 
                title: "Dark Mode", 
                description: "System-aware theme with smooth transitions and persistent preferences.",
                icon: "🌓",
                gradient: "from-indigo-400 to-purple-500"
              },
              { 
                title: "SPA Routing", 
                description: "React Router with lazy-loaded pages and code splitting for optimal performance.",
                icon: "🔄",
                gradient: "from-green-400 to-emerald-500"
              },
              { 
                title: "Modern UI", 
                description: "Clean, beautiful design with smooth animations and transitions.",
                icon: "🎨",
                gradient: "from-pink-400 to-rose-500"
              },
            ].map((feature) => (
              <article 
                key={feature.title} 
                className="group relative p-6 sm:p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${feature.gradient} text-2xl sm:text-3xl mb-4 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Built With Modern Tech
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Powered by the latest and greatest tools in the React ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 max-w-6xl mx-auto justify-items-center">
            {[
              { name: "React", color: "text-blue-500" },
              { name: "TypeScript", color: "text-blue-600" },
              { name: "Vite", color: "text-yellow-500" },
              { name: "Tailwind", color: "text-cyan-500" },
              { name: "Router", color: "text-red-500" },
              { name: "ESLint", color: "text-purple-500" },
            ].map((tech) => (
              <div 
                key={tech.name}
                className="flex flex-col items-center justify-center p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 hover:shadow-lg w-full"
              >
                <div className={`text-2xl sm:text-3xl font-bold ${tech.color} mb-2`}>
                  {tech.name[0]}
                </div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                  {tech.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600 via-purple-600 to-pink-600 p-8 sm:p-12 lg:p-16 text-center max-w-4xl mx-auto">
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to Build?
              </h2>
              <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Start building your next amazing agent interface today.
              </p>
              <button className="inline-flex items-center px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg">
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

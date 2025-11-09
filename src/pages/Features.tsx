export default function Features() {
  const features = [
    {
      title: "Mobile-First Design",
      description: "Responsive components that work beautifully on all devices, from mobile phones to large desktop displays.",
      icon: "📱",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      title: "Dark Mode Support",
      description: "System-aware theme with smooth transitions and persistent user preferences.",
      icon: "🌓",
      gradient: "from-indigo-400 to-purple-500"
    },
    {
      title: "SPA Routing",
      description: "React Router v7 with lazy-loaded pages and code splitting for optimal performance.",
      icon: "🔄",
      gradient: "from-green-400 to-emerald-500"
    },
    {
      title: "Tailwind CSS v4",
      description: "Modern utility-first styling with the latest Tailwind CSS features and PostCSS integration.",
      icon: "🎨",
      gradient: "from-pink-400 to-rose-500"
    },
    {
      title: "TypeScript",
      description: "Full type safety for better developer experience, fewer bugs, and improved code quality.",
      icon: "🔒",
      gradient: "from-blue-400 to-cyan-500"
    },
    {
      title: "Vite Build System",
      description: "Lightning-fast development with instant HMR and optimized production builds.",
      icon: "⚡",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      title: "Accessible UI",
      description: "Semantic HTML, keyboard navigation, and ARIA support for inclusive design.",
      icon: "♿",
      gradient: "from-teal-400 to-cyan-500"
    },
    {
      title: "SEO Ready",
      description: "Built-in SEO components and document title management for better search visibility.",
      icon: "🔍",
      gradient: "from-green-400 to-teal-500"
    },
    {
      title: "Modern Animations",
      description: "Smooth transitions and animations that enhance user experience without being distracting.",
      icon: "✨",
      gradient: "from-violet-400 to-purple-500"
    }
  ];

  return (
    <div className="min-h-screen py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Features
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
            Everything you need to build modern, production-ready agent interfaces.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {features.map((feature) => (
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
    </div>
  );
}

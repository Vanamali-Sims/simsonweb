export default function Projects() {
  const projects = [
    {
      title: 'Project One',
      description: 'A modern web application built with Next.js and TypeScript.',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      link: '#',
    },
    {
      title: 'Project Two',
      description: 'An e-commerce platform with real-time inventory management.',
      tags: ['React', 'Node.js', 'MongoDB'],
      link: '#',
    },
    {
      title: 'Project Three',
      description: 'A social media dashboard with analytics and reporting.',
      tags: ['Vue.js', 'Firebase', 'Chart.js'],
      link: '#',
    },
  ]

  return (
    <div className="page-transition">
      <h1 className="text-4xl font-bold mb-8">My Projects</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                View Project →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 
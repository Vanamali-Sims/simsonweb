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
      <div className="mb-16">
        <h1 className="text-4xl font-light text-white">projects</h1>
        <div className="h-1 w-20 bg-gradient-to-r from-gray-500 to-transparent mt-2"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="border border-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-all hover:border-gray-700"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-3 text-white">{project.title}</h2>
              <p className="text-gray-400 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm bg-[#131315] rounded-full text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                className="text-gray-400 hover:text-white transition-colors flex items-center"
              >
                <span>View Project</span>
                <span className="ml-1">→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 
export default function About() {
  return (
    <div className="page-transition max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">About Me</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Who I Am</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          I'm a passionate web developer with a keen eye for design and a love for creating
          seamless user experiences. With expertise in modern web technologies, I focus on
          building scalable and maintainable applications.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          When I'm not coding, you can find me exploring new technologies, contributing to
          open-source projects, or sharing my knowledge through technical writing.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Skills & Expertise</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            'React',
            'Next.js',
            'TypeScript',
            'Node.js',
            'Tailwind CSS',
            'Git',
            'REST APIs',
            'GraphQL',
            'Testing',
          ].map((skill) => (
            <div
              key={skill}
              className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
} 
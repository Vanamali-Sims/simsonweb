export default function About() {
  return (
    <div className="page-transition max-w-2xl mx-auto">
      <div className="mb-16">
        <h1 className="text-4xl font-light text-white">about</h1>
        <div className="h-1 w-20 bg-gradient-to-r from-gray-500 to-transparent mt-2"></div>
      </div>
      
      <div className="space-y-16">
        <section className="space-y-6 text-gray-400">
          <p className="text-lg">
            Hey! I'm a Data Science student at Monash Clayton with a passion for 
            creative coding and music production.
          </p>
          <p>
            Born in India and now based in Melbourne, I bring a unique perspective 
            to everything I create. When I'm not diving into datasets or writing code, 
            you'll find me producing lofi beats or binge-watching One Piece.
          </p>
          <p>
            I believe in the power of technology to create meaningful experiences, 
            whether that's through data visualization, bioinformatics research, 
            or the perfect lofi track.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-gray-400 mb-8 flex items-center">
            <span className="mr-2">→</span> interests
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'Data Science',
              'Machine Learning',
              'Bioinformatics',
              'Music Production',
              'Lofi Hip Hop',
              'Anime',
              'Creative Coding',
              'UI Design',
              'Open Source',
            ].map((interest) => (
              <div
                key={interest}
                className="p-3 bg-[#131315] rounded-lg text-sm text-gray-400 hover:bg-[#1a1a1d] transition-colors"
              >
                {interest}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl text-gray-400 mb-8 flex items-center">
            <span className="mr-2">→</span> currently
          </h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <span className="text-gray-500">→</span>
              <p className="text-gray-400">
                Studying Data Science at Monash University
              </p>
            </div>
            <div className="flex items-start space-x-4">
              <span className="text-gray-500">→</span>
              <p className="text-gray-400">
                Working on bioinformatics research projects
              </p>
            </div>
            <div className="flex items-start space-x-4">
              <span className="text-gray-500">→</span>
              <p className="text-gray-400">
                Producing a new lofi EP
              </p>
            </div>
            <div className="flex items-start space-x-4">
              <span className="text-gray-500">→</span>
              <p className="text-gray-400">
                Watching: One Piece, catching up on Netflix shows
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 
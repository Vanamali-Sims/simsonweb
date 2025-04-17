export default function Music() {
  return (
    <div className="page-transition max-w-3xl mx-auto">
      <div className="mb-16">
        <h1 className="text-4xl font-light text-white">music</h1>
        <div className="h-1 w-20 bg-gradient-to-r from-gray-500 to-transparent mt-2"></div>
      </div>
      
      <div className="space-y-16">
        <section>
          <h2 className="text-xl text-gray-400 mb-8 flex items-center">
            <span className="mr-2">→</span> latest releases
          </h2>
          <div className="aspect-video w-full bg-[#131315] rounded-lg">
            {/* Placeholder for Spotify/YouTube embed */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Spotify Player Coming Soon
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl text-gray-400 mb-8 flex items-center">
            <span className="mr-2">→</span> about my music
          </h2>
          <div className="space-y-6 text-gray-400">
            <p>
              I produce lofi hip hop and rap beats, blending atmospheric samples
              with hard-hitting drums. My sound is influenced by both Indian classical
              music and modern hip hop production.
            </p>
            <p>
              You can find my music on Spotify, YouTube, and SoundCloud. I'm always
              open to collaborations with other artists and producers.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl text-gray-400 mb-8 flex items-center">
            <span className="mr-2">→</span> links
          </h2>
          <div className="flex flex-col space-y-4">
            <a
              href="https://spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors flex items-center"
            >
              <span>spotify</span>
              <span className="ml-1">→</span>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors flex items-center"
            >
              <span>youtube</span>
              <span className="ml-1">→</span>
            </a>
            <a
              href="https://soundcloud.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors flex items-center"
            >
              <span>soundcloud</span>
              <span className="ml-1">→</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  )
} 
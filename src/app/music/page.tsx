export default function Music() {
  return (
    <div className="page-transition max-w-3xl mx-auto">
      <h1 className="text-3xl font-light text-white mb-8">music</h1>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-lg text-gray-400 mb-6">latest releases</h2>
          <div className="aspect-video w-full bg-[#131315] rounded-lg">
            {/* Placeholder for Spotify/YouTube embed */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Spotify Player Coming Soon
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg text-gray-400 mb-6">about my music</h2>
          <div className="space-y-4 text-gray-400">
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
          <h2 className="text-lg text-gray-400 mb-6">links</h2>
          <div className="flex flex-col space-y-4">
            <a
              href="https://spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              spotify →
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              youtube →
            </a>
            <a
              href="https://soundcloud.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              soundcloud →
            </a>
          </div>
        </section>
      </div>
    </div>
  )
} 
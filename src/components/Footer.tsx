export default function Footer() {
  return (
    <footer className="relative z-10 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Vanamali Sims.
          </div>
          
          <div className="flex space-x-8">
            <a
              href="https://github.com/Vanamali-Sims"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              github
            </a>
            <a
              href="https://www.linkedin.com/in/van-sims"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              linkedin
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 
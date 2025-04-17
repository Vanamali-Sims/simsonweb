import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="page-transition">
      <section className="min-h-[80vh] flex flex-col justify-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Hi, I'm Simon
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
          A passionate developer crafting beautiful and functional web experiences.
          I specialize in building modern web applications with cutting-edge technologies.
        </p>
        <div className="flex gap-4">
          <a
            href="/projects"
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            View My Work
          </a>
          <a
            href="/contact"
            className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}

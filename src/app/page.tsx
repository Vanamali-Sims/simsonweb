import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="page-transition max-w-2xl mx-auto">
      <section className="min-h-[80vh] flex flex-col justify-center space-y-8">
        <div className="space-y-4">
          <p className="text-sm text-gray-500">hey, i'm</p>
          <h1 className="text-4xl md:text-5xl font-light text-white">
            simon
          </h1>
        </div>

        <div className="space-y-6 text-gray-400">
          <p className="text-lg leading-relaxed">
            Data Science student at Monash Clayton, crafting digital experiences
            and making music in my free time.
          </p>
          <p className="leading-relaxed">
            Currently exploring the intersection of bioinformatics, machine learning,
            and creative coding — while producing lofi beats and watching One Piece.
          </p>
        </div>

        <div className="pt-8 flex gap-8">
          <a
            href="/projects"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            view work →
          </a>
          <a
            href="/music"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            listen →
          </a>
        </div>
      </section>
    </div>
  );
}

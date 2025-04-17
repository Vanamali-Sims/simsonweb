import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="page-transition max-w-2xl mx-auto">
      <section className="min-h-[80vh] flex flex-col justify-center space-y-8">
        <div className="space-y-4">
          <p className="text-sm text-gray-500">greetings, i am</p>
          <h1 className="text-4xl md:text-5xl font-light text-white">
            Vanamali Sims
          </h1>
        </div>

        <div className="space-y-6 text-gray-400">
          <p className="text-lg leading-relaxed">
            Digital Alchemist at Monash Clayton, transforming data into insights
            and silence into symphonies.
          </p>
          <p className="leading-relaxed">
            Currently exploring the intersection of bioinformatics, machine learning,
            and creative coding — while crafting lofi beats and binge-watching One Piece.
          </p>
        </div>

        <div className="pt-8 flex gap-8">
          <a
            href="/projects"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            explore creations →
          </a>
          <a
            href="/music"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            tune in →
          </a>
        </div>
      </section>
    </div>
  );
}

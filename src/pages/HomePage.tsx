import { Link } from "react-router-dom";
import { RESOURCES, type ResourceType } from "@/lib/swapi";
import { ResourceIcon } from "@/components/ResourceIcon";
import { Topbar } from "@/components/Topbar";
import { motion } from "framer-motion";
import { usePageSEO } from "@/hooks/usePageSEO";

export default function HomePage() {
  usePageSEO({
    title: "Holocron",
    description: "Explore the Star Wars galaxy. Browse people, films, planets, species, starships and vehicles from the SWAPI database.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Holocron",
      description: "Star Wars Database Terminal — explore people, films, planets, species, starships and vehicles.",
      url: "https://jadzeino.github.io/holocron",
    },
  });
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <Topbar searchValue="" onSearchChange={() => {}} showSearch={false} />

      <main className="flex-1 overflow-auto flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl"
        >
          <p className="font-tactical text-accent mb-4">TERMINAL ONLINE</p>
          <h1 className="font-starwars text-3xl md:text-5xl text-accent mb-2 glow-text">
            Holocron
          </h1>
          <p className="font-tactical text-xs text-muted-foreground mb-8">
            Galactic Database Terminal
          </p>
          <p className="font-tactical text-muted-foreground mb-10 leading-relaxed">
            ACCESS GRANTED. SELECT A SECTOR TO BEGIN EXPLORATION.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
            {RESOURCES.map((resource, i) => (
              <motion.div
                key={resource}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={`/${resource}`}
                  className="datacard block border border-border p-4 text-center hover:bg-secondary transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <ResourceIcon resource={resource as ResourceType} className="h-6 w-6 mx-auto mb-2" />
                  <span className="font-tactical text-foreground">{resource}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

import { Link } from "react-router-dom";
import { getDisplayName, getDataFields } from "@/lib/swapi";
import { parseSwapiUrl } from "@/hooks/useResource";
import { motion } from "framer-motion";

interface DatacardProps {
  item: Record<string, unknown>;
  index: number;
}

export function Datacard({ item, index }: DatacardProps) {
  const parsed = parseSwapiUrl(item.url as string);
  if (!parsed) return null;

  const name = getDisplayName(item);
  const fields = getDataFields(item).slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/${parsed.resource}/${parsed.id}`}
        className="datacard block border border-border bg-card p-4 transition-all hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-accent"
        aria-label={`View details for ${name}`}
      >
        <h3 className="font-display text-sm text-foreground mb-3 truncate">
          {name}
        </h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          {fields.map(({ key, value }) => (
            <div key={key} className="min-w-0">
              <span className="font-tactical text-muted-foreground block truncate">
                {key.replace(/_/g, " ")}
              </span>
              <span className="text-xs text-foreground truncate block">{value}</span>
            </div>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}

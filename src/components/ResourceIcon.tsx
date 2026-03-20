import { Users, Film, Globe, Dna, Rocket, Car, type LucideProps } from "lucide-react";
import type { ResourceType } from "@/lib/swapi";

const iconMap: Record<ResourceType, React.FC<LucideProps>> = {
  people: Users,
  films: Film,
  planets: Globe,
  species: Dna,
  starships: Rocket,
  vehicles: Car,
};

interface ResourceIconProps extends LucideProps {
  resource: ResourceType;
}

export function ResourceIcon({ resource, className = "h-4 w-4", ...props }: ResourceIconProps) {
  const Icon = iconMap[resource];
  return <Icon className={className} {...props} />;
}

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  imagePosition: "left" | "right";
  image?: string;
  github?: string;
  live?: string;
  isPlaceholder?: boolean;
}

export default function ProjectCard({
  title,
  description,
  tech,
  imagePosition,
  image,
  github,
  live,
  isPlaceholder = false,
}: ProjectCardProps) {
  const layoutClass = imagePosition === "left" ? "flex-row" : "flex-row-reverse";

  return (
    <div
      className={`flex ${layoutClass} gap-4 w-full min-w-0 ${isPlaceholder ? "opacity-75" : ""}`}
    >
      {/* Image area - fixed aspect ratio */}
      <div className="flex-shrink-0 w-1/3 min-w-0 aspect-video rounded overflow-hidden bg-[var(--color-muted)]/10 border border-white/5">
        {image ? (
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[var(--color-muted)]/20" aria-hidden />
        )}
      </div>

      {/* Content column - min width so description isn't clipped */}
      <div className="flex flex-col gap-2 min-w-[55%] flex-1 overflow-visible">
        <h3 className="text-lg font-heading font-bold break-words text-[var(--color-fg)]">{title}</h3>
        {tech.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 text-xs bg-[var(--color-accent)] rounded-md"
              >
                {t}
              </span>
            ))}
          </div>
        )}
        <p className="text-sm break-words text-[var(--color-muted)]">{description}</p>
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-sm rounded text-[var(--color-fg)] bg-[var(--color-accent)]"
            >
              GitHub
            </a>
          )}
          {(live || isPlaceholder) && (
            <a
              href={live || "#"}
              target={live ? "_blank" : undefined}
              rel={live ? "noopener noreferrer" : undefined}
              className="px-3 py-1.5 text-sm rounded text-[var(--color-fg)] bg-[var(--color-accent)]"
            >
              View Project
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

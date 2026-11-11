export default function ProjectCard({ title, description, tech, link }) {
  return (
    <div className="project-card">
      <h3>{title}</h3>
      <p>{description}</p>

      <div className="skill-tags">
        {tech.map((t) => (
          <span key={t} className="skill-tag">{t}</span>
        ))}
      </div>

      <a href={link} target="_blank" rel="noreferrer" className="project-link">
        View Project →
      </a>
    </div>
  );
}
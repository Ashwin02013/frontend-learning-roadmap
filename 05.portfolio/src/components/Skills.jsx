const skillGroups = [
  {
    id: 1,
    title: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    id: 2,
    title: "Backend",
    skills: ["Node.js", "Express", "FastAPI", "Spring Boot"],
  },
  {
    id: 3,
    title: "Database",
    skills: ["PostgreSQL"],
  },
  {
    id: 4,
    title: "Cloud and Tools",
    skills: ["AWS", "Git", "GitHub", "VS Code"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <h2 className="section-title">Skills</h2>
      <p className="section-subtitle">Technologies I work with</p>

      <div className="skills-grid">
        {skillGroups.map((group) => (
          <div key={group.id} className="skill-group">
            <h3>{group.title}</h3>
            <div className="skill-tags">
              {group.skills.map((skill) => (
                <span key={skill} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
const highlights = [
  { id: 1, title: "Frontend", text: "React, HTML, CSS, JavaScript" },
  { id: 2, title: "Backend", text: "Node.js, Express" },
  { id: 3, title: "Cloud", text: "AWS: S3, CloudFront, EC2, RDS, Cognito" },
  { id: 4, title: "Focus", text: "Browser-based media and video tools" },
];

export default function About() {
  return (
    <section id="about" className="about">
      <h2 className="section-title">About Me</h2>
      <p className="section-subtitle">A little about who I am and what I do</p>

      <div className="about-wrapper">
        <div className="about-text">
          <p>
            I'm a developer from India who builds full-stack web and cloud
            applications. I enjoy turning ideas into working products, from
            the interface people see to the servers behind it.
          </p>
          <p>
            I'm currently strengthening my skills in React and building this
            portfolio step by step.
          </p>
        </div>

        <div className="about-cards">
          {highlights.map((item) => (
            <div key={item.id} className="about-card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
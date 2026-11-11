export default function Hero() {
  return (
    <section id="home" className="hero">
      <p className="hero-greeting">Hi, my name is</p>
      <h1 className="hero-name">Ashwin</h1>
      <h2 className="hero-role">Full-Stack Developer</h2>
      <p className="hero-text">
        I build web applications with React, Node.js and AWS.
      </p>

      <div className="hero-buttons">
        <a href="#projects" className="btn btn-primary">View Projects</a>
        <a href="#contact" className="btn btn-outline">Contact Me</a>
      </div>
    </section>
  );
}
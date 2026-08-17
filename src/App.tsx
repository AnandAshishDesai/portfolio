import { useState, useEffect } from 'react';
import { Menu, X, Mail, Download, Shield, Terminal, Cpu, Database, Server, Sun, Moon, ArrowUp, BookOpen, ExternalLink } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { resumeData } from './data/resumeData';

const App = () => {
  const [theme, setTheme] = useState('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Initialize Theme
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute('data-theme', storedTheme);
    } else if (systemPrefersDark) {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Scroll Observers for Active Nav & Scroll-to-Top
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('section').forEach(section => {
      sectionObserver.observe(section);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sectionObserver.disconnect();
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Added Publications to Navigation
  const navItems = ['About', 'Skills', 'Experience', 'Projects', 'Publications', 'Education', 'Contact'];

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      
      {/* Navigation */}
      <header style={{ position: 'sticky', top: 0, backgroundColor: 'var(--bg-surface)', zIndex: 100, borderBottom: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
        <nav style={{ maxWidth: '1100px', margin: '0 auto', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="#" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-primary)' }} aria-label="Home">
            Anand Desai<span style={{ color: 'var(--accent-primary)' }}>_</span>
          </a>
          
          <div className="flex items-center gap-4">
            <ul style={{ display: 'none' }} className="nav-links md-flex items-center gap-4">
              {navItems.map(item => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            <button onClick={toggleTheme} className="theme-toggle" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button 
              className="md-hidden" 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>
        
        {isMenuOpen && (
          <div style={{ backgroundColor: 'var(--bg-elevated)', padding: '1rem', borderBottom: '1px solid var(--border)' }} className="md-hidden">
            <ul className="flex flex-col gap-4">
              {navItems.map(item => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    onClick={() => setIsMenuOpen(false)} 
                    className={`nav-link flex ${activeSection === item.toLowerCase() ? 'active' : ''}`}
                    style={{ fontSize: '1.1rem' }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <style>{`
        @media (min-width: 768px) {
          .md-hidden { display: none !important; }
          .md-flex { display: flex !important; }
        }
      `}</style>

      <main id="main-content">
        
        {/* PROFILE HEADER (Hero Section) */}
        <section id="hero" style={{ paddingTop: '5rem', paddingBottom: '2rem' }}>
          {/* <div style={{ color: 'var(--accent-primary)', fontFamily: 'monospace', marginBottom: '1.5rem', fontWeight: 600 }}>
            $ ./initialize_portfolio.sh
          </div> */}
          
          <div className="flex items-center" style={{ marginBottom: '2rem', flexWrap: 'wrap', gap: '2rem' }}>
            <img 
              src="/Anand.JPG" 
              alt="Anand Desai - Professional Headshot" 
              style={{ 
                width: 'clamp(150px, 18vw, 220px)', 
                height: 'clamp(150px, 18vw, 220px)', 
                borderRadius: '50%', 
                objectFit: 'cover', 
                border: '4px solid var(--bg-surface)', 
                outline: '3px solid var(--accent-primary)', 
                outlineOffset: '4px', 
                boxShadow: 'var(--shadow)' 
              }}
            />
            <div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.1', marginBottom: '0.5rem' }}>Anand Desai</h1>
              <h2 style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', color: 'var(--text-secondary)', fontWeight: 400 }}>{resumeData.personal.role}</h2>
            </div>
          </div>
          
          <p className="text-muted" style={{ marginBottom: '2rem', maxWidth: '600px', fontSize: '1.1rem' }}>
            Specializing in secure IT infrastructure, AI-driven authentication, and network troubleshooting.
          </p>
          
          <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="/Anand_Desai_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn"><Download size={18} /> Resume</a>
            <a href="#contact" className="btn">Contact Me</a>
          </div>
        </section>

        {/* About Section */}
        <section id="about" style={{ paddingTop: '2rem' }}>
          <h2 className="section-title">About Me</h2>
          <div style={{ maxWidth: '800px', fontSize: '1.1rem' }} className="text-muted">
            <p>{resumeData.summary}</p>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills">
          <h2 className="section-title">Technical Skills</h2>
          <div className="grid grid-cols-1 md-grid-cols-2">
            {Object.entries(resumeData.skills).map(([category, skills]) => (
              <div key={category} className="card">
                <h3 style={{ textTransform: 'capitalize', marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                  {category === 'cybersecurity' && <Shield size={20} color="var(--accent-primary)" />}
                  {category === 'programming' && <Terminal size={20} color="var(--accent-primary)" />}
                  {category === 'ai' && <Cpu size={20} color="var(--accent-primary)" />}
                  {category === 'cloud' && <Server size={20} color="var(--accent-primary)" />}
                  {category === 'tools' && <Database size={20} color="var(--accent-primary)" />}
                  {category}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {skills.map(skill => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience">
          <h2 className="section-title">Experience</h2>
          <div className="flex flex-col gap-4">
            {resumeData.experience.map((job, idx) => (
              <article key={idx} className="card" style={{ borderLeft: '4px solid var(--accent-secondary)' }}>
                <div className="flex justify-between" style={{ flexWrap: 'wrap', marginBottom: '1rem', gap: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>{job.title}</h3>
                    <p style={{ color: 'var(--accent-primary)', fontWeight: '500' }}>{job.company}</p>
                  </div>
                  <span className="text-muted" style={{ fontSize: '0.9rem', backgroundColor: 'var(--bg-main)', padding: '0.35rem 0.75rem', borderRadius: '4px', border: '1px solid var(--border)', height: 'fit-content' }}>{job.date}</span>
                </div>
                <ul style={{ paddingLeft: '1.25rem', listStyleType: 'square' }} className="text-muted">
                  {job.bullets.map((bullet, i) => (
                    <li key={i} style={{ marginBottom: '0.5rem' }}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <h2 className="section-title">Projects</h2>
          <div className="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-3">
            {resumeData.projects.map((proj, idx) => (
              <article key={idx} className="card flex flex-col justify-between">
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{proj.title}</h3>
                  <p style={{ color: 'var(--accent-tertiary)', fontSize: '0.85rem', marginBottom: '1.25rem', fontFamily: 'monospace', fontWeight: 600 }}>{proj.tech}</p>
                  <p className="text-muted" style={{ marginBottom: '2rem', fontSize: '0.95rem' }}>{proj.description}</p>
                </div>
                <div>
                  {proj.link ? (
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="btn btn-circle" aria-label={`View ${proj.title} code on GitHub`}>
                      <FaGithub size={20} />
                    </a>
                  ) : (
                    <span className="btn" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem', opacity: 0.5, cursor: 'not-allowed', width: '100%' }}>Repository available on request</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* NEW: Publications Section */}
        <section id="publications">
          <h2 className="section-title">Publications</h2>
          <div className="grid grid-cols-1 md-grid-cols-2">
            {resumeData.publications.map((pub, idx) => (
              <article key={idx} className="card flex flex-col justify-between">
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <BookOpen size={24} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{pub.title}</span>
                  </h3>
                  <p style={{ color: 'var(--text-primary)', fontWeight: '500', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                    {pub.authors}
                  </p>
                  <p className="text-muted" style={{ marginBottom: '1rem', fontSize: '0.9rem', fontStyle: 'italic' }}>
                    {pub.journal} • {pub.volumeIssue} • {pub.date}
                  </p>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <span className="skill-tag" style={{ display: 'inline-block', marginBottom: '0.75rem' }}>
                      {pub.researchArea}
                    </span>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                      DOI: {pub.doi}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
                  <a href={pub.pubUrl} target="_blank" rel="noopener noreferrer" className="btn" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }} aria-label={`View ${pub.title} on the journal website`}>
                    <ExternalLink size={16} /> View Publication
                  </a>
                  <a href={pub.doiUrl} target="_blank" rel="noopener noreferrer" className="btn" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }} aria-label={`Open DOI for ${pub.title}`}>
                    <Database size={16} /> View DOI
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education">
          <h2 className="section-title">Education</h2>
          <div className="flex flex-col gap-4">
            {resumeData.education.map((edu, idx) => (
              <article key={idx} className="card flex justify-between items-center" style={{ flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{edu.degree}</h3>
                  <p className="text-muted">{edu.school}</p>
                </div>
                <div style={{ textAlign: 'left', minWidth: '150px' }}>
                  <div style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: 500 }}>{edu.date}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{edu.gpa}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <h2 className="section-title">Contact</h2>
          <div className="card text-center" style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', padding: '3rem 2rem' }}>
            <p className="text-muted" style={{ fontSize: '1.1rem' }}>I'm currently seeking new opportunities in cybersecurity, IT support, and systems administration. My inbox is always open.</p>
            
            <div className="flex gap-4">
              <a href={`mailto:${resumeData.personal.email}`} className="btn btn-circle" aria-label="Email Me">
                <Mail size={22} />
              </a>
              <a href={resumeData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-circle" aria-label="LinkedIn Profile">
                <FaLinkedin size={22} />
              </a>
              <a href={resumeData.personal.github} target="_blank" rel="noopener noreferrer" className="btn btn-circle" aria-label="GitHub Profile">
                <FaGithub size={22} />
              </a>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              * Using a standard mailto link to respect your privacy and avoid third-party tracking/spam from generic form APIs.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: 'var(--bg-surface)', padding: '2rem', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
        <p className="text-muted" style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>© {new Date().getFullYear()} Anand Desai. All rights reserved.</p>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Built with React and deployed on GitHub Pages</p>
      </footer>

      {/* Scroll to Top Button */}
      <button 
        onClick={scrollToTop} 
        className={`scroll-top ${showScrollTop ? 'visible' : ''}`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
};

export default App;
import React from "react";
import "./ProfessionalTemplate.css";

const ProfessionalTemplate = ({ resumeData, isPreview }) => {
  if (isPreview) {
    return (
      <div className="professional-template professional-preview">
        <header className="professional-header">
          <div className="professional-name-title">
            <h1>John Doe</h1>
            <div className="professional-contact">
              <span>john@example.com</span>
            </div>
          </div>
        </header>

        <main className="professional-main">
          <section className="professional-section">
            <h2>Professional Summary</h2>
            <div className="professional-summary">
              <p>
                Experienced professional with expertise in JavaScript, React,
                and Node.js.
              </p>
            </div>
          </section>

          <section className="professional-section">
            <h2>Core Competencies</h2>
            <div className="professional-skills">
              <div className="professional-skill-item">• JavaScript</div>
              <div className="professional-skill-item">• React</div>
              <div className="professional-skill-item">• Node.js</div>
            </div>
          </section>

          <section className="professional-section">
            <h2>Professional Experience</h2>
            <div className="professional-experience">
              <p>Senior Developer at Tech Corp</p>
            </div>
          </section>

          <section className="professional-section">
            <h2>Education</h2>
            <div className="professional-education">
              <p>B.S. in Computer Science</p>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="professional-template">
      <header className="professional-header">
        <div className="professional-name-title">
          <h1>{resumeData.personalInfo.fullName}</h1>
          <h2>{resumeData.personalInfo.title}</h2>
          <div className="professional-contact">
            <span>{resumeData.contact.email}</span>
            {resumeData.contact.phone && (
              <span> | {resumeData.contact.phone}</span>
            )}
            {resumeData.contact.location && (
              <span> | {resumeData.contact.location}</span>
            )}
            {resumeData.contact.linkedin && (
              <span>
                {" "}
                |{" "}
                <a
                  href={resumeData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="professional-main">
        {resumeData.professionalSummary && (
          <section className="professional-section">
            <h2>Professional Summary</h2>
            <div className="professional-summary">
              <p>{resumeData.professionalSummary}</p>
            </div>
          </section>
        )}

        {resumeData.skills.length > 0 && (
          <section className="professional-section">
            <h2>Core Competencies</h2>
            <div className="professional-skills">
              {resumeData.skills.map((skill, index) => (
                <div key={index} className="professional-skill-item">
                  • {skill}
                </div>
              ))}
            </div>
          </section>
        )}

        {resumeData.workExperience.length > 0 && (
          <section className="professional-section">
            <h2>Professional Experience</h2>
            <div className="professional-experience">
              {resumeData.workExperience.map((exp, index) => (
                <div key={index} className="professional-experience-item">
                  <h3>{exp.position}</h3>
                  <h4>{exp.company}</h4>
                  <p className="professional-duration">{exp.duration}</p>
                  <p>{exp.responsibilities}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {resumeData.education.length > 0 && (
          <section className="professional-section">
            <h2>Education</h2>
            <div className="professional-education">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="professional-education-item">
                  <h3>{edu.degree}</h3>
                  <h4>{edu.institution}</h4>
                  <p>
                    {edu.year}
                    {edu.gpa && ` | GPA: ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {resumeData.certifications?.length > 0 && (
          <section className="professional-section">
            <h2>Certifications</h2>
            <div className="professional-certifications">
              {resumeData.certifications.map((cert, index) => (
                <div key={index} className="professional-certification-item">
                  <strong>{cert.name}</strong> | {cert.organization} |{" "}
                  {cert.year}
                </div>
              ))}
            </div>
          </section>
        )}

        {resumeData.languages?.length > 0 && (
          <section className="professional-section">
            <h2>Languages</h2>
            <div className="professional-languages">
              {resumeData.languages.map((lang, index) => (
                <div key={index} className="professional-language-item">
                  {lang.language} - {lang.proficiency}
                </div>
              ))}
            </div>
          </section>
        )}

        {resumeData.projects?.length > 0 && (
          <section className="professional-section">
            <h2>Notable Projects</h2>
            <div className="professional-projects">
              {resumeData.projects.map((project, index) => (
                <div key={index} className="professional-project-item">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <p className="professional-technologies">
                    <strong>Technologies:</strong> {project.technologies}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {resumeData.awards?.length > 0 && (
          <section className="professional-section">
            <h2>Awards & Achievements</h2>
            <div className="professional-awards">
              {resumeData.awards.map((award, index) => (
                <div key={index} className="professional-award-item">
                  <strong>{award.name}</strong> | {award.organization} |{" "}
                  {award.year}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <div className="professional-declaration">
        <p>
          <span className="checkbox-icon">☑</span> I hereby declare that all the
          information given above is true and correct to the best of my
          knowledge
        </p>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;

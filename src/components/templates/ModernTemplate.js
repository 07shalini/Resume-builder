import React from "react";
import "./ModernTemplate.css";

const ModernTemplate = ({ resumeData, isPreview }) => {
  if (isPreview) {
    return (
      <div className="modern-template modern-preview">
        <header className="modern-header">
          <h1>John Doe</h1>
          <p className="modern-contact">john@example.com</p>
        </header>

        <section className="modern-skills">
          <h2>Skills</h2>
          <div className="modern-skills-grid">
            <span className="modern-skill-tag">JavaScript</span>
            <span className="modern-skill-tag">React</span>
            <span className="modern-skill-tag">Node.js</span>
          </div>
        </section>

        <section className="modern-experience">
          <h2>Experience</h2>
          <div className="modern-content">
            <p>Senior Developer at Tech Corp</p>
          </div>
        </section>

        <section className="modern-education">
          <h2>Education</h2>
          <div className="modern-content">
            <p>B.S. in Computer Science</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="modern-template">
      <header className="modern-header">
        <h1>{resumeData.personalInfo.fullName}</h1>
        <p className="modern-contact">{resumeData.contact.email}</p>
        {resumeData.contact.phone && (
          <p className="modern-contact">{resumeData.contact.phone}</p>
        )}
        {resumeData.contact.location && (
          <p className="modern-contact">{resumeData.contact.location}</p>
        )}
      </header>

      {resumeData.professionalSummary && (
        <section className="modern-summary">
          <h2>Professional Summary</h2>
          <div className="modern-content">
            <p>{resumeData.professionalSummary}</p>
          </div>
        </section>
      )}

      {resumeData.skills.length > 0 && (
        <section className="modern-skills">
          <h2>Skills</h2>
          <div className="modern-skills-grid">
            {resumeData.skills.map((skill, index) => (
              <span key={index} className="modern-skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {resumeData.workExperience.length > 0 && (
        <section className="modern-experience">
          <h2>Work Experience</h2>
          <div className="modern-content">
            {resumeData.workExperience.map((exp, index) => (
              <div key={index} className="modern-experience-item">
                <h3>
                  {exp.position} at {exp.company}
                </h3>
                <p className="modern-duration">{exp.duration}</p>
                <p>{exp.responsibilities}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {resumeData.education.length > 0 && (
        <section className="modern-education">
          <h2>Education</h2>
          <div className="modern-content">
            {resumeData.education.map((edu, index) => (
              <div key={index} className="modern-education-item">
                <h3>{edu.degree}</h3>
                <p>
                  {edu.institution} | {edu.year}
                </p>
                {edu.gpa && <p>GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {resumeData.certifications?.length > 0 && (
        <section className="modern-certifications">
          <h2>Certifications</h2>
          <div className="modern-content">
            {resumeData.certifications.map((cert, index) => (
              <div key={index} className="modern-certification-item">
                <strong>{cert.name}</strong> - {cert.organization} ({cert.year})
              </div>
            ))}
          </div>
        </section>
      )}

      {resumeData.languages?.length > 0 && (
        <section className="modern-languages">
          <h2>Languages</h2>
          <div className="modern-content">
            {resumeData.languages.map((lang, index) => (
              <div key={index} className="modern-language-item">
                <strong>{lang.language}</strong> - {lang.proficiency}
              </div>
            ))}
          </div>
        </section>
      )}

      {resumeData.projects?.length > 0 && (
        <section className="modern-projects">
          <h2>Notable Projects</h2>
          <div className="modern-content">
            {resumeData.projects.map((project, index) => (
              <div key={index} className="modern-project-item">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <p className="modern-technologies">
                  Technologies: {project.technologies}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {resumeData.awards?.length > 0 && (
        <section className="modern-awards">
          <h2>Awards & Achievements</h2>
          <div className="modern-content">
            {resumeData.awards.map((award, index) => (
              <div key={index} className="modern-award-item">
                <strong>{award.name}</strong> - {award.organization} (
                {award.year})
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="modern-declaration">
        <p>
          <span className="checkbox-icon">☑</span> I hereby declare that all the
          information given above is true and correct to the best of my
          knowledge
        </p>
      </div>
    </div>
  );
};

export default ModernTemplate;

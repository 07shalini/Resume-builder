import React from "react";
import "./CreativeTemplate.css";

const CreativeTemplate = ({ resumeData, isPreview }) => {
  if (isPreview) {
    return (
      <div className="creative-template creative-preview">
        <div className="creative-sidebar">
          <div className="creative-profile">
            <h1>John Doe</h1>
            <div className="creative-contact">
              <span>john@example.com</span>
            </div>
          </div>

          <div className="creative-skills-section">
            <h2>Skills</h2>
            <div className="creative-skills">
              <div className="creative-skill-tag">JavaScript</div>
              <div className="creative-skill-tag">React</div>
              <div className="creative-skill-tag">Node.js</div>
            </div>
          </div>
        </div>

        <div className="creative-main">
          <section className="creative-section">
            <div className="creative-section-header">
              <h2>Experience</h2>
              <div className="creative-line"></div>
            </div>
            <div className="creative-content">
              <p>Senior Developer at Tech Corp</p>
            </div>
          </section>

          <section className="creative-section">
            <div className="creative-section-header">
              <h2>Education</h2>
              <div className="creative-line"></div>
            </div>
            <div className="creative-content">
              <p>B.S. in Computer Science</p>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="creative-template">
      <div className="creative-sidebar">
        <div className="creative-profile">
          <h1>{resumeData.personalInfo.fullName}</h1>
          <h2>{resumeData.personalInfo.title}</h2>
          <div className="creative-contact">
            <div>{resumeData.contact.email}</div>
            {resumeData.contact.phone && <div>{resumeData.contact.phone}</div>}
            {resumeData.contact.location && (
              <div>{resumeData.contact.location}</div>
            )}
            {resumeData.contact.linkedin && (
              <div>
                <a
                  href={resumeData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            )}
          </div>
        </div>

        {resumeData.skills.length > 0 && (
          <div className="creative-skills-section">
            <h2>Skills</h2>
            <div className="creative-skills">
              {resumeData.skills.map((skill, index) => (
                <div key={index} className="creative-skill-tag">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {resumeData.languages?.length > 0 && (
          <div className="creative-languages-section">
            <h2>Languages</h2>
            <div className="creative-languages">
              {resumeData.languages.map((lang, index) => (
                <div key={index} className="creative-language-item">
                  <span>{lang.language}</span>
                  <span>{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="creative-main">
        {resumeData.professionalSummary && (
          <section className="creative-section">
            <div className="creative-section-header">
              <h2>Professional Summary</h2>
              <div className="creative-line"></div>
            </div>
            <div className="creative-content">
              <p>{resumeData.professionalSummary}</p>
            </div>
          </section>
        )}

        {resumeData.workExperience.length > 0 && (
          <section className="creative-section">
            <div className="creative-section-header">
              <h2>Experience</h2>
              <div className="creative-line"></div>
            </div>
            <div className="creative-content">
              {resumeData.workExperience.map((exp, index) => (
                <div key={index} className="creative-experience-item">
                  <h3>{exp.position}</h3>
                  <h4>{exp.company}</h4>
                  <p className="creative-duration">{exp.duration}</p>
                  <p>{exp.responsibilities}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {resumeData.education.length > 0 && (
          <section className="creative-section">
            <div className="creative-section-header">
              <h2>Education</h2>
              <div className="creative-line"></div>
            </div>
            <div className="creative-content">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="creative-education-item">
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
          <section className="creative-section">
            <div className="creative-section-header">
              <h2>Certifications</h2>
              <div className="creative-line"></div>
            </div>
            <div className="creative-content">
              {resumeData.certifications.map((cert, index) => (
                <div key={index} className="creative-certification-item">
                  <h3>{cert.name}</h3>
                  <p>
                    {cert.organization} | {cert.year}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {resumeData.projects?.length > 0 && (
          <section className="creative-section">
            <div className="creative-section-header">
              <h2>Notable Projects</h2>
              <div className="creative-line"></div>
            </div>
            <div className="creative-content">
              {resumeData.projects.map((project, index) => (
                <div key={index} className="creative-project-item">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <p className="creative-technologies">
                    Technologies: {project.technologies}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {resumeData.awards?.length > 0 && (
          <section className="creative-section">
            <div className="creative-section-header">
              <h2>Awards & Achievements</h2>
              <div className="creative-line"></div>
            </div>
            <div className="creative-content">
              {resumeData.awards.map((award, index) => (
                <div key={index} className="creative-award-item">
                  <h3>{award.name}</h3>
                  <p>
                    {award.organization} | {award.year}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      <div className="creative-declaration">
        <p>
          <span className="checkbox-icon">☑</span> I hereby declare that all the
          information given above is true and correct to the best of my
          knowledge
        </p>
      </div>
    </div>
  );
};

export default CreativeTemplate;

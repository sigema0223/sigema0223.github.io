import React, { useState } from "react";
import "./Projects.css";

const projects = [
  {
    title: "Surrf",
    description: "Chrome extension for video automation",
    details:
      "The extension automates the creation of videos based on structured web content, enhancing user productivity and simplifying data visualization with JavaScript and APIs.",
    image: "surrf.png",
  },
  {
    title: "Student Grading Website",
    description: "Full-stack system using Java & React",
    details:
      "This project is a full-stack web application developed using React for the frontend, Java and Spring Boot for the backend, and an H2 in-memory database for temporary data storage.",
    image: "grading.png",
  },
  {
    title: "Winter Sports Game",
    description: "Unity-based game for NAS project",
    details:
      "Developed Winter Sports game such as Snowball throwing and Snow star shapes by using Unity to help children in need. Currently receiving feedback from schools to enhance the quality.",
    image: "snowball.png",
  },
];

function Projects() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="projects-container">
      <h1>Projects</h1>

      {/* ??? ???? ??? ???? */}
      <div className="featured-project">
        <img src={projects[selectedIndex].image} alt={projects[selectedIndex].title} />
        <h2>{projects[selectedIndex].title}</h2>
        <p className="short-description">{projects[selectedIndex].description}</p>
        <p className="detailed-description">{projects[selectedIndex].details}</p>
      </div>

      {/* ??? ??? ??? */}
      <div className="thumbnail-container">
        {projects.map((project, index) => (
          <img
            key={index}
            src={project.image}
            alt={project.title}
            className={`thumbnail ${index === selectedIndex ? "active" : ""}`}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Projects;

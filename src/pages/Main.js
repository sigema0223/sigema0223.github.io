import "./Main.css";

function Main() {
  return (
    <div className="main-container">
      <div className="header-wrapper">
        <h1>Hi, I'm Hyunwoo Lee</h1>
        <div className="profile-image">
          <img src="/myPhoto.jpg" alt="Hyunwoo Lee" />
        </div>
      </div>

      <div className="content-wrapper">
        <div className="text-content">
          <section>
            <p>Software Engineer & UCL CS Student</p>
            <p className="left-align">
              Computer Science undergraduate with a solid academic background and hands-on experience in software development, algorithms, and programming. 
              Proficient in Java and Python, with a strong interest in Large Language Model (LLM), Human Computer Interaction (HCI), and Financial Computing.
              Enthusiastic about applying my skills to real-world challenges and collaborative projects, aiming to contribute to innovative solutions in the tech industry.
            </p>
          </section>

          <section>
            <h2>Education</h2>
            <p><strong>University College London (UCL)</strong></p>
            <p>MEng Computer Science (2021 - 2027)</p>
          </section>

          <section>
            <h2>Experience</h2>
            <ul className="society-list">
              <li><strong>Republic of Korea Air Force</strong> (2022-2024) - Managed 17th Fighter Wing network</li>
              <li><strong>National Autistic Society</strong> (2024-2025) - Developed Winter Sports Game</li>
              <li><strong>LJ snc Research Intern</strong> (2025) - Conducted tech market research</li>
            </ul>
          </section>

          <section>
            <h2>Projects</h2>
            <ul className="society-list">
              <li><strong>Surrf</strong> - Chrome extension for video automation</li>
              <li><strong>Student Grading Website</strong> - Full-stack system using Java & React</li>
              <li><strong>Winter Sports Game</strong> - Unity-based game for NAS project</li>
            </ul>
          </section>

          <section>
            <h2>Society</h2>
            <ul className="society-list">
                <li><strong>UCLKS</strong> - IT Director (2024-2025)</li>
                <li><strong>AI Society</strong> - Member</li>
            </ul>
        </section>


          <section>
            <h2>Contact</h2>
            <p>Email: <a href="mailto:hyunwoo.lee.21@ucl.ac.uk">hyunwoo.lee.21@ucl.ac.uk</a></p>
            <p>GitHub: <a href="https://github.com/sigema0223">github.com/sigema0223</a></p>
            <p>Phone (KR): <a href="tel:+821085423556">+82 10-8542-3556</a></p>
            <p>Phone (UK): <a href="tel:+447470816755">+44 7470 816755</a></p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Main;

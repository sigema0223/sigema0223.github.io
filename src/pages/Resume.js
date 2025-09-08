import React from "react";

function Resume() {
  return (
    <div>
      <h1>My Resume</h1>
      <iframe
        src="/Hyunwoo_Lee_CV.pdf"
        width="100%"
        height="800px"
        style={{ border: "none" }}
        title="Resume"
      ></iframe>
    </div>
  );
}

export default Resume;
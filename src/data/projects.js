// 프로젝트 데이터 - 유지보수를 위해 별도 파일로 관리
import budgetDietHero from '../KakaoTalk_20260210_140903078_01.jpg';
import budgetDietDashboard from '../KakaoTalk_20260210_140903078.jpg';
import nasImage from '../image/nas.PNG';
import snowballImage from '../image/snowball.PNG';
import icnlImage from '../image/icnl.jpg';
import llmImage from '../image/llm.png';
import airforceImage from '../image/airforce.jpg';

export const projects = [
  {
    id: 0,
    title: "Budget Diet",
    subtitle: "Smart Financial Health Tracker",
    category: "Full-Stack Web",
    date: "2026",
    accentColor: "#EFD19F",
    overview: "Budget Diet goes beyond simple expense tracking by utilizing LLM (Large Language Model) capabilities to analyze financial habits. Users can upload raw bank statements (PDF), which are parsed and processed by OpenAI's GPT engine to categorize spending and identify \"wasteful\" expenses automatically. Built with a Real-time Serverless Architecture using Convex, it ensures instant data synchronization across devices. The UI features a highly responsive Glassmorphism design powered by Framer Motion, making financial management feel effortless and modern.",
    keyFeatures: [
      "Automated Document Parsing: Integrated pdf-parse to convert raw bank statements into structured JSON data for analysis",
      "AI-Driven Insights: Utilizes OpenAI API to generate personalized \"spending diet\" recommendations based on monthly patterns",
      "Real-time Sync & Backend: Leveraged Convex for a reactive backend, ensuring sub-second latency for data updates without manual refreshing",
      "Interactive Visualization: Implemented dynamic financial charts using Recharts, featuring animated transitions and custom tooltips"
    ],
    technologies: ["TypeScript", "Vite", "Convex", "OpenAI API", "pdf-parse", "Vercel"],
    media: [
      { type: "image", url: budgetDietHero },
      { type: "image", url: budgetDietDashboard }
    ],
    link: "https://budget-diet.vercel.app",
    github: "https://github.com/sigema0223/BudgetDiet",
    year: "2026"
  },
  {
    id: 1,
    title: "Korea University – ICNL",
    subtitle: "Student Research Intern",
    category: "Research Internship",
    date: "Jun 2025 - Sep 2025",
    accentColor: "#EFD19F",
    overview: "Student Research Intern at the Intelligent Computing & Networking Laboratory (ICNL), Korea University, building LLM-based orchestration and proactive end-of-sequence (EOS) prediction systems to make large-scale AI experiments faster, cheaper, and more reliable.",
    keyFeatures: [
      "LLM Orchestration & Speculative Decoding: Fine-tuned LLMs on 100M+ tokens for AI orchestration and implemented speculative decoding at inference, achieving ~40% higher task success, increased tokens-per-second throughput, and ~15% lower perplexity.",
      "Proactive EOS Prediction: Built a proactive LLM-based end-of-sequence (EOS) prediction system with calibrated confidence thresholds, integrated into the benchmarking pipeline to enable early termination of low-value generations and significantly faster experiment cycles.",
      "Benchmark & Method Survey: Surveyed and compared existing LLM benchmarks for agentic and long-horizon tasks, highlighting limitations of static accuracy metrics and synthesizing findings into task-success–oriented evaluation criteria while cataloguing recent speculative decoding methods from arXiv and major conferences."
    ],
    technologies: ["LLMs", "Speculative Decoding", "PyTorch", "Python", "Experiment Orchestration", "Hugging Face", "Benchmarking"],
    media: [
      { type: "image", url: llmImage },
      { type: "image", url: icnlImage }
    ],
    link: "https://icnl.korea.ac.kr/",
    github: "",
    year: "2025"
  },
  {
    id: 2,
    title: "National Autistic Society (NAS)",
    subtitle: "Software Engineer Intern",
    category: "Game Development",
    date: "Oct 2024 - Mar 2025",
    accentColor: "#EFD19F",
    overview: "Software Engineer Intern at the National Autistic Society (NAS) in London, building an accessible winter sports game experience for autistic students using Unity and C#.",
    keyFeatures: [
      "Accessible Winter Sports Game: Developed a winter sports game from scratch in Unity and C#, implementing snowball throwing and snowflake shaping mechanics with motion tracking, gesture recognition, and optimized physics.",
      "Deployment & User Impact: Deployed the game at two partner schools and raised user satisfaction to over 90% by reducing input latency, improving control smoothness, and iterating on new gameplay features from user feedback."
    ],
    technologies: ["Unity", "C#", "Motion Tracking", "Gesture Recognition", "Game Physics", "User Testing"],
    media: [
      { type: "image", url: nasImage },
      { type: "image", url: snowballImage }
    ],
    link: "https://students.cs.ucl.ac.uk/2024/group7/index.html",
    github: "",
    year: "2024-2025"
  },
  {
    id: 3,
    title: "LJ SNC",
    subtitle: "Technology Research Intern",
    category: "Technology Research",
    date: "Dec 2024 - Jan 2025",
    accentColor: "#EFD19F",
    overview: "Technology Research Intern at LJ SNC in Seoul, synthesizing market intelligence and hardening Java services to inform product bets and improve system reliability.",
    keyFeatures: [
      "Market & Product Strategy: Synthesized 50+ market and consumer reports into adoption trends and built a weighted scoring model across feasibility, impact, and risk to prioritize three product bets while aligning engineering, design, and go-to-market around a roadmap with clear OKRs.",
      "Java Service Reliability: Owned testing for 10+ Java modules, increasing reliability by ~20% through expanded JUnit and Mockito coverage, CI/CD regression suites, and static analysis with SpotBugs and Checkstyle, resolving 15+ defects and improving observability."
    ],
    technologies: ["Java", "JUnit", "Mockito", "CI/CD", "SpotBugs", "Checkstyle", "Observability"],
    media: [],
    link: "",
    github: "",
    year: "2024-2025"
  },
  {
    id: 4,
    title: "Student Grading Website",
    subtitle: "Java Full-Stack Project",
    category: "Full-Stack Web",
    date: "Nov 2024 - Dec 2024",
    accentColor: "#EFD19F",
    overview: "Built a full-stack student grading system with a React frontend and Spring Boot backend, focusing on clean architecture, security, and reliable grade management workflows.",
    keyFeatures: [
      "Full-Stack Architecture: Developed a grade management system with a React frontend and Spring Boot backend using JPA on a relational database, serving the React build directly from the backend for a cohesive deployment pipeline.",
      "Layered Design & Validation: Designed a layered architecture with controllers, services, repositories, and DTOs, implementing Bean Validation to enforce data integrity and prevent invalid grade submissions.",
      "Security & Testing: Added authentication and role-based access control (e.g., admin vs. teacher vs. student) and wrote unit and integration tests to ensure reliable, secure operation across the grading workflows."
    ],
    technologies: ["Java", "Spring Boot", "JPA", "React", "Bean Validation", "RBAC", "JUnit"],
    media: [],
    link: "",
    github: "",
    year: "2024"
  },
  {
    id: 5,
    title: "University College London Korean Society (UCLKS)",
    subtitle: "VP (25/26), IT Director (24/25)",
    category: "Leadership & Infrastructure",
    date: "Aug 2024 - Aug 2026",
    accentColor: "#EFD19F",
    overview: "Vice President and IT Director at UCLKS, managing the society website and leading large-scale events for a 900-member Korean student community.",
    keyFeatures: [
      "Infrastructure & Website Ownership: Managed the UCLKS website (uclks.org) for 900+ members, using Docker for deployment and PHP for feature development to keep information, sign-ups, and announcements reliable and up to date.",
      "Event Leadership: Led society events end-to-end, from planning and logistics to on-site execution, coordinating committees and sponsors to deliver smooth experiences for hundreds of attendees."
    ],
    technologies: ["Docker", "PHP", "Linux", "Nginx/Apache", "Event Operations"],
    media: [],
    link: "https://uclks.org/",
    github: "",
    year: "2024-2026"
  },
  {
    id: 6,
    title: "Republic of Korea Air Force",
    subtitle: "Sergeant",
    category: "Network Operations & Security",
    date: "Aug 2022 - May 2024",
    accentColor: "#EFD19F",
    overview: "Sergeant in the Republic of Korea Air Force at the 17th Fighter Wing in Cheong-ju, managing secure communication infrastructure under operational constraints.",
    keyFeatures: [
      "Secure LTE Network Operations: Secured and managed a closed LTE network for 3,000 users at the 17th Fighter Wing, reducing blast radius and maintaining operational continuity in constrained environments.",
      "Radio & Server Hardening: Optimized brigade radio networks and internet servers through secure configuration and controlled access, increasing efficiency by ~25% and enhancing service availability."
    ],
    technologies: ["LTE Networks", "Network Security", "Linux Servers", "Access Control", "Radio Communications"],
    media: [
      { type: "image", url: airforceImage }
    ],
    link: "",
    github: "",
    year: "2022-2024"
  }
];



import React, { useEffect, useState } from "react";
import Particles from "./components/layouts/Particles";
import NavigationBar from "./components/layouts/NavigationBar";
import Header from "./components/section/Header";
import AboutMe from "./components/section/AboutMe";
import Contact from "./components/section/Contact";
import WorldClock from "./components/section/WorldClock";
import ProjectsToss from "./components/section/ProjectsToss";
import QuotesEasterEgg from "./components/section/QuotesEasterEgg";
import AOS from "aos";
import "aos/dist/aos.css";
import { animation } from "./profile";

function App() {
  const [isQuotesOpen, setIsQuotesOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: animation.duration,
      once: animation.once,
      disable: !animation.animate,
    });
    // eslint-disable-next-line
  }, []);

  const handleQuestionMarkClick = () => {
    setIsQuotesOpen(true);
  };

  const handleCloseQuotes = () => {
    setIsQuotesOpen(false);
  };

  return (
    <div className="App">
      <NavigationBar />
      <div id="header-section">
        <Header />
      </div>
      <Particles />
      <div id="who-section">
        <AboutMe onQuestionMarkClick={handleQuestionMarkClick} />
      </div>
      <ProjectsToss />
      <WorldClock />
      <div id="contact-section">
        <Contact />
      </div>
      <QuotesEasterEgg isOpen={isQuotesOpen} onClose={handleCloseQuotes} />
    </div>
  );
}

export default App;

// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { usePageViews } from './hooks/usePageViews';
import React, { useState } from 'react';
import { SelectedTeamProvider } from "./context/SelectedTeamContext";
import ReactGA from "react-ga4";
import Home from "./pages/Home";
import Players from "./pages/Players";
import Stats from "./pages/Stats";
import News from "./pages/News";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const trackingId = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID;

ReactGA.initialize(trackingId);

function App() {
  const [leagueId, setLeagueId] = useState(null);
  const [teamId, setTeamId] = useState(null);

  return (
    <Router>
      <SelectedTeamProvider>
      <PageViews />
      <div className="flex flex-col justify-between h-screen w-screen">
        <Navbar/>
        <main className="mx-auto px-3 pb-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
            <Route
              path="/players"
              element={
                <Players
                  leagueId={leagueId}
                  teamId={teamId}
                />
              }
            />
            <Route path="/news" element={<News />} />
            <Route path="/about" element={<About />} />
            <Route path="/notfound" element={<NotFound />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
      </SelectedTeamProvider>
    </Router>
  );
}

function PageViews() {
  usePageViews();
  return null;
}

export default App;


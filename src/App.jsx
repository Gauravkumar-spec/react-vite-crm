import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Listings from "./pages/Listings";
import { Routes, Route } from 'react-router-dom';
import Settings from './pages/Settings';
import ListingList from "./pages/ListingList";
import Agents from "./pages/Agent";
import AgentList from "./pages/AgentList";
import Lead from "./pages/Lead";
import LeadList from "./pages/LeadList";
import DarkModeToggle from "./components/DarkModeToggle";

function App() {
  // Lift sidebar open state here:
  const [open, setOpen] = useState(false);          // desktop sidebar expanded/collapsed
  const [mobileOpen, setMobileOpen] = useState(false);  // mobile sidebar open/close

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white min-h-screen flex">
      
      {/* Sidebar with state passed as props */}
      <Sidebar
        open={open}
        setOpen={setOpen}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main content area */}
      <div
        className={`
          flex-1
          transition-margin duration-300
          ml-20 lg:ml-${open ? "64" : "20"}  /* dynamic margin on large screens */
          `}
        style={{
          marginLeft: open ? "16rem" : "5rem", // fallback inline style for margin-left (16rem or 5rem)
        }}
      >
        <div className="flex justify-end p-4">
          <DarkModeToggle />
        </div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/listinglist" element={<ListingList />} />
          <Route path="/agent" element={<Agents />} />
          <Route path="/agentlist" element={<AgentList />} />
          <Route path="/lead" element={<Lead />} />
          <Route path="/leadlist" element={<LeadList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

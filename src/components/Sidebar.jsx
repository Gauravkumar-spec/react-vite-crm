import { useState } from "react";
import { FaBars, FaHome, FaUsers, FaCog, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar() {
  // Large screen sidebar expanded/collapsed
  const [open, setOpen] = useState(false);
  // Mobile sidebar open/close
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger button */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-2xl text-black dark:text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen p-5 pt-8 shadow-md bg-white text-black dark:bg-gray-900 dark:text-white
          transition-all duration-300 ease-in-out z-40

          /* Desktop width */
          w-${open ? "64" : "20"}

          /* Mobile slide */
          transform
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}

          /* Desktop: always visible, static position */
          lg:translate-x-0 lg:static lg:block
        `}
        style={{
          width: open ? "16rem" : "5rem", // 64*0.25=16rem, 20*0.25=5rem
        }}
      >
        <div className="flex justify-between items-center">
          {/* Show title only if open or mobile menu open */}
          <h1 className="text-xl font-bold whitespace-nowrap">
            {(open || mobileOpen) && "OMNIA CRM"}
          </h1>

          {/* Desktop toggle button */}
          <button
            className="hidden lg:block text-2xl focus:outline-none"
            onClick={() => setOpen(!open)}
            aria-label="Toggle sidebar width"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <ul className="mt-8 space-y-4">
          <Link to="/" onClick={() => setMobileOpen(false)}>
            <li className="flex items-center gap-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
              <FaHome />
              {(open || mobileOpen) && <span>Dashboard</span>}
            </li>
          </Link>

          <Link to="/listings" onClick={() => setMobileOpen(false)}>
            <li className="flex items-center gap-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
              <FaUsers />
              {(open || mobileOpen) && <span>Listings</span>}
            </li>
          </Link>

          <Link to="/listinglist" onClick={() => setMobileOpen(false)}>
            <li className="flex items-center gap-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
              <FaUsers />
              {(open || mobileOpen) && <span>Listing list</span>}
            </li>
          </Link>

          <Link to="/agent" onClick={() => setMobileOpen(false)}>
            <li className="flex items-center gap-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
              <FaUsers />
              {(open || mobileOpen) && <span>Agents</span>}
            </li>
          </Link>

          <Link to="/agentlist" onClick={() => setMobileOpen(false)}>
            <li className="flex items-center gap-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
              <FaUsers />
              {(open || mobileOpen) && <span>Agents list</span>}
            </li>
          </Link>

          <Link to="/lead" onClick={() => setMobileOpen(false)}>
            <li className="flex items-center gap-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
              <FaUsers />
              {(open || mobileOpen) && <span>Leads</span>}
            </li>
          </Link>

          <Link to="/leadlist" onClick={() => setMobileOpen(false)}>
            <li className="flex items-center gap-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
              <FaUsers />
              {(open || mobileOpen) && <span>Lead List</span>}
            </li>
          </Link>

          <Link to="/settings" onClick={() => setMobileOpen(false)}>
            <li className="flex items-center gap-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
              <FaCog />
              {(open || mobileOpen) && <span>Settings</span>}
            </li>
          </Link>
        </ul>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

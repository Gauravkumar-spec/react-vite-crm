import { useState } from "react";
import {  FaBars, FaBullhorn, FaClipboardList, FaCog, FaHome, FaListAlt, FaTimes, FaUserFriends, FaUsers, FaUserTie } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar() {
  // Desktop sidebar expanded/collapsed state
  const [open, setOpen] = useState(true);
  // Mobile sidebar open/close state
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger button */}
      <div className="fixed top-0 left-0 position-absolute">
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
          fixed top-0 left-0 h-screen p-5 pt-8 shadow-md bg-white text-black dark:bg-gray-950 dark:text-white
          transition-all duration-300 ease-in-out z-40

          /* Desktop width */
          ${open ? "w-64" : "w-20"}

          /* Mobile slide */
          transform ${mobileOpen ? "translate-x-0" : "-translate-x-full"}

          /* Desktop: always visible */
          lg:translate-x-0 lg:static lg:block
        `}
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
          <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
            <li className="flex items-center gap-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
              <FaHome />
              {(open || mobileOpen) && <span>Dashboard</span>}
            </li>
          </Link>

          <Link to="/listings" onClick={() => setMobileOpen(false)}>
            <li className="flex items-center gap-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
              <FaClipboardList />
              {(open || mobileOpen) && <span>Listings</span>}
            </li>
          </Link>

          <Link to="/listinglist" onClick={() => setMobileOpen(false)}>
            <li className="flex items-center gap-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
              <FaListAlt />
              {(open || mobileOpen) && <span>Listing list</span>}
            </li>
          </Link>

          <Link to="/agent" onClick={() => setMobileOpen(false)}>
            <li className="flex items-center gap-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
              <FaUserTie />
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
              <FaBullhorn />
              {(open || mobileOpen) && <span>Leads</span>}
            </li>
          </Link>

          <Link to="/leadlist" onClick={() => setMobileOpen(false)}>
            <li className="flex items-center gap-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
              <FaUserFriends />
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

      {/* Overlay for mobile sidebar open */}
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

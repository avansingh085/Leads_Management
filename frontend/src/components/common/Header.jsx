import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { apiClient } from "../../apiClient/api";

export default function Header({
  user = { firstName: "First", lastName: "Last", email: "email@example.com" },
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileIconRef = useRef(null);

  const initials = `${(user.firstName?.[0] || "").toUpperCase()}${(user.lastName?.[0] || "").toUpperCase()}`;

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          profileIconRef.current && !profileIconRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.keyCode === 27) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      return () => document.removeEventListener("keydown", handleEscapeKey);
    }
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onLogout=async ()=>{
    try{
       await apiClient.post('/auth/logout');

       toast.success('logout successfully!');
       setTimeout(()=>{
        window.location='/';
       },1500)

    }catch(error){
        console.log("error during logout!",error)
        toast.error('failed to logout!');

    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDropdown();
    }
  };

  return (
    <div className="mb-20 w-full bg-white text-black flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-black/10 bg-white shadow-sm relative">
        <h1 className="text-xl font-semibold tracking-tight">Lead Management</h1>

        {/* Profile Dropdown */}
        <div className="relative">
          <div 
            ref={profileIconRef}
            className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center font-semibold cursor-pointer select-none transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            onClick={toggleDropdown}
            onKeyDown={handleKeyDown}
            tabIndex="0"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
            aria-label="User profile menu"
          >
            {initials || "U"}
          </div>
          <div 
            ref={dropdownRef}
            className={`absolute right-0 mt-2 w-48 rounded-lg border border-black/10 bg-white shadow-lg transition-all duration-200 ease-in-out ${isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
          >
            <div className="p-3 border-b border-black/10">
              <p className="text-sm font-semibold truncate">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-black/60 truncate">{user.email}</p>
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="w-full text-left px-4 py-2 text-sm hover:bg-black hover:text-white transition-all duration-150 rounded-b-lg focus:outline-none focus:bg-black focus:text-white"
              aria-label="Log out"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      
    </div>
  );
}

function Field({ label, value, mono }) {
  return (
    <div className="transition-colors duration-150 hover:bg-black/5 p-2 rounded-lg">
      <p className="text-xs uppercase tracking-wide text-black/50 mb-1">{label}</p>
      <p className={`text-sm ${mono ? "font-mono" : ""} truncate`}>{value}</p>
    </div>
  );
}
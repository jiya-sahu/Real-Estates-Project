import React, { useEffect, useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      setSearchTerm("");
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set("searchTerm", searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-slate-200 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">HomeTown</span>
            <span className="text-slate-700">Estates</span>
          </h1>
        </Link>
        
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-2 rounded-md flex items-center"
        >
          <input
            type="text"
            name="search"
            placeholder="Search"
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>

        {/* Hamburger Menu */}
        <button
          className="sm:hidden text-slate-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-4">
          <Link to="/">
            <li className="text-slate-700 hover:underline">Home</li>
          </Link>
          <Link to="/about">
            <li className="text-slate-700 hover:underline">About</li>
          </Link>
          
          <Link to="/profile">
            {currentUser && currentUser.avatar ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <Link to={"/signin"}>
                   <li className="text-slate-700 hover:underline">Sign in</li>
              </Link>
           
            )}
          </Link>
        </ul>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="sm:hidden flex flex-col bg-slate-200 p-4 space-y-3">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <li className="text-slate-700 hover:underline">Home</li>
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            <li className="text-slate-700 hover:underline">About</li>
          </Link>
         
          <Link to="/profile" onClick={() => setMenuOpen(false)}>
            {currentUser && currentUser.avatar ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className="text-slate-700 hover:underline">Sign in</li>
            )}
          </Link>
        </ul>
      )}
    </header>
  );
}

export default Header;

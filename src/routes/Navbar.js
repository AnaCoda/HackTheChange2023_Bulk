import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineBell } from 'react-icons/ai';

const NavBar = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <nav className="flex justify-between items-center py-3">
      <Link to="/" title="home-page">
        <img
          src="BulkBuddies-Text.png"
          alt="the-hatch-logo-text-only"
          className="h-8 ml-4"
        />
      </Link>
      <div className="flex space-x-12 mx-[10vh] items-center text-lg">
        <Link to="/" className="hover:text-gray-600 font-sans font-thin tracking-tight text-gray-800">
          <b>Home</b>
        </Link>
        <Link to="/Discussion" className="hover:text-gray-600 font-sans font-thin tracking-tight text-gray-800">
          <b>Discussion</b>
        </Link>
        <Link to="/Profile" className="hover:text-gray-600 font-sans font-thin tracking-tight text-gray-800">
          <b>Profile</b>
        </Link>
        <Link to="/Catalog" className="hover:text-gray-600 font-sans font-thin tracking-tight text-gray-800">
          <b>Marketplace</b>
        </Link>
        <Link to="/upload" className="bg-green-500 text-white px-4 py-2 font-sans font-thin tracking-tight rounded hover:bg-green-600 text-base">
          <b>Drop off Food</b>
        </Link>
        <div className="relative">
          <AiOutlineBell className="cursor-pointer" onClick={handleBellClick} />
          {showNotifications && (
            <div className="absolute right-0 w-40 mt-2 p-6 py-2 bg-white border rounded shadow-xl">
              <p className="text-gray-900">Costco Beef Chili is ready for pickup</p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
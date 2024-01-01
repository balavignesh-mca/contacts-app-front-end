import React from "react";

export default function Nav() {
  const currentPath = window.location.pathname;

  return (
    <div className="fixed top-0 w-full bg-black z-50">
      <div className="mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2">
          <span className="font-sans text-2xl font-bold text-white">
            Contacts
          </span>
        </div>

        {currentPath === "/profile" ? (
          <div
            className="flex items-center  cursor-pointer"
            onClick={() => (window.location = "/")}
          >
            {/* Render different icon or style for '/profile' */}
            <span className="font-bold  text-white mr-[-0.5em] cursor-pointer">
              {/* Change the SVG or add a different icon */}
              {/* Example: */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mr-4 h-4 w-4"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </span>
            <label className="text-white font-bold cursor-pointer">Home</label>
          </div>
        ) : (
          <div
            className="flex items-center cursor-pointer space-x-2"
            onClick={() => (window.location = "/profile")}
          >
            <span className="h-6 w-6  text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </span>
            <label className="text-white font-bold cursor-pointer">
              Profile
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

import React from 'react'

const CustomNoRowsOverlay = ({ message }) => {
    return (
        <div className="flex flex-col justify-center items-center text-gray-500 py-4">
          <svg
            className="w-10 h-10 text-gray-400 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 20l9-5-9-5-9 5 9 5z"
            />
          </svg>
          <p>{message}</p>
        </div>
      );
}

export default CustomNoRowsOverlay
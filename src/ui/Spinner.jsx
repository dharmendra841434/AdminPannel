import React from "react";

const Spinner = () => {
  return (
    // <div classNameName="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-100"></div>
    <div className="min-h-screen  flex">
      <div className="m-auto">
        <div className="p-2 flex space-x-2 ">
          <div
            style={{ animationDelay: "0.2s" }}
            className="w-3 h-3 dark:bg-green-500 bg-yellow-300 rounded-full animate-bounce"
          ></div>
          <div
            style={{ animationDelay: "0.3s" }}
            className="w-3 h-3 dark:bg-yellow-500 bg-green-400 rounded-full animate-bounce"
          ></div>
          <div
            style={{ animationDelay: "0.6s" }}
            className="w-3 h-3 dark:bg-red-500 bg-yellow-500 rounded-full animate-bounce"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;

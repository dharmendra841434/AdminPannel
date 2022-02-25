import React from "react";

const Pagination = (props) => {
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(props.totalResults / props.resultsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }
  const active = (number) => {
    if (number === props.currentPage) {
      return true;
    }
    return false;
  };
  return (
    <div className="flex flex-col items-center my-4">
      <div className="flex text-gray-700 py-4">
        <div className="h-8 w-8 mr-1 flex justify-center items-center rounded-full cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-left w-6 h-6 hover:text-gray-500 text-gray-400"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
        <div className="flex h-8 font-medium rounded-full">
          <div className="w-8 hover:text-gray-500 md:flex justify-center items-center text-sm  cursor-pointer leading-5 transition duration-150 ease-in  rounded-md text-gray-400 pr-2 ">
            Prev
          </div>
          {pageNumbers.map((page) => {
            return (
              <div
                key={page}
                onClick={() => {
                  props.paginate(page);
                }}
                className={`w-8 ${
                  active(page) ? "bg-gold text-white" : "text-gray-800"
                }  md:flex justify-center items-center text-sm  cursor-pointer leading-5 transition duration-150 ease-in  rounded-md `}
              >
                {page}
              </div>
            );
          })}

          <div className="w-8 ml-4 hover:text-gray-500 md:flex justify-center items-center text-sm  cursor-pointer leading-5 transition duration-150 ease-in  rounded-md text-gray-400 ">
            Next
          </div>
        </div>
        <div className="h-8 w-8 ml-1 flex justify-center items-center rounded-full dark:hover:bg-gray-700  hover:text-white dark:text-gray-200 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-right hover:text-gray-500 w-6 h-6 text-gray-400"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

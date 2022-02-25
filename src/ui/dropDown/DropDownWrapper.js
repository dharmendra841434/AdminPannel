import React from "react";

const DropDownWrapper = (props) => {
  return (
    <div className="relative flex justify-end my-2 mr-4">
      <p onClick={props.toggle} className="py-2 px-4 text-right">
        {props.dropDownName}
      </p>
      <div
        className={`origin-top-right ${props.top ? props.top : "top-10"} ${
          props.right ? props.right : "-right-2"
        } absolute ${
          props.state ? "hidden" : ""
        }  right-0 w-32 rounded-md cursor-pointer shadow-xl bg-white border border-gray-100 focus:outline-none`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1"
      >
        {props.children}
      </div>
    </div>
  );
};

export default DropDownWrapper;

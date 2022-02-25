import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { SidebarItems } from "./SidebarItems";
import { ReactComponent as Logo } from "../assets/img/main.svg";
import { ReactComponent as ArrowDown } from "../assets/icons/key-down.svg";
import warning from "../assets/icons/warning.svg";

const Sidebar = (props) => {
  const location = useLocation();
  // accesing height from use selector
  const height = useSelector((state) => state.app.height);
  const sidebarHeight = height + 296;
  // putting height in useeffect so that it will updating as per change
  useEffect(() => {}, [height]);
  return (
    <aside
      onMouseEnter={() => props.collapse && props.setCollapse(false)}
      style={{ height: sidebarHeight + "px" }}
      className={`min-h-screen 2xl:w-72 ${
        props.collapse ? "lg:w-14" : "lg:w-52"
      } bg-darkBlue pt-2 text-black cursor-pointer`}
    >
      {props.collapse ? (
        <Logo className="text-yellow-600 my-2 mb-4" />
      ) : (
        <h2 className="mx-auto text-2xl my-2 font-bold text-white ml-12">
          Alpha
        </h2>
      )}

      {SidebarItems.map((item) => {
        return (
          <Link key={item.title} to={item.path}>
            <div
              className={`flex justify-between ${
                location.pathname === item.path
                  ? "bg-hoverSideBar border-borderColor"
                  : "bg-transparent border-transparent"
              }  group border-l-4 hover:bg-hoverSideBar items-center p-2 pl-1 pr-4 py-3 border-transparent `}
            >
              <div className="flex items-center">
                <div> {item.icon}</div>
                {!props.collapse && (
                  <div className="flex justify-around items-center">
                    <p
                      className={` lg:text-xs text-sm group-hover:opacity-95 font-semibold pr-4 text-white opacity-60`}
                    >
                      {item.title}
                    </p>
                    <ArrowDown />
                  </div>
                )}
              </div>
              {location.pathname === item.path && (
                <div className=" h-2 w-2 rounded-full bg-gold mr-2"> </div>
              )}
            </div>
          </Link>
        );
      })}
    </aside>
  );
};

export default Sidebar;

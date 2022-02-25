import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
export default function Layout({ children }) {
  const [collapse, setCollapse] = useState(false);
  // Setting laout for App
  return (
    <main className="flex">
      <Sidebar collapse={collapse} setCollapse={setCollapse} />
      <div
        style={{ minHeight: "100vh" }}
        className="flex max-h-screen flex-col flex-grow"
      >
        <Header collapse={collapse} setCollapse={setCollapse} />
        <div className="dark:bg-gray-500 flex-1 bg-gray-100">{children}</div>
      </div>
    </main>
  );
}

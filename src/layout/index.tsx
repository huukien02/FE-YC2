import "../app/globals.css";
import React from "react";
import Header from "./header/index";
import Footer from "./footer/index";
import { Head } from "next/document";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#fff] text-[black]">
      <Header />
      <main className="flex-grow p-4 flex items-center justify-center ">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;

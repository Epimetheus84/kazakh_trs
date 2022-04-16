import React from "react";
import { Header } from "../../components";

export default function DefaultLayout({ children }) {
  return (
    <>
      <Header/>
      <div className="container py-4">
        {children}
      </div>
    </>
  );
}

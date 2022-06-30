import React from "react";
import Header from "components/Common/Header";
import CommonModal from "components/Common/Modal";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <CommonModal />
    </>
  );
};
export default Layout;

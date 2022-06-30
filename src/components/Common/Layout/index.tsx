import React from "react";
import Header from "components/Common/Header";
import CommonModal from "components/Common/Modal";
import * as G from "styles";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <G.Wrapper>{children}</G.Wrapper>
      <CommonModal />
    </>
  );
};
export default Layout;

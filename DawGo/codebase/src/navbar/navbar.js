import React from "react";
import NewsLine from "./newsLine";
import Logo from "./logo";
import NavLinks from "./navlinks";

export function NavBar(props) {
  return (
    <div className="container-fluid">
      <div id="navbar" className="row justify-content-between" data-testid="navbar">
        <Logo />
        <NewsLine />
        <NavLinks />
      </div>
    </div>
  );
}

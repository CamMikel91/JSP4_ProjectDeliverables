import React from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  return (
    <div className="container-fluid">
      <div className="row bg-light">
        <div className="col-12">
          <nav className="navbar navbar-expand navbar-light">
            <div className="container-fluid justify-content-end">
              <div className="navbar me-5" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/store">
                      Store
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/cart">
                      Cart
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

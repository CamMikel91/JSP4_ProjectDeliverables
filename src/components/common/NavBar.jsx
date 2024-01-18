import React from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  return (
    <div className="container-fluid">
      <div className="row bg-light">
        <div className="col-12">
          <nav className="navbar navbar-expand navbar-light bg-light">
            <div className="container-fluid">
              <div className="navbar" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to="/" className="nav-link" aria-current="page">
                      Home
                    </Link>
                  </li>
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

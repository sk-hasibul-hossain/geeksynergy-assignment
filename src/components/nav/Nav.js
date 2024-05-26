import React from "react";
import "./Nav.css";
import { NavLink, useNavigate } from "react-router-dom";
import logo from ".././../assets/logo.png";
import { useAuth } from "../../providers/AuthProvider";

const Nav = () => {
  const { isLogin, setIsLogin } = useAuth();
  const navigate = useNavigate();
  return (
    <nav className="nav-outer-container">
      <div className="nav-inner-container">
        <div className="nav-logo-image-section">
          <div className="nav-logo-image-wrapper">
            <img
              src={logo}
              alt="nav-logo-image"
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
        </div>
        <div>
          <ul className="nav-lists">
            <li>
              <NavLink to="/" className="nav-list">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/company-info" className="nav-list">
                Company Info
              </NavLink>
            </li>
            {!isLogin && (
              <>
                <li>
                  <NavLink to="/signup" className="nav-list">
                    Signup
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login" className="nav-list">
                    Login
                  </NavLink>
                </li>
              </>
            )}
            {isLogin && (
              <li>
                <div
                  className="nav-log-out"
                  onClick={() => {
                    sessionStorage.clear();
                    setIsLogin(false);
                    navigate("/login");
                  }}
                >
                  Logout
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

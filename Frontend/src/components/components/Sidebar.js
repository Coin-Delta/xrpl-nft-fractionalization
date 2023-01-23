import React from "react";
import "../../assets/sidebar.scss";
import {  NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import * as selectors from "../../store/selectors";


const Sidebar = () => {
  const isShowSidebar = useSelector(selectors.isShowSidebar);

  return (
    <div className="sidebar-wrapper">
      <aside className={`sidebar ${isShowSidebar ? "showSidebar" : null}`}>
        <div className="cointainer text-center mb-3">
          <img src="/img/Light-logo.png" alt="#" style={{ width: "50%" }} />
        </div>
        <nav className="nav">
          <div className="nav-list">
            <NavLink to="/dashboard" className="nav-link">
              <div className="icon-wrapper">
                <i className="fa fa-dashboard fa-lg nav-link-icon"></i>
              </div>
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/explore" className="nav-link">
              <div className="icon-wrapper">
                <i className="fa fa-cart-plus fa-lg nav-link-icon"></i>
              </div>
              <span>Marketplace</span>
            </NavLink>
            <NavLink to="/portfolio" className="nav-link">
              <div className="icon-wrapper">
                <i className="fa fa-user fa-lg nav-link-icon"></i>
              </div>
              <span>My Porfolio</span>
            </NavLink>
            <NavLink to="/wallet" className="nav-link">
              <div className="icon-wrapper">
                <i className="fa fa-money fa-lg nav-link-icon"></i>
              </div>
              <span>My Wallet</span>
            </NavLink>
          </div>
        </nav>

        {/* <nav className="nav">
          <div>
            <Link to="/" className="nav-logo">
              <i className={`fa fa-user nav-logo-icon`}></i>
              <span className="nav-logo-name">Homepage</span>
            </Link>

            <div className="nav-list">
              <Link
                to="/dashboard"
                className="nav-link active"
                onClick={() => handleSidebarToggle()}
              >
                <i className="fa fa-user nav-link-icon"></i>
                <span className="nav-link-name">Dashboard</span>
              </Link>
              <Link to="/segmintNft" className="nav-link active">
                <i className="fa fa-user nav-link-icon"></i>
                <span className="nav-link-name">SegmintNft</span>
              </Link>
              <Link to="/uploadProduct" className="nav-link active">
                <i className="fa fa-user nav-link-icon"></i>
                <span className="nav-link-name">uploadProduct</span>
              </Link>
            </div>
          </div>

          <Link to="/logout" className="nav-link" onClick={handleLogout}>
            <i className="fa fa-sign-out nav-link-icon"></i>
            <span className="nav-link-name">Logout</span>
          </Link>
        </nav> */}
      </aside>
    </div>
  );
};

export default Sidebar;

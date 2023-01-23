import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDefaultBreakpoints } from "react-socks";
import { useNavigate } from "react-router-dom";
import useOnclickOutside from "react-cool-onclickoutside";
import auth from "../../core/auth";
import { createGlobalStyle } from "styled-components";
import "../../assets/header.scss";
import { useEffect, useState } from "react";

import * as actions from "../../store/actions/thunks";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { toastSuccessObj, toastFailObj } from "../components/toast";
import * as selectors from "../../store/selectors";
import { walletAction } from "../../store/actions/thunks";

setDefaultBreakpoints([{ xs: 0 }, { l: 1199 }, { xl: 1200 }]);

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky-header.white {
    .mainside{
      .logout{
        display: flex;
        align-items: center;
      }
    }
    background: #403f83;
    border-bottom: solid 1px #403f83;
    position: sticky !important;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: rgba(255, 255, 255, .5);
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;
const Header = function ({ className }) {
  const backendhost = process.env.REACT_APP_BACK_END_HOST;
  const projectId = process.env.REACT_APP_INFURA_PROJECT_ID;
  console.log("projectId...", backendhost);

  const dispatch = useDispatch();
  const isShowSidebar = useSelector(selectors.isShowSidebar);

  const navigate = useNavigate();

  // const [showmenu, btn_icon] = useState(false);
  const [showpop, btn_icon_pop] = useState(false);
  // const [shownot, btn_icon_not] = useState(false);
  const closePop = () => {
    btn_icon_pop(false);
  };
  // const closeNot = () => {
  //   btn_icon_not(false);
  // };
  const refpop = useOnclickOutside(() => {
    closePop();
  });
  // const refpopnot = useOnclickOutside(() => {
  //   closeNot();
  // });

  const [show, setShow] = useState(false);
  const [barcodeDetails, setBarcodeDetails] = useState({ QR: "", uuid: "" });

  useEffect(() => {
    const header = document.getElementById("myHeader");
    // const totop = document.getElementById("scroll-to-top");
    // const sticky = header.offsetTop;
    header.classList.add("sticky-header");
    dispatch(walletAction());
    // totop.classList.add("show");
    // const scrollCallBack = window.addEventListener("scroll", () => {
    //   btn_icon(false);
    //   if (window.pageYOffset > sticky) {
    //     header.classList.add("sticky");
    //     totop.classList.add("show");
    //   } else {
    //     header.classList.remove("sticky");
    //     totop.classList.remove("show");
    //   }
    //   if (window.pageYOffset > sticky) {
    //     closeMenu();
    //   }
    // });
    // return () => {
    //   window.removeEventListener("scroll", scrollCallBack);
    // };
  }, []);
  const walletDetails = useSelector(selectors.xummWalletDetails);

  const handleCloseBarcodeModal = () => setShow(false);

  const handleShowBarcodeModal = () => {
    console.log("backendhost....", projectId);
    if (
      walletDetails === null ||
      walletDetails.walletAccount === null ||
      walletDetails.walletToken === null
    ) {
      if (barcodeDetails === null || barcodeDetails.QR === "") {
        auth.createWalletDetails();
        axios({
          method: "get",
          url: `${process.env.REACT_APP_BACK_END_HOST}/connectxummwallet`,
        })
          .then((res) => {
            setBarcodeDetails(res.data);
            setShow(true);
            axios({
              method: "post",
              url: `${process.env.REACT_APP_BACK_END_HOST}/connectxummwallet/resolved`,
              data: res.data,
            })
              .then((response) => {
                if (response.data.Message === "Signature found") {
                  toast.success(
                    "Wallet connected successfully.",
                    toastSuccessObj
                  );
                  auth.set(response.data.Account, "walletAccount", true);
                  auth.set(response.data.USER_TOKEN, "walletToken", true);

                  dispatch(walletAction());
                }
                handleCloseBarcodeModal();
              })
              .catch((err) => {
                toast.error("Something Went wrong", toastFailObj);
              });
          })
          .catch((err) => {
            toast.error("Something Went wrong", toastFailObj);
          });
      } else {
        setShow(true);
      }
    }
  };

  const handleLogout = () => {
    auth.clearAppStorage();
    navigate("/");
  };

  return (
    <header className={`navbar white position-sticky`} id="myHeader">
      <GlobalStyles />
      <div
        className={`header-toggle-wrapper ${
          isShowSidebar ? " header-toggled-wrapper" : null
        }`}
      >
        <i
          className={`fa ${isShowSidebar ? "fa-close" : "fa-bars"}
             fa-2x header-toggle-icon`}
          onClick={() => dispatch(actions.sidebarToggle())}
        ></i>
      </div>
      <div className="mainside">
        <div className="logout">
          {walletDetails && walletDetails.walletToken ? (
            <button
              className="connect-wal btn btn-main"
              onClick={handleShowBarcodeModal}
            >
              connected
            </button>
          ) : (
            <button
              className="connect-wal btn btn-main"
              onClick={handleShowBarcodeModal}
            >
              connect Wallet
            </button>
          )}
          <div
            id="de-click-menu-profile"
            className="de-menu-profile"
            onClick={() => btn_icon_pop(!showpop)}
            ref={refpop}
          >
            <img src="../../img/author_single/author_thumbnail.jpg" alt="" />
            {showpop && (
              <div className="popshow">
                <div className="d-name">
                  <h4>Monica Lucas</h4>
                  <span
                    className="name"
                    onClick={() => window.open("", "_self")}
                  >
                    Set display name
                  </span>
                </div>
                <div className="d-balance">
                  <h4>Balance</h4>
                  12.858 ETH
                </div>
                <div className="d-wallet">
                  <h4>My Wallet</h4>
                  <span id="wallet" className="d-wallet-address">
                    DdzFFzCqrhshMSxb9oW3mRo4MJrQkusV3fGFSTwaiu4wPBqMryA9DYVJCkW9n7twCffG5f5wX2sSkoDXGiZB1HPa7K7f865Kk4LqnrME
                  </span>
                  <button id="btn_copy" title="Copy Text">
                    Copy
                  </button>
                </div>
                <div className="d-line"></div>
                <ul className="de-submenu-profile">
                  <li>
                    <span>
                      <i className="fa fa-user"></i> My profile
                    </span>
                  </li>
                  <li>
                    <span>
                      <i className="fa fa-pencil"></i> Edit profile
                    </span>
                  </li>
                  <li onClick={handleLogout}>
                    <span>
                      <i className="fa fa-sign-out"></i> Sign out
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        centered
        className="custom-modal"
        show={show}
        onHide={handleCloseBarcodeModal}
      >
        <div>
          <i
            className="fa fa-times fa-2x modal-close-icon theme-color"
            aria-hidden="true"
            onClick={handleCloseBarcodeModal}
          ></i>
        </div>
        <Modal.Body className="text-center">
          <div className="theme-color">
            <h2 className="theme-color">Connect Xumm Wallet</h2>
            <p>Scan the QR code with your Xumm Wallet to connect. xummQr</p>
          </div>
          <div className="barcode-wrapper">
            {barcodeDetails.QR ? (
              <img className="barcode" src={barcodeDetails.QR} alt="" />
            ) : (
              <span className="indicator-progress">
                Please wait...
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
            <div className="spacer-10"></div>
            <div className="spacer-10"></div>
            <div className="white-color">
              <p>Waiting for you to scan QR code with Xumm.</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </header>
    // <header
    //   className={`navbar white position-sticky`}
    //   id="myHeader"
    // >
    //   <GlobalStyles />
    //   <div>
    //     <div className="row w-100-nav">
    //       <div className={isShowSidebar ? "header-toggle-wrapper" : null}>
    //         <i
    //           className={`fa ${isShowSidebar ? "fa-close" : "fa-bars"}
    //          fa-2x header-toggle-icon`}
    //           onClick={() => dispatch(actions.sidebarToggle())}
    //         ></i>
    //       </div>

    //       <div className="mainside">
    //         <div className="logout">
    //           {xummWallet && xummWallet.USER_TOKEN ? (
    //             <button
    //               className="connect-wal btn btn-main"
    //               onClick={handleShowBarcodeModal}
    //             >
    //               connected
    //             </button>
    //           ) : (
    //             <button
    //               className="connect-wal btn btn-main"
    //               onClick={handleShowBarcodeModal}
    //             >
    //               connect Wallet
    //             </button>
    //           )}
    //           {/* <div
    //             id="de-click-menu-notification"
    //             className="de-menu-notification"
    //             onClick={() => btn_icon_not(!shownot)}
    //             ref={refpopnot}
    //           >
    //             <div className="d-count">8</div>
    //             <i className="fa fa-bell"></i>
    //             {shownot && (
    //               <div className="popshow">
    //                 <div className="de-flex">
    //                   <h4>Notifications</h4>
    //                   <span className="viewaall">Show all</span>
    //                 </div>
    //                 <ul>
    //                   <li>
    //                     <div className="mainnot">
    //                       <img
    //                         className="lazy"
    //                         src="../../img/author/author-2.jpg"
    //                         alt=""
    //                       />
    //                       <div className="d-desc">
    //                         <span className="d-name">
    //                           <b>Mamie Barnett</b> started following you
    //                         </span>
    //                         <span className="d-time">1 hour ago</span>
    //                       </div>
    //                     </div>
    //                   </li>
    //                   <li>
    //                     <div className="mainnot">
    //                       <img
    //                         className="lazy"
    //                         src="../../img/author/author-3.jpg"
    //                         alt=""
    //                       />
    //                       <div className="d-desc">
    //                         <span className="d-name">
    //                           <b>Nicholas Daniels</b> liked your item
    //                         </span>
    //                         <span className="d-time">2 hours ago</span>
    //                       </div>
    //                     </div>
    //                   </li>
    //                   <li>
    //                     <div className="mainnot">
    //                       <img
    //                         className="lazy"
    //                         src="../../img/author/author-4.jpg"
    //                         alt=""
    //                       />
    //                       <div className="d-desc">
    //                         <span className="d-name">
    //                           <b>Lori Hart</b> started following you
    //                         </span>
    //                         <span className="d-time">18 hours ago</span>
    //                       </div>
    //                     </div>
    //                   </li>
    //                   <li>
    //                     <div className="mainnot">
    //                       <img
    //                         className="lazy"
    //                         src="../../img/author/author-5.jpg"
    //                         alt=""
    //                       />
    //                       <div className="d-desc">
    //                         <span className="d-name">
    //                           <b>Jimmy Wright</b> liked your item
    //                         </span>
    //                         <span className="d-time">1 day ago</span>
    //                       </div>
    //                     </div>
    //                   </li>
    //                   <li>
    //                     <div className="mainnot">
    //                       <img
    //                         className="lazy"
    //                         src="../../img/author/author-6.jpg"
    //                         alt=""
    //                       />
    //                       <div className="d-desc">
    //                         <span className="d-name">
    //                           <b>Karla Sharp</b> started following you
    //                         </span>
    //                         <span className="d-time">3 days ago</span>
    //                       </div>
    //                     </div>
    //                   </li>
    //                 </ul>
    //               </div>
    //             )}
    //           </div> */}
    //           <div
    //             id="de-click-menu-profile"
    //             className="de-menu-profile"
    //             onClick={() => btn_icon_pop(!showpop)}
    //             ref={refpop}
    //           >
    //             <img
    //               src="../../img/author_single/author_thumbnail.jpg"
    //               alt=""
    //             />
    //             {showpop && (
    //               <div className="popshow">
    //                 <div className="d-name">
    //                   <h4>Monica Lucas</h4>
    //                   <span
    //                     className="name"
    //                     onClick={() => window.open("", "_self")}
    //                   >
    //                     Set display name
    //                   </span>
    //                 </div>
    //                 <div className="d-balance">
    //                   <h4>Balance</h4>
    //                   12.858 ETH
    //                 </div>
    //                 <div className="d-wallet">
    //                   <h4>My Wallet</h4>
    //                   <span id="wallet" className="d-wallet-address">
    //                     DdzFFzCqrhshMSxb9oW3mRo4MJrQkusV3fGFSTwaiu4wPBqMryA9DYVJCkW9n7twCffG5f5wX2sSkoDXGiZB1HPa7K7f865Kk4LqnrME
    //                   </span>
    //                   <button id="btn_copy" title="Copy Text">
    //                     Copy
    //                   </button>
    //                 </div>
    //                 <div className="d-line"></div>
    //                 <ul className="de-submenu-profile">
    //                   <li>
    //                     <span>
    //                       <i className="fa fa-user"></i> My profile
    //                     </span>
    //                   </li>
    //                   <li>
    //                     <span>
    //                       <i className="fa fa-pencil"></i> Edit profile
    //                     </span>
    //                   </li>
    //                   <li onClick={handleLogout}>
    //                     <span>
    //                       <i className="fa fa-sign-out"></i> Sign out
    //                     </span>
    //                   </li>
    //                 </ul>
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
    //       <div className="menu-line white"></div>
    //       <div className="menu-line1 white"></div>
    //       <div className="menu-line2 white"></div>
    //     </button>
    //   </div>
    //   <Modal
    //     centered
    //     className="custom-modal"
    //     show={show}
    //     onHide={handleCloseBarcodeModal}
    //   >
    //     <div>
    //       <i
    //         className="fa fa-times fa-2x modal-close-icon theme-color"
    //         aria-hidden="true"
    //         onClick={handleCloseBarcodeModal}
    //       ></i>
    //     </div>
    //     <Modal.Body className="text-center">
    //       <div className="theme-color">
    //         <h2 className="theme-color">Connect Xumm Wallet</h2>
    //         <p>Scan the QR code with your Xumm Wallet to connect. xummQr</p>
    //       </div>
    //       <div className="barcode-wrapper">
    //         {barcodeDetails.QR ? (
    //           <img className="barcode" src={barcodeDetails.QR} alt="" />
    //         ) : (
    //           <span className="indicator-progress">
    //             Please wait...
    //             <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
    //           </span>
    //         )}
    //         <div className="spacer-10"></div>
    //         <div className="spacer-10"></div>
    //         <div className="white-color">
    //           <p>Waiting for you to scan QR code with Xumm.</p>
    //         </div>
    //       </div>
    //     </Modal.Body>
    //   </Modal>
    // </header>
  );
};
export default Header;

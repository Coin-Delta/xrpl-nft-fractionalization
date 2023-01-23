import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ScrollToTopBtn from "./menu/ScrollToTop";
// import Home from "./pages/home";
// import HomeGrey from "./pages/homeGrey";
// import Home1 from "./pages/home1";
// import Home1grey from "./pages/home1Grey";
// import Home2 from "./pages/home2";
// import Home2grey from "./pages/home2Grey";
// import Home3 from "./pages/home3";
// import Home4 from "./pages/home4";
// import Home5 from "./pages/home5";
// import Home6 from "./pages/home6";
// import Explore from "./pages/explore";
// import Exploregrey from "./pages/exploreGrey";
// import Explore2 from "./pages/explore2";
// import Explore2grey from "./pages/explore2Grey";
// import ExploreOpensea from "./pages/Opensea/explore";
// import RankingRedux from "./pages/RankingRedux";
// import RankingReduxgrey from "./pages/RankingReduxGrey";
// import Auction from "./pages/Auction";
// import Auctiongrey from "./pages/AuctionGrey";
// import Helpcenter from "./pages/helpcenter";
// import Helpcentergrey from "./pages/helpcenterGrey";
// import Colection from "./pages/colection";
// import Colectiongrey from "./pages/colectionGrey";
// import ItemDetailRedux from "./pages/ItemDetailRedux";
// import ItemDetailReduxgrey from "./pages/ItemDetailReduxGrey";
// import Author from "./pages/Author";
// import AuthorGrey from "./pages/AuthorGrey";
// import AuthorOpensea from "./pages/Opensea/author";
// import Wallet from "./pages/wallet";
// import WalletGrey from "./pages/walletGrey";
// import Logingrey from "./pages/loginGrey";
// import LoginTwo from "./pages/loginTwo";
// import LoginTwogrey from "./pages/loginTwoGrey";
// import Registergrey from "./pages/registerGrey";
// import Price from "./pages/price";
// import Works from "./pages/works";
// import News from "./pages/news";
// import NewsSingle from "./pages/newsSingle";
// import Create from "./pages/create";
// import Creategrey from "./pages/createGrey";
// import Create2 from "./pages/create2";
// import Create3 from "./pages/create3";
// import Createoption from "./pages/createOptions";
// import Activity from "./pages/activity";
// import Activitygrey from "./pages/activityGrey";
// import Contact from "./pages/contact";
// import Contactgrey from "./pages/contactGrey";
// import ElegantIcons from "./pages/elegantIcons";
// import EtlineIcons from "./pages/etlineIcons";
// import FontAwesomeIcons from "./pages/fontAwesomeIcons";
// import Accordion from "./pages/accordion";
// import Alerts from "./pages/alerts";
// import Progressbar from "./pages/progressbar";
// import Tabs from "./pages/tabs";
// import Minter from "./pages/Minter";
// import Mintergrey from "./pages/MinterGrey";
// import Profile from "./pages/Profile";

import auth from "../core/auth";
import Sidebar from "./components/Sidebar";
import Login from "./pages/auth-page/login";
import Register from "./pages/register";
import ForgotPassword from "./pages/auth-page/forgotPassword";
import OtpVerfication from "./pages/otpVerification";
import Dashboard from "./pages/dashboard.js";
import SegmintNft from "./pages/segmintNft";
import UploadProduct from "./uploadProduct";
import Header from "./menu/header";
import PrivateRoutes from "./privateRoutes";
import PublicRoutes from "./publicRoutes";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
    <>
      <PrivateRoutes />
      <PublicRoutes />
    </>
  );
};
export default App;

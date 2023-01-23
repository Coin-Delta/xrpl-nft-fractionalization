import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createGlobalStyle } from "styled-components";
import ColumnNewRedux from "../../components/ColumnNewRedux";
import * as selectors from "../../../store/selectors";
import { fetchHotCollections } from "../../../store/actions/thunks";
import api from "../../../core/api";
import auth from "../../../core/auth";
import { toast } from "react-toastify";
import { toastFailObj } from "../../components/toast";
import axios from "axios";
import NftMintCard from "../../components/NftMintCard";
import UserMintedNfts from "./userMintedNfts";
import WalletNotConnected from "../../WalletNotConnected";
const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #111;
    }
    .item-dropdown .dropdown a{
      color: #111 !important;
    }
  }
`;

const Portfolio = function () {
  const hotCollectionsState = useSelector(selectors.hotCollectionsState);
  const hotCollections = hotCollectionsState.data
    ? hotCollectionsState.data[0]
    : {};
  const xummWalletDetails = useSelector(selectors.xummWalletDetails);

  return (
    <div>
      <GlobalStyles />
      {hotCollections.author && hotCollections.author.banner && (
        <section
          id="profile_banner"
          className="jumbotron breadcumb no-bg"
          style={{
            backgroundImage: `url(${
              api.baseUrl + hotCollections.author.banner.url
            })`,
          }}
        >
          <div className="mainbreadcumb"></div>
        </section>
      )}

      <section className="container d_coll no-top no-bottom">
        <div className="row">
          <div className="col-md-12">
            <div className="d_profile">
              <div className="profile_avatar">
                {hotCollections.author && hotCollections.author.avatar && (
                  <div className="d_profile_img">
                    <img
                      src={api.baseUrl + hotCollections.author.avatar.url}
                      alt=""
                    />
                    <i className="fa fa-check"></i>
                  </div>
                )}
                <div className="profile_name">
                  <h4>
                    {hotCollections.name}
                    <div className="clearfix"></div>
                    {hotCollections.author && hotCollections.author.wallet && (
                      <span id="wallet" className="profile_wallet">
                        {hotCollections.author.wallet}
                      </span>
                    )}
                    <button id="btn_copy" title="Copy Text">
                      Copy
                    </button>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <UserMintedNfts />
    </div>
  );
};
export default memo(Portfolio);

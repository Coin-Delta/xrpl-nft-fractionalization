import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createGlobalStyle } from "styled-components";
import ColumnNewRedux from "../../components/ColumnNewRedux";
import * as selectors from "../../../store/selectors";
import {
  fetchHotCollections,
  walletAction,
} from "../../../store/actions/thunks";
import api from "../../../core/api";
import auth from "../../../core/auth";
import { toast } from "react-toastify";
import { toastFailObj } from "../../components/toast";
import axios from "axios";
import NftMintCard from "../../components/NftMintCard";
import { useNavigate } from "react-router-dom";

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

const UserMintedNfts = function ({ collectionId = 1 }) {
  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHotCollections(collectionId));
    dispatch(walletAction());

    handleGetNfts();
  }, [dispatch, collectionId]);
  const xummWalletDetails = useSelector(selectors.xummWalletDetails);

  const [nftList, setNftList] = useState([]);
  const [height, setHeight] = useState(0);
  const handleGetNfts = () => {
    const params = {
      address: auth.get("walletAccount"),
    };
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BACK_END_HOST}/getnftdetails/of_account`,
      params,
    })
      .then((response) => {
        setNftList(response.data.Data);
      })
      .catch((err) => {
        toast.error("Something Went wrong", toastFailObj);
      });
  };

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  const navigate = useNavigate();
  const handleRedirectToSegment = (tokenId) => {
    auth.clear("identifier");
    navigate("/segmint-my-nft", { state: { tokenId: tokenId } });
  };

  return (
    <div>
      <section className="container no-top">
        <div className="row">
          <div className="col-lg-12">
            <div className="items_filter">
              <ul className="de_nav">
                <li id="Mainbtn" className="active">
                  <span onClick={handleBtnClick}>On Sale</span>
                </li>
                <li id="Mainbtn1" className="">
                  <span onClick={handleBtnClick1}>Owned</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row">
          {openMenu &&
            nftList.map((nft, index) => {
              return (
                <div
                  className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
                  onClick={() => handleRedirectToSegment(nft.token_id)}
                  key={index}
                >
                  <NftMintCard
                    nft={nft}
                    onImgLoad={onImgLoad}
                    height={height}
                  />
                </div>
              );
            })}
        </div>
        {openMenu1 && (
          <div id="zero2" className="onStep fadeIn">
            <ColumnNewRedux shuffle showLoadMore={false} />
          </div>
        )}
      </section>
    </div>
  );
};
export default memo(UserMintedNfts);

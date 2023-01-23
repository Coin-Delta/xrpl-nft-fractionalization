import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import Clock from "./Clock";
import { useNavigate } from "react-router-dom";
import api from "../../core/api";
import { Buffer } from "buffer";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

//react functional component
const NftMintCard = ({
  nft,
  clockTop = true,
  height,

  onImgLoad,
  onSelectNft,
}) => {
  const [imageUri, setImageUri] = useState("");
  const navigate = useNavigate();
  const navigateTo = (link) => {
    navigate(link);
  };
  useEffect(() => {
    if (nft.uri.includes("ipfs://")) {
      setImageUri(
        process.env.REACT_APP_IPFS_BASEPATH + nft.uri.split("ipfs://")[1]
      );
    }
    // setImageUri(
    //   "http://www.shadowsphotography.co/wp-content/uploads/2017/12/photography-01-800x400.jpg"
    // );
  }, []);

  return (
    <div>
      <div className="nft__item m-0 nft-wrapper">
        {/* { nft.item_type === 'single_items' ? (
             <div className='icontype'><i className="fa fa-bookmark"></i></div>   
             ) : (  
             <div className='icontype'><i className="fa fa-shopping-basket"></i></div>
                )
            } */}
        <div className="author_list_pp">
          {/* <span onClick={()=> navigateTo(nft.author_link)}> */}
          <span>
            <img className="lazy" src={imageUri} alt="" />
            <i className="fa fa-check"></i>
          </span>
        </div>

        <div
          className="nft__item_wrap nft-item-wrapper"
          // style={{ height: `${height}px` }}
        >
          {/* <Outer> */}
          <div className="w-full h-[500px] rounded-xl overflow-hidden relative flex justify-center items-center">
            {/* <div
              style={{
                
              }}
            ></div> */}
            <div className="img-wrapper">
              <img className="nft-img" src={imageUri} alt="banner" />
            </div>
          </div>
          {/* <span>
              <img
                onLoad={onImgLoad}
                src={imageUri}
                className="lazy nft__item_preview"
                alt=""
                style={{ maxWidth: " 40%" }}
              />
            </span> */}
          {/* </Outer> */}
        </div>
        {/* { nft.deadline && !clockTop &&
                    <div className="de_countdown">
                        <Clock deadline={nft.deadline} />
                    </div>
                } */}
        <div className="nft__item_info">
          {/* <span onClick={() => navigateTo(`${nft.nft_link}/${nft.id}`)}> */}
          <span>
            <h4>{nft.name}</h4>
          </span>
          <span>
            <span>{nft.name}</span>
          </span>
          {/* <div className="nft__item_action">
                        <span onClick={() => onSelectNft(nft)}>Select</span>
                    </div> */}
          <div className="nft__item_like">
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(NftMintCard);

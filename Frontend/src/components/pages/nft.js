import { useEffect } from "react";

const Nft = () => {
  const { state } = useLocation();
  const [nft, setNft] = useState(null);

  useEffect(() => {
    console.log("state.tokenId", state.tokenId);
    handleGetNfts(state.tokenId);
  }, []);

  const handleGetNfts = () => {
    const params = {
      token_id: state.tokenId,
    };
    axios({
      method: "get",
      url: "http://localhost:3002/getnftdetails/single",
      params,
    })
      .then((response) => {
        setNft(response.data.data);
        console.log(response.data.data);
      })
      .catch((err) => {
        toast.error("Something Went wrong", toastFailObj);
      });
  };
  return (
    <div>
      <div className="nft__item m-0">
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
        <div className="nft__item_wrap" style={{ height: `${height}px` }}>
          <Outer>
            <span>
              <img
                onLoad={onImgLoad}
                src={imageUri}
                className="lazy nft__item_preview"
                alt=""
              />
            </span>
          </Outer>
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
export default Nft;

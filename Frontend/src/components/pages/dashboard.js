import React from "react";
import { useNavigate } from "react-router-dom";
import Particle from "../components/Particle";
import SliderMainParticle from "../components/SliderMainParticle";
import Ranking from "../pages/rangking";
import SliderMain from "../components/SliderCarouselNew";
import CarouselCollectionRedux from "../components/CarouselCollectionReduxNew";
import CarouselNewRedux from "../components/CarouselNewReduxNew";
import AuthorListRedux from "../components/AuthorListRedux";
import Catgor from "../components/Catgor";
import Footer from "../components/footer";
// import Sidebar from "../menu/sidebar";
import Header from "../menu/header";
const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      <section
        className="jumbotron breadcumb no-bg bwhite"
        style={{ backgroundImage: `url(${"./img/background/12.jpg"})` }}
      >
        <div className="container">
          <div className="row">
            <SliderMain />
          </div>
        </div>
      </section>

      <section className="container no-bottom">
        <div className="container p-4 shadow bg-white rounded-lg rounded-lg nft-tool">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h3>You own your NFT, we build your Tools</h3>
              <p className="p-subtitle">
                Buy and sell NFT fractions from the world’s top artists
              </p>
            </div>
            <div className="col-md-6 item-space-around">
              <button
                className="btn btn-main color-2 "
                type="submit"
                value="Submit"
                onClick={() => navigate("/uploadProduct")}
              >
                Mint Nft
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="container no-bottom">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border"></div>
            </div>
          </div>
          <div className="col-lg-12">
            <CarouselCollectionRedux />
          </div>
        </div>
      </section>
      <section className="container no-bottom">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border"></div>
            </div>
          </div>
          <div className="col-lg-12">
            <CarouselNewRedux />
          </div>
        </div>
      </section>
      <section className="container no-bottom">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border"></div>
            </div>
          </div>
          <div className="col-lg-12">
            <AuthorListRedux />
          </div>
        </div>
      </section>
      <section className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Segment Owners</h2>
              <div className="small-border"></div>
            </div>
          </div>
          <div className="col-lg-12">
            <Ranking />
          </div>
        </div>
      </section>
      <section className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Browse by category</h2>
              <div className="small-border"></div>
            </div>
          </div>
        </div>
        <Catgor />
      </section>
      {/* <section
        className="jumbotron no-bg"
        style={{ backgroundImage: `url(${"./img/background/2.jpg"})` }}
      >
        <Particle />
        <SliderMainParticle />
      </section>
      <div>
        <div className="container p-4 shadow bg-white rounded-lg">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="p-title">You own your NFT, we build your Tools</p>
              <p className="p-subtitle">
                Buy and sell NFT fractions from the world’s top artists
              </p>
            </div>
            <div className="col-md-6 item-space-around">
              <button
                className="btn btn-main color-2 "
                type="submit"
                value="Submit"
                onClick={() => navigate("/uploadProduct")}
              >
                Mint Nft
              </button>
              <button
                className="btn btn-main"
                type="submit"
                value="Submit"
                onClick={() => navigate("/segmintNft")}
              >
                Stake Nft
              </button>
            </div>
          </div>
        </div>
      </div> */}
      <Footer />
    </div>
  );
};
export default Dashboard;

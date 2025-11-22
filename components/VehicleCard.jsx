import React from "react";
import styled from "styled-components";
import { formatDateTime } from "../functionsForGlobalUse/GlobalFunction";
import { Link } from "react-router";

const VehicleCard = ({ vehicle }) => {
  return (
    <StyledWrapper>
      <div className="flip-card">
        <div className="flip-card-inner">

          {/* FRONT SIDE */}
          <div className="flip-card-front bg-[#1b233d]">
            <div className="card">
              <div
                className="top-section bg-black"
                style={{
                  backgroundImage: `url(${vehicle.coverImage})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="border" />
                <div className="icons">
                  <div className="logo">
                    <p className="text-white">{vehicle.availability}</p>
                  </div>
                </div>
              </div>

              <div className="bottom-section">
                <span className="title">{vehicle.vehicleName}</span>

                <div className="row row1">
                  <div className="item">
                    <span className="regular-text text-white">Price/Day</span>
                    <br />
                    <span className="big-text">{vehicle.pricePerDay} $</span>
                  </div>

                  <div className="item">
                    <span className="regular-text text-white">Owner</span>
                    <br />
                    <span className="big-text">{vehicle.owner}</span>
                  </div>

                  <div className="item">
                    <span className="regular-text text-white">Category</span>
                    <br />
                    <span className="big-text">{vehicle.categories}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BACK SIDE */}
          <div className="flip-card-back text-left px-2.5">
            <p className="title">Vehicle Name : {vehicle.vehicleName}</p>
            <p className="title">Price Per Day : {vehicle.pricePerDay} $</p>
            <p className="title">Owner Name : {vehicle.owner}</p>
            <p className="title">Owner Email : {vehicle.userEmail}</p>
            <p className="title">Availability : {vehicle.availability}</p>
            <p className="title">Posted On : {formatDateTime(vehicle.createdAt)}</p>
            <Link to={`/vehicles/${vehicle._id}`} className='flex mx-auto w-fit'>
              <button className="btn bg-linear-to-br from-[#024c58] to-[#07b6d5] border-none text-[10px] md:text-[13px] lg:text-[16px] text-white mt-2.5">
                See More
              </button>
            </Link>
          </div>

        </div>
      </div>
    </StyledWrapper>
  );
};


const StyledWrapper = styled.div`
  .flip-card {
    background-color: transparent;
    width: 100%;
    height: 256px;
    perspective: 1000px;
    font-family: sans-serif;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 1rem;
    overflow: hidden;
  }

  .flip-card-back {
    background: #1b233d;
    color: white;
    transform: rotateY(180deg);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  /* NEW CARD STYLE (from your Card component) */

  .card {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    padding: 5px;
    background: rgba(0,0,0,0.3);
    backdrop-filter: blur(6px);
  }

  .top-section {
    height: 120px;
    border-radius: 15px;
    position: relative;
  }

  .border {
    width: 130px;
    height: 30px;
    background: #1b233d;
    border-bottom-right-radius: 10px;
    transform: skew(-40deg);
    box-shadow: -10px -10px 0 0 #1b233d;
  }

  .icons {
    position: absolute;
    width: 100%;
    height: 30px;
    top: 0;
    display: flex;
    justify-content: space-between;
  }

  .logo {
    padding: 7px 0 7px 15px;
  }

  .bottom-section {
    margin-top: 2px;
    padding: 1px;
  }

  .bottom-section .title {
    font-size: 18px;
    font-weight: 900;
    letter-spacing: 1px;
    color: white;
  }

  .row {
    display: flex;
    margin-top: 1px;
    justify-content: space-between;
  }

  .item {
    flex: 1;
    text-align: center;
    color: #aedef3;
  }

  .item:nth-child(2) {
    border-left: 1px solid rgba(255,255,255,0.2);
    border-right: 1px solid rgba(255,255,255,0.2);
  }

  .big-text {
    font-size: 12px;
    font-weight: bold;
  }

  .regular-text {
    font-size: 10px;
  }
`;

export default VehicleCard;
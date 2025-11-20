import React from "react";
import styled from "styled-components";

const VehicleCard = ({ vehicle }) => {
    return (
        <StyledWrapper>
            <div className="flip-card">
                <div className="flip-card-inner">

                    {/* FRONT SIDE */}
                    <div
                        className="flip-card-front"
                        style={{
                            backgroundImage: `linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.15)), url(${vehicle.coverImage})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="card">
                            <div className="top-section">
                                <div className="border" />
                                <div className="icons">
                                    <div className="logo">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 94 94" className="svg">
                                            <path fill="white" d="M38.0481 4.82927C38.0481 2.16214..." />
                                        </svg>
                                    </div>
                                    <div className="social-media">
                                        <svg className="svg" viewBox="0 0 30 30">
                                            <path d="M 9.99 3 C 6.13 3 3 6.14..." />
                                        </svg>
                                        <svg className="svg" viewBox="0 0 512 512">
                                            <path d="M459.37 151.716c..." />
                                        </svg>
                                        <svg className="svg" viewBox="0 0 640 512">
                                            <path d="M524.531 69.836c..." />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bottom-section">
                                <span className="title">{vehicle.vehicleName}</span>

                                <div className="row row1">
                                    <div className="item">
                                        <span className="big-text">{vehicle.rentPerHour}</span>
                                        <span className="regular-text">Rent/hr</span>
                                    </div>

                                    <div className="item">
                                        <span className="big-text">{vehicle.capacity}</span>
                                        <span className="regular-text">Seats</span>
                                    </div>

                                    <div className="item">
                                        <span className="big-text">View</span>
                                        <span className="regular-text">Details</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BACK SIDE */}
                    <div className="flip-card-back">
                        <p className="title">BACK</p>
                        <p>Leave Me</p>
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
    height: 254px;
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
    background: linear-gradient(45deg, rgb(4, 159, 187) 0%, rgb(80, 246, 255) 100%);
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

  .svg {
    height: 100%;
    fill: #1b233d;
    cursor: pointer;
  }

  .svg:hover {
    fill: white;
  }

  .bottom-section {
    margin-top: 10px;
    padding: 8px;
  }

  .bottom-section .title {
    font-size: 18px;
    font-weight: 900;
    letter-spacing: 1px;
    color: white;
  }

  .row {
    display: flex;
    margin-top: 15px;
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
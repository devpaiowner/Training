import React from "react";
import { Carousel } from "react-bootstrap";

export default function Slider() {
  return (
    <div className="dash-banner p-3">
      <Carousel prevIcon="" nextIcon="">
        <Carousel.Item>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="d-flex">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/slide1.png`}
                  className="w-40"
                />
                <div className="carousel-caption">
                  <h5>Pay Well | Save Well | Record Well</h5>
                  <p>
                    Empowering you to make better financial decisions for your
                    business.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="d-flex">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/slide2.png`}
                  className="w-40"
                />
                <div className="carousel-caption">
                  <h5>Pay Well | Save Well | Record Well</h5>
                  <p>
                    Empowering you to make better financial decisions for your
                    business.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="d-flex">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/slide3.png`}
                  className="w-40"
                />
                <div className="carousel-caption">
                  <h5>Pay Well | Save Well | Record Well</h5>
                  <p>
                    Empowering you to make better financial decisions for your
                    business.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

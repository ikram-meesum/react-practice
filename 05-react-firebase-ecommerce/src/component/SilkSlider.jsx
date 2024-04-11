import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Img4 from "../assets/slide4.jpg";
import Img1 from "../assets/slide1.jpg";
import Img3 from "../assets/slide3.jpg";
import Img6 from "../assets/slide6.jpg";
import Img5 from "../assets/slide5.jpg";

export default function SilkSlider() {
  const settings = {
    dots: true,
    infinite: true,
    fade: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div>
        <Slider {...settings}>
          <div className="rounded-lg overflow-hidden">
            <img className="w-full h-[400px]" src={Img5} />
          </div>

          <div className="rounded-lg overflow-hidden">
            <img className="w-full h-[400px]" src={Img4} />
          </div>

          <div className="rounded-lg overflow-hidden">
            <img className="w-full h-[400px]" src={Img6} />
          </div>

          <div className="rounded-lg overflow-hidden">
            <img className="w-full h-[400px]" src={Img3} />
          </div>
        </Slider>
      </div>
    </>
  );
}

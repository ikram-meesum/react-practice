import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Img4 from "../assets/slide4.jpg";
import Img1 from "../assets/slide1.jpg";
import Img3 from "../assets/slide3.jpg";

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
          <div className="bg-red-300">
            <img
              className="w-full h-[400px]"
              src="https://www.hermosoft.com/images/hermosoft-web-designing-dubai-slider-2.jpg"
            />
          </div>
          <div className="bg-blue-300">
            <img className="w-full h-[400px]" src={Img1} />
          </div>

          {/* <div className="bg-green-300">
            <img
              className="w-full h-[400px]"
              src="http://www.bantag.com/Assets/images/Ecommerce-Web-Development-Banner.png"
            />
          </div> */}

          <div className="bg-yellow-300">
            <img className="w-full h-[400px]" src={Img4} />
          </div>
          <div className="bg-purple-300">
            <img className="w-full h-[400px]" src={Img3} />
          </div>
        </Slider>
      </div>
    </>
  );
}

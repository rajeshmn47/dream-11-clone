import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "@emotion/styled";

const SliderContainer = styled.div`
      padding: 12px;
      margin: 10px;
      display: none;
       img {
          width: 100%;
          border-radius: 5px !important;
          height: 90px;
         }
        @media (max-width: 600px) {
         display: block;
         height: 100px;
         img {
         object-fit: cover;
         }
        }
`

const banners = [
    {
        id: 1,
        img: "./bannerimagea.png",
        alt: "Cash Bonus Offer"
    },
    {
        id: 2,
        img: "./bannerimage2.jpeg",
        alt: "Join Contest"
    },
    {
        id: 3,
        img: "./bannerimage3.jpg",
        alt: "Refer and Earn"
    }
];

export default function BannerSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false
    };

    return (
        <SliderContainer>
            <Slider {...settings}>
                {banners.map((banner) => (
                    <div key={banner.id}>
                        <img
                            src={banner.img}
                            alt={banner.alt}
                        />
                    </div>
                ))}
            </Slider>
        </SliderContainer>
    );
}

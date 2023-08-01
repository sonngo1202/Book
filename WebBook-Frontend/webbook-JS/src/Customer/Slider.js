import React, { useState, useEffect } from "react";
import "./slider.css";

function Slider() {
    const [showButton, setShowButton] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState([
        "https://bookbuy.vn/Res/Images/Album/a58ea0ba-8a85-458c-b5d9-d870e55853a7.jpg?w=880&scale=both&h=320&mode=crop",
        "https://bookbuy.vn/Res/Images/Album/f8179d2f-3703-45dc-a54d-42436435f7d6.jpg?w=880&scale=both&h=320&mode=crop",
        "https://bookbuy.vn/Res/Images/Album/5ffae3b1-5676-4ee9-89bf-d2910b21478c.jpg?w=880&scale=both&h=320&mode=crop",
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            onNext();
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const onNext = () => {
        setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    };

    const onPrev = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
    };

    const onEnter = () => {
        setShowButton(true);
    }

    const onLeave = () => {
        setShowButton(false);
    }

    return (
        <div className="slider">
            <div className="slider-content" onMouseEnter={onEnter} onMouseLeave={onLeave}>
                {showButton && <span className="control prev" onClick={onPrev}>
                    <i className="fa fa-chevron-left"></i>
                </span>}
                {showButton && <span className="control next" onClick={onNext}>
                    <i className="fa fa-chevron-right"></i>
                </span>}
                <div className="img-wrap">
                    <img src={slides[currentSlide]} alt="" />
                </div>
            </div>
            <div className="list-img">
                <img src="https://nhasachphuongnam.com/images/promo/249/SUMMER20.png"/>
                <img src="https://nhasachphuongnam.com/images/promo/249/SUMMER30.png"/>
                <img src="https://nhasachphuongnam.com/images/promo/249/SUMMER50.png"/>
            </div>
        </div>
    );
}

export default Slider;

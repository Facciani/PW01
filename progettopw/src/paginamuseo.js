import React, { useState } from "react";

import Header from "./components/header";
import Footer from "./components/footer";

import "../src/index.css";

function MuseumPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/seed/picsum/200/300",
    "https://picsum.photos/200/300/?blur",
    "https://picsum.photos/200/300.jpg",
  ];

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <Header />
      <div className="carosello-container">
        <button className="previous-button" onClick={previousImage}>
          &lt;
        </button>
        <img
          className="carousel-image background-left"
          src={
            images[
              currentImageIndex === 0
                ? images.length - 1
                : currentImageIndex - 1
            ]
          }
          alt="Carousel"
        />
        <img
          className="carousel-image foreground"
          src={images[currentImageIndex]}
          alt="Carousel"
        />
        <img
          className="carousel-image background-right"
          src={
            images[
              currentImageIndex === images.length - 1
                ? 0
                : currentImageIndex + 1
            ]
          }
          alt="Carousel"
        />
        <button className="next-button" onClick={nextImage}>
          &gt;
        </button>
      </div>
      <Footer />
    </>
  );
}

export default MuseumPage;

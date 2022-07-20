import PlaqueView from './PlaqueView';
import React, { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

function PlaqueCarousel() {
  const highlightPlaque = useSelector((state) => state.highlightPlaque);
  const fixPage = useSelector((state) => state.currentPage);
  const totalPages = useSelector((state) => state.totalPages);

  if (totalPages ===0) {
    return <></>
  }

  let autoPlayCarousel = true;
  if (highlightPlaque != null) {
    autoPlayCarousel = false;

  }

  let pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(<PlaqueView page={i} />);
  }


  return (
      <Carousel autoPlay={autoPlayCarousel} infiniteLoop={true} interval={29000} stopOnHover={false} transitionTime={1000}
        showThumbs={false} showStatus={false} showIndicators={false}
        selectedItem={fixPage}
      >
        {pages}
      </Carousel>
  );
}

export default PlaqueCarousel;

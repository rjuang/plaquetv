import PlaqueView from './PlaqueView';
import React, { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

function PlaqueCarousel() {
  const dispatch = useDispatch();

  const highlightPlaque = useSelector((state) => state.highlightPlaque);
  const searchResultPage = useSelector((state) => state.searchResultPage);
  const totalPages = useSelector((state) => state.totalPages);
  const isTyping=useSelector((state)=>state.isTyping);

  if (totalPages ===0) {
    return <></>
  }

  let autoPlayCarousel = true;
  if (highlightPlaque != null || isTyping) {
    autoPlayCarousel = false;

  }

  let pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(<PlaqueView page={i} />);
  }


  return (
      <Carousel autoPlay={autoPlayCarousel} infiniteLoop={true} interval={29000} stopOnHover={false} transitionTime={1000}
        showThumbs={false} showStatus={false} showIndicators={false}
        selectedItem={searchResultPage}
        onChange={(index)=>dispatch({type:"setCurrentPage", payload:index})}
      >
        {pages}
      </Carousel>
  );
}

export default PlaqueCarousel;

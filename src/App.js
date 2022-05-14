
import './App.css';
import PlaqueView from './PlaqueView';
import React, { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch();
  // const customRenderItem = (item, props) => {
  //   i++;
  //   return <item.type page={i} />};

  return (
    <Carousel autoPlay={true} infiniteLoop={true} interval={20000} stopOnHover={false} transitionTime={5000}
    // renderItem={customRenderItem}
    onChange={() => dispatch({ type: 'nextPage' })} showThumbs={false} showStatus={false} showIndicators={false}
     >
<PlaqueView galleryNum={1} />
<PlaqueView galleryNum={2} />

    </Carousel>
    
);
}

export default App;

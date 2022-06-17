
import './App.css';
import PlaqueView from './PlaqueView';
import React, { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useDispatch } from 'react-redux'
import {getImages, preprocessPlaques} from './plaques';
import Gallery from 'react-grid-gallery';
import SearchBox from "./SearchBox";
import { useSelector } from 'react-redux'

function App() {
  const dispatch = useDispatch();
  const autoPlayCarousel=useSelector((state)=>state.autoPlayCarousel);
  const search=useSelector((state)=>state.search);
  const searchResults=useSelector((state)=>state.searchResults);

  let rowHeight=(window.innerHeight-2)*0.5
  var scale = rowHeight / 2550;
  var picWidth = 834 * scale;
  var picsPerCol = Math.round(window.innerWidth / picWidth)+1;

  useEffect(()=>{
    const allPlaques=preprocessPlaques();
    dispatch({type:"setAllPlaques", payload: allPlaques});
  },[])

  return (
    <div>
  
  <Carousel autoPlay={autoPlayCarousel} infiniteLoop={true} interval={20000} stopOnHover={false} transitionTime={5000}
      // renderItem={customRenderItem}
      onChange={() => dispatch({ type: 'nextPage' })} showThumbs={false} showStatus={false} showIndicators={false}
       >
  <PlaqueView galleryNum={1} rowHeight={rowHeight} picsPerCol={picsPerCol}  />
  <PlaqueView galleryNum={2} rowHeight={rowHeight} picsPerCol={picsPerCol} />
  
      </Carousel>
    <SearchBox/>
    </div>
);
}

export default App;

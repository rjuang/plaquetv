
import './App.css';
import PlaqueView from './PlaqueView';
import React, { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useDispatch } from 'react-redux'
import getImages from './plaques';
import Gallery from 'react-grid-gallery';
import {Popover, OverlayTrigger, CloseButton} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBox from "./SearchBox";
import { useSelector } from 'react-redux'
import SearchView from './PlaqueGallery';

function App() {
  const dispatch = useDispatch();
  const search=useSelector((state)=>state.search);
  const searchResults=useSelector((state)=>state.searchResults);

  let rowHeight=(window.innerHeight-2)*0.5
  var scale = rowHeight / 2550;
  var picWidth = 834 * scale;
  var picsPerCol = Math.round(window.innerWidth / picWidth)+1;

  // const getAllPlaques=()=>{
  //   fetch('plaques.json'
  //   ,{
  //     headers : { 
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //      }
  //   }
  //   )
  //     .then(function(response){
  //       let plaquesJson= response.json();
  //       dispatch({type: 'allPlaques', payload: plaquesJson});
  //     });
  // }

  // useEffect(()=>{
  //   getAllPlaques()
  // },[])

  let render=<></>;
  if (search == null || search.length === 0) {
    render=(<Carousel autoPlay={true} infiniteLoop={true} interval={20000} stopOnHover={false} transitionTime={5000}
      // renderItem={customRenderItem}
      onChange={() => dispatch({ type: 'nextPage' })} showThumbs={false} showStatus={false} showIndicators={false}
       >
  <PlaqueView galleryNum={1} rowHeight={rowHeight} picsPerCol={picsPerCol}  />
  <PlaqueView galleryNum={2} rowHeight={rowHeight} picsPerCol={picsPerCol} />
  
      </Carousel>);
  } else {

    render=(<SearchView plaques={searchResults} rowHeight={rowHeight} picsPerCol={picsPerCol} />);

  }

  return (
    <div>
  
    {render}
    <SearchBox/>
    </div>
);
}

export default App;

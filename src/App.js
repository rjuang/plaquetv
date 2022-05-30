
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
import SearchView from './SearchView';

function App() {
  const dispatch = useDispatch();
  const search=useSelector((state)=>state.search);

  let render=<></>;
  if (search == null || search === "") {
    render=(<Carousel autoPlay={true} infiniteLoop={true} interval={20000} stopOnHover={false} transitionTime={5000}
      // renderItem={customRenderItem}
      onChange={() => dispatch({ type: 'nextPage' })} showThumbs={false} showStatus={false} showIndicators={false}
       >
  <PlaqueView galleryNum={1} />
  <PlaqueView galleryNum={2} />
  
      </Carousel>);
  } else {
    render=(<SearchView />);

  }

  return (
    <div>
  
    {render}
    <SearchBox/>
    </div>
);
}

export default App;

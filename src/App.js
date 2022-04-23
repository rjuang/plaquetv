import logo from './logo.svg';
import './App.css';
import PlaqueView from './PlaqueView';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useDispatch } from 'react-redux'
import { useStore } from 'react-redux'

function App() {
  const dispatch = useDispatch();
  const store = useStore();
  // const customRenderItem = (item, props) => {
  //   i++;
  //   return <item.type page={i} />};

  return (
    <Carousel autoPlay={true} infiniteLoop={true} interval={15000} 
    // renderItem={customRenderItem}
    onChange={() => dispatch({ type: 'nextPage' })}
     >
<PlaqueView />
<PlaqueView />

    </Carousel>
    
);
}

export default App;

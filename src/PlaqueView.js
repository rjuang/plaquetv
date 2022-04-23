import plaques from './plaques';
import React from 'react';
import Gallery from 'react-grid-gallery';
import { useSelector } from 'react-redux'


function PlaqueView(props) {
  const page = useSelector((state) => state.page)
  let rowHeight=window.innerHeight*0.5
  return (
   <div style={{
        display: "block",
        minHeight: "1px",
        width: "100%",
        border: "1px solid #ddd",
        overflow: "auto"}}>
    <Gallery
images={plaques[page]}
enableLightbox={false}
enableImageSelection={false} rowHeight={rowHeight} />
    </div>);
}

export default PlaqueView;
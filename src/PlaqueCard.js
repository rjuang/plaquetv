
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import DialogContent from '@mui/material/DialogContent';
import ProgressiveImage from 'react-progressive-graceful-image';

function PlaqueCard() {
  const dispatch = useDispatch();
  const highlightPlaqueHeight = useSelector((state) => state.highlightPlaqueHeight);
  const highlightPlaque = useSelector((state) => state.highlightPlaque);

  const elementRef = useRef(null);
  
  useEffect(() => {
    if (elementRef.current != null) {
      dispatch({type: "setHighlightPlaqueHeight", payload: elementRef.current.clientHeight});
    }
    
  }, []); 
  
  return (
    <DialogContent sx={{ 
      overflow: "hidden",
      height: "100vh"
    }} 
    ref={elementRef} 
    >
        <Card>
        <ProgressiveImage src={highlightPlaque.src} placeholder={highlightPlaque.thumbnail}>
  {(src) => <img src={src} style={{height:highlightPlaqueHeight.toString()+"px"}} />}
</ProgressiveImage>
        </Card>
        </DialogContent>
  );


}

export default PlaqueCard;

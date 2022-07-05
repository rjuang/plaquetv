
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import DialogContent from '@mui/material/DialogContent';


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
          <CardMedia
            component="img"
            image={highlightPlaque}
            sx={{ 
              height: highlightPlaqueHeight.toString()+"px",
            }}
            
          />
        </Card>
        </DialogContent>
  );


}

export default PlaqueCard;

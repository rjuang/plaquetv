
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';


function PlaqueCard() {
  const dispatch = useDispatch();
  const highlightPlaqueHeight = useSelector((state) => state.highlightPlaqueHeight);
  const highlightPlaque = useSelector((state) => state.highlightPlaque);

  const elementRef = useRef(null);
  
  useEffect(() => {
    if (elementRef.current != null) {
      dispatch({type: "setHighlightPlaqueHeight", payload: elementRef.current.clientHeight});
    }
    
  }, []); //empty dependency array so it only runs once at render

  // const cardHeight = rowHeight * 2;
  // const imgHeight = cardHeight * 0.82;
    
  return (
        <Card>
          <CardMedia
            component="img"
            image={highlightPlaque}
            sx={{ 
              maxHeight: "95vh",
              height: "549px",
              width: "auto",
            }}
            ref={elementRef} 
          />
        </Card>
  );


}

export default PlaqueCard;

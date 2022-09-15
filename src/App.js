
import './App.css';
import PlaqueView from './PlaqueView';
import React, { useEffect, useRef, useState  } from 'react';
import PlaqueCarousel from './Carousel';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import HighlightPlaque from './HighlightPlaque';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import allPlaques from "./plaques.json";
import Box from '@mui/material/Box';
import SearchBar from './SearchBox';

function App(props) {

  const dispatch = useDispatch();
  let search = useSelector((state) => state.search);
  const highlightPlaque = useSelector((state) => state.highlightPlaque);
  const rowHeight = useSelector((state) => state.rowHeight);
  const totalPages = useSelector((state) => state.totalPages);
  const showSearchBar=useSelector((state)=>state.showSearchBar);

  const handleMouseMove = (event) => {
    // console.log(event.clientX, event.clientY);
    if (event.clientY > Math.floor(rowHeight*1.8) && showSearchBar==false) {
      dispatch({type:"setShowSearchBar", payload: true})    
    }
  };

  const testHighlight={
    src: allPlaques[0].file
  };

  useEffect(() => {


    function handleResize() {
      let rowHeight = (window.innerHeight - 2) * 0.5
      var scale = rowHeight / 2550;
      var picWidth = 834 * scale;
      var picsPerCol = Math.floor(window.innerWidth / picWidth) + 1;

      dispatch({
        type: 'setWinSize',
        payload: { picsPerCol, rowHeight }
      });

    }
    // window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    
    new Promise((resolve)=>{
      handleResize();
      setTimeout(resolve, 1000);
    }).then(()=>new Promise((resolve)=>{
      handleResize();
      dispatch({type:'clickHighlight', payload:testHighlight});
      setTimeout(resolve, 3000);
      
    })).then(()=>{
      dispatch({type:"closeHighlightPopup"});
      dispatch({type:"initDone"});
    }); 

    // Remove event listener on cleanup
    // return () => window.removeEventListener("resize", handleResize);

  }, [])


  let pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(<PlaqueView page={i} />);
  }

if (search.length>0) {
  search=search[0]
}
  return (
    <div>
      <SearchBar />
      <Box
        onMouseMove={handleMouseMove}
      >
      <PlaqueCarousel />
      </Box>
      <HighlightPlaque />
    </div>
  );
}

export default App;

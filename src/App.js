
import './App.css';
import PlaqueView from './PlaqueView';
import React, { useEffect, useRef } from 'react';
import PlaqueCarousel from './Carousel';
import { useDispatch } from 'react-redux'
import { getImages, preprocessPlaques, getSearchPage } from './plaques';
import Gallery from 'react-grid-gallery';
import SearchBox from "./SearchBox";
import { useSelector } from 'react-redux'
import HighlightPlaque from './HighlightPlaque';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { styled, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import allPlaques from "./plaques.json";
import Paper from '@mui/material/Paper';

function HideOnScroll(props) {
  const { children, window } = props;

  const highlightPlaque = useSelector((state) => state.highlightPlaque);
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    threshold: 1
  });

  let showTopBar=!trigger;
  if (highlightPlaque != null) {
    showTopBar=false;
  }

  return (
    <Slide appear={false} direction="down" 
    // in={!trigger}
    in={showTopBar} 
    >
      {children}
    </Slide>
  );
}



function App(props) {
  const dispatch = useDispatch();
  let search = useSelector((state) => state.search);
  const searchResults = useSelector((state) => state.searchResults);
  const highlightPlaque = useSelector((state) => state.highlightPlaque);
  const picsPerCol = useSelector((state) => state.picsPerCol);
  const totalPages = useSelector((state) => state.totalPages);

  const pageEndRef = useRef(null);
  const scrollerRef=useRef(null);

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
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();

    setTimeout(()=>pageEndRef.current?.scrollIntoView({behavior:"smooth"}), 2000);

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);

  }, [])

  let autoPlayCarousel = true;
  if (highlightPlaque != null) {
    autoPlayCarousel = false;
  }

  let pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(<PlaqueView page={i} />);
  }

  const ids = allPlaques.map(p => p.id);
  const beneficiarys = allPlaques.map(p => p.benefiary);
  const requesters = allPlaques.map(p => p.requester);
  const peoples = Array.from(new Set([...beneficiarys, ...requesters]));
  const options = ids.concat(peoples);


const paperWidth=Math.floor(window.innerWidth*0.6);
const searchBarWidth=Math.floor(paperWidth*0.8);

if (search.length>0) {
  search=search[0]
}
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
          {/* <Search> */}
          <Paper
      // component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: paperWidth }}
    >
            <Autocomplete
            // multiple
            autoHighlight          
            handleHomeEndKeys={false}
            options={options}
            // defaultValue={[]}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ ml: 2, flex: 1,  width: searchBarWidth }}
                variant="standard"
                // label="Search for Plaques"
                placeholder="Name on plaque or plaque ID"
              />
            )}
            onChange={(event, value)=>dispatch({ type: 'search', payload: [value,] })}
            onFocus={()=>dispatch({type:"startTyping"})}
            onBlur={()=>dispatch({type:"stopTyping"})}
            onKeyDown={(event)=>{
              if (event.key === 'Enter') {
             if (search.length>0) {
new Promise(
  (resolve)=>{
    pageEndRef.current?.scrollIntoView();
    pageEndRef.current?.focus();
    setTimeout(resolve, 1000);
  }).then(()=>{
    dispatch({type:"showSearchResults"});
  });

                // dispatch({type:"showSearchResults"})
             }
              }
            }}
            value={search}
          />
          {/* </Search> */}
          <IconButton aria-label="search" sx={{ p: '10px', m:'10px' }} >
  <SearchIcon onClick={()=>
new Promise(
  (resolve)=>{
    pageEndRef.current?.scrollIntoView();
    pageEndRef.current?.focus();
    setTimeout(resolve, 1000);
  }).then(()=>{
    dispatch({type:"showSearchResults"});
  })

    // ()=>dispatch({type:"showSearchResults"})
    } />
</IconButton>
</Paper>
<Typography
            variant="h5"
            component="div"
            sx={{ ml:20 }}
          >
            v1.0
          </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <PlaqueCarousel />
      {/* <SearchBox /> */}
      <HighlightPlaque />
      <div ref={pageEndRef} />
    </React.Fragment>
    // <div>
 
    // </div>
  );
}

export default App;

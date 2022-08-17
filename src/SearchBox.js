
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'reactjs-popup/dist/index.css';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import allPlaques from "./plaques.json";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';

export function HideOnScroll(props) {
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


export function SearchBox() {
  const dispatch = useDispatch();
  let search = useSelector((state) => state.search);

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
    // wait for the keyboard on tv to disappear
    setTimeout(resolve, 2000);
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
  <SearchIcon onClick={    ()=>dispatch({type:"showSearchResults"})
    } />
</IconButton>
</Paper>
  )
}

export default SearchBox;


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'reactjs-popup/dist/index.css';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import allPlaques from "./plaques.json";
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Offcanvas from 'react-bootstrap/Offcanvas';               
import 'bootstrap/dist/css/bootstrap.min.css'; 

export function SearchBar() {
  const dispatch = useDispatch();
  let search = useSelector((state) => state.search);
  const showSearchBar = useSelector((state) => state.showSearchBar);

  const ids = allPlaques.map(p => p.id);
  const beneficiarys = allPlaques.map(p => p.benefiary);
  const requesters = allPlaques.map(p => p.requester);
  const peoples = Array.from(new Set([...beneficiarys, ...requesters]));
  const options = ids.concat(peoples);


  const paperWidth = Math.floor(window.innerWidth * 0.6);
  const searchBarWidth = Math.floor(paperWidth * 0.8);

  if (search.length > 0) {
    search = search[0]
  }
  return (
    <Offcanvas show={showSearchBar} onHide={() => dispatch({ type: "setShowSearchBar", payload: false })} placement="bottom">
      <Offcanvas.Header closeButton>

        <Autocomplete
          // multiple
          autoHighlight
          handleHomeEndKeys={false}
          options={options}
          // defaultValue={[]}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ ml: 2, flex: 1, width: searchBarWidth }}
              variant="standard"
              // label="Search for Plaques"
              placeholder="Name on plaque or plaque ID"
            />
          )}
          onChange={(event, value) => dispatch({ type: 'search', payload: [value,] })}
          onFocus={() => dispatch({ type: "startTyping" })}
          onBlur={() => dispatch({ type: "stopTyping" })}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              if (search.length > 0) {
                new Promise(
                  (resolve) => {
                    dispatch({ type: "setShowSearchBar", payload: false });
                    // wait for the keyboard on tv to disappear
                    setTimeout(resolve, 3000);
                  }).then(() => {
                    dispatch({ type: "showSearchResults" });
                  });
              }
            }
          }}
          value={search}
        />
        <IconButton aria-label="search" sx={{ p: '10px', m: '10px' }} >
          <SearchIcon onClick={() =>
            new Promise((resolve) => {
              dispatch({ type: "setShowSearchBar", payload: false });
              setTimeout(resolve, 1000);
            }).then(() => {
              dispatch({ type: "showSearchResults" });
            })} />
        </IconButton>
        <Typography
          variant="h5"
          component="div"
          sx={{ ml: 20 }}
        >
          v1.7
        </Typography>
      </Offcanvas.Header>
    </Offcanvas>
  );
}

export default SearchBar;

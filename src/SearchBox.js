
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
import Paper from '@mui/material/Paper';
import Offcanvas from 'react-bootstrap/Offcanvas'; 
import Card from 'react-bootstrap/Card';   
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';           
import 'bootstrap/dist/css/bootstrap.min.css'; 

export function SearchBar() {
  const dispatch = useDispatch();
  let search = useSelector((state) => state.search);
  const showSearchBar = useSelector((state) => state.showSearchBar);
  const rowHeight = useSelector((state) => state.rowHeight);

  const ids = allPlaques.map(p => p.id);
  const beneficiarys = allPlaques.map(p => p.benefiary);
  const requesters = allPlaques.map(p => p.requester);
  const peoples = Array.from(new Set([...beneficiarys, ...requesters]));
  const options = ids.concat(peoples);

  
  const paperWidth = Math.floor(window.innerWidth * 0.7);
  const searchBarWidth = Math.floor(paperWidth * 0.8);
  const offCanvasHeight=Math.floor(rowHeight*0.4);
  const paperHeight=Math.floor(offCanvasHeight*0.6);

  if (search.length > 0) {
    search = search[0]
  }
  return (
    <Offcanvas show={showSearchBar} onHide={() => dispatch({ type: "setShowSearchBar", payload: false })} placement="bottom" style={{height: offCanvasHeight}}>
      <Offcanvas.Header closeButton >
      <Card style={{ width: paperWidth }}>
      <Card.Title>
        <Row>
          <Col>
        <Autocomplete
          // multiple
          autoHighlight
          handleHomeEndKeys={false}
          options={options}
          // defaultValue={[]}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ ml: 2, flex: 1, width: searchBarWidth, display:"inline-block" }}
              variant="standard"
              label="Search for Plaques"
              placeholder="Name on plaque or plaque ID"
            />
          )}
          onChange={(event, value) => dispatch({ type: 'search', payload: [value,] })}
          // onFocus={() => dispatch({ type: "startTyping" })}
          // onBlur={() => dispatch({ type: "stopTyping" })}
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
        </Col>
        
        <Col>
        <IconButton aria-label="search" sx={{display:"inline-block"}} >
          <SearchIcon onClick={() =>
            new Promise((resolve) => {
              dispatch({ type: "setShowSearchBar", payload: false });
              setTimeout(resolve, 1000);
            }).then(() => {
              dispatch({ type: "showSearchResults" });
            })} />
        </IconButton>
        </Col>
        </Row>
        </Card.Title>
        </Card>
        <Typography
          variant="h5"
          component="div"
          // sx={{ m: 20 }}
        >
          DTT<br/>
          v1.8
        </Typography>
        </Offcanvas.Header>
      <Offcanvas.Body />
    </Offcanvas>
  );
}

export default SearchBar;

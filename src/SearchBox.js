
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Popover, OverlayTrigger, CloseButton, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import useKeypress from 'react-use-keypress';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import allPlaques from "./plaques.json";
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

function SearchBox() {
  const dispatch = useDispatch();

  const showPopup = useSelector((state) => state.showSearchPopup);
  const search = useSelector((state) => state.search);
  const exactSearch = useSelector((state) => state.exactSearch);

  useKeypress(['Home', 'MediaPlayPause', 'AudioVolumeDown', 'AudioVolumeUp'], () => {
    if (showPopup === true) {
      dispatch({ type: 'setPopup', payload: false })
    } else {
      dispatch({ type: 'setPopup', payload: true })
    }

  });

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const ids = allPlaques.map(p => p.id);
  const beneficiarys = allPlaques.map(p => p.benefiary);
  const requesters = allPlaques.map(p => p.requester);
  const peoples = Array.from(new Set([...beneficiarys, ...requesters]));
  const options = ids.concat(peoples);

  return (
    <div>
      <Modal
        open={showPopup}
        onClose={() => dispatch({ type: 'setPopup', payload: false })}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Popup open={showPopup} onClose={()=> dispatch({ type: 'setPopup', payload: false })} modal> */}
          <Autocomplete
            multiple
            
            handleHomeEndKeys={false}
            options={options}
            defaultValue={[]}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Search for Plaques"
                placeholder="Name on plaque or plaque ID"
                autoFocus={true}
              />
            )}
            onChange={(event, value)=>dispatch({ type: 'search', payload: value })}
            value={search}
          />
          <br />
          <Stack direction="row" justifyContent="space-evenly"
            alignItems="center" spacing={2}>
            <Button variant="outlined" onClick={
              () => {
                dispatch({type:'search', payload:[]});
                dispatch({ type: 'setPopup', payload: false });
                }
              }>  Cancel</Button>
            <Button variant="contained" onClick={() => dispatch({ type: 'setPopup', payload: false })}>Search</Button>
          </Stack>



          {/* <Form>
 <Form.Check 
    type="switch"
    label="Search Plaque ID"
    onChange={(event)=> dispatch({type: 'setExactSearch', payload: event.target.checked})} checked={exactSearch}
  />
  <Form.Control size="lg" type="text" placeholder="Name on plaque or plaque ID" onChange={(event)=> dispatch({ type: 'search', payload: event.target.value })} value={search} />
  </Form>  */}

        </Box>
      </Modal>
    </div>
  )
}

export default SearchBox;

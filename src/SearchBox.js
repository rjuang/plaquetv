
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Popover, OverlayTrigger, CloseButton, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import useKeypress from 'react-use-keypress';

function SearchBox() {
  const dispatch = useDispatch();

  const showPopup=useSelector((state)=>state.showSearchPopup);
  const search=useSelector((state)=>state.search);
  const exactSearch=useSelector((state)=>state.exactSearch);

  useKeypress(['Home', 'MediaPlayPause'], () => {
    if (showPopup === true) {
      dispatch({ type: 'setPopup', payload: false })
    } else {
      dispatch({ type: 'setPopup', payload: true })
    }
    
  });

    return (
      <div>
      <Popup open={showPopup} closeOnDocumentClick onClose={()=> dispatch({ type: 'setPopup', payload: false })} modal>
          <Form>
          {/* <Form.Check 
    type="switch"
    label="Search Plaque ID"
    onChange={(event)=> dispatch({type: 'setExactSearch', payload: event.target.checked})} checked={exactSearch}
  /> */}
  <Form.Control size="lg" type="text" placeholder="Name on plaque or plaque ID" onChange={(event)=> dispatch({ type: 'search', payload: event.target.value })} value={search} />
  </Form> 
      </Popup>
    </div>
    )
}

export default SearchBox;

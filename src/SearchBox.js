
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import {Popover, OverlayTrigger, CloseButton, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function SearchBox() {
  const dispatch = useDispatch();

  const popOver= (
    <Popover id="popover-basic">
  <Popover.Body>
  <Form>
  <Form.Control size="lg" type="text" placeholder="Name on plaque or plaque ID" onChange={(event)=> dispatch({ type: 'search', payload: event.target.value })}/>
  </Form>
  </Popover.Body>
</Popover>
);

    return (
      <OverlayTrigger trigger="click" placement="top" overlay={popOver}>
    <CloseButton />
    </OverlayTrigger>
    )
}

export default SearchBox;

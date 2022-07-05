
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';


function HighlightPlaque() {
  const dispatch = useDispatch();
  const rowHeight = useSelector((state) => state.rowHeight);
  const highlightPlaque = useSelector((state) => state.highlightPlaque);

  if (highlightPlaque == null) {
    return <></>;
  }

  const cardHeight = rowHeight * 2;
  const imgHeight = cardHeight * 0.82;

  const handleClose = () => dispatch({ type: "closeHighlightPopup" });

  return <div>
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={{ m: 0, p: 3 }}>
        <IconButton color="primary" aria-label="close" onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ 
              overflow: "hidden",
              height: "90vh"
            }}>
        <Card >
          <CardMedia
            component="img"
            image={highlightPlaque}
            sx={{ 
              height: imgHeight 
            }}
          />
        </Card>
      </DialogContent>
    </Dialog>
  </div>
    ;


}

export default HighlightPlaque;

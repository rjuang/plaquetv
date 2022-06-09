
import React from 'react';
import Gallery from 'react-grid-gallery';

 function getImagesFromMetadata(picsPerCol, metadata) {
    let images = metadata.map(
      (e) => ({
        src: e.file,
        thumbnail: e.file,
        thumbnailWidth: 834,
        thumbnailHeight: 2550,
      })
    );
  
    let imagesPerPage = picsPerCol * 2;
    for (var i = images.length; i < imagesPerPage; i++) {
      images.push({
        src: "background.png",
        thumbnail: "background.png",
        thumbnailWidth: 834,
        thumbnailHeight: 2550,
      });
    }
  
    return images;
  }

function arrangeForDisplay(plaques, picsPerCol) {
    let arr=Array(plaques.length);
    let left=0, right=0, i=0;

    if (picsPerCol%2===1) {
        let center=(picsPerCol-1)/2;
        arr[center]=plaques[0];
        arr[center+picsPerCol]=plaques[1];

        left=center-1;
        right=center+1;
        i=2;
    } else {
        right=picsPerCol/2;
        left=right-1;
    }

    for (; i<plaques.length; i=i+4) {
        arr[left]=plaques[i];
        arr[left+picsPerCol]=plaques[i+1];
        arr[right]=plaques[i+2]; 
        arr[right+picsPerCol]=plaques[i+3];

        left=left-1;
        right=right+1;
    }

    return arr;
}

function PlaqueGallery(props) {
  const plaques=arrangeForDisplay(getImagesFromMetadata(props.picsPerCol,props.plaques), props.picsPerCol);

  return (
   <div style={{
        display: "block",
        minHeight: "1px",
        width: "100%",
        border: "1px solid #ddd",
        overflow: "auto"}}>
        <Gallery
images={plaques}
enableLightbox={false}
enableImageSelection={false} rowHeight={props.rowHeight} margin={0} maxRows={2} />
    </div>);
}

export default PlaqueGallery;
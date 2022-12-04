
import { useSelector } from 'react-redux'
import allPlaques from "./plaques.json";

const NUM_ROWS = 3;

export function preprocessPlaques(picsPerCol) {
  const mmbPlaques=allPlaques.filter(p=>p.type==="mmb");
  const rebirthPlaques=allPlaques.filter(p=>p.type==="rebirth");
  // const wishPlaques=allPlaques.filter(p=>p.type==="wish");
  
  const imagesPerPage = picsPerCol * NUM_ROWS;
  
  const pad1Len=Math.ceil(mmbPlaques.length/imagesPerPage)*imagesPerPage-mmbPlaques.length;
  const pad2Len=Math.ceil(rebirthPlaques.length/imagesPerPage)*imagesPerPage-rebirthPlaques.length;
  // const pad3Len=Math.ceil(wishPlaques.length/imagesPerPage)*imagesPerPage-wishPlaques.length;

  const padItem={
    "id": "",
    "file": "background.png",
    "previewFile":"background.png",
    "benefiary": "",
    "requester": "",
    "requestDate": "",
    "expiryDate": "",
    "type": "",
    "searchable": false
};
  const pad1=Array(pad1Len).fill({
    "id": "",
    "file": "mmb_blank.png",
    "previewFile":"mmbPreview.png",
    "benefiary": "",
    "requester": "",
    "requestDate": "",
    "expiryDate": "",
    "type": "",
    "searchable": false
});
  const pad2=Array(pad2Len).fill({
    "id": "",
    "file": "rebirth_blank.png",
    "previewFile": "rebirthPreview.png",
    "benefiary": "",
    "requester": "",
    "requestDate": "",
    "expiryDate": "",
    "type": "",
    "searchable": false
});
  // const pad3=Array(pad3Len).fill(padItem);
  const plaques=mmbPlaques.concat(pad1, rebirthPlaques, pad2
    // , wishPlaques, pad3
    );

  return plaques;
}

export function getImages(allPlaques, picsPerCol, page) {

  const imagesPerPage=picsPerCol * NUM_ROWS;
  const start=imagesPerPage*page;
  const end=imagesPerPage*(page+NUM_ROWS-1);

  return allPlaques.slice(start, end);
}

export function getSearchView(allPlaques, picsPerCol, searchResult) {
  const resultIndex=allPlaques.findIndex(
    (p)=>p.id===searchResult.id
  );

  if (resultIndex===-1){
    return [];
  }

  const imagesPerPage=picsPerCol * NUM_ROWS;
  const page=(resultIndex-(resultIndex%imagesPerPage))/imagesPerPage;

  return getImages(allPlaques, picsPerCol, page);

}

export function getSearchPage(allPlaques, picsPerCol, searchResult) {
  const resultIndex=allPlaques.findIndex(
    (p)=>p.id===searchResult.id
  );

  if (resultIndex===-1){
    return -1;
  }

  const imagesPerPage=picsPerCol * NUM_ROWS;
  const page=(resultIndex-(resultIndex%imagesPerPage))/imagesPerPage;

  return page;
}

export function getGalleryPlaqueInfo(plaque) {
  return {
    src: plaque.file,
    thumbnail: plaque.previewFile,
    thumbnailWidth: 235,
    thumbnailHeight: 720,
  };
}
export default getImages;

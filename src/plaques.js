
import { useSelector } from 'react-redux'
import allPlaques from "./plaques.json";

export function preprocessPlaques(picsPerCol) {
  const mmbPlaques=allPlaques.filter(p=>p.type==="mmb");
  const rebirthPlaques=allPlaques.filter(p=>p.type==="rebirth");
  // const wishPlaques=allPlaques.filter(p=>p.type==="wish");
  
  const imagesPerPage = picsPerCol * 2;
  
  const pad1Len=Math.ceil(mmbPlaques.length/imagesPerPage)*imagesPerPage-mmbPlaques.length;
  const pad2Len=Math.ceil(rebirthPlaques.length/imagesPerPage)*imagesPerPage-rebirthPlaques.length;
  // const pad3Len=Math.ceil(wishPlaques.length/imagesPerPage)*imagesPerPage-wishPlaques.length;

  const padItem={
    "id": "",
    "file": "background.png",
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

  const imagesPerPage=picsPerCol*2;
  const start=imagesPerPage*page;
  const end=imagesPerPage*(page+1);

  return allPlaques.slice(start, end);

  // let imageSets = [];
  // let imagesPerPage = picsPerCol * 2;

  // let images = [
  //   {
  //     src: "mmb_2204001.png",
  //     thumbnail: "mmb_2204001.png",
  //     thumbnailWidth: 834,
  //     thumbnailHeight: 2550,
  //   },
  //   {
  //     src: "mmb_2204002.png",
  //     thumbnail: "mmb_2204002.png",
  //     thumbnailWidth: 834,
  //     thumbnailHeight: 2550,
  //   },
  //   {
  //     src: "mmb_2204003.png",
  //     thumbnail: "mmb_2204003.png",
  //     thumbnailWidth: 834,
  //     thumbnailHeight: 2550,
  //   },
  //   {
  //     src: "mmb_2204004.png",
  //     thumbnail: "mmb_2204004.png",
  //     thumbnailWidth: 834,
  //     thumbnailHeight: 2550,
  //   },

  // ];
  // for (var i = images.length; i < imagesPerPage; i++) {
  //   images.push({
  //     src: "mmb_blank.png",
  //     thumbnail: "mmb_blank.png",
  //     thumbnailWidth: 834,
  //     thumbnailHeight: 2550,
  //   });
  // }

  // imageSets.push(images);

  // images = []
  // for (var i = 0; i < imagesPerPage; i++) {
  //   images.push({
  //     src: "mmb_blank.png",
  //     thumbnail: "mmb_blank.png",
  //     thumbnailWidth: 834,
  //     thumbnailHeight: 2550,
  //   });
  // }
  // imageSets.push(images);

  // images = [
  //   {
  //     src: "rebirth_2205001.png",
  //     thumbnail: "rebirth_2205001.png",
  //     thumbnailWidth: 834,
  //     thumbnailHeight: 2550,
  //   },
  //   {
  //     src: "rebirth_2205002.png",
  //     thumbnail: "rebirth_2205002.png",
  //     thumbnailWidth: 834,
  //     thumbnailHeight: 2550,
  //   },
  //   {
  //     src: "rebirth_2205003.png",
  //     thumbnail: "rebirth_2205003.png",
  //     thumbnailWidth: 834,
  //     thumbnailHeight: 2550,
  //   },
  //   {
  //     src: "rebirth_2205004.png",
  //     thumbnail: "rebirth_2205004.png",
  //     thumbnailWidth: 834,
  //     thumbnailHeight: 2550,
  //   },
  //   {
  //     src: "rebirth_2205005.png",
  //     thumbnail: "rebirth_2205005.png",
  //     thumbnailWidth: 834,
  //     thumbnailHeight: 2550,
  //   },
  // ];
  // for (var i = images.length; i < imagesPerPage; i++) {
  //   images.push({
  //     src: "rebirth_blank.png",
  //     thumbnail: "rebirth_blank.png",
  //     thumbnailWidth: 834,
  //     thumbnailHeight: 2550,
  //   });
  // }
  // imageSets.push(images);

  // return imageSets[page];
}

export default getImages;
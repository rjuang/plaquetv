let imageSets= []

for (var j=3; j<11; j++) {
let images=[];
  for (var i=1; i<29; i++) {
    images.push(  {
      src: "pic"+i.toString()+".png",
      thumbnail: "pic"+j.toString()+".png",
      thumbnailWidth: 834,
      thumbnailHeight: 2550,
  });
}
  imageSets.push(images);
}

export default imageSets;
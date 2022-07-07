
import './App.css';
import PlaqueView from './PlaqueView';
import React, { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useDispatch } from 'react-redux'
import { getImages, preprocessPlaques, getSearchPage } from './plaques';
import Gallery from 'react-grid-gallery';
import SearchBox from "./SearchBox";
import { useSelector } from 'react-redux'
import HighlightPlaque from './HighlightPlaque';

function App() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const searchResults = useSelector((state) => state.searchResults);
  const highlightPlaque = useSelector((state) => state.highlightPlaque);
  const fixPage = useSelector((state) => state.currentPage);
  const allPlaques = useSelector((state) => state.allPlaques);
  const picsPerCol = useSelector((state) => state.picsPerCol);
  const totalPages = useSelector((state) => state.totalPages);

  useEffect(() => {

    function handleResize() {
      let rowHeight = (window.innerHeight - 2) * 0.5
      var scale = rowHeight / 2550;
      var picWidth = 834 * scale;
      var picsPerCol = Math.floor(window.innerWidth / picWidth) + 1;

      dispatch({
        type: 'setWinSize',
        payload: { picsPerCol, rowHeight }
      });

    }
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);

  }, [])

  let autoPlayCarousel = true;
  if (highlightPlaque != null) {
    autoPlayCarousel = false;

  }

  let optionalProps = {};
  if (searchResults.length != 0 && highlightPlaque != null) {
    optionalProps = {
      selectedItem: getSearchPage(allPlaques, picsPerCol, highlightPlaque)
    };
  }

  let pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(<PlaqueView page={i} />);
  }


  return (
    <div>

      <Carousel autoPlay={autoPlayCarousel} infiniteLoop={true} interval={29000} stopOnHover={false} transitionTime={1000}
        // renderItem={customRenderItem}
        // onChange={() => dispatch({ type: 'setCurrentPage', payload: currentPage+1 })} 
        showThumbs={false} showStatus={false} showIndicators={false}
        selectedItem={fixPage}
      >
        {pages}
      </Carousel>
      <SearchBox />
      <HighlightPlaque />
    </div>
  );
}

export default App;

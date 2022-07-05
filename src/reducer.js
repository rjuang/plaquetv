import { createAction } from '@reduxjs/toolkit'
import searchPlaques from './searchLogic';
import { preprocessPlaques} from './plaques';
import {getSearchPage} from './plaques';

const initialState = { 
  gallery1Page: 0,
  gallery2Page: 0,
  currentGallery: 1,
  totalPages: 0,
  search: [],
  showSearchPopup: false,
  allPlaques:[],
  searchResults:[],
  highlightPlaque: null,
  picsPerCol:1,
  rowHeight: 1,
  currentPage: 0,
  highlightPlaqueHeight: 1,
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'setCurrentPage': {
    
      let page=action.payload % state.totalPages;

      if (page===state.currentPage) {
        return state;
      }
      
      return {
        ...state,
        currentPage:page
      }
      // let gallery1Page=state.gallery1Page;
      // let gallery2Page=state.gallery2Page;
      // let currentGallery=1;

      // if (state.currentGallery == 1) {
      //   gallery2Page=(state.gallery2Page+2) % state.totalPages;
      //   currentGallery=2;
      // } else {
      //   gallery1Page=(state.gallery1Page+2) % state.totalPages;
      //   currentGallery=1;
      // }

      // return {
      //   ...state,
      //   gallery1Page: gallery1Page,
      //   gallery2Page: gallery2Page,
      //   currentGallery: currentGallery,
      // }
    }
    case 'search': {
      const searchTerm=action.payload;
      const searchResults=searchPlaques(searchTerm);

      let newState={
        ...state,
        search: action.payload,
        searchResults: searchResults,
        
      };

      if (state.searchResults.length ===0) {
        newState={
          ...newState,
          autoPlayCarousel: true,
          highlightPlaque: null
        }
      }

      return newState;
      
    }
    case 'setPopup': {
      let newState={
        ...state,
        showSearchPopup: action.payload

      };

      if (action.payload===false && state.searchResults.length !=0) {
        const page=getSearchPage(state.allPlaques, state.picsPerCol, state.searchResults[0]);

        newState={
          ...newState,
          autoPlayCarousel: false,
          highlightPlaque: state.searchResults[0].file,
          currentPage:page
        }
      }
      return newState;



    }
    case 'setAllPlaques':{
      return {
        ...state,
        allPlaques: action.payload.allPlaques,
        totalPages: action.payload.totalPages,
        gallery2Page: action.payload.totalPages-1,
      }
    }
    case 'closeHighlightPopup': {
      return {
        ...state,
        highlightPlaque: null
      }
    }
    case 'clickHighlight': {
      return {
        ...state,
        highlightPlaque: action.payload.src
      }
    }
    case 'setWinSize': {
      if (action.payload.picsPerCol === state.picsPerCol) {
        return state;
      }

      const picsPerCol=action.payload.picsPerCol;
      const imagesPerPage=picsPerCol*2;
      const allPlaques=preprocessPlaques(picsPerCol);
      const totalPages=Math.round(allPlaques.length/imagesPerPage);
   
      return {
        ...state,
        picsPerCol: picsPerCol,
        rowHeight: action.payload.rowHeight,
        allPlaques: allPlaques,
        totalPages: totalPages,
        gallery1Page: 0,
        gallery2Page: totalPages-1,
        currentGallery: 1,      
      }
    }
    case 'setHighlightPlaqueHeight': {
      const highlightPlaqueHeight=Math.floor(action.payload*0.9);
      if (highlightPlaqueHeight === state.highlightPlaqueHeight) {
        return state;
      }

      return {
        ...state,
        highlightPlaqueHeight: highlightPlaqueHeight
      }
    }
    default:
      return state
  }
}

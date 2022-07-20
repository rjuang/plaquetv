import { createAction } from '@reduxjs/toolkit'
import searchPlaques from './searchLogic';
import { preprocessPlaques} from './plaques';
import {getSearchPage} from './plaques';

const initialState = { 
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
      }
    }
    case 'setHighlightPlaqueHeight': {
      const highlightPlaqueHeight=action.payload-5;
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

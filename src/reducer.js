import { createAction } from '@reduxjs/toolkit'
import searchPlaques from './searchLogic';
import { preprocessPlaques, getGalleryPlaqueInfo} from './plaques';
import {getSearchPage} from './plaques';

const NUM_ROWS = 3;
const initialState = { 
  totalPages: 0,
  search: [],
  allPlaques:[],
  searchResults:[],
  highlightPlaque: null,
  picsPerCol:1,
  rowHeight: 1,
  currentPage: 0,
  searchResultPage:0,
  highlightPlaqueHeight: 1,
  isTyping: false,
  initDone: false,
  showSearchBar: false,
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
    case 'showSearchResults': {
      const searchTerm=state.search;

      if (searchTerm.length==0) {
        return state;
      }

      const searchResults=searchPlaques(searchTerm);

      if (searchResults.length==0) {
        return state;
      }

      const page=getSearchPage(state.allPlaques, state.picsPerCol, searchResults[0]);

    return {
          ...state,
          searchResults: searchResults,       
          highlightPlaque: getGalleryPlaqueInfo(searchResults[0]),
          searchResultPage:page,
          showSearchBar: false
        }
    
    }
    case 'search':{
      const searchTerm=action.payload;

      if (state.search==searchTerm) {
        return state;
      }
      
      return {
        ...state,
        search:searchTerm
      };
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
        highlightPlaque: action.payload,
        showSearchBar: false
      }
    }
    case 'setWinSize': {
      if (state.initDone) {
        return state;
      }

      if (action.payload.picsPerCol === state.picsPerCol) {
        return state;
      }

      // if (state.isTyping) {
      //   return state;
      // }

      const picsPerCol=action.payload.picsPerCol;
      const imagesPerPage=picsPerCol*NUM_ROWS;
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
      if (state.initDone) {
        return state;
      }

      const highlightPlaqueHeight=action.payload-5;
      if (highlightPlaqueHeight === state.highlightPlaqueHeight) {
        return state;
      }

      // if (state.isTyping) {
      //   return state;
      // }


      return {
        ...state,
        highlightPlaqueHeight: highlightPlaqueHeight
      }
    }
    // case 'startTyping':{
    //   if (state.isTyping) {
    //     return state;
    //   }

    //   return {
    //     ...state,
    //     isTyping: true
    //   }
    // }
    // case 'stopTyping':{
    //   if (!state.isTyping) {
    //     return state;
    //   }

    //   return {
    //     ...state,
    //     isTyping: false
    //   }
    // }
    case 'initDone': {
      return {
        ...state,
        initDone: true
      }
    }
    case 'setShowSearchBar': {
      if (action.payload===state.showSearchBar) {
        return state;
      }

      if (action.payload==true && state.highlightPlaque!=null) {
        return state;
      }
      
      let newState={
        ...state,
        showSearchBar: action.payload
      };

      if (state.searchResultPage!=state.currentPage) {
        newState={
          ...newState,
          searchResultPage: state.currentPage,
        }
      }

      return newState;
    }
    default:
      return state
  }
}

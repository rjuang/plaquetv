import { createAction } from '@reduxjs/toolkit'
import searchPlaques from './searchLogic';

const nextPage = createAction('nextPage')
const search = createAction('search')
const setPopup = createAction('setPopup')

const initialState = { 
  gallery1Page: 0,
  gallery2Page: 0,
  currentGallery: 1,
  totalPages: 0,
  autoPlayCarousel: true,
  search: [],
  exactSearch: false,
  showSearchPopup: false,
  allPlaques:[],
  searchResults:[],
  highlightPlaque: null,
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'nextPage': {
      let gallery1Page=state.gallery1Page;
      let gallery2Page=state.gallery2Page;
      let currentGallery=1;

      if (state.currentGallery == 1) {
        gallery2Page=(state.gallery2Page+2) % state.totalPages;
        currentGallery=2;
      } else {
        gallery1Page=(state.gallery1Page+2) % state.totalPages;
        currentGallery=1;
      }

      return {
        ...state,
        gallery1Page: gallery1Page,
        gallery2Page: gallery2Page,
        currentGallery: currentGallery,
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
        newState={
          ...newState,
          autoPlayCarousel: false,
          highlightPlaque: state.searchResults[0]
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
    default:
      return state
  }
}

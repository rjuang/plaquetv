import { createAction } from '@reduxjs/toolkit'
import {totalPages} from './plaques';
import searchPlaques from './searchLogic';

const nextPage = createAction('nextPage')
const search = createAction('search')
const setPopup = createAction('setPopup')

const initialState = { 
  gallery1Page: 0,
  gallery2Page: totalPages-1,
  currentGallery: 1,
  autoPlayCarousel: true,
  search: [],
  exactSearch: false,
  showSearchPopup: false,
  allPlaques:[],
  searchResults:[],
  showHighlightPopup: false,
  highlightPlaque: null,
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'nextPage': {
      let gallery1Page=state.gallery1Page;
      let gallery2Page=state.gallery2Page;
      let currentGallery=1;

      if (state.currentGallery == 1) {
        gallery2Page=(state.gallery2Page+2) % totalPages;
        currentGallery=2;
      } else {
        gallery1Page=(state.gallery1Page+2) % totalPages;
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
      return {
        ...state,
        search: action.payload,
        searchResults: searchResults
      }
      
    }
    case 'setPopup': {
      return {
        ...state,
        showSearchPopup: action.payload

      }

    }
    case 'setAllPlaques':{
      return {
        ...state,
        allPlaques: action.payload
      }
    }
    default:
      return state
  }
}

import { createAction, createReducer } from '@reduxjs/toolkit'
import plaques from './plaques';

const nextPage = createAction('nextPage')

const initialState = { page: 0 }

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(nextPage, (state, action) => {
      state.page++
      if (state.page >= plaques.length) {
        state.page=0;
      }
    })
})

export default reducer;
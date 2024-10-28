import { createSlice, createSelector } from '@reduxjs/toolkit'
import {
  FetchStatus,
  FetchType,
  FilmsState,
  RootState,
} from '@sw-app/stores/redux/types'
import { fetchFilmsThunk } from '@sw-app/stores/redux/films/films-thunk'

const initialStateFilmsState: FilmsState = {
  films: [],
  status: FetchStatus.IDLE,
  error: null,
}

export const filmsSlice = createSlice({
  name: FetchType.FILMS,
  initialState: initialStateFilmsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilmsThunk.pending, (state) => {
        state.status = FetchStatus.LOADING
      })
      .addCase(fetchFilmsThunk.fulfilled, (state, action) => {
        state.status = FetchStatus.SUCCEEDED
        state.films = action.payload
      })
      .addCase(fetchFilmsThunk.rejected, (state, action) => {
        state.status = FetchStatus.FAILED
        state.error = action.error.message || 'Failed to fetch films'
      })
  },
})

const selectFilmsState = (state: RootState) => state.films

export const selectFilmsData = createSelector(
  [selectFilmsState],
  (filmsState) => ({
    films: filmsState.films,
    status: filmsState.status,
    error: filmsState.error,
  })
)

export { fetchFilmsThunk }

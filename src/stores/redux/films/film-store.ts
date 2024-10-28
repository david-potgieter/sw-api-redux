import { createSlice, createSelector } from '@reduxjs/toolkit'
import {
  FetchStatus,
  FetchType,
  FilmState,
  RootState,
} from '@sw-app/stores/redux/types'
import { fetchFilmThunk } from '@sw-app/stores/redux/films/films-thunk'

const initialStateFilmState: FilmState = {
  film: {},
  status: FetchStatus.IDLE,
  error: null,
}

export const filmSlice = createSlice({
  name: FetchType.FILM,
  initialState: initialStateFilmState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilmThunk.pending, (state) => {
        state.status = FetchStatus.LOADING
      })
      .addCase(fetchFilmThunk.fulfilled, (state, action) => {
        state.status = FetchStatus.SUCCEEDED
        state.film = action.payload
      })
      .addCase(fetchFilmThunk.rejected, (state, action) => {
        state.status = FetchStatus.FAILED
        state.error = action.payload as string
      })
  },
})

const selectFilmState = (state: RootState) => state.film

export const selectFilmData = createSelector(
  [selectFilmState],
  (filmState) => ({
    film: filmState.film,
    status: filmState.status,
    error: filmState.error,
  })
)

export { fetchFilmThunk }

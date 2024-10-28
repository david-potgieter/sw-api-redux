import { configureStore } from '@reduxjs/toolkit'
import { filmSlice } from '@sw-app/stores/redux/films/film-store'
import { filmsSlice } from '@sw-app/stores/redux/films/films-store'

const store = configureStore({
  reducer: { films: filmsSlice.reducer, film: filmSlice.reducer },
})

export default store

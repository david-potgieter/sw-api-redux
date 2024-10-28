import { createAsyncThunk } from '@reduxjs/toolkit'
import { FilmItemType } from '@sw-app/stores/redux/types'
import ax from '@sw-app/providers/axios-provider'

export const fetchFilmThunk = createAsyncThunk(
  'film/fetchFilm',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await ax.get(`/film/${id}`)
      return response.data as FilmItemType
    } catch (error) {
      return rejectWithValue('Failed to fetch film')
    }
  }
)

export const fetchFilmsThunk = createAsyncThunk(
  'films/fetchFilms',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ax.get('/films')
      return response.data.results as FilmItemType[]
    } catch (error) {
      return rejectWithValue('Failed to fetch films')
    }
  }
)

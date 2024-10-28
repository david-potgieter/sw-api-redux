import { createAsyncThunk } from '@reduxjs/toolkit'
import { FilmItemType } from '@sw-app/stores/redux/types'
import ax from '@sw-app/providers/axios-provider'
import { axiosErrorHelper } from '@sw-app/helpers/axios-error-helper'

export const fetchFilmThunk = createAsyncThunk(
  'film/fetchFilm',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await ax.get(`/films/${id}`)
      return response.data as FilmItemType
    } catch (error) {
      const errorMessage = axiosErrorHelper(error, 'Error fetching film')
      return rejectWithValue(errorMessage)
    }
  }
)

import store from '@sw-app/stores/redux/store'

export interface FilmItemType {
  title: string
  episode_id: number
  opening_crawl: string
  director: string
  producer: string
  release_date: string
  characters: string[]
  planets: string[]
  starships: string[]
  vehicles: string[]
  species: string[]
  created: string
  edited: string
  url: string
}

export enum FetchStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

export enum FetchType {
  FILMS = 'films',
  FILM = 'film',
}

export type StateStatus = `${FetchStatus}`
export interface SharedFilmState {
  status: StateStatus
  error: string | null
}

export interface FilmsState extends SharedFilmState {
  films: FilmItemType[]
}
export interface FilmState extends SharedFilmState {
  film: Partial<FilmItemType>
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

import {
  Button,
  Card,
  Center,
  Flex,
  Group,
  LoadingOverlay,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { VITE_API_BASE_URL } from '@sw-app/providers/axios-provider'
import { selectFilmData } from '@sw-app/stores/redux/films/film-store'
import { fetchFilmThunk } from '@sw-app/stores/redux/films/film-thunk'
import { selectFilmsData } from '@sw-app/stores/redux/films/films-store'

import { AppDispatch, FetchStatus } from '@sw-app/stores/redux/types'
import { IconArrowNarrowLeft } from '@tabler/icons-react'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { ErrorPage } from './error-page'

export function FilmDetails(): JSX.Element {
  const { id } = useParams<{ id: string }>()
  const dispatch: AppDispatch = useDispatch()
  const filmId = Number(id)

  const {
    films,
    status: filmsStatus,
    error: filmsError,
  } = useSelector(selectFilmsData)

  const {
    film: fetchedFilm,
    status: filmStatus,
    error: filmError,
  } = useSelector(selectFilmData)

  const filmFromFilms = useMemo(() => {
    return (
      films.find((film) => film.url === `${VITE_API_BASE_URL}/films/${id}/`) ||
      null
    )
  }, [films, filmId])

  useEffect(() => {
    if (!filmFromFilms && filmStatus === FetchStatus.IDLE) {
      dispatch(fetchFilmThunk(filmId))
    }
  }, [dispatch, filmFromFilms, filmId, filmStatus])

  const filmToDisplay = filmFromFilms || fetchedFilm

  if (filmsError) return <ErrorPage>{filmsError}</ErrorPage>
  if (filmError) return <ErrorPage>{filmError}</ErrorPage>
  if (!filmToDisplay) return <ErrorPage>Film not found</ErrorPage>

  if (
    (filmsStatus === FetchStatus.LOADING && !filmFromFilms) ||
    (filmStatus === FetchStatus.LOADING &&
      Object.keys(fetchedFilm).length === 0)
  ) {
    return <LoadingOverlay visible />
  }

  return (
    <Center flex={1} h="100dvh">
      <Stack gap="md">
        <Flex justify="start">
          <Button
            component={Link}
            to="/"
            variant="subtle"
            leftSection={<IconArrowNarrowLeft size={24} />}
          >
            <Text tt="uppercase">back</Text>
          </Button>
        </Flex>
        <Card padding="lg" radius="md" withBorder miw={700}>
          <Stack gap="md">
            <Flex justify="space-between" align="baseline">
              <Title order={1}>{filmToDisplay?.title}</Title>
              <Title order={4}>{filmToDisplay?.release_date}</Title>
            </Flex>
            <Text maw={700}>{filmToDisplay?.opening_crawl}</Text>
            <Flex justify="space-between" align="center">
              <Group>
                <Text>Director:</Text>
                <Title order={5}>{filmToDisplay?.director}</Title>
              </Group>
              <Group>
                <Flex gap="sm">
                  <Text>Characters:</Text>
                  <Title order={5}>{filmToDisplay?.characters?.length}</Title>
                </Flex>
                <Flex gap="sm">
                  <Text>Planets:</Text>
                  <Title order={5}>{filmToDisplay?.planets?.length}</Title>
                </Flex>
                <Flex gap="sm">
                  <Text>Ships:</Text>
                  <Title order={5}>{filmToDisplay?.starships?.length}</Title>
                </Flex>
                <Flex gap="sm">
                  <Text>Species:</Text>
                  <Title order={5}>{filmToDisplay?.species?.length}</Title>
                </Flex>
              </Group>
            </Flex>
          </Stack>
        </Card>
      </Stack>
    </Center>
  )
}

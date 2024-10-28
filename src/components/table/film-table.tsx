import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingOverlay, Stack, Table, Title } from '@mantine/core'
import {
  AppDispatch,
  FetchStatus,
  FilmItemType,
} from '@sw-app/stores/redux/types'
import { Link } from 'react-router-dom'
import {
  fetchFilmsThunk,
  selectFilmsData,
} from '@sw-app/stores/redux/films/films-store'

import { useTableSort } from '@sw-app/stores/zustand/table-sorters-store'
import { sortFilmsHelper } from '@sw-app/helpers/sort-films-helper'
import { TableHeader } from '@sw-app/components/table/table-header'
import { ErrorPage } from '@sw-app/pages/error-page'

export function FilmsTable(): JSX.Element {
  const dispatch: AppDispatch = useDispatch()
  const { films, status, error } = useSelector(selectFilmsData)
  const tableSortStore = useTableSort()
  const [sorted, setSorted] = useState<FilmItemType[]>([])

  useEffect(() => {
    if (status === FetchStatus.IDLE) dispatch(fetchFilmsThunk())
    if (status === FetchStatus.SUCCEEDED) {
      const { selectedColumn, columnDirection } = tableSortStore
      const sortedFilms = sortFilmsHelper(
        films,
        selectedColumn,
        columnDirection
      )
      setSorted(sortedFilms)
    }
  }, [status, dispatch, tableSortStore])

  if (error) return <ErrorPage>{error}</ErrorPage>
  if (status === FetchStatus.LOADING) return <LoadingOverlay visible />

  const rows = sorted.map((film) => {
    const filmAPIId = film.url.match(/\/films\/(\d+)\//)
    return (
      <Table.Tr key={film.episode_id}>
        <Table.Td>Episode {film.episode_id}</Table.Td>
        <Table.Td>{film.title}</Table.Td>
        <Table.Td>{film.director}</Table.Td>
        <Table.Td>{film.release_date}</Table.Td>
        <Table.Td>
          <Link to={`film/${filmAPIId?.[1]}`}>more</Link>
        </Table.Td>
      </Table.Tr>
    )
  })

  return (
    <Stack>
      {status === 'succeeded' && sorted.length ? (
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>
                <TableHeader title="Episode" column="episode_id" />
              </Table.Th>
              <Table.Th>
                <TableHeader title="Title" column="title" />
              </Table.Th>
              <Table.Th>
                <TableHeader title="Director" column="director" />
              </Table.Th>
              <Table.Th>
                <TableHeader title="Release Date" column="release_date" />
              </Table.Th>
              <Table.Th>&nbsp;</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      ) : (
        <Title order={2}>No films found.</Title>
      )}
    </Stack>
  )
}

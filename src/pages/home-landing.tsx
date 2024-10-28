import { Center } from '@mantine/core'
import { FilmsTable } from '@sw-app/components/table/film-table'

export function HomeLanding(): JSX.Element {
  return (
    <Center flex={1} h="100dvh">
      <FilmsTable />
    </Center>
  )
}

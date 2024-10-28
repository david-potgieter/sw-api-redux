import { Button, Flex } from '@mantine/core'
import { FilmItemType } from '@sw-app/stores/redux/types'
import { useTableSort } from '@sw-app/stores/zustand/table-sorters-store'
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
} from '@tabler/icons-react'

interface TableHeaderProps {
  column: keyof FilmItemType
  title: string
}

export function TableHeader({ column, title }: TableHeaderProps): JSX.Element {
  const tableSortStore = useTableSort()
  const {
    selectedColumn,
    columnDirection,
    setColumnDirection,
    setSelectedColumn,
  } = tableSortStore

  const Icon =
    selectedColumn === column
      ? columnDirection === 'asc'
        ? IconChevronUp
        : IconChevronDown
      : IconSelector

  function handleClick() {
    if (selectedColumn === column) {
      setColumnDirection(columnDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSelectedColumn(column)
      setColumnDirection('desc')
    }
  }

  return (
    <Flex justify="space-between" align="center" gap="sm">
      {title}
      <Button variant="subtle" size="compact-xs" onClick={handleClick}>
        <Icon size={12} />
      </Button>
    </Flex>
  )
}

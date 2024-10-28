import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { FilmItemType } from '@sw-app/stores/redux/types'

interface TableSorterStore {
  selectedColumn: keyof FilmItemType
  columnDirection: 'asc' | 'desc'
  setSelectedColumn: (column: keyof FilmItemType) => void
  setColumnDirection: (direction: 'asc' | 'desc') => void
}

export const useTableSort = create<TableSorterStore>()(
  persist(
    (set) => ({
      selectedColumn: 'release_date',
      columnDirection: 'desc',
      setSelectedColumn: (column) => set(() => ({ selectedColumn: column })),
      setColumnDirection: (direction) =>
        set(() => ({ columnDirection: direction })),
    }),
    {
      name: 'app-table-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

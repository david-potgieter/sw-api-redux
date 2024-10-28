export function sortFilmsHelper<T>(
  films: T[],
  selectedColumn: keyof T,
  columnDirection: 'asc' | 'desc'
): T[] {
  const direction = columnDirection === 'asc' ? 1 : -1

  const sortedFilms = [...films]

  sortedFilms.sort((a, b) => {
    let aValue = a[selectedColumn]
    let bValue = b[selectedColumn]

    // Handle null or undefined values
    if (aValue == null && bValue == null) return 0
    if (aValue == null) return 1 * direction
    if (bValue == null) return -1 * direction

    // Type-based comparison
    if (typeof aValue === 'string') {
      return aValue.localeCompare(bValue as string) * direction
    } else if (typeof aValue === 'number') {
      return (aValue - (bValue as number)) * direction
    } else {
      return 0
    }
  })

  return sortedFilms
}

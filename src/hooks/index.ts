import {
  useSearchParams,
  useRouteLoaderData,
  useLocation,
} from 'react-router-dom'
import { useCallback, useMemo } from 'react'
import { Selection, SortDescriptor } from '@nextui-org/react'
import qs from 'qs'

import { TPlayer } from '../utils/api/types'

export const useData = () => {
  const location = useLocation()
  const [, setSearchParams] = useSearchParams()
  const queryParams = qs.parse(location.search, { ignoreQueryPrefix: true })

  const value = (queryParams.value || '') as string

  const playersFilter = (
    queryParams.playersFilter ? queryParams.playersFilter : 'all'
  ) as Selection

  const page = Number(queryParams.page || 1)
  const rowsPerPage = Number(queryParams.rowsPerPage || 10)
  const sortDescriptor = useMemo(() => {
    return (queryParams.sortDescriptor || {
      column: 'age',
      direction: 'ascending',
    }) as SortDescriptor
  }, [queryParams.sortDescriptor])
  const players = useRouteLoaderData('players') as TPlayer[]

  const filteredPlayers = useMemo(() => {
    let list = [...players]
    if (value) {
      list = list.filter((player) => {
        if (player?.name) {
          return player?.name?.toLowerCase().includes(value.toLowerCase())
        }
        return false
      })
    }

    if (playersFilter !== 'all' && playersFilter) {
      list = list.filter((player) => {
        if (player?.type) {
          if (Array.isArray(playersFilter)) {
            return playersFilter.includes(player?.type)
          }
          return playersFilter.has(player?.type)
        }
        return false
      })
    }

    return list
  }, [players, playersFilter, value])

  const updatePlayers = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredPlayers.slice(start, end)
  }, [filteredPlayers, page, rowsPerPage])

  const sortedItems = useMemo(() => {
    return [...updatePlayers].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof TPlayer] as number | string
      const second = b[sortDescriptor.column as keyof TPlayer] as
        | number
        | string
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [updatePlayers, sortDescriptor.column, sortDescriptor.direction])

  const playersLength = updatePlayers.length
  const pages = Math.ceil(filteredPlayers.length / rowsPerPage)

  const setState = useCallback(
    (
      key: string,
      value:
        | string
        | number
        | Selection
        | SortDescriptor
        | [string]
        | React.Key[]
    ) => {
      const updatedParams = {
        ...queryParams,
        ...{ [key]: value },
      }
      const queryString = qs.stringify(updatedParams, { encode: false })
      setSearchParams(queryString)
    },
    [queryParams, setSearchParams]
  )

  const setValue = useCallback(
    (value: string) => {
      setState('value', value)
    },
    [setState]
  )

  const setPlayersFilter = useCallback(
    (playersFilter: Selection) => {
      const currentPlayersFilter =
        typeof playersFilter === 'string' || typeof playersFilter === 'number'
          ? playersFilter
          : [...playersFilter]

      setState('playersFilter', currentPlayersFilter)
    },
    [setState]
  )

  const setPage = useCallback(
    (page: number) => {
      setState('page', page)
    },
    [setState]
  )

  const setRowsPerPage = useCallback(
    (rowsPerPage: number) => {
      setState('rowsPerPage', rowsPerPage)
    },
    [setState]
  )

  const setSortDescriptor = useCallback(
    (sortDescriptor: SortDescriptor) => {
      setState('sortDescriptor', sortDescriptor)
    },
    [setState]
  )

  const onClear = useCallback(() => {
    setState('value', '')
  }, [setState])

  const onPreviousPage = useCallback(() => {
    const currentPage = page > 1 ? page - 1 : page
    setState('page', currentPage)
  }, [page, setState])

  const onNextPage = useCallback(() => {
    const currentPage = page < pages ? page + 1 : page
    setState('page', currentPage)
  }, [page, setState, pages])

  const onRowsPerPageChange = useCallback(
    (pageValue: number) => {
      setState('rowsPerPage', pageValue)
    },
    [setState]
  )

  return {
    players: sortedItems,
    playersLength,
    pages,
    value,
    setValue,
    playersFilter,
    setPlayersFilter,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    sortDescriptor,
    setSortDescriptor,
    onClear,
    onSearchChange: setValue,
    onPreviousPage,
    onNextPage,
    onRowsPerPageChange,
  }
}

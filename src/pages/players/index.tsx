import { useLoaderData } from 'react-router-dom'
import { useCallback, useState } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Selection,
  SortDescriptor,
} from '@nextui-org/react'
import { TColumnKey, TPlayer, TPlayerType } from '../../utils/api/types'
import { getAgeFromDob } from '../../utils/formatter'
import { PLAYER_TYPES, columns } from './constants'

import TopContent from './TopContent'
import BottomContent from './BottomContent'

export default function Players() {
  const [value, setValue] = useState('')
  const [playersFilter, setPlayersFilter] = useState<Selection>('all')
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]))

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'age',
    direction: 'ascending',
  })
  const players = useLoaderData() as TPlayer[]
  const playersLength = players.length
  const pages = Math.ceil(playersLength / rowsPerPage)

  const onClear = useCallback(() => {
    setValue('')
  }, [])

  const onSearchChange = useCallback((value: string) => {
    setValue(value)
  }, [])

  const onPreviousPage = useCallback(() => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage))
  }, [])

  const onNextPage = useCallback(() => {
    setPage((prevPage) => (prevPage < pages ? prevPage + 1 : prevPage))
  }, [pages])

  const onRowsPerPageChange = useCallback((pageValue: number) => {
    setRowsPerPage(pageValue)
    setPage(1)
  }, [])

  return (
    <>
      <Table
        topContent={
          <TopContent
            value={value}
            onClear={onClear}
            onSearchChange={onSearchChange}
            playersFilter={playersFilter}
            setPlayersFilter={setPlayersFilter}
            playersLength={playersLength}
            onRowsPerPageChange={onRowsPerPageChange}
          />
        }
        topContentPlacement="outside"
        bottomContent={
          <BottomContent
            selectedKeys={selectedKeys}
            page={page}
            pages={pages}
            playersLength={playersLength}
            setPage={setPage}
            onPreviousPage={onPreviousPage}
            onNextPage={onNextPage}
          />
        }
        bottomContentPlacement="outside"
        aria-label="Cricket Players list"
        isHeaderSticky
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} allowsSorting={column.sortable}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={'No users found'} items={players}>
          {(player: TPlayer) => (
            <TableRow key={player.id}>
              {(columnKey) => {
                const key = columnKey as TColumnKey
                const value = player[key]

                if (!value) {
                  return <TableCell>{''}</TableCell>
                }

                if (key === 'type') {
                  return (
                    <TableCell>{PLAYER_TYPES[value as TPlayerType]}</TableCell>
                  )
                }

                if (key === 'dob') {
                  return <TableCell>{getAgeFromDob(value as number)}</TableCell>
                }

                return <TableCell>{value}</TableCell>
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}

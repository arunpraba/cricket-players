import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react'
import { Link } from 'react-router-dom'

import { TColumnKey, TPlayer, TPlayerType } from '../../utils/api/types'
import { getAgeFromDob } from '../../utils/formatter'
import { PLAYER_TYPES, columns } from './constants'

import TopContent from './components/TopContent'
import BottomContent from './components/BottomContent'
import { useData } from '../../hooks'

export default function Players() {
  const {
    playersLength,
    pages,
    value,
    playersFilter,
    setPlayersFilter,
    page,
    setPage,
    sortDescriptor,
    setSortDescriptor,
    players,
    onClear,
    onSearchChange,
    onPreviousPage,
    onNextPage,
    rowsPerPage,
    onRowsPerPageChange,
  } = useData()

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
            rowsPerPage={rowsPerPage}
          />
        }
        topContentPlacement="outside"
        bottomContent={
          <BottomContent
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
        sortDescriptor={sortDescriptor}
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

                if (key === 'name') {
                  return (
                    <TableCell>
                      <Link to={`/${player.id}`}>{value}</Link>
                    </TableCell>
                  )
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

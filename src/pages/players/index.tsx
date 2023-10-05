import { useLoaderData } from 'react-router-dom'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react'
import { TColumnKey, TPlayer } from '../../utils/api/types'
import { getAgeFromDob } from '../../utils/formatter'
import { columns } from './constants'

export default function Players() {
  const players = useLoaderData() as TPlayer[]

  return (
    <>
      <Table aria-label="Cricket Players list" isHeaderSticky>
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

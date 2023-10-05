import { Link, useRouteLoaderData } from 'react-router-dom'
import {
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardHeader,
  CardBody,
  Divider,
} from '@nextui-org/react'
import { TColumnKey, TPlayer } from '../../utils/api/types'
import Value from './components/Value'
import { columns } from './constants'

export default function PlayerDetail() {
  const { player, players } = useRouteLoaderData('player-detail') as {
    player: TPlayer | null
    players: TPlayer[]
  }

  if (!player) {
    return (
      <>
        <Button>
          <Link to="/">Back to Cricketers</Link>
        </Button>
        <h1>Player Detail</h1>
        <p>Player not found</p>
      </>
    )
  }
  return (
    <>
      <Button>
        <Link to="/">Back to Cricketers</Link>
      </Button>
      <h1 className="text-3xl text-center">{player.name}</h1>
      <p className="my-3">{player.description}</p>
      <Table aria-label="Player detail">
        <TableHeader>
          <TableColumn>Field</TableColumn>
          <TableColumn>Value</TableColumn>
        </TableHeader>
        <TableBody>
          {columns.map((column) => {
            const key = column.uid as TColumnKey | 'age'
            const value = key === 'age' ? player.dob : player[key]
            return (
              <TableRow key={column.uid}>
                <TableCell>{column.name}</TableCell>
                <TableCell>
                  <Value value={value} columnKey={key} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <Divider className="my-5" />
      <div className="flex gap-3 flex-wrap">
        {players
          .filter((p) => p.id !== player.id)
          .map((player) => {
            return (
              <Card className="min-w-[300px]" key={player.id}>
                <CardHeader className="flex gap-3">
                  <div className="flex flex-col">
                    <p className="text-md">
                      <Link to={`/${player.id}`}>{player.name}</Link>
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p>
                    Rank: <Value value={player.rank} columnKey="rank" />
                  </p>
                  <p>
                    Points: <Value value={player.points} columnKey="points" />
                  </p>
                </CardBody>
              </Card>
            )
          })}
      </div>
    </>
  )
}

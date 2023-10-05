export const columns = [
  { name: 'NAME', uid: 'name', sortable: true },
  { name: 'TYPE', uid: 'type', sortable: false },
  { name: 'POINTS', uid: 'points', sortable: false },
  { name: 'RANK', uid: 'rank', sortable: true },
  { name: 'AGE', uid: 'dob', sortable: true },
]

type PlayerTypeMap = {
  batsman: string
  bowler: string
  allRounder: string
  wicketKeeper: string
}

export const PLAYER_TYPES: PlayerTypeMap = {
  batsman: 'Batsman',
  bowler: 'Bowler',
  allRounder: 'All Rounder',
  wicketKeeper: 'Wicket Keeper',
}

export const playerTypeOptions = [
  { name: 'Batsman', uid: 'batsman' },
  { name: 'Bowler', uid: 'bowler' },
  { name: 'All Rounder', uid: 'allRounder' },
  { name: 'Wicket Keeper', uid: 'wicketKeeper' },
]

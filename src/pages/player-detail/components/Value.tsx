import { TColumnKey } from '../../../utils/api/types'
import { getAgeFromDob } from '../../../utils/formatter'
import { PLAYER_TYPES } from '../../players/constants'

export default function Value({
  value,
  columnKey,
}: {
  value?: string | number | null
  columnKey: TColumnKey | 'age'
}) {
  if (!value) return null

  if (columnKey === 'type' && value in PLAYER_TYPES) {
    return PLAYER_TYPES[value as keyof typeof PLAYER_TYPES]
  }

  if (columnKey === 'dob') {
    return <>{new Date(value as number).toLocaleDateString()}</>
  }

  if (columnKey === 'age') {
    return <>{getAgeFromDob(value as number)}</>
  }

  return value
}

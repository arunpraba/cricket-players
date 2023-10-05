import {
  Input,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Selection,
} from '@nextui-org/react'
import { playerTypeOptions } from './constants'
import { ChevronDownIcon } from '../../components/iconst'

export default function TopContent({
  value,
  onClear,
  onSearchChange,
  playersFilter,
  setPlayersFilter,
  playersLength,
  onRowsPerPageChange,
}: {
  value: string
  onClear: () => void
  onSearchChange: (value: string) => void
  playersFilter: Selection
  setPlayersFilter: (value: Selection) => void
  playersLength: number
  onRowsPerPageChange: (e: number) => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          value={value}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<ChevronDownIcon />} variant="flat">
                Player Type
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={playersFilter}
              selectionMode="multiple"
              onSelectionChange={setPlayersFilter}
            >
              {playerTypeOptions.map((status) => (
                <DropdownItem key={status.uid} className="capitalize">
                  {status.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total {playersLength} players
        </span>
        <label className="flex items-center text-default-400 text-small">
          Rows per page:
          <select
            className="bg-transparent outline-none text-default-400 text-small"
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
      </div>
    </div>
  )
}

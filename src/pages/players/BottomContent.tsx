import { Button, Pagination, Selection } from '@nextui-org/react'

export default function BottomContent({
  selectedKeys,
  page,
  pages,
  playersLength,
  setPage,
  onPreviousPage,
  onNextPage,
}: {
  selectedKeys: Selection
  page: number
  pages: number
  playersLength: number
  setPage: (page: number) => void
  onPreviousPage: () => void
  onNextPage: () => void
}) {
  return (
    <div className="py-2 px-2 flex justify-between items-center">
      <span className="w-[30%] text-small text-default-400">
        {selectedKeys === 'all'
          ? 'All items selected'
          : `${selectedKeys.size} of ${playersLength} selected`}
      </span>
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={pages}
        onChange={setPage}
      />
      <div className="hidden sm:flex w-[30%] justify-end gap-2">
        <Button
          isDisabled={pages === 1}
          size="sm"
          variant="flat"
          onPress={onPreviousPage}
        >
          Previous
        </Button>
        <Button
          isDisabled={pages === 1}
          size="sm"
          variant="flat"
          onPress={onNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

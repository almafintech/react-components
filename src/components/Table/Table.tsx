import { ReactNode } from "react"
import {
  Table as NextUiTable,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
  SortDescriptor,
  Selection,
  TableProps as NextUiTableProps,
  TableBodyProps,
} from "@nextui-org/table"
import styles from "./Table.module.scss"

interface Row {
  key: number | string
  [key: string]: string | number | ReactNode
}

interface Column {
  key: number | string
  label: string | ReactNode
  sorteable?: boolean
  align?: "start" | "center" | "end"
}

type Props = Omit<NextUiTableProps, "children"> & Omit<TableBodyProps<Row>, "children" | "classNames">

interface TableProps extends Props {
  rows: Row[]
  columns: Column[]
  selectionMode?: "single" | "multiple" | "none"
  selectedRowKey?: number | string
  onRowAction?: (key: string | number | bigint) => void
  onSelectionChange?: (values: Selection) => void
  onSortChange?: ({ column, direction }: SortDescriptor) => void
}

const Table = ({ rows, columns, selectedRowKey, emptyContent, ...rest }: TableProps) => {
  const { selectedRow, ...restStyles } = styles

  return (
    <NextUiTable aria-label="allaria-table" classNames={{ ...restStyles }} {...rest}>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key} allowsSorting={!!column.sorteable} align={column.align}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={rows} emptyContent={emptyContent}>
        {(item) => (
          <TableRow key={item.key} className={`${selectedRowKey == item.key ? selectedRow : ""} py-[0.875rem]`}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </NextUiTable>
  )
}

export default Table

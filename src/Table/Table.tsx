import {
  Table as NextUiTable,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";
import styles from "./Table.module.scss";
import { TableProps } from "./types";

const Table = ({
  rows,
  columns,
  selectedRowKey,
  emptyContent,
  ...rest
}: TableProps) => {
  const { selectedRow, ...restStyles } = styles;

  return (
    <NextUiTable
      aria-label="allaria-table"
      classNames={{ ...restStyles }}
      {...rest}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key}
            allowsSorting={!!column.sorteable}
            align={column.align}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={rows} emptyContent={emptyContent}>
        {(item) => (
          <TableRow
            key={item.key}
            className={`${
              selectedRowKey == item.key ? selectedRow : ""
            } py-[0.875rem]`}
          >
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </NextUiTable>
  );
};

export default Table;

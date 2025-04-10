import {
  Table as HeroUITable,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/table";
import styles from "./Table.module.scss";
import { TableProps } from "./types";
import { isByma } from "../utils";

const Table = ({
  rows,
  columns,
  selectedRowKey,
  emptyContent,
  theme,
  className,
  ...rest
}: TableProps) => {
  const { selectedRow, ...restStyles } = styles;

  const isBymaTheme = isByma(theme);

  return (
    <HeroUITable
      aria-label="allaria-table"
      classNames={{ ...restStyles }}
      className={`${isBymaTheme ? "byma" : ""} ${className ?? ""}`}
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
    </HeroUITable>
  );
};

export default Table;

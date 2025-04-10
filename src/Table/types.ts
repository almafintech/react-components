import { ReactNode } from "react";
import {
  SortDescriptor,
  Selection,
  TableProps as HeroUITableProps,
  TableBodyProps,
} from "@heroui/table";
import { WithTheme } from "..";

export interface Row {
  key: number | string;
  [key: string]: string | number | ReactNode;
}

export interface Column {
  key: number | string;
  label: string | ReactNode;
  sorteable?: boolean;
  align?: "start" | "center" | "end";
}

type Props = Omit<HeroUITableProps, "children"> &
  Omit<TableBodyProps<Row>, "children" | "classNames">;

export interface TableProps extends Props, WithTheme {
  rows: Row[];
  columns: Column[];
  selectionMode?: "single" | "multiple" | "none";
  selectedRowKey?: number | string;
  onRowAction?: (key: string | number | bigint) => void;
  onSelectionChange?: (values: Selection) => void;
  onSortChange?: ({ column, direction }: SortDescriptor) => void;
}

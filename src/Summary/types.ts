import { ReactNode } from "react";

export interface SummaryItem {
  /**
   * Label text displayed on the left side of the row
   */
  label: string;
  /**
   * Value displayed on the right side of the row
   */
  value: number | string | ReactNode;
  /**
   * Optional node rendered at the end of the label (e.g. an info icon with a tooltip)
   */
  labelEndContent?: ReactNode;
  /**
   * Nested items revealed by clicking the row. When provided a chevron is
   * shown next to the label and the row becomes a toggle.
   */
  subItems?: SummaryItem[];
}

export interface SummaryProps {
  /**
   * Line items displayed in the upper section of the card
   */
  items: SummaryItem[];
  /**
   * Optional total row displayed below a divider line
   */
  total?: SummaryItem;
  /**
   * Additional CSS class for the container
   */
  className?: string;
}

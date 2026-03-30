import { colors } from "../styles/variables";

export type ThemeColors = Partial<typeof colors>;

export type Theme = ThemeColors & {
  fontFamily?: string;
};

export interface ThemeProviderProps {
  /**
   * Override design token colors and font. Each color key maps to a CSS
   * custom property that the SCSS variables fall back to, so all components
   * inside will reflect the overridden values.
   */
  theme: Theme;
  children: React.ReactNode;
}

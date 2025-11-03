import { DimensionValue, View, ViewProps } from "react-native";

export type LayoutProps = ViewProps & {
  flexDirection?: "row" | "column";
  gap?: number;
  justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  width?: DimensionValue;
  height?: DimensionValue;
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  padding?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  flex?: number;
};

export default function Layout({ children, flexDirection, gap, justifyContent, alignItems, width, height, flex, style, ...props }: LayoutProps) {
  return (
    <View {...props} style={{ flexDirection, gap, justifyContent, alignItems, width, height, flex, ...style }}>{children}</View>
  );
}
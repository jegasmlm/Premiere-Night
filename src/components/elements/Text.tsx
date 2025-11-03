import { Text as RNText, TextProps as RNTextProps, StyleSheet } from "react-native";

export type TextProps = RNTextProps & {
  type?: "default" | "subdued";
};

export default function Text(props: TextProps) {
  return (
    <RNText {...props} style={[styles[props.type ?? "default"], props.style]} />
  );
}

const styles = StyleSheet.create({
  default: {
    color: "#fff",
  },
  subdued: {
    color: "#888888",
  },
});
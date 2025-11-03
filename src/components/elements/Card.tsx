import { StyleSheet, View, ViewProps } from "react-native";

export default function Card(props: ViewProps) {
  return (
    <View {...props} style={{...styles.card, ...props.style}} />
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#111",

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },

    elevation: 4,
  },
});
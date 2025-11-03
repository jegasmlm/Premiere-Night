import { StyleSheet, View, ViewProps } from "react-native";
import Text from "./Text";

export default function Badge(props: ViewProps) {
  return (
    <View {...props} style={{ ...styles.badge, ...props.style }}>
      {typeof props.children === 'function' ? (
        props.children
      ) : (
        <Text style={styles.badgeText}>{props.children}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  badgeText: {
    color: '#111',
    fontWeight: '700',
  },
});
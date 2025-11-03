import { ImageProps, StyleSheet } from "react-native";

export default function Image(props: ImageProps) {
  return (
    <Image style={styles.image} {...props} />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
});
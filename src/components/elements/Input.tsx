import { StyleSheet, TextInput, View } from "react-native";
import { TextInputProps as RNTextInputProps } from "react-native";
import { IconName } from "./Icon";
import Icon from "./Icon";

export type InputProps = RNTextInputProps & {
  leftIcon?: IconName;
};

export default function Input({ leftIcon, style, placeholderTextColor, ...props }: InputProps) {
  return (
    <View style={[styles.container, style]}>
      {leftIcon ? <Icon name={leftIcon} width={20} height={20} fill="#9ca3af" /> : null}
      <TextInput
        {...props}
        placeholderTextColor={placeholderTextColor ?? "#9ca3af"}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: "#fff",
    paddingVertical: 0,
  },
});
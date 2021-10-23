import { StyleSheet } from "react-native";
import { FONTS } from "../../theme";

export const styles = StyleSheet.create({
  button: {
    height: 48,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    fontFamily: FONTS.BOLD,
  },
  icon: {
    marginRight: 12,
  },
});

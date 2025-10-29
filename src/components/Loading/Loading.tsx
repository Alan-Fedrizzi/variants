import { ActivityIndicator } from "react-native";
import { loadingStyles } from "./Loading.styles";
import { colors } from "@/src/styles/colors";

export function Loading() {
  return (
    <ActivityIndicator className={loadingStyles()} color={colors.lime[300]} />
  );
}

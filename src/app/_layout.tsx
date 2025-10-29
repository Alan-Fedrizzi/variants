import "@/global.css";

import { View, StatusBar } from "react-native";
import { Slot } from "expo-router";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { appStyles } from "./index.styles";

const { container } = appStyles();

export default function Layout() {
  return (
    <GluestackUIProvider mode="dark">
      <View className={container()}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <Slot />
      </View>
    </GluestackUIProvider>
  );
}

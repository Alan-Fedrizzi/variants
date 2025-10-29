import "@/global.css";

import { Slot } from "expo-router";
import React, { useMemo, useState } from "react";
import { StatusBar, View } from "react-native";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { ButtonIcon } from "../components/ButtonIcon/ButtonIcon";
import { appStyles } from "./index.styles";

export enum THEME {
  DARK = "dark",
  LIGHT = "light",
}

const { container } = appStyles();

export default function Layout() {
  const [colorMode, setColorMode] = useState(THEME.DARK);

  const statusBarStyle = useMemo(
    () => (colorMode === THEME.DARK ? "light-content" : "dark-content"),
    [colorMode]
  );

  const toggleTheme = () =>
    setColorMode((prev) => (prev === THEME.DARK ? THEME.LIGHT : THEME.DARK));

  return (
    <GluestackUIProvider mode={colorMode}>
      <View className={container()}>
        <StatusBar
          barStyle={statusBarStyle}
          backgroundColor="transparent"
          translucent
        />

        <ButtonIcon
          className="absolute right-0 top-0 m-4 z-10"
          iconName={colorMode === THEME.DARK ? "Sun" : "Moon"}
          onPress={toggleTheme}
        />

        <Slot />
      </View>
    </GluestackUIProvider>
  );
}

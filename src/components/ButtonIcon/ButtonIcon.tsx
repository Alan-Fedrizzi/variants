import { icons } from "lucide-react-native";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { useColorScheme } from "nativewind";

import { buttonIconStyles } from "./ButtonIcon.styles";
import { colors } from "@/src/styles/colors";

type ButtonIconProps = TouchableOpacityProps & {
  iconName: keyof typeof icons;
};

function ButtonIcon({ iconName, className, ...rest }: ButtonIconProps) {
  const LucideIcon = icons[iconName];

  const { colorScheme } = useColorScheme();
  const color: string =
    colorScheme === "dark" ? colors.zinc[100] : colors.zinc[900];

  return (
    <TouchableOpacity
      className={buttonIconStyles({ class: className })}
      activeOpacity={0.7}
      {...rest}
    >
      {LucideIcon ? <LucideIcon color={color} size={24} /> : null}
    </TouchableOpacity>
  );
}

export { ButtonIcon };

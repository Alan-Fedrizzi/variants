import { ReactNode } from "react";
import {
  TextInput,
  TextInputProps,
  View,
  ViewProps,
  Platform,
} from "react-native";

import { fieldStyles, inputStyles } from "./Input.styles";
import { colors } from "@/src/styles/colors";

type Variants = "primary" | "secondary" | "tertiary";

type InputProps = ViewProps & {
  children: ReactNode;
  variant?: Variants;
};

function Input({
  children,
  variant = "primary",
  className,
  ...rest
}: InputProps) {
  return (
    <View className={inputStyles({ variant, class: className })} {...rest}>
      {children}
    </View>
  );
}

type FieldProps = TextInputProps & {
  variant?: Variants;
};

function Field({ variant = "primary", ...rest }: FieldProps) {
  return (
    <TextInput
      className={fieldStyles({ variant })}
      placeholderTextColor={colors.zinc[400]}
      cursorColor={colors.zinc[100]}
      selectionColor={Platform.OS === "ios" ? colors.zinc[100] : undefined}
      {...rest}
    />
  );
}

Input.Field = Field;

export { Input };

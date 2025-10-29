import {
  Text,
  TextProps,
  TouchableOpacity,
  ActivityIndicator,
  TouchableOpacityProps,
} from "react-native";
import { buttonStyles } from "./Button.styles";

type Variants = "primary" | "secondary";

type ButtonProps = TouchableOpacityProps & {
  variant?: Variants;
  isLoading?: boolean;
};

type TitleProps = TextProps & {
  variant?: Variants;
};

// Extract slot helpers
const { wrapper, title } = buttonStyles();

function Button({
  variant = "primary",
  children,
  isLoading,
  className,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={wrapper({ variant, disabled: isLoading, class: className })}
      activeOpacity={0.7}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator className="text-lime-950" />
      ) : // 👇 automatically inject `variant` into children if they are valid React elements
      // so <Button.Title> will receive it
      // (this way you can still use Button.Title as a subcomponent)
      Array.isArray(children) ? (
        children.map((child, index) =>
          typeof child === "object" && "props" in child
            ? { ...child, props: { ...child.props, variant } }
            : child
        )
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

function Title({ children, variant = "primary", className }: TitleProps) {
  return (
    <Text className={title({ variant, class: className })}>{children}</Text>
  );
}

Button.Title = Title;

export { Button };

/*
import { createContext, useContext } from "react";
import {
  ActivityIndicator,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { buttonStyle, titleStyle } from "./Button.styles";

type Variants = "primary" | "secondary";

type ButtonProps = TouchableOpacityProps & {
  variant?: Variants;
  isLoading?: boolean;
};

const ThemeContext = createContext<{ variant?: Variants }>({});

function Button({
  variant = "primary",
  children,
  isLoading,
  className,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={buttonStyle({
        variant,
        disabled: isLoading,
        class: className,
      })}
      activeOpacity={0.7}
      disabled={isLoading}
      {...rest}
    >
      <ThemeContext.Provider value={{ variant }}>
        {isLoading ? <ActivityIndicator className="text-lime-950" /> : children}
      </ThemeContext.Provider>
    </TouchableOpacity>
  );
}

function Title({ children }: TextProps) {
  const { variant } = useContext(ThemeContext);

  return <Text className={titleStyle({ variant })}>{children}</Text>;
}

Button.Title = Title;

export { Button };
*/

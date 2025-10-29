import { colors } from "@/src/styles/colors";
import { X } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { guestEmailStyles } from "./GuestEmail.styles";

type Props = {
  email: string;
  onRemove: () => void;
};

const { container, text } = guestEmailStyles();

export function GuestEmail({ email, onRemove }: Props) {
  return (
    <View className={container()}>
      <Text className={text()}>{email}</Text>

      <TouchableOpacity onPress={onRemove}>
        <X color={colors.zinc[400]} size={16} />
      </TouchableOpacity>
    </View>
  );
}

import { colors } from "@/src/styles/colors";
import { BlurView } from "expo-blur";
import { X } from "lucide-react-native";
import {
  ModalProps,
  Modal as RNModal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { modalStyles } from "./Modal.styles";

type Props = ModalProps & {
  title: string;
  subtitle?: string;
  onClose?: () => void;
};

const { blur, overlay, container, header, title, subtitle } = modalStyles();

export function Modal({
  title: modalTitle,
  subtitle: modalSubtitle = "",
  onClose,
  children,
  ...rest
}: Props) {
  return (
    <RNModal transparent animationType="slide" {...rest}>
      <BlurView
        className={blur()}
        intensity={7}
        tint="dark"
        experimentalBlurMethod="dimezisBlurView"
      >
        <View className={overlay()}>
          <View className={container()}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View className={header()}>
                <Text className={title()}>{modalTitle}</Text>

                {onClose && (
                  <TouchableOpacity activeOpacity={0.7} onPress={onClose}>
                    <X color={colors.zinc[400]} size={20} />
                  </TouchableOpacity>
                )}
              </View>

              {modalSubtitle.trim().length > 0 && (
                <Text className={subtitle()}>{modalSubtitle}</Text>
              )}

              {children}
            </ScrollView>
          </View>
        </View>
      </BlurView>
    </RNModal>
  );
}

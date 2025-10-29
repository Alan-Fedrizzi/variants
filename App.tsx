import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import {
  ArrowRight,
  AtSign,
  Calendar as IconCalendar,
  MapPin,
  Settings2,
  UserRoundPlus,
} from "lucide-react-native";
import { useState } from "react";
import { Alert, Keyboard, StatusBar, Text, View } from "react-native";
import { Button } from "./src/components/Button/Button";
import { Input } from "./src/components/Input/Input";
import { colors } from "./src/styles/colors";
import { calendarUtils, DatesSelected } from "./src/utils/calendarUtils";
import { Loading } from "./src/components/Loading/Loading";
import { Modal } from "./src/components/Modal/Modal";
import { GuestEmail } from "./src/components/GuestEmail/GuestEmail";
import { validateInput } from "./src/utils/validateInput";
import { Calendar } from "./src/components/Calendar/Calendar";
import dayjs from "dayjs";
import { DateData } from "react-native-calendars";

enum StepForm {
  TRIP_DETAILS = 1,
  ADD_EMAIL = 2,
}

enum MODAL {
  NONE = 0,
  CALENDAR = 1,
  GUESTS = 2,
}

export default function Index() {
  const [stepForm, setStepForm] = useState(StepForm.TRIP_DETAILS);
  const [selectedDates, setSelectedDates] = useState({} as DatesSelected);
  const [destination, setDestination] = useState("");
  const [emailToInvite, setEmailToInvite] = useState("");
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([
    "alan@email.com",
    "bleggi@email.com",
    "valdir@email.com",
    "yure@email.com",
  ]);

  const [showModal, setShowModal] = useState(MODAL.NONE);

  function handleSelectDate(selectedDay: DateData) {
    const dates = calendarUtils.orderStartsAtAndEndsAt({
      startsAt: selectedDates.startsAt,
      endsAt: selectedDates.endsAt,
      selectedDay,
    });

    setSelectedDates(dates);
  }

  function handleAddEmail() {
    if (!validateInput.email(emailToInvite)) {
      return Alert.alert("Convidado", "E-mail inválido!");
    }

    const emailAlreadyExists = emailsToInvite.find(
      (email) => email === emailToInvite
    );

    if (emailAlreadyExists) {
      return Alert.alert("Convidado", "E-mail já foi adicionado!");
    }

    setEmailsToInvite((prevState) => [...prevState, emailToInvite]);
    setEmailToInvite("");
  }

  function handleRemoveEmail(receivedEmail: string) {
    setEmailsToInvite((prevState) =>
      prevState.filter((email) => email !== receivedEmail)
    );
  }

  if (false) {
    return <Loading />;
  }

  return (
    <GluestackUIProvider mode="dark">
      <View className="flex-1 bg-zinc-950">
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <View className="flex-1 items-center justify-center px-5">
          <Text className="text-zinc-400 font-regular text-center text-lg mt-3">
            Convide seus amigos e planeje sua{"\n"}próxima viagem
          </Text>

          <View className="w-full bg-zinc-900 p-4 rounded-xl my-8 border border-zinc-800">
            <Input>
              <MapPin color={colors.zinc[400]} size={20} />
              <Input.Field
                placeholder="Para onde?"
                editable={stepForm === StepForm.TRIP_DETAILS}
                onChangeText={setDestination}
                value={destination}
              />
            </Input>

            <Input>
              <IconCalendar color={colors.zinc[400]} size={20} />
              <Input.Field
                placeholder="Quando?"
                editable={stepForm === StepForm.TRIP_DETAILS}
                onFocus={() => Keyboard.dismiss()}
                showSoftInputOnFocus={false}
                onPressIn={() =>
                  stepForm === StepForm.TRIP_DETAILS &&
                  setShowModal(MODAL.CALENDAR)
                }
                value={selectedDates.formatDatesInText}
              />
            </Input>

            {stepForm === StepForm.ADD_EMAIL && (
              <>
                <View className="border-b py-3 border-zinc-800">
                  <Button
                    variant="secondary"
                    onPress={() => setStepForm(StepForm.TRIP_DETAILS)}
                  >
                    <Button.Title>Alterar local/data</Button.Title>
                    <Settings2 color={colors.zinc[200]} size={20} />
                  </Button>
                </View>

                <Input>
                  <UserRoundPlus color={colors.zinc[400]} size={20} />
                  <Input.Field
                    placeholder="Quem estará na viagem?"
                    autoCorrect={false}
                    value={
                      emailsToInvite.length > 0
                        ? `${emailsToInvite.length} pessoas(a) convidada(s)`
                        : ""
                    }
                    onPress={() => {
                      Keyboard.dismiss();
                      setShowModal(MODAL.GUESTS);
                    }}
                    showSoftInputOnFocus={false}
                  />
                </Input>
              </>
            )}

            <Button
              onPress={() =>
                setStepForm((prev) =>
                  prev === StepForm.TRIP_DETAILS
                    ? StepForm.ADD_EMAIL
                    : StepForm.TRIP_DETAILS
                )
              }
            >
              <Button.Title>
                {stepForm === StepForm.TRIP_DETAILS
                  ? "Continuar"
                  : "Confirmar Viagem"}
              </Button.Title>
              <ArrowRight color={colors.lime[950]} size={20} />
            </Button>
          </View>

          <Text className="text-zinc-500 font-regular text-center text-base">
            Ao planejar sua viagem pela plann.er você automaticamente concorda
            com nossos{" "}
            <Text className="text-zinc-300 underline">
              termos de uso e políticas de privacidade.
            </Text>
          </Text>

          <Modal
            title="Selecionar datas"
            subtitle="Selecione a data de ida e volta da viagem"
            visible={showModal === MODAL.CALENDAR}
            onClose={() => setShowModal(MODAL.NONE)}
          >
            <View className="gap-4 mt-4">
              <Calendar
                minDate={dayjs().toISOString()}
                onDayPress={handleSelectDate}
                markedDates={selectedDates.dates}
              />

              <Button onPress={() => setShowModal(MODAL.NONE)}>
                <Button.Title>Confirmar</Button.Title>
              </Button>
            </View>
          </Modal>

          <Modal
            title="Selecionar convidados"
            subtitle="Os convidados irão receber e-mails para confirmar a participação na viagem."
            visible={showModal === MODAL.GUESTS}
            onClose={() => setShowModal(MODAL.NONE)}
          >
            <View className="my-2 flex-wrap gap-2 border-b border-zinc-800 py-5 items-start">
              {emailsToInvite.length > 0 ? (
                emailsToInvite.map((email) => (
                  <GuestEmail
                    key={email}
                    email={email}
                    onRemove={() => handleRemoveEmail(email)}
                  />
                ))
              ) : (
                <Text className="text-zinc-600 text-base font-regular">
                  Nenhum e-mail adicionado.
                </Text>
              )}
            </View>

            <View className="gap-4 mt-4">
              <Input variant="secondary">
                <AtSign color={colors.zinc[400]} size={20} />
                <Input.Field
                  placeholder="Digite o e-mail do convidado"
                  keyboardType="email-address"
                  onChangeText={(text) => setEmailToInvite(text.toLowerCase())}
                  value={emailToInvite}
                  returnKeyType="send"
                />
              </Input>

              <Button onPress={handleAddEmail}>
                <Button.Title>Convidar</Button.Title>
              </Button>
            </View>
          </Modal>
        </View>
      </View>
    </GluestackUIProvider>
  );
}

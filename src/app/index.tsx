import { useState } from "react";
import { Alert, Keyboard, Text, View } from "react-native";
import dayjs from "dayjs";
import { DateData } from "react-native-calendars";

import { Button } from "../components/Button/Button";
import { Calendar } from "../components/Calendar/Calendar";
import { GuestEmail } from "../components/GuestEmail/GuestEmail";
import { Input } from "../components/Input/Input";
import { Loading } from "../components/Loading/Loading";
import { Modal } from "../components/Modal/Modal";
import { colors } from "../styles/colors";
import { calendarUtils, DatesSelected } from "../utils/calendarUtils";
import { validateInput } from "../utils/validateInput";
import {
  ArrowRight,
  AtSign,
  Calendar as IconCalendar,
  MapPin,
  Settings2,
  UserRoundPlus,
} from "lucide-react-native";

import { appStyles } from "./index.styles";

enum StepForm {
  TRIP_DETAILS = 1,
  ADD_EMAIL = 2,
}

enum MODAL {
  NONE = 0,
  CALENDAR = 1,
  GUESTS = 2,
}

const {
  innerContainer,
  invite,
  inputContainer,
  divider,
  policy,
  policyHighlight,
  calendarContainer,
  emailContainer,
  noEmail,
  emailInput,
} = appStyles();

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
    "hallef@email.com",
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
      return Alert.alert("Convidado", "E-mail inv������lido!");
    }

    const emailAlreadyExists = emailsToInvite.find(
      (email) => email === emailToInvite
    );

    if (emailAlreadyExists) {
      return Alert.alert("Convidado", "E-mail j������ foi adicionado!");
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
    <View className={innerContainer()}>
      <Text className={invite()}>
        Convide seus amigos e planeje sua{"\n"}pr������������������xima viagem
      </Text>

      <View className={inputContainer()}>
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
              stepForm === StepForm.TRIP_DETAILS && setShowModal(MODAL.CALENDAR)
            }
            value={selectedDates.formatDatesInText}
          />
        </Input>

        {stepForm === StepForm.ADD_EMAIL && (
          <>
            <View className={divider()}>
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
                placeholder="Quem estar������ na viagem?"
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

      <Text className={policy()}>
        Ao planejar sua viagem pela plann.er voc������ automaticamente concorda
        com nossos{" "}
        <Text className={policyHighlight()}>
          termos de uso e pol������������������ticas de privacidade.
        </Text>
      </Text>

      <Modal
        title="Selecionar datas"
        subtitle="Selecione a data de ida e volta da viagem"
        visible={showModal === MODAL.CALENDAR}
        onClose={() => setShowModal(MODAL.NONE)}
      >
        <View className={calendarContainer()}>
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
        subtitle="Os convidados ir���o receber e-mails para confirmar a participa������������������o na viagem."
        visible={showModal === MODAL.GUESTS}
        onClose={() => setShowModal(MODAL.NONE)}
      >
        <View className={emailContainer()}>
          {emailsToInvite.length > 0 ? (
            emailsToInvite.map((email) => (
              <GuestEmail
                key={email}
                email={email}
                onRemove={() => handleRemoveEmail(email)}
              />
            ))
          ) : (
            <Text className={noEmail()}>Nenhum e-mail adicionado.</Text>
          )}
        </View>

        <View className={emailInput()}>
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
  );
}

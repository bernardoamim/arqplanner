import { Feather } from "@expo/vector-icons";
import { Center, Icon, useTheme } from "native-base";
import {
  Calendar as ReactNativeCalendar,
  LocaleConfig,
} from "react-native-calendars";

LocaleConfig.locales["pt-BR"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan.",
    "Fev.",
    "Mar.",
    "Abr.",
    "Maio",
    "Jun.",
    "Jul.",
    "Ago.",
    "Set.",
    "Out.",
    "Nov.",
    "Dez.",
  ],
  dayNames: [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ],
  dayNamesShort: ["D", "S", "T", "Q", "Q", "S", "S"],
  today: "Hoje",
};
LocaleConfig.defaultLocale = "pt-BR";

const vacation = { key: "vacation", color: "red", selectedDotColor: "blue" };
const massage = { key: "massage", color: "blue", selectedDotColor: "blue" };
const workout = { key: "workout", color: "green" };

type CalendarProps = {
  selected: string;
  onSelect: (day: string) => void;
};

export function Calendar({ selected, onSelect }: CalendarProps) {
  const { colors, fonts, fontSizes } = useTheme();

  return (
    <ReactNativeCalendar
      style={{ paddingLeft: 0, paddingRight: 0 }}
      theme={{
        textMonthFontFamily: fonts.heading,
        textMonthFontSize: fontSizes.xl,
        arrowStyle: { padding: 0 },
        textDayHeaderFontFamily: fonts.heading,
        textDayHeaderFontSize: fontSizes.md,
        textSectionTitleColor: colors.light[700],
        textDayFontFamily: fonts.heading,
        textDayFontSize: fontSizes.md,
        dayTextColor: colors.light[500],
        todayBackgroundColor: colors.light[200],
        todayTextColor: colors.light[700],
        selectedDayBackgroundColor: colors.light[500],
        selectedDayTextColor: colors.white,
      }}
      enableSwipeMonths
      renderArrow={(direction) => <CalendarArrow direction={direction} />}
      onDayPress={(day) => {
        onSelect(day.dateString);
      }}
      initialDate={"2024-02-06"}
      markingType={"multi-dot"}
      markedDates={{
        [selected]: {
          selected: true,
          disableTouchEvent: true,
        },
        "2024-02-16": {
          selected: selected === "2024-02-16",
          dots: [vacation, massage, workout],
        },
        "2024-02-17": { dots: [massage, workout] },
        "2024-02-18": { marked: true, dotColor: "red", activeOpacity: 0 },
        "2024-02-19": { disabled: true, disableTouchEvent: true },
      }}
    />
  );
}

type CalendarArrowProps = {
  direction: "left" | "right";
};

function CalendarArrow({ direction }: CalendarArrowProps) {
  return (
    <Center h={8} w={8} rounded={"full"} bg={"light.500"}>
      <Icon
        as={Feather}
        name={`arrow-${direction}`}
        size={4}
        color={"white"}
        strokeWidth={2}
      />
    </Center>
  );
}

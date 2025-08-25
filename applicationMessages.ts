export const norwegian: ApplicationMessages = {
  generalError: "En feil har inntruffet",
  serverError: "Mistet kontakt med serveren",
  invalidWeekday: (day) => `'${day}' er ikke en gyldig ukedag`,
};
export const english: ApplicationMessages = {
  generalError: "Something went wrong",
  serverError: "Cannot connect to server",
  invalidWeekday: (day) => `'${day}' is not a valid weekday`,
};

interface ApplicationMessages {
  generalError: string;
  serverError: string;

  invalidWeekday(day: string): string;
}

type Message =
  | { code: "generalError" | "serverError" }
  | { code: "invalidWeekday"; day: string };

export function showMessage(language: ApplicationMessages, message: Message) {
  if (message.code === "generalError") return language["generalError"];
  else if (message.code === "serverError") return language["serverError"];
  else if (message.code === "invalidWeekday")
    return language.invalidWeekday(message.day);
  else return "what?";
}

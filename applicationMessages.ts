export const norwegian: ApplicationMessages = {
  generalError: "En feil har inntruffet",
  invalidWeekday: (day) => `'${day}' er ikke en gyldig ukedag`,
};
export const english: ApplicationMessages = {
  generalError: "Something went wrong",
  invalidWeekday: (day) => `'${day}' is not a valid weekday`,
};

interface ApplicationMessages {
  generalError: string;

  invalidWeekday(day: string): string;
}

type Message =
  | { code: "generalError" }
  | { code: "invalidWeekday"; day: string };

export function showMessage(language: ApplicationMessages, message: Message) {
  if (message.code === "generalError") return language["generalError"];
  else return language.invalidWeekday(message.day);
}

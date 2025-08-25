export const norwegian: ApplicationMessages = {
  generalError: "En feil har inntruffet",
};
export const english: ApplicationMessages = {
  generalError: "Something went wrong",
};

interface ApplicationMessages {
  generalError: string;
}

type Message = "generalError" | { code: "invalidWeekday"; day: string };

export function showMessage(language: ApplicationMessages, error: Message) {
  return language["generalError"];
}

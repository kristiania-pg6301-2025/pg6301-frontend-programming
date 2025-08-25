export const norwegian: ApplicationMessages = {
  generalError: "En feil har inntruffet",
  serverError: "Mistet kontakt med serveren",

  emailDomains: (emails, validDomains) =>
    `${emails} er en ugyldig adresse. Må være på domenet ${validDomains.join(" eller ")}`,
  invalidWeekday: (day) => `'${day}' er ikke en gyldig ukedag`,
};
export const english: ApplicationMessages = {
  generalError: "Something went wrong",
  serverError: "Cannot connect to server",

  emailDomains: (emails, validDomains) =>
    `${emails} is an invalid email. Must be in domain ${validDomains.join(" or ")}`,
  invalidWeekday: (day) => `'${day}' is not a valid weekday`,
};

interface ApplicationMessages {
  generalError: string;
  serverError: string;

  invalidWeekday(day: string): string;

  emailDomains(email: string, validDomains: string[]): string;
}

type Message =
  | { code: "generalError" | "serverError" }
  | { code: "emailDomains"; email: string; validDomains: string[] }
  | { code: "invalidWeekday"; day: string };

export function showMessage(language: ApplicationMessages, message: Message) {
  if (message.code === "generalError" || message.code === "serverError")
    return language[message.code];
  else if (message.code === "emailDomains")
    return language.emailDomains(message.email, message.validDomains);
  else if (message.code === "invalidWeekday")
    return language.invalidWeekday(message.day);
  else {
    const code: never = message.code;
    return `Unknown message type ${code}`;
  }
}

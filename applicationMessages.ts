export const norwegian: ApplicationMessages = {
  generalError: "En feil har inntruffet",
};
export const english: ApplicationMessages = {
  generalError: "Something went wrong",
};

interface ApplicationMessages {
  generalError: string;
}

export function showMessage(language: ApplicationMessages, error: string) {
  return language["generalError"];
}

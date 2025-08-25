import { expect, test } from "vitest";
import { english, norwegian, showMessage } from "./applicationMessages.js";

test("general error", () => {
  expect(showMessage(norwegian, { code: "generalError" })).toBe(
    "En feil har inntruffet",
  );
  expect(showMessage(english, { code: "generalError" })).toBe(
    "Something went wrong",
  );
});

test("server error", () => {
  expect(showMessage(norwegian, { code: "serverError" })).toBe(
    "Mistet kontakt med serveren",
  );
  expect(showMessage(english, { code: "serverError" })).toBe(
    "Cannot connect to server",
  );
});

test("weekdays", () => {
  expect(
    showMessage(norwegian, { code: "invalidWeekday", day: "Doomsday" }),
  ).toBe("'Doomsday' er ikke en gyldig ukedag");
  expect(
    showMessage(english, { code: "invalidWeekday", day: "Doomsday" }),
  ).toBe("'Doomsday' is not a valid weekday");
});

test("email domains", () => {
  expect(
    showMessage(norwegian, {
      code: "emailDomains",
      email: "foor@bart.com",
      validDomains: ["foo.no", "example.com"],
    }),
  ).toBe(
    "foor@bart.com er en ugyldig adresse. Må være på domenet foo.no eller example.com",
  );
  expect(
    showMessage(norwegian, {
      code: "emailDomains",
      email: "hello@example.net",
      validDomains: ["example.com"],
    }),
  ).toBe(
    "hello@example.net er en ugyldig adresse. Må være på domenet example.com",
  );
  expect(
    showMessage(english, {
      code: "emailDomains",
      email: "foor@bart.com",
      validDomains: ["foo.no", "example.com"],
    }),
  ).toBe(
    "foor@bart.com is an invalid email. Must be in domain foo.no or example.com",
  );
});

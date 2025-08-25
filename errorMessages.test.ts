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

test("weekdays", () => {
  expect(
    showMessage(norwegian, { code: "invalidWeekday", day: "Doomsday" }),
  ).toBe("'Doomsday' er ikke en gyldig ukedag");
  expect(
    showMessage(english, { code: "invalidWeekday", day: "Doomsday" }),
  ).toBe("'Doomsday' is not a valid weekday");
});

import { expect, test } from "vitest";
import { english, norwegian, showMessage } from "./applicationMessages.js";

test("general error", () => {
  expect(showMessage(norwegian, "generalError")).toBe("En feil har inntruffet");
  expect(showMessage(english, "generalError")).toBe("Something went wrong");
});

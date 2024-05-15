import React from "react";
import { fireEvent, prettyDOM, render, screen } from "@testing-library/react";
import { Alert } from "../src/Alert";
import "@testing-library/jest-dom";

const testAlertVariant = (variant, expectedClass) => {
  it(`renders the alert with the correct variant (${variant})`, () => {
    const { container } = render(
      <Alert variant={variant} className="Alert">
        This is a {variant.toLowerCase()} alert
      </Alert>
    );
    const alertElement = container.querySelector(".Alert");

    expect(alertElement).toHaveClass(expectedClass);
  });
};

describe("Alert", () => {
  it("renders the alert with the correct text", () => {
    const { getByText } = render(<Alert variant="ERROR">Alert</Alert>);
    const alertElement = getByText(/Alert/i);
    expect(alertElement).toBeInTheDocument();
  });

  testAlertVariant("ERROR", "errorBackground");
  testAlertVariant("WARN", "warnBackground");
  testAlertVariant("INFO", "infoBackground");
});

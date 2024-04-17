import React, { useState } from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { ControlledRadio } from "../src/ControlledRadio";

describe("Controlled Radio", () => {
  it("renders correctly", () => {
    const { getByLabelText } = render(
      <ControlledRadio
        label="Test Radio"
        value="testValue"
        name="testRadio"
        checked={false}
      />
    );
    const radioElement = getByLabelText(/Test Radio/i);
    expect(radioElement).toBeInTheDocument();
  });

  it("correctly handles checked state and onChange event", () => {
    let checkedValue = "";
    const handleChange = jest.fn((value) => {
      checkedValue = value;
    });

    const { getByLabelText } = render(
      <ControlledRadio
        label="Test Radio"
        value="testValue"
        name="testRadio"
        checked={false}
        onChange={handleChange}
      />
    );

    const radioElement = getByLabelText(/Test Radio/i);
    fireEvent.click(radioElement);

    expect(checkedValue).toBe("testValue");
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("correctly handles className prop", () => {
    render(
      <ControlledRadio
        label="Test Radio"
        value="testValue"
        name="testRadio"
        checked={false}
        className="test-class"
      />
    );

    const radioElement = screen.getByLabelText(/Test Radio/i);
    expect(radioElement).toHaveClass("test-class");
  });

  it("initial checked prop", () => {
    render(
      <ControlledRadio
        label="Test Radio"
        value="testValue"
        name="testRadio"
        checked={true}
      />
    );

    const radioElement = screen.getByLabelText(/Test Radio/i);
    expect(radioElement).toBeChecked();
  });
});

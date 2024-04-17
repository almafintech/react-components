import React from "react";
import { fireEvent, prettyDOM, render, screen } from "@testing-library/react";
import { Checkbox } from "../src/Checkbox";
import "@testing-library/jest-dom";

describe("Checkbox", () => {
  it("renders with children", () => {
    const { getByText } = render(<Checkbox>Hello</Checkbox>);
    expect(getByText("Hello")).toBeInTheDocument();
  });

  it("renders with className and classNames", () => {
    render(
      <Checkbox
        className="container"
        classNames={{ wrapper: "wrapper", label: "label" }}
        role="test-checkbox"
      >
        Hello
      </Checkbox>
    );
    const container = screen.getByRole("test-checkbox");
    const spanWrapper = container.querySelector("span.wrapper");

    expect(container).toHaveClass("container");
    expect(screen.getByText("Hello")).toHaveClass("label");
    expect(spanWrapper).toBeInTheDocument();
  });

  it("onChange event", () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(
      <Checkbox onChange={handleChange}>Check me</Checkbox>
    );
    fireEvent.click(getByLabelText("Check me"));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("defaultSelected prop (checked)", () => {
    const component = render(<Checkbox defaultSelected>Hello</Checkbox>);
    expect(component.container.querySelector("label")).toHaveAttribute(
      "data-selected",
      "true"
    );
  });

  it("is disabled when the disabled prop is true", () => {
    const component = render(<Checkbox isDisabled>Hello</Checkbox>);
    expect(component.container.querySelector("label")).toHaveAttribute(
      "data-disabled",
      "true"
    );
  });
});

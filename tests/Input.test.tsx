import React from "react";
import { fireEvent, prettyDOM, render, screen } from "@testing-library/react";
import { Input } from "../src/Input";
import "@testing-library/jest-dom";

describe("Input", () => {
  it("renders the input with the correct placeholder", () => {
    render(<Input placeholder="Test Input" />);
    const inputElement = screen.getByPlaceholderText(/Test Input/i);
    expect(inputElement).toBeInTheDocument();
  });

  it("calls the onChange handler when the input value changes", () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "test" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("has the correct type when the type prop is passed", () => {
    render(<Input placeholder="Test Input" type="password" />);
    const inputElement = screen.getByPlaceholderText(/Test Input/i);
    expect(inputElement).toHaveAttribute("type", "password");
  });

  it("has the correct class when the className prop is passed", () => {
    const { container } = render(<Input className="test-class" />);
    const inputElement = container.getElementsByClassName("test-class")[0];
    expect(inputElement).toHaveClass("test-class");
  });

  it("has the correct value when the value prop is passed", () => {
    render(<Input value="test value" />);
    const inputElement = screen.getByDisplayValue("test value");
    expect(inputElement).toBeInTheDocument();
  });

  it("is disabled when the disabled prop is true", () => {
    render(<Input disabled={true} />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeDisabled();
  });

  it("is disabled when the disabled prop is false", () => {
    render(<Input disabled={false} />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeEnabled();
  });
});

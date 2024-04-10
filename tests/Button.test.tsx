import React from "react";
import { fireEvent, prettyDOM, render, screen } from "@testing-library/react";
import { Button } from "../src/Button";
import "@testing-library/jest-dom";

describe("Button", () => {
  it("renders the button with the correct text", () => {
    render(<Button text="Test Button" />);
    const buttonElement = screen.getByRole("button", { name: /Test Button/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls the onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button text="Test Button" onClick={handleClick} />);
    const buttonElement = screen.getByRole("button", { name: /Test Button/i });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalled();
  });

  it("is disabled when the disabled prop is true", () => {
    render(<Button text="Test Button" disabled={true} />);
    const buttonElement = screen.getByRole("button", { name: /Test Button/i });
    expect(buttonElement).toBeDisabled();
  });

  it("has the correct type when the type prop is passed", () => {
    render(<Button text="Test Button" type="submit" />);
    const buttonElement = screen.getByRole("button", { name: /Test Button/i });
    expect(buttonElement).toHaveAttribute("type", "submit");
  });

  it("has the correct class when the className prop is passed", () => {
    render(<Button text="Test Button" className="test-class" />);
    const buttonElement = screen.getByRole("button", { name: /Test Button/i });
    expect(buttonElement).toHaveClass("test-class");
  });

  it("renders the loading dots when isLoading is true", () => {
    render(<Button text="Test Button" isLoading={true} />);
    const loadingDotsElement = screen.getByTestId("loading-dots");
    expect(loadingDotsElement).toBeInTheDocument();
  });

  it("applies the correct variant style when variant prop is passed", () => {
    const component = render(<Button text="Test Button" variant="secondary" />);
    const buttonElement = screen.getByRole("button", { name: /Test Button/i });
    expect(buttonElement).toHaveClass("secondary");
  });
});

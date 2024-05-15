import React from "react";
import { fireEvent, prettyDOM, render, screen } from "@testing-library/react";
import { DatePicker } from "../src/DatePicker";
import "@testing-library/jest-dom";

describe("DatePicker", () => {
  it("renders the date picker", () => {
    const { getByText } = render(<DatePicker />);
    const datePickerElement = getByText("Aplicar");
    expect(datePickerElement).toBeInTheDocument();
  });

  it("apply button is disabled when no date is selected", () => {
    render(<DatePicker />);
    const applyButton = screen.getByText("Aplicar");
    expect(applyButton).toBeDisabled();
  });

  it("calls onApply prop when apply button is enabled and clicked", () => {
    const handleApply = jest.fn();

    const { getByText } = render(<DatePicker onApply={handleApply} />);

    fireEvent.click(getByText("23"));
    fireEvent.click(getByText("24"));

    fireEvent.click(getByText("Aplicar"));

    expect(handleApply).toHaveBeenCalled();
  });

  it("calls onDelete prop when button is clicked", () => {
    const handleDelete = jest.fn();

    const { getByText } = render(<DatePicker onDelete={handleDelete} />);

    fireEvent.click(getByText("Borrar"));

    expect(handleDelete).toHaveBeenCalled();
  });

  it("calls onBack prop when back button is clicked", () => {
    const handleBack = jest.fn();

    const { container } = render(<DatePicker onBack={handleBack} />);

    const backButton = container.querySelector(".iconButton");
    if (backButton) {
      fireEvent.click(backButton);
    }
    expect(handleBack).toHaveBeenCalled();
  });

  it("The month selector expands when clicked. ", () => {
    const { getByLabelText } = render(<DatePicker />);
    const monthSelector = getByLabelText("Month");
    fireEvent.click(monthSelector);
    const monthSelected = screen.getByText("Abril");
    expect(monthSelected).toBeInTheDocument();
  });

  it("The year selector expands when clicked. ", () => {
    const { getByLabelText, getByRole } = render(<DatePicker />);
    const yearSelector = getByLabelText("Year");
    fireEvent.click(yearSelector);

    const optionElement = getByRole("option", { name: "2021" });
    expect(optionElement).toBeInTheDocument();
  });
});

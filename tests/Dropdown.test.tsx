import React from "react";
import { fireEvent, prettyDOM, render, screen } from "@testing-library/react";
import { Dropdown } from "../src/Dropdown";
import "@testing-library/jest-dom";

describe("Dropdown", () => {
  it("renders the dropdown with the correct text", () => {
    const mockItems = [
      { key: "Option 1", action: () => {}, label: "Option 1" },
      { key: "Option 2", action: () => {}, label: "Option 2" },
      { key: "Option 3", action: () => {}, label: "Option 3" },
    ];
    render(<Dropdown>dropdown</Dropdown>);
    const element = screen.getByText("dropdown");
    expect(element).toBeInTheDocument();
  });
});

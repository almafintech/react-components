import React from "react";
import { fireEvent, prettyDOM, render, screen } from "@testing-library/react";
import { Dropdown } from "../src/Dropdown";
import "@testing-library/jest-dom";

describe("Dropdown", () => {
  const mockItems = [
    { key: "Option 1", action: () => {}, label: "Option 1" },
    { key: "Option 2", action: () => {}, label: "Option 2" },
    { key: "Option 3", action: () => {}, label: "Option 3" },
  ];
  it("renders the dropdown with the correct text", () => {
    render(<Dropdown>dropdown</Dropdown>);
    const element = screen.getByText("dropdown");
    expect(element).toBeInTheDocument();
  });
  it("renders the dropdown with the correct items", () => {
    render(<Dropdown items={mockItems}>dropdown</Dropdown>);

    const element = screen.getByText("dropdown");
    fireEvent.click(element);

    const firstOption = screen.getByText("Option 1");
    const secondOption = screen.getByText("Option 2");
    const thirdOption = screen.getByText("Option 3");

    expect(firstOption).toBeInTheDocument();
    expect(secondOption).toBeInTheDocument();
    expect(thirdOption).toBeInTheDocument();
  });
  // it("calls the onSelectionChange handler when an option is clicked", () => {
  //   const handleSelectionChange = jest.fn();
  //   render(
  //     <Dropdown
  //       items={mockItems}
  //       onSelectionChange={() => handleSelectionChange()}
  //     >
  //       dropdown
  //     </Dropdown>
  //   );

  //   const element = screen.getByText("dropdown");
  //   fireEvent.click(element);

  //   const firstOption = screen.getByText("Option 1");
  //   fireEvent.click(firstOption);

  //   expect(handleSelectionChange).toHaveBeenCalled();
  // });
});

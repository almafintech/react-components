import React from "react";
import { fireEvent, prettyDOM, render, screen } from "@testing-library/react";
import { InputFile } from "../src/InputFile";
import "@testing-library/jest-dom";

describe("InputFile", () => {
  const mockFile = new File(["file content"], "test.png", {
    type: "image/png",
  });
  const mockFn = jest.fn();
  let container: any;

  beforeEach(() => {
    const { container: renderContainer } = render(
      <InputFile
        name="file"
        onFileUpload={mockFn}
        onFileRemove={mockFn}
        validTypes={["image/png", "image/jpeg", "image/jpg"]}
        maxSize={10}
        text="Upload File"
      />
    );
    container = renderContainer;
  });
  it("renders the component correctly", () => {
    const uploadLabel = screen.getByText("Upload File");
    expect(uploadLabel).toBeInTheDocument();
  });
  it("handles file upload correctly", () => {
    const input = container.querySelector('input[type="file"]');
    if (input) fireEvent.change(input, { target: { files: [mockFile] } });

    expect(mockFn).toHaveBeenCalled();
  });
  it("when file is upload, the text is the name of file", () => {
    const input = container.querySelector('input[type="file"]');
    if (input) fireEvent.change(input, { target: { files: [mockFile] } });
    const uploadLabel = screen.getByText("test.png");
    expect(uploadLabel).toBeInTheDocument();
  });

  it("when file is upload, we can remove it with onRemove prop", () => {
    const input = container.querySelector('input[type="file"]');
    if (input) fireEvent.change(input, { target: { files: [mockFile] } });

    //This is a tag created by jest simulating SVG's
    const trashIcon = container.getElementsByTagName("ui-icon-trash.svg")[0];
    if (trashIcon) fireEvent.click(trashIcon);
    expect(mockFn).toHaveBeenCalled();
  });

  it("when file is upload, we can download it with onDownload prop", () => {});
});

describe("InputFile", () => {
  const mockFile = new File(["file content"], "test.png", {
    type: "image/png",
  });

  it("when file is upload, we can see the loading dots", () => {
    const { container } = render(
      <InputFile
        name="file"
        validTypes={["image/png", "image/jpeg", "image/jpg"]}
        maxSize={10}
        text="Upload File"
        isLoading
      />
    );
    const input = container.querySelector('input[type="file"]');
    if (input) fireEvent.change(input, { target: { files: [mockFile] } });
    const loadingDots = container.querySelector(".dotsContainer");
    expect(loadingDots).toBeInTheDocument();
  });

  it("when file is upload, we can see the error message", () => {
    const { container } = render(
      <InputFile
        name="file"
        validTypes={["image/png", "image/jpeg", "image/jpg"]}
        // This is 0 to generate the error message
        maxSize={0}
        text="Upload File"
      />
    );
    const input = container.querySelector('input[type="file"]');
    if (input) fireEvent.change(input, { target: { files: [mockFile] } });

    const errorMessage = container.querySelector(".errorMessageStyle");
    expect(errorMessage).toBeInTheDocument();
  });
});

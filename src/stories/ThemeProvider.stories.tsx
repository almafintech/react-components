import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ThemeProvider from "../ThemeProvider/ThemeProvider";
import { colors } from "../styles/variables";
import Button from "../Button/Button";
import Tabs from "../Tabs/Tabs";
import Switch from "../Switch/Switch";
import Checkbox from "../Checkbox/Checkbox";
import InputFileMultiple from "../InputFile/InputFileMultiple";
import InputFileSimple from "../InputFile/InputFileSimple";
import Modal from "../Modal/Modal";
import InputSelect from "../InputSelect/InputSelect";

const meta = {
  title: "Components/ThemeProvider",
  component: ThemeProvider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ThemeProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

const tabItems = [
  { id: "1", label: "Tab 1" },
  { id: "2", label: "Tab 2" },
  { id: "3", label: "Tab 3" },
];

const ThemePreview = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [simpleFile, setSimpleFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const isValidFile = (file: File) =>
    ["image/jpeg", "image/png", "application/pdf"].includes(file.type) &&
    file.size <= 5 * 1024 * 1024;

  const getErrorMessage = (file: File) => {
    if (file.size > 5 * 1024 * 1024)
      return "El archivo excede el límite de 5MB";
    return "Tipo de archivo no permitido. Solo JPG, PNG o PDF";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: 16,
        width: 480,
      }}
    >
      <div style={{ display: "flex", gap: 8 }}>
        <Button
          text="Primary"
          variant="primary"
          onPress={() => setIsModalOpen(true)}
        />
        <Button text="Secondary" variant="secondary" />
        <Button text="Tertiary" variant="tertiary" />
      </div>
      <Tabs items={tabItems} />
      <Switch defaultSelected />
      <Checkbox defaultSelected>Checkbox</Checkbox>
      <InputSelect
        label="Select"
        placeholder="Seleccioná una opción"
        type="multiple-checkbox"
        items={[
          { value: "1", label: "Opción 1" },
          { value: "2", label: "Opción 2" },
          { value: "3", label: "Opción 3" },
          { value: "4", label: "Opción 4" },
        ]}
        showExternalBox
        inputValue={selectedKeys}
        onChange={(keys) => setSelectedKeys(keys as string[])}
      />
      <InputFileSimple
        name="modal-simple"
        text="Arrastrá o seleccioná un archivo de tu dispositivo"
        infoText="Formato JPG, PNG o PDF · Máximo 5MB"
        validTypes={["image/jpeg", "image/png", "application/pdf"]}
        isValidFile={isValidFile}
        getErrorMessage={getErrorMessage}
        value={simpleFile}
        onFileUpload={(file) => setSimpleFile(file as File)}
        onFileRemove={() => setSimpleFile(null)}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        header="Subir archivos"
        footer={
          <div style={{ display: "flex", gap: 8 }}>
            <Button
              text="Cancelar"
              variant="secondary"
              onPress={() => setIsModalOpen(false)}
            />
            <Button
              text="Confirmar"
              variant="primary"
              onPress={() => setIsModalOpen(false)}
            />
          </div>
        }
      >
        <p>
          Seleccioná los archivos que querés subir. Solo se permiten archivos
          JPG, PNG o PDF de hasta 5MB.
        </p>
        <InputFileSimple
          name="modal-simple"
          text="Arrastrá o seleccioná un archivo de tu dispositivo"
          infoText="Formato JPG, PNG o PDF · Máximo 5MB"
          validTypes={["image/jpeg", "image/png", "application/pdf"]}
          isValidFile={isValidFile}
          getErrorMessage={getErrorMessage}
          value={simpleFile}
          onFileUpload={(file) => setSimpleFile(file as File)}
          onFileRemove={() => setSimpleFile(null)}
        />
        <InputFileMultiple
          name="modal-demo"
          text="Arrastrá o seleccioná archivos de tu dispositivo"
          infoText="Formato JPG, PNG o PDF · Máximo 5MB"
          validTypes={["image/jpeg", "image/png", "application/pdf"]}
          isValidFile={isValidFile}
          getErrorMessage={getErrorMessage}
          value={files}
          onFileUpload={(file) => setFiles((prev) => [...prev, file as File])}
          onFileRemove={(file) =>
            setFiles((prev) => prev.filter((f) => f !== file))
          }
        />
      </Modal>
    </div>
  );
};

export const Default: Story = {
  args: {
    theme: colors,
    children: <ThemePreview />,
  },
};

export const CustomTheme: Story = {
  args: {
    theme: {
      fontFamily: "Roboto, sans-serif",
      // Primary scale
      primary50: "#f5f3ff",
      primary100: "#ede9fe",
      primary200: "#ddd6fe",
      primary300: "#7c3aed",
      primary400: "#6d28d9",
      primary500: "#5b21b6",
      primary600: "#4c1d95",
      primary700: "#3b0764",
      primary800: "#2e1065",
      primary900: "#1e0a4a",
      // Secondary scale
      secondary50: "#faf5ff",
      secondary100: "#f3e8ff",
      secondary200: "#e9d5ff",
      secondary300: "#d8b4fe",
      secondary400: "#c084fc",
      secondary500: "#a855f7",
      secondary600: "#9333ea",
      secondary700: "#7e22ce",
      secondary800: "#6b21a8",
      secondary900: "#581c87",
      // Accent scale
      accent50: "#fdf4ff",
      accent100: "#fae8ff",
      accent200: "#f5d0fe",
      accent300: "#e879f9",
      accent400: "#d946ef",
      accent500: "#c026d3",
      accent600: "#a21caf",
      accent700: "#86198f",
      accent800: "#701a75",
      accent900: "#4a044e",
      // Grey scale
      white: "#ffffff",
      greyscale50: "#fcfcfc",
      greyscale100: "#f5f5f5",
      greyscale200: "#f0f0f0",
      greyscale300: "#d9d9d9",
      greyscale400: "#bfbfbf",
      greyscale500: "#8c8c8c",
      greyscale600: "#595959",
      greyscale700: "#454545",
      greyscale800: "#262626",
      greyscale900: "#1f1f1f",
      greyscale950: "#141414",
      black: "#000000",
      // Error scale
      e50: "#f9e8e9",
      e75: "#e5a2a6",
      e100: "#da7c81",
      e200: "#ca434b",
      e300: "#bf1d26",
      e400: "#86141b",
      e500: "#751217",
      // Warning scale
      w50: "#fcf6e8",
      w75: "#f1dc9f",
      w100: "#eccd78",
      w200: "#e4b83e",
      w300: "#dea916",
      w400: "#9b760f",
      w500: "#87670d",
      // Success scale
      s50: "#e8f5ed",
      s75: "#a1d7b6",
      s100: "#7ac798",
      s200: "#40ae6c",
      s300: "#199e4e",
      s400: "#126f37",
      s500: "#0f6030",
      // Info scale
      i50: "#e9f3f9",
      i75: "#a3cce5",
      i100: "#7db7da",
      i200: "#4497cb",
      i300: "#1e82c0",
      i400: "#155b86",
      i500: "#124f75",
    },
    children: <ThemePreview />,
  },
};

import { ReactNode } from "react";

export interface InputAddressProps {
    name?: string
    country?: string
    value?: string
    touched?: boolean
    label?: string
    placeholder?: string
    disabled?: boolean
    errorMessage?: ReactNode;
    isFormField?: boolean;
    isInvalid?: boolean;
    description?: string;
    onBlur?: (e: React.FocusEvent<any, Element>) => void
    onValueChange?: (data: google.maps.places.AutocompletePrediction | null) => any
  }
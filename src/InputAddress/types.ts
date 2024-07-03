import { ReactNode } from "react";

export interface FormattedAddress {
  street: string;
  streetNumber: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface InputAddressProps {
  name?: string;
  /* Long name country, ej: "Argentina" */
  country?: string;
  value?: string;
  touched?: boolean;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  errorMessage?: ReactNode;
  isFormField?: boolean;
  isInvalid?: boolean;
  description?: string;
  className?: string;
  autoComplete?: string;
  /* The character position in the input term at which the service uses text for predictions (the position of the cursor in the input field). */
  offset?: number;
  /* If true, predictions will show only result with street number*/
  exactAddress?: boolean;
  onBlur?: (e: React.FocusEvent<any, Element>) => void;
  onValueChange?: (
    data: {
      formattedAddress: FormattedAddress;
      fullData: {
        prediction: google.maps.places.AutocompletePrediction;
        place: google.maps.places.PlaceResult;
      };
    } | null
  ) => any;
}

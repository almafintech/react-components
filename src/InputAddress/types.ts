import { ReactNode } from "react";
import { WithTheme } from "..";

export interface FormattedAddress {
  street: string;
  streetNumber: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  municipality: string;
}

export interface InputAddressProps extends WithTheme {
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
  /* If string is passed, the input is completed with the first prediction found */
  autoSelect?: string;
  getStatus?: (status: "SUCCESS" | "FAIL" | "LOADING") => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

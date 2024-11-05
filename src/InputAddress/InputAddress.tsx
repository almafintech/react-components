import {
  ChangeEvent,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import Input from "../Input/Input";
import { InputProps } from "../Input/types";
import { FormattedAddress, InputAddressProps } from "./types";
import styles from "./InputAddress.module.scss";
import { Loader } from "@googlemaps/js-api-loader";
import LocationPin from "../../assets/images/ui/icons/ui-icon-location-pin.svg";
import LocationPinByma from "../../assets/images/ui/icons/ui-icon-location-pin-byma.svg";
import { isByma } from "../utils";

const { autoCompleteOptions, active, autoComplete: autoCompleteStyle } = styles;

// const replaceAccents = (text: string) => {
//   return text
//     .replaceAll(/[àáâãä]/gi, "a")
//     .replaceAll(/[¨èéê]/gi, "e")
//     .replaceAll(/[ìíîï]/gi, "i")
//     .replaceAll(/[òóôõö]/gi, "o")
//     .replaceAll(/[ùúûü]/gi, "u");
// };

const InputAddress = (props: InputAddressProps) => {
  const {
    country,
    description,
    disabled,
    errorMessage,
    isFormField,
    isInvalid,
    label,
    name,
    placeholder,
    touched,
    value,
    className,
    exactAddress,
    onValueChange,
    onBlur,
    autoComplete,
    offset,
    autoSelect,
    getStatus,
    onChange,
    theme,
  } = props;

  const isBymaTheme = isByma(theme);

  const inputProps: InputProps = {
    name,
    description,
    disabled,
    errorMessage,
    isFormField,
    isInvalid,
    label,
    placeholder,
    touched,
  };
  const autoCompleteRef = useRef<google.maps.places.AutocompleteService>();
  const geocoderRef = useRef<google.maps.Geocoder>();
  const placesServicesRef = useRef<google.maps.places.PlacesService>();
  const loader = new Loader({
    apiKey: process.env.GOOGLE_MAPS_API_KEY || "",
    language: "es",
    libraries: ["places", "geocoding"],
  });
  const placesServicesContainerRef = useRef<HTMLDivElement>(null);
  const [autoCompleteValue, setAutoCompleteValue] = useState("");
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [selectedValue, setSelectedValue] = useState<string | null>("");
  const [currentFocus, setCurrentFocus] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [countryCode, setCountryCode] = useState<string | null>(null);

  // Auto select value
  const [refLoaded, setRefLoaded] = useState(false);
  const [autoSelectValue, setAutoSelectValue] = useState<string | undefined>(
    autoSelect
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> & {
      nativeEvent: { inputType: string };
    }
  ) => {
    const currentValue = e.target.value.replace(
      /[^a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s\.\-]/g,
      ""
    );
    if (selectedValue) {
      const newValue = currentValue.replace(selectedValue, "").trim();
      setAutoCompleteValue(newValue);
      setSelectedValue(null);
      onValueChange && onValueChange(null);
      return;
    }
    setAutoCompleteValue(currentValue);
    if (currentValue !== value) onValueChange && onValueChange(null);
    // If the library fails, you can change the value with "onChange"
    if (statusOfLibrary === "FAIL" && onChange) onChange(e);
  };

  const handleAutocompleteSelect = (
    prediction: google.maps.places.AutocompletePrediction
  ) => {
    const text = prediction.structured_formatting.main_text;
    const request = {
      placeId: prediction.place_id,
      fields: ["formatted_address", "address_components"],
    };
    placesServicesRef.current?.getDetails(request, (place, status) => {
      if (status === "OK" && place?.address_components) {
        onValueChange &&
          onValueChange({
            fullData: { prediction, place },
            formattedAddress: getFormattedAddress(place.address_components),
          });
      }
    });
    setAutoCompleteValue(text);
    setSelectedValue(text);
    setPredictions([]);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    switch (e.key) {
      case "ArrowDown": {
        setCurrentFocus((prev) => {
          return prev + 1 > predictions.length - 1 ? 0 : prev + 1;
        });
        break;
      }
      case "ArrowUp": {
        setCurrentFocus((prev) => {
          return prev - 1 < 0 ? predictions.length - 1 : prev - 1;
        });

        break;
      }
      case "Enter": {
        e.preventDefault();
        if (currentFocus > -1) {
          handleAutocompleteSelect(predictions[currentFocus]);
        }
        break;
      }
      // No default
    }
  };

  const getFormattedAddress = (
    addressComponents: google.maps.GeocoderAddressComponent[]
  ) => {
    const formattedAddress: FormattedAddress = {
      street: "",
      streetNumber: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      municipality: "",
    };
    addressComponents?.forEach((component) => {
      if (component.types.includes("route")) {
        formattedAddress.street = component.long_name;
      }
      if (component.types.includes("street_number")) {
        //In some cases, the street number is a string (e.g. 'Sur'), so check if the conversion is a number
        const streetNumber = component.long_name;

        if (isNaN(Number(streetNumber))) formattedAddress.streetNumber = "0";
        else formattedAddress.streetNumber = component.long_name;
      }
      if (component.types.includes("locality")) {
        const isCABA = component.short_name === "CABA";
        formattedAddress.municipality = isCABA
          ? component.short_name
          : component.long_name;
      }
      if (component.types.includes("administrative_area_level_1")) {
        const isCABA = formattedAddress.municipality === "CABA";
        formattedAddress.state = isCABA ? "CABA" : component.long_name;
      }
      if (component.types.includes("administrative_area_level_2")) {
        const isCABA = formattedAddress.municipality === "CABA";
        formattedAddress.city = isCABA ? "CABA" : component.long_name;
      }
      if (component.types.includes("country")) {
        formattedAddress.country = component.long_name;
      }
      if (component.types.includes("postal_code")) {
        formattedAddress.postalCode = component.long_name;
      }
    });
    if (!formattedAddress.city) {
      // set the next component after "route" in the array  as the city, if "locality" is not present
      const cityIndex =
        addressComponents.findIndex((component) =>
          component.types.includes("route")
        ) + 1;
      formattedAddress.city = addressComponents[cityIndex].long_name;
    }
    if (!formattedAddress.state) {
      // set the prev component before "country" in the array  as the state if "administrative_area_level_1" is not present
      const stateIndex =
        addressComponents.findIndex((component) =>
          component.types.includes("country")
        ) - 1;
      formattedAddress.state = addressComponents[stateIndex].long_name;
    }

    return formattedAddress;
  };

  const getPredictions = (autoSelectValue?: string) => {
    if (
      ((autoCompleteValue && autoCompleteValue !== selectedValue) ||
        autoSelectValue) &&
      autoCompleteRef.current &&
      geocoderRef.current
    ) {
      autoCompleteRef.current?.getPlacePredictions(
        {
          // If the autoSelectValue is passed, use it as the main input value
          input: autoSelectValue || autoCompleteValue || "",
          language: "es",
          componentRestrictions: countryCode
            ? { country: countryCode }
            : undefined,
          types: [
            ...(exactAddress ? ["street_address", "premise"] : ["address"]),
          ],
          offset,
          locationBias: "IP_BIAS",
        },
        (predictions, status) => {
          if (status === "OK" && predictions) {
            setPredictions(
              // predictions.filter((p) => {
              //   const mainText = p.structured_formatting.main_text;
              //   const includesInput = replaceAccents(mainText)
              //     .toLowerCase()
              //     .includes(replaceAccents(autoCompleteValue.toLowerCase()));
              //   return includesInput;
              // })
              predictions
            );

            // If autoSelectValue is passed, select the first prediction
            if (autoSelectValue && predictions.length > 0) {
              handleAutocompleteSelect(predictions[0]);
            }
          } else {
            setPredictions([]);
          }
        }
      );
    }
  };

  const getCodeAddress = (value: string) => {
    return geocoderRef.current?.geocode(
      {
        address: value,
        language: "es",
      },
      (results, status) => {
        if (status === "OK") {
          const data = results?.[0] || null;
          return data;
        }
        return null;
      }
    );
  };
  const getCountryData = async () => {
    let countryData: google.maps.GeocoderAddressComponent | null = null;

    if (country) {
      const res = await getCodeAddress(country);
      if (res) {
        countryData =
          res.results[0].address_components.find((component) =>
            component.types.includes("country")
          ) || null;
      }
    }
    if (countryData) {
      setCountryCode(countryData.short_name);
    }
  };
  const [statusOfLibrary, setStatusOfLibrary] = useState<
    "SUCCESS" | "FAIL" | "LOADING"
  >("LOADING");

  useEffect(() => {
    const init = async () => {
      try {
        const places = await loader.importLibrary("places");
        const geocoding = await loader.importLibrary("geocoding");

        autoCompleteRef.current = new places.AutocompleteService();
        geocoderRef.current = new geocoding.Geocoder();
        if (placesServicesContainerRef.current instanceof HTMLDivElement) {
          placesServicesRef.current = new places.PlacesService(
            placesServicesContainerRef.current
          );
        }
        setRefLoaded(true);

        const address = "1600 Amphitheatre Parkway, Mountain View, CA";

        geocoderRef.current.geocode({ address }, (_, status) => {
          if (status === "OK") {
            setStatusOfLibrary("SUCCESS");
          } else {
            setStatusOfLibrary("FAIL");
          }
        });
      } catch (error) {
        console.log(error, "Error library");
      }
    };
    init();
  }, []);

  useEffect(() => {
    isTyping && getPredictions();
  }, [autoCompleteValue]);

  useEffect(() => {
    if (typeof value === "string") setAutoCompleteValue(value);
  }, [value]);

  useEffect(() => {
    // When the country changes, we need to get the country code and reset the selected value
    getCountryData();
    setSelectedValue(null);
    onValueChange && onValueChange(null);
  }, [country]);

  useEffect(() => {
    getCountryData();
  }, [geocoderRef.current]);

  // When autoSelect prop is passed or changed, we set the value to the input
  useEffect(() => {
    if (autoSelect) {
      setAutoSelectValue(autoSelect);
    }
  }, [autoSelect]);

  // When autoSelectValue is set, get the predictions with the autoSelect value passed to the function
  useEffect(() => {
    if (autoSelectValue && geocoderRef.current && autoCompleteRef.current) {
      getPredictions(autoSelectValue);

      // Reset the autoSelectValue after the predictions are set
      setAutoSelectValue(undefined);
    }
  }, [autoSelectValue, refLoaded]);

  const [inputBlurred, setInputBlurred] = useState(false);
  const [divBlurred, setDivBlurred] = useState(false);

  const handleInputBlur = (
    e:
      | React.FocusEvent<HTMLInputElement, Element>
      | React.FocusEvent<Element, Element>
  ) => {
    setInputBlurred(true);
    if (divBlurred && onBlur) {
      onBlur(e);
    }
  };

  const handleDivBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    setDivBlurred(true);
    if (inputBlurred && onBlur) {
      onBlur(e);
    }
  };

  const handleInputFocus = () => {
    setInputBlurred(false);
  };

  const handleDivFocus = () => {
    setDivBlurred(false);
  };

  useEffect(() => {
    getStatus && getStatus(statusOfLibrary);
  }, [statusOfLibrary]);

  return (
    <div
      className={`${isBymaTheme ? "byma" : ""} ${autoCompleteStyle} ${className ? className : ""}`}
    >
      <div ref={placesServicesContainerRef}></div>
      <Input
        theme={theme}
        type="text"
        autoComplete={autoComplete}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={autoCompleteValue}
        isLoading={statusOfLibrary === "LOADING"}
        isReadOnly={statusOfLibrary === "LOADING"}
        onBlur={(e) => {
          setIsTyping(false);
          handleInputBlur(e);
          setTimeout(() => {
            setPredictions([]);
          }, 500);
        }}
        onFocus={(e) => {
          setIsTyping(true);
          if ((e.target as HTMLInputElement).value) {
            getPredictions();
          }
          handleInputFocus();
        }}
        {...inputProps}
      />
      {predictions.length > 0 ? (
        <div className={autoCompleteOptions} data-cy="autoCompleteOptions">
          {predictions.map((prediction, index) => {
            const className = index === currentFocus ? active : "";
            const mainText = prediction.structured_formatting.main_text;
            const secondaryText =
              prediction.structured_formatting.secondary_text;

            return (
              <p
                className={className}
                key={prediction.place_id}
                onClick={() => handleAutocompleteSelect(prediction)}
                onMouseOver={() => setCurrentFocus(index)}
              >
                <img src={isBymaTheme ? LocationPinByma : LocationPin} />
                <span>
                  {
                    // highlight text that matches the input
                    mainText
                      .split(new RegExp(`(${autoCompleteValue})`, "gi"))
                      .map((part, i) =>
                        part.toLowerCase() ===
                        autoCompleteValue.toLowerCase() ? (
                          <b key={i}>{part}</b>
                        ) : (
                          part
                        )
                      )
                  }
                </span>
                <span>{secondaryText}</span>
              </p>
            );
          })}
        </div>
      ) : (
        isTyping &&
        autoCompleteValue.length > 2 &&
        !selectedValue &&
        statusOfLibrary === "SUCCESS" && (
          <div
            className={autoCompleteOptions}
            onBlur={handleDivBlur}
            onFocus={handleDivFocus}
          >
            <p>No encontramos resultados.</p>
          </div>
        )
      )}
    </div>
  );
};

export default InputAddress;

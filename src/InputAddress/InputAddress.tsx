import {
  ChangeEvent,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import Input from "../Input/Input";
import { InputProps } from "../Input/types";
import { InputAddressProps } from "./types";
import styles from "./InputAddress.module.scss";
import "google.maps";

const { autoCompleteOptions, active, autoComplete } = styles;

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
    onValueChange,
    onBlur,
  } = props;

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
  const inputRef = useRef<HTMLInputElement>(null);
  const [autoCompleteValue, setAutoCompleteValue] = useState("");
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [selectedValue, setSelectedValue] = useState<string | null>("");
  const [currentFocus, setCurrentFocus] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [countryCode, setCountryCode] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> & {
      nativeEvent: { inputType: string };
    }
  ) => {
    const currentValue = e.target.value.replace(/[./\\-]/g, "");
    if (selectedValue) {
      const newValue = currentValue.replace(selectedValue, "").trim();
      setAutoCompleteValue(newValue);
      setSelectedValue(null);
      onValueChange && onValueChange(null);
      return;
    }
    setAutoCompleteValue(currentValue);
    if (currentValue !== value) onValueChange && onValueChange(null);
  };

  const handleAutocompleteSelect = (
    prediction: google.maps.places.AutocompletePrediction
  ) => {
    const text = prediction.structured_formatting.main_text;
    setAutoCompleteValue(text);
    setSelectedValue(text);
    onValueChange && onValueChange(prediction);
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

  const getPredictions = () => {
    if (autoCompleteValue && autoCompleteValue !== selectedValue) {
      autoCompleteRef.current?.getPlacePredictions(
        {
          input: autoCompleteValue,
          language: "es",
          componentRestrictions: { country: countryCode },
          types: ["address"],
          offset: 3,
        },
        (predictions, status) => {
          if (status === "OK" && predictions) {
            setPredictions(predictions);
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

  useEffect(() => {
    if (inputRef.current)
      autoCompleteRef.current = new google.maps.places.AutocompleteService();
    geocoderRef.current = new google.maps.Geocoder();
  }, [inputRef.current]);

  useEffect(() => {
    isTyping && getPredictions();
  }, [autoCompleteValue]);

  useEffect(() => {
    if (value) setAutoCompleteValue(value);
  }, [value]);

  useEffect(() => {
    const getData = async () => {
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
    getData();
  }, [country]);

  return (
    <div className={autoComplete}>
      <Input
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={autoCompleteValue}
        ref={inputRef}
        onBlur={(e) => {
          setIsTyping(false);
          onBlur && onBlur(e);
          setTimeout(() => {
            setPredictions([]);
          }, 500);
        }}
        onFocus={(e) => {
          setIsTyping(true);
          if ((e.target as HTMLInputElement).value) {
            getPredictions();
          }
        }}
        {...inputProps}
      />
      {predictions.length > 0 ? (
        <div className={autoCompleteOptions} data-cy="autoCompleteOptions">
          {predictions.map((prediction, index) => {
            const className = index === currentFocus ? active : "";
            const text = prediction.structured_formatting.main_text;
            return (
              <p
                className={className}
                key={prediction.place_id}
                onClick={() => handleAutocompleteSelect(prediction)}
                onMouseOver={() => setCurrentFocus(index)}
              >
                {
                  // highlight text that matches the input
                  text
                    .split(new RegExp(`(${autoCompleteValue})`, "gi"))
                    .map((part, i) =>
                      part.toLowerCase() === autoCompleteValue.toLowerCase() ? (
                        <b key={i}>{part}</b>
                      ) : (
                        part
                      )
                    )
                }
              </p>
            );
          })}
        </div>
      ) : (
        isTyping &&
        autoCompleteValue.length > 2 &&
        !selectedValue && (
          <div className={autoCompleteOptions}>
            <p>No encontramos resultados.</p>
          </div>
        )
      )}
    </div>
  );
};

export default InputAddress;

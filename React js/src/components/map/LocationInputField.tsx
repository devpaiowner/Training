import React, { Fragment, useState, useCallback } from "react";
import {
  LoadScript,
  Autocomplete,
} from "@react-google-maps/api";
import { Config } from "../../config/Config";

interface LocationInputFieldProps {
  label?: string;
  value?: string;
  error?: string;
  placeholder?: any;
  onSuccess: (data: any) => void;
  onChange?: (data: any) => void;
}

const LocationInputField = ({
  label,
  value,
  error,
  placeholder,
  onSuccess,
  onChange
}: LocationInputFieldProps) => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | undefined>();
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const onLoad = useCallback((autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  }, []);

  const onPlaceChanged = () => {
    if (autocomplete && autocomplete.getPlace()) {
      const place = autocomplete.getPlace();
      const addressComponents = place.address_components;
      let city = "";
      let state = "";
      let country = "";

      addressComponents?.forEach((component) => {
        if (component.types.includes("locality")) {
          city = component.long_name;
        }
        if (component.types.includes("administrative_area_level_1")) {
          state = component.long_name;
        }
        if (component.types.includes("country")) {
          country = component.long_name;
        }
      });

      const formattedAddress = place.formatted_address;
      const latitudeLongitude = {
        lat: place.geometry?.location?.lat(),
        lng: place.geometry?.location?.lng(),
      };
      if (latitudeLongitude.lat && latitudeLongitude.lng) {
        onSuccess({ city, state, country, latitudeLongitude, formattedAddress });
      }
    }
  };

  return (
    <Fragment>
      <LoadScript googleMapsApiKey={Config?.GOOGLE_MAP_API_KEY} libraries={["places"]} onLoad={() => setScriptLoaded(true)}>

        <Autocomplete
        
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
        >
          <>
            <input
              className="f-input f-pass-input"
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={onChange}
            />
            {/* <p className="input-error">{error}</p> */}
          </>
        </Autocomplete>
      </LoadScript>
    </Fragment>
  );
};

export default LocationInputField;

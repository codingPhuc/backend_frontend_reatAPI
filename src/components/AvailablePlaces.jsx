import { useState } from "react";
import Places from "./Places.jsx";
import { useEffect } from "react";
import Error from "./Error.jsx";
export default function AvailablePlaces({ onSelectPlace }) {
  // we cannot used async await here
  // const respone  = await fetch('https://localhost:3000/places')   ;
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    async function fetchPlaces(params) {
      setIsFetching(true);

      try {
        const respone = await fetch("http://localhost:3000/placess");
        const resData = await respone.json();
        if (!respone.ok) {
          throw new Error("Failed to fetch places");
        }
        navigator.geolocation.getCurrentPosition((position) => {
          setAvailablePlaces(resData.places); 
          
        });
      } catch (error) {
        setError({
          message:
            error.message ||
            "Could  not fetch places , please try again latter",
        });
      }
      setIsFetching(false);
    }
    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An error  occurred!" message={error.message}></Error>;
  }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}

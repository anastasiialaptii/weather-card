import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { CityLocation, getLocation } from "../services/location-service";
import { CityWeather, getWeather } from "../services/weather-service";
import "./search-bar.css";
import { WeatherCard } from "./weather-card";

type SearchBarProps = {
  placeHolder: string;
};

function SearchBar({ placeHolder }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<CityLocation[]>([]);
  const [cityWeather, setCityWeather] = useState<CityWeather>();
  const [myWeatherList, setMyWeatherList] = useState<CityWeather[]>([]);

  const addToMyObservation = (observable: CityWeather) => {
    setMyWeatherList((weatherList) => {
      console.log("Current list:", weatherList);
      console.log("Trying to add:", observable);

      if (weatherList.find((item) => item.id === observable.id)) {
        console.log("Duplicate found, not adding.");
        return weatherList;
      }

      console.log("Adding new item.");
      return [...weatherList, observable];
    });
  };

  const searchForWeather = async () => {
    setCityWeather(undefined);

    if (!searchTerm) return;

    const data = await getLocation(searchTerm);

    setSearchResults(data);
  };

  const selectCity = async (item: CityLocation) => {
    const data = await getWeather({ lat: item.latitude, lon: item.longitude });

    setCityWeather(data);
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={placeHolder}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={searchForWeather}>
          Search
        </Button>
      </div>

      <div style={{ marginBottom: 16 }}>
        {searchResults.map((item, _) => (
          <Chip
            key={item.id}
            label={item.name}
            onClick={() => selectCity(item)}
            clickable
            color="primary"
            style={{ marginRight: 8, marginBottom: 8 }}
          />
        ))}
      </div>

      {cityWeather ? (
        <Card variant="outlined" style={{ marginBottom: 16 }}>
          <WeatherCard cityWeather={cityWeather} />
          <Fab
            size="medium"
            color="secondary"
            aria-label="add"
            onClick={() => addToMyObservation(cityWeather)}
          >
            <AddIcon />
          </Fab>
        </Card>
      ) : (
        <Typography
          variant="body2"
          color="textSecondary"
          style={{ marginBottom: 16 }}
        >
          No weather data yet. Try searching for a city and click on it.
        </Typography>
      )}

      <div className="myWeatherCardsList">
        <div style={{ marginBottom: 16 }}>
          <Typography color="textSecondary" style={{ fontWeight: "bold" }}>
            My observatory:
          </Typography>
          {myWeatherList.map((cityWeather, _) => (
            <Card
              variant="outlined"
              style={{ marginBottom: 16 }}
              key={cityWeather.id}
            >
              <WeatherCard cityWeather={cityWeather} key={cityWeather.id} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;

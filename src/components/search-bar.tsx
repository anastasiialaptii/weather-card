import AddIcon from '@mui/icons-material/Add';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Fab from '@mui/material/Fab';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { CityLocation, getLocation } from "../api/location";
import { CityWeather, getWeather } from "../api/weather";
import { kelvinToCelsius } from "../utils/kelvinToCelcius";
import "./search-bar.css";

interface SearchBarProps {
  placeHolder: string;
}

function SearchBar({ placeHolder }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<CityLocation[]>([]);
  const [cityWeather, setCityWeather] = useState<CityWeather>();
  const [myWeatherList, setMyWeatherList] = useState<CityWeather[]>([]);

  const handleAddToMyObservation = (item: CityWeather) => {
    myWeatherList.push(item);

    setMyWeatherList(myWeatherList);
  }

  const handleSearch = async () => {
    setCityWeather(undefined);

    if (!searchTerm) return;

    const data = await getLocation(searchTerm);

    setSearchResults(data);
  };

  const handleSelect = async (item: CityLocation) => {
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
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>

      <div style={{ marginBottom: 16 }}>
        {searchResults.map((item, index) => (
          <Chip
            key={index}
            label={item.name}
            onClick={() => handleSelect(item)}
            clickable
            color="primary"
            style={{ marginRight: 8, marginBottom: 8 }}
          />
        ))}
      </div>

      {cityWeather ? (
        <Card variant="outlined" style={{ marginBottom: 16 }}>
          <CardContent>
            <Typography color="textSecondary">
              {cityWeather.description}
            </Typography>
            <Typography variant="body1">
              {kelvinToCelsius(cityWeather.temp)} °C
            </Typography>
            <Fab size="medium" color="secondary" aria-label="add" onClick={() => handleAddToMyObservation(cityWeather)}>
            <AddIcon />
            </Fab>
          </CardContent>
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
        {myWeatherList.map((item, index) => (
        <Card variant="outlined" style={{ marginBottom: 16 }}>
          <CardContent>
            <Typography color="textSecondary">
              {item.description}
            </Typography>
            <Typography variant="body1">
              {kelvinToCelsius(item.temp)} °C
            </Typography>
          </CardContent>
          </Card>
        ))}
      </div>
      </div>
    </div>
  );
}

export default SearchBar;

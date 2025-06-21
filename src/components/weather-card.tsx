import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CityWeather } from "../services/weather-service";
import { kelvinToCelsius } from "../utils/kelvinToCelcius";

type WeatherCardProps = {
  cityWeather: CityWeather;
};

export function WeatherCard({ cityWeather }: WeatherCardProps) {
  return (
    <CardContent
    style={{
    backgroundColor:
      cityWeather.humidity > 80
        ? '#f5380f'
        : cityWeather.humidity > 55
        ? '#e9f81f'
        : '#5fdeac', 
  }}>
      <Typography variant="body1">{cityWeather.city}</Typography>
      <Typography color="textSecondary">
        {cityWeather.main} / {cityWeather.description}
      </Typography>
      <Typography color="textSecondary">
        Humidity: {cityWeather.humidity} %
      </Typography>
      <Typography variant="body1">
        {kelvinToCelsius(cityWeather.temp)} °C
      </Typography>
      <Typography variant="body1">
        Feels like {kelvinToCelsius(cityWeather.feels_like)} °C
      </Typography>
    </CardContent>
  );
}

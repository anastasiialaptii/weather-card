import { getWeather as weatherApi } from "../api/weather";

interface Coordinates {
  lat: number;
  lon: number;
}

export interface CityWeather {
  id: number;
  main: string;
  description: string;
  feels_like: number;
  temp: number;
  humidity: number;
  city: string;
}

export async function getWeather(
  coordinates: Coordinates,
  apiKey?: string,
): Promise<CityWeather> {
  const { lat, lon } = coordinates;

  apiKey = apiKey || process.env.REACT_APP_OPEN_WEATHER_API;

  try {
    const response = await weatherApi(lat, lon, apiKey);

    if (!response.ok) throw new Error("Error");

    const { weather, main, name } = await response.json();

    const cityWeather: CityWeather = {
      id: weather[0].id,
      description: weather[0].description,
      main: weather[0].main,
      temp: main.temp,
      humidity: main.humidity,
      feels_like: main.feels_like,
      city: name
    };

    return cityWeather;
  } catch (error) {
    console.log("Imaginable log:", error);

    throw new Error("re-throwing");
  }
}

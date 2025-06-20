export interface CityWeather {
  id: number;
  main: string;
  description: string;
  feels_like: number;
  temp: number;
  humidity: number;
}

interface Coordinates {
  lat: number;
  lon: number;
}

export async function getWeather(
  coordinates: Coordinates,
  apiKey?: string,
): Promise<CityWeather> {
  const { lat, lon } = coordinates;

  apiKey = apiKey || process.env.REACT_APP_OPEN_WEATHER_API;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`,
    );

    if (!response.ok) throw new Error("Error");

    const { weather, main } = await response.json();

    const cityWeather: CityWeather = {
      id: weather[0].id,
      description: weather[0].description,
      main: weather[0].main,
      temp: main.temp,
      humidity: main.humidity,
      feels_like: main.feels_like,
    };

    return cityWeather;
  } catch (error) {
    console.log("Imaginable log:", error);

    throw new Error("re-throwing");
  }
}

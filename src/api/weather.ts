export async function getWeather(
  lat: number,
  lon: number,
  apiKey?: string,
): Promise<Response> {

 return await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`,
    );
}

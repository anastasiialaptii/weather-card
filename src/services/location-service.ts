import { getLocation as locationApi } from "../api/location";

export type CityLocation = {
  id: number;
  wikiDataId: string;
  type: string;
  name: string;
  country: string;
  countryCode?: string;
  region: string;
  regionCode?: number;
  latitude: number;
  longitude: number;
};

export async function getLocation(
  searchTerm: string,
  apiKey?: string,
): Promise<CityLocation[]> {
  apiKey = apiKey || process.env.REACT_APP_RAPID_API;

  try {
    // we could've changed `limit` param but I don't have it on my current basic plan
    // and there's a chance to not find a city you're looking for
    // Example: Rome
    const response = await locationApi(searchTerm, apiKey);

    if (!response.ok) throw new Error("Error");

    const { data } = await response.json();

    const location: CityLocation[] = data;

    return location;
  } catch (error) {
    console.log("Imaginable log:", error);

    return [];
  }
}

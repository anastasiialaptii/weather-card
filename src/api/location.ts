export async function getLocation(
  searchTerm: string,
  apiKey?: string,
): Promise<Response> {
  return await fetch(
    `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${searchTerm}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": `${apiKey}`,
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
      },
    },
  );
}

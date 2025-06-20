interface Location {
    id: number,
    wikiDataId: string,
    type: string,
    name: string,
    country: string,
    countryCode?: string,
    region: string,
    regionCode?: number,
    latitude: number,
    longtitude: number
}


export const getLocation = async (searchTerm: string, apiKey: string): Promise<Location[]> => {
    try {
        const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${searchTerm}`, {
            method: 'GET',
            headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
            }
        });

        if(!response.ok) throw new Error('Error');

        const location: Location[] = await response.json();

        return location;
    }
    catch(error) {
        console.log('Imaginable log:', error);

        return [];
    }
}



interface Weather {
    id: number,
    main: string,
    description: string,
    icon: string
}

interface Coordinates {
    lat: number,
    lon: number
}

export const getWeather = async (coordinates: Coordinates, apiKey: string) => {
    const { lat, lon } = coordinates;

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);

        if(!response.ok) throw new Error('Error');

        const weather: Weather = await response.json();

        console.log('weather', weather);

        return weather;
    }
    catch(error) {
        console.log('Imaginable log:', error);

        return [];
    }
}

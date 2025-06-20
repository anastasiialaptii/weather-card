import { useState } from "react";
import { CityLocation, getLocation } from "../api/location";
import { CityWeather, getWeather } from "../api/weather";
import { kelvinToCelsius } from "../utils/kelvinToCelcius";

interface SearchBarProps {
    placeHolder: string,
}

function SearchBar({ placeHolder }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<CityLocation[]>([]);
    const [cityWeather, setCityWeather] = useState<CityWeather>();

    const handleSearch = async () => {
        if(!searchTerm) return;

        const data = await getLocation(searchTerm);

        setSearchResults(data);
    }

    const handleSelect = async (item: CityLocation) => {
        const data = await getWeather({lat: item.latitude, lon: item.longitude});

        console.log(data);

       setCityWeather(data);
    }

    return (
        <div className="search">
            <div className = "searchInputs">
                <input 
                    type='text' 
                    placeholder={placeHolder}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                <div className="searchIcon">
                    need to find an icon
                </div>
                <div>
                    <button onClick={handleSearch}>Search</button>
                </div>
                <div className="searchResults">
                    {searchResults.map((item, index) => (
                        <div 
                            className="searchItem" 
                            key={index} 
                            onClick={() => handleSelect(item)}>
                            {item.name}
                        </div>
                    ))}
                </div>
                {cityWeather && (
                <div className="weatherCard">
                    {cityWeather.description}
                    {kelvinToCelsius(cityWeather.temp)}
                </div>
                )}
                <div className="myWeatherCardsList">
                    {/* TBD */}
                </div>
            </div>
        </div>
    )
}

export default SearchBar;
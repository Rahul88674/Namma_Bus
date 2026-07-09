import { useState, useEffect, useRef } from 'react';

const CityAutocomplete = ({ value, onChange, placeholder, cities }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  const filteredCities =
    value.trim() === ''
      ? []
      : cities.filter((city) => city.toLowerCase().startsWith(value.toLowerCase())).slice(0, 6);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (city) => {
    onChange(city);
    setShowSuggestions(false);
  };

  return (
    <div className="relative flex-1" ref={wrapperRef}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        className="border rounded px-3 py-2 w-full"
        autoComplete="off"
        required
      />
      {showSuggestions && filteredCities.length > 0 && (
        <ul className="absolute z-10 bg-white border rounded shadow-md mt-1 w-full max-h-48 overflow-y-auto">
          {filteredCities.map((city) => (
            <li
              key={city}
              onClick={() => handleSelect(city)}
              className="px-3 py-2 text-sm hover:bg-orange-50 cursor-pointer"
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CityAutocomplete;
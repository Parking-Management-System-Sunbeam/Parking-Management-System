
import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchComponent = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // send to parent for live search
  };

  return (
    <div className="relative max-w-lg w-full mx-auto">
      <div className="relative">
        <input
          id="search"
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search by location name or pincode"
          className="w-full py-2 px-4 border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 bg-gray-50"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
          <Search size={18} />
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;

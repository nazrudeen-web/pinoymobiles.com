import { useState, useMemo } from "react";

export function usePhoneFilters(phones) {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedOS, setSelectedOS] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState("popularity");

  const filteredPhones = useMemo(() => {
    let result = [...phones];

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }
    if (selectedOS.length > 0) {
      result = result.filter((p) => selectedOS.includes(p.os));
    }
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [
    phones,
    selectedBrands,
    selectedCategories,
    selectedOS,
    priceRange,
    sortBy,
  ]);

  const toggleFilter = (type, value) => {
    const setters = {
      brand: setSelectedBrands,
      category: setSelectedCategories,
      os: setSelectedOS,
    };
    const current = {
      brand: selectedBrands,
      category: selectedCategories,
      os: selectedOS,
    };

    if (current[type].includes(value)) {
      setters[type](current[type].filter((v) => v !== value));
    } else {
      setters[type]([...current[type], value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedOS([]);
    setPriceRange([0, 100000]);
  };

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedCategories.length > 0 ||
    selectedOS.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 100000;

  return {
    selectedBrands,
    selectedCategories,
    selectedOS,
    priceRange,
    sortBy,
    filteredPhones,
    toggleFilter,
    clearAllFilters,
    hasActiveFilters,
    setPriceRange,
    setSortBy,
  };
}

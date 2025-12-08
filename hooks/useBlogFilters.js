import { useMemo, useState } from "react";
import { blogs } from "@/lib/data/blogs";

export function useBlogFilters() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = useMemo(() => {
    let result = blogs.filter((b) => !b.featured);

    if (selectedCategory !== "All") {
      result = result.filter((b) => b.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(query) ||
          b.excerpt.toLowerCase().includes(query)
      );
    }

    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "oldest") {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    return result;
  }, [selectedCategory, sortBy, searchQuery]);

  return {
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    filteredBlogs,
  };
}

import React, { useState, useEffect } from "react";
import { Search, X, Filter, CircleChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useSWR from "swr";

// API base
const API_BASE = "https://myapi-playground-backend.onrender.com/api";

// SWR fetcher
const fetcher = (url) => axios.get(`${API_BASE}${url}`).then((res) => res.data);

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("all");
  const [searchResults, setSearchResults] = useState([]);

  const [topSkills, setTopSkills] = useState([]);
  const [projectsBySkill, setProjectsBySkill] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();

  // 🔹 SWR hook for searching profiles/projects
  const { data, error, isLoading } = useSWR(
    searchQuery ? `/search?q=${searchQuery}` : null,
    fetcher
  );

  console.log(data)
  // Update results when SWR data changes
  useEffect(() => {
    if (data?.data) {
      if (searchFilter === "projects") {
        setSearchResults(data.data.projects || []);
      } else {
        // Combine all types for "all"
        setSearchResults([
          ...(data.data.skills || []),
          ...(data.data.projects || []),
          ...(data.data.work || []),
        ]);
      }
    } else {
      setSearchResults([]);
    }
  }, [data, searchFilter]);

  // 🔹 Top Skills API
  const fetchTopSkills = async () => {
    try {
      const res = await axios.get(`${API_BASE}/skills/top`);
      setTopSkills(res.data.data || res.data || []);
    } catch (error) {
      console.error("Top Skills API Error:", error);
    }
  };

  // 🔹 Projects by Skill API
  const fetchProjectsBySkill = async (skill) => {
    try {
      const res = await axios.get(`${API_BASE}/projects?skill=${skill}`);
      setProjectsBySkill(res.data.data || res.data || []);
    } catch (error) {
      console.error("Projects by Skill API Error:", error);
    }
  };

  // 🔹 Highlight matches
  const highlightText = (text, query) => {
    if (!query || typeof text !== "string") return text;
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-200 text-black font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back button */}
      <div
        className="back-box"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          cursor: "pointer",
          position: "absolute",
          left: "2rem",
          top: "2rem",
          color: "white",
        }}
      >
        <div onClick={() => navigate("/")}>
          <CircleChevronLeft />
        </div>
      </div>

      {/* Header */}
      <div className="bg-black text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Search Profiles & Projects
          </h1>
          <p className="text-gray-300 text-lg">
            Find developers by skills, projects, or work experience
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="flex items-center space-x-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all text-lg"
                  placeholder="Search by skill, project, or work..."
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Filters + Count */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
            >
              <Filter size={16} />
              <span>Filters</span>
            </button>

            {searchResults.length > 0 && (
              <div className="text-gray-600">
                Found {searchResults.length} result
                {searchResults.length !== 1 ? "s" : ""}
              </div>
            )}
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
              <span className="text-sm font-medium text-gray-700">
                Search in:
              </span>
              <label className="ml-4">
                <input
                  type="radio"
                  name="filter"
                  value="all"
                  checked={searchFilter === "all"}
                  onChange={(e) => setSearchFilter(e.target.value)}
                />
                All
              </label>
              <label className="ml-4">
                <input
                  type="radio"
                  name="filter"
                  value="projects"
                  checked={searchFilter === "projects"}
                  onChange={(e) => setSearchFilter(e.target.value)}
                />
                Projects Only
              </label>
            </div>
          )}
        </div>

        {/* Loading & Error */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-gray-600">Searching...</p>
          </div>
        )}
        {error && (
          <div className="text-center py-12 text-red-500">
            Error fetching search results.
          </div>
        )}

        {/* Results */}
        {!isLoading && !error && searchResults.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <Search className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No results found
            </h3>
            <p className="text-gray-500">
              Try different keywords or check your spelling
            </p>
          </div>
        )}

        {!isLoading && searchResults.length > 0 && (
          <div className="space-y-6">
            {searchResults.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-bold text-black">
                  {highlightText(item.title || item, searchQuery)}
                </h3>
                {item.description && (
                  <p className="text-gray-600">
                    {highlightText(item.description, searchQuery)}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 🔹 Top Skills Section */}
        <div className="mt-12">
          <button
            onClick={fetchTopSkills}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Show Top 3 Skills
          </button>

          {topSkills.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Top Skills</h3>
              <div className="flex gap-3 mt-3">
                {topSkills.map((skill, i) => (
                  <button
                    key={i}
                    onClick={() => fetchProjectsBySkill(skill)}
                    className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 🔹 Projects by Selected Skill */}
        {projectsBySkill.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold">Projects for Skill</h3>
            <div className="space-y-4 mt-3">
              {projectsBySkill.map((proj, i) => (
                <div
                  key={i}
                  className="bg-gray-50 border border-gray-200 p-4 rounded-lg"
                >
                  <h4 className="font-bold">{proj.title}</h4>
                  <p className="text-gray-600 text-sm">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;

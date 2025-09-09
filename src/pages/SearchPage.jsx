import React, { useState } from "react";
import {
  Search,
  User,
  Code,
  Briefcase,
  Github,
  Linkedin,
  Globe,
  Filter,
  X,
  CircleChevronLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("all");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - replace with actual API calls
  const mockProfiles = [
    {
      _id: "1",
      name: "John Doe",
      email: "john@example.com",
      education: "Computer Science, MIT",
      skills: ["React", "Node.js", "MongoDB", "JavaScript"],
      projects: [
        {
          title: "E-commerce Platform",
          description: "Full-stack e-commerce solution with React and Node.js",
          link: [
            "https://github.com/john/ecommerce",
            "https://ecommerce-demo.com",
          ],
        },
      ],
      work: ["Software Engineer at Google", "Frontend Developer at Startup"],
      links: {
        github: "https://github.com/johndoe",
        linkedin: "https://linkedin.com/in/johndoe",
        portfolio: "https://johndoe.dev",
      },
    },
    {
      _id: "2",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      education: "Software Engineering, Stanford",
      skills: ["Python", "Django", "PostgreSQL", "React"],
      projects: [
        {
          title: "Task Management App",
          description:
            "Django-based task management system with real-time updates",
          link: ["https://github.com/sarah/taskapp"],
        },
        {
          title: "Data Visualization Tool",
          description:
            "Python tool for creating interactive data visualizations",
          link: [
            "https://github.com/sarah/dataviz",
            "https://dataviz-tool.com",
          ],
        },
      ],
      work: ["Data Scientist at Facebook", "Backend Developer at Amazon"],
      links: {
        github: "https://github.com/sarahw",
        linkedin: "https://linkedin.com/in/sarahwilson",
        portfolio: "https://sarahwilson.dev",
      },
    },
  ];

  const navigate = useNavigate();
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);

    setTimeout(() => {
      const filteredResults = mockProfiles.filter((profile) => {
        const query = searchQuery.toLowerCase();

        // Search by name
        if (profile.name.toLowerCase().includes(query)) return true;

        // Search by skills
        if (profile.skills.some((skill) => skill.toLowerCase().includes(query)))
          return true;

        // Search by project names
        if (
          profile.projects.some(
            (project) =>
              project.title.toLowerCase().includes(query) ||
              project.description.toLowerCase().includes(query)
          )
        )
          return true;

        return false;
      });

      setSearchResults(filteredResults);
      setIsSearching(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200 text-black font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="min-h-screen bg-white">
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
          color:"white"
        }}
      >
        <div onClick={() => navigate("/")}>
          <CircleChevronLeft />
        </div>
      </div>
      <div className="bg-black text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Search Profiles & Projects
          </h1>
          <p className="text-gray-300 text-lg">
            Find developers by skills, projects, or names
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
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={20}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all text-lg"
                  placeholder="Search by name, skills, or project name..."
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
              <button
                onClick={handleSearch}
                disabled={!searchQuery.trim() || isSearching}
                className="bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                {isSearching ? "Searching..." : "Search"}
              </button>
            </div>
          </div>

          {/* Filter Options */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
              >
                <Filter size={16} />
                <span>Filters</span>
              </button>
            </div>

            {searchResults.length > 0 && (
              <div className="text-gray-600">
                Found {searchResults.length} result
                {searchResults.length !== 1 ? "s" : ""}
              </div>
            )}
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center space-x-6">
                <span className="text-sm font-medium text-gray-700">
                  Search in:
                </span>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="filter"
                    value="all"
                    checked={searchFilter === "all"}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="text-black focus:ring-black"
                  />
                  <span className="text-sm text-gray-700">All</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="filter"
                    value="profiles"
                    checked={searchFilter === "profiles"}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="text-black focus:ring-black"
                  />
                  <span className="text-sm text-gray-700">Profiles Only</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="filter"
                    value="projects"
                    checked={searchFilter === "projects"}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="text-black focus:ring-black"
                  />
                  <span className="text-sm text-gray-700">Projects Only</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Search Results */}
        {isSearching && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-gray-600">Searching...</p>
          </div>
        )}

        {!isSearching && searchResults.length === 0 && searchQuery && (
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

        {!isSearching && searchResults.length > 0 && (
          <div className="space-y-6">
            {searchResults.map((profile) => (
              <div
                key={profile._id}
                className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Profile Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {profile.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-black">
                        {highlightText(profile.name, searchQuery)}
                      </h3>
                      <p className="text-gray-600">{profile.email}</p>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center space-x-3">
                    {profile.links.github && (
                      <a
                        href={profile.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-black transition-colors"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {profile.links.linkedin && (
                      <a
                        href={profile.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-black transition-colors"
                      >
                        <Linkedin size={20} />
                      </a>
                    )}
                    {profile.links.portfolio && (
                      <a
                        href={profile.links.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-black transition-colors"
                      >
                        <Globe size={20} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Education */}
                {profile.education && (
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Briefcase size={16} className="text-gray-500" />
                      <span className="font-medium text-gray-700">
                        Education
                      </span>
                    </div>
                    <p className="text-gray-600 ml-6">{profile.education}</p>
                  </div>
                )}

                {/* Skills */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Code size={16} className="text-gray-500" />
                    <span className="font-medium text-gray-700">Skills</span>
                  </div>
                  <div className="flex flex-wrap gap-2 ml-6">
                    {profile.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                      >
                        {highlightText(skill, searchQuery)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                {profile.projects.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <User size={16} className="text-gray-500" />
                      <span className="font-medium text-gray-700">
                        Projects
                      </span>
                    </div>
                    <div className="ml-6 space-y-3">
                      {profile.projects.map((project, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-black mb-2">
                            {highlightText(project.title, searchQuery)}
                          </h4>
                          <p className="text-gray-600 mb-3 text-sm">
                            {highlightText(project.description, searchQuery)}
                          </p>
                          {project.link.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {project.link.map((link, linkIndex) => (
                                <a
                                  key={linkIndex}
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-black hover:text-gray-600 transition-colors text-sm underline"
                                >
                                  View Project {linkIndex + 1}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Work Experience */}
                {profile.work.length > 0 && (
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Briefcase size={16} className="text-gray-500" />
                      <span className="font-medium text-gray-700">
                        Work Experience
                      </span>
                    </div>
                    <div className="ml-6 space-y-2">
                      {profile.work.map((workItem, index) => (
                        <p key={index} className="text-gray-600 text-sm">
                          • {workItem}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Quick Search Suggestions */}
        {!searchQuery && !isSearching && (
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <h3 className="text-lg font-semibold text-black mb-4">
              Popular Searches
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                "React",
                "Node.js",
                "Python",
                "JavaScript",
                "MongoDB",
                "E-commerce",
                "Full-stack",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setSearchQuery(suggestion);
                    setTimeout(() => handleSearch(), 100);
                  }}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 hover:bg-gray-100 transition-colors text-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;

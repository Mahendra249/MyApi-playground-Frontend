import React, { useState } from "react";
import { Search, X, CircleChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { fetchData } from "../api/ClientFunction";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showTopSkills, setShowTopSkills] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const navigate = useNavigate();

  const { data, error, isLoading } = useSWR(
    searchQuery ? `/projects?skill=${searchQuery}` : null,
    fetchData
  );

  const {
    data: topSkillData,
    error: skillError,
    isLoading: skillIsLoading,
  } = useSWR(showTopSkills ? `/skills/top` : null, fetchData);

  const projects = data?.data || [];

  const highlightText = (text, query) => {
    if (!query || typeof text !== "string") return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span
          key={i}
          className="bg-gray-200 text-black font-semibold rounded px-1"
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
    setSearchQuery(skill);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="absolute left-6 top-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 shadow hover:bg-gray-200 transition"
        >
          <CircleChevronLeft size={18} className="text-gray-700" />
          <span className="text-sm font-medium text-gray-700">Back</span>
        </button>
      </div>

      <div className="bg-black text-white py-16 text-center rounded-b-3xl shadow-md">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Search Projects
        </h1>
        <p className="text-gray-400 mt-2">Find work by skills or projects 🚀</p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-gray-50 rounded-2xl shadow p-6 relative border border-gray-200">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedSkill(null);
            }}
            className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black text-lg placeholder-gray-400"
            placeholder="Search by skill..."
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
            >
              <X size={20} />
            </button>
          )}
          <Search className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <div className="mt-8">
          <button
            onClick={() => setShowTopSkills(true)}
            className="bg-black text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-800 transition"
          >
            Show Top Skills
          </button>

          {skillIsLoading && (
            <p className="mt-4 text-gray-600">⏳ Loading top skills...</p>
          )}
          {skillError && (
            <p className="mt-4 text-red-500">Error loading skills</p>
          )}

          {topSkillData?.data?.length > 0 && showTopSkills && (
            <div className="flex gap-3 mt-6 flex-wrap">
              {topSkillData.data.map((skill, i) => (
                <button
                  key={i}
                  onClick={() => handleSkillClick(skill)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition ${
                    selectedSkill === skill
                      ? "bg-black text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10">
          {isLoading && (
            <div className="text-center text-gray-600">
              ⏳ Searching projects...
            </div>
          )}
          {error && (
            <div className="text-center text-red-500">
              Error fetching projects
            </div>
          )}

          {!isLoading && !error && projects.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((proj, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition p-6"
                >
                  <h3 className="text-xl font-bold text-gray-900">
                    {highlightText(proj.title, searchQuery)}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    {highlightText(proj.description, searchQuery)}
                  </p>
                  {proj.link?.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-4">
                      {proj.link.map((lnk, j) => (
                        <a
                          key={j}
                          href={lnk}
                          target="_blank"
                          rel="noreferrer"
                          className="text-black hover:underline text-sm font-medium"
                        >
                          🔗 Link {j + 1}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {!isLoading && !error && searchQuery && projects.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Search className="mx-auto h-12 w-12 mb-4 text-gray-400" />
              <p>
                No projects found for{" "}
                <span className="font-semibold text-black">
                  "{searchQuery}"
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

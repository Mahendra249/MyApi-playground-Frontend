import React, { useState } from "react";
import { User, Search, Code, Check } from "lucide-react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import axios from "axios";
import { fetchData } from "../api/ClientFunction";
import HealthCheckPopup from "../components/HealthCheckPopup";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.get(
        `http://localhost:5000/api/search?q=${searchQuery}`
      );
      setResults(res.data.data);
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Error fetching results.");
    }
    setLoading(false);
  };

  const navigateToProfile = () => {
    navigate("/dashboard");
  };

  const featuredProfiles = [
    {
      name: "Sarah Chen",
      role: "Full Stack Developer",
      skills: ["React", "Node.js", "Python"],
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop&q=60",
    },
    {
      name: "Alex Johnson",
      role: "DevOps Engineer",
      skills: ["AWS", "Docker", "Kubernetes"],
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    },
    {
      name: "Maria Rodriguez",
      role: "Data Scientist",
      skills: ["Python", "TensorFlow", "SQL"],
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    },
  ];

  return (
    <div className="home">
      <nav className="navbar">
        <div className="navbar-logo">
          <div className="logo-box">
            <Code size={20} className="logo-icon" />
          </div>
          <span className="logo-text">TechProfile</span>
        </div>

        <button onClick={navigateToProfile} className="profile-btn">
          <User size={18} />
          My Profile
        </button>
      </nav>

      <div className="hero">
        <div className="hero-card">
          <h1 className="hero-title">Showcase Your Tech Journey</h1>
          <p className="hero-subtitle">
            Create stunning profiles, showcase projects, and connect with
            opportunities. The ultimate platform for tech professionals.
          </p>

          <div className="filter-option">
            <div className="search-box">
              <div className="search-grid">
                <div className="search-input-wrapper">
                  <Search size={18} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search here..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="search-input"
                  />
                </div>
                <button onClick={handleSearch} className="search-btn">
                  Search
                </button>
              </div>
            </div>

            <div className="action-buttons">
              {" "}
              {/* <button onClick={() => navigate("/createProfile")} className="create-btn" > Create Profile </button> */}{" "}
              <button
                onClick={() => navigate("/search")}
                className="browse-btn"
              >
                Browse Projects
              </button>
              <button onClick={() => setIsOpen(true)} className="browse-btn">
                Health Checkup
              </button>
            </div>
          </div>

          <div className=" mt-8">
            {loading && <p className="text-gray-500">Searching...</p>}
            {results && (
              <div className="space-y-6 result-container">
                {results.name && (
                  <div className="result-card">
                    <h2 className="result-title">Name</h2>
                    <p>{results.name}</p>
                  </div>
                )}

                {results.email && (
                  <div className="result-card">
                    <h2 className="result-title">Email</h2>
                    <p>{results.email}</p>
                  </div>
                )}

                {results.education && (
                  <div className="result-card">
                    <h2 className="result-title">Education</h2>
                    <p>{results.education}</p>
                  </div>
                )}

                {results.skills?.length > 0 && (
                  <div className="result-card">
                    <h2 className="result-title">Skills</h2>
                    <ul>
                      {results.skills.map((skill, idx) => (
                        <li key={idx}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {results.projects?.length > 0 && (
                  <div className="result-card">
                    <h2 className="result-title">Projects</h2>
                    {results.projects.map((proj, idx) => (
                      <div
                        key={idx}
                        className="mt-8 border-gray-200 border-2 p-4 "
                      >
                        <p className="font-semibold mb-2">{proj.title}</p>
                        <p className="text-gray-600">{proj.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {results.work?.length > 0 && (
                  <div className="result-card">
                    <h2 className="result-title">Work</h2>
                    <ul>
                      {results.work.map((w, idx) => (
                        <li key={idx}>{w}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
          <div>
            <h3 className="featured-title">Featured Tech Professionals</h3>
            <div className="featured-grid">
              {featuredProfiles.map((profile, index) => (
                <div key={index} className="profile-card">
                  <div className="profile-header">
                    <img
                      src={profile.image}
                      alt={profile.name}
                      className="profile-img"
                    />
                    <div className="profile-info">
                      <h4 className="profile-name">{profile.name}</h4>
                      <p className="profile-role">{profile.role}</p>
                    </div>
                  </div>

                  <div className="profile-skills">
                    {profile.skills.map((skill, i) => (
                      <span key={i} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="stats-grid">
          {[
            { number: "10K+", label: "Profiles" },
            { number: "50K+", label: "Projects" },
            { number: "500+", label: "Companies" },
            { number: "95%", label: "Success Rate" },
          ].map((stat, index) => (
            <div key={index} className="stat">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      <HealthCheckPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default Home;

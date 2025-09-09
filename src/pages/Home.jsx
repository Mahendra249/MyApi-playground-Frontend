import React, { useState } from "react";
import { User, Search, Code } from "lucide-react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("all");
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate("/dashboard");
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log(`Searching for "${searchQuery}" in ${searchType}`);
    }
    navigate("/search");
  };

  const featuredProfiles = [
    {
      name: "Sarah Chen",
      role: "Full Stack Developer",
      skills: ["React", "Node.js", "Python"],
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2lybHN8ZW58MHx8MHx8fDA%3D",
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
      {/* Navigation */}
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

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-card">
          <h1 className="hero-title">Showcase Your Tech Journey</h1>
          <p className="hero-subtitle">
            Create stunning profiles, showcase projects, and connect with
            opportunities. The ultimate platform for tech professionals.
          </p>

          {/* Search Bar */}
          <div className="search-box">
            <div className="search-grid">
              <div className="search-input-wrapper">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search profiles, projects, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="search-input"
                />
              </div>

              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="search-select"
              >
                <option value="all">All</option>
                <option value="profiles">Profiles</option>
                <option value="projects">Projects</option>
                <option value="skills">Skills</option>
              </select>

              <button onClick={handleSearch} className="search-btn">
                Search
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              onClick={() => navigate("/createProfile")}
              className="create-btn"
            >
              Create Profile
            </button>
            <button onClick={() => navigate("/search")} className="browse-btn">
              Browse Profiles
            </button>
          </div>

          {/* Featured Profiles */}
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

        {/* Stats */}
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
    </div>
  );
};

export default Home;

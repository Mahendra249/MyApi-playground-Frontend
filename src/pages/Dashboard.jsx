import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  GraduationCap,
  Briefcase,
  Github,
  Linkedin,
  ExternalLink,
  Edit,
  CircleChevronLeft,
} from "lucide-react";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../api/ClientFunction";
import useSWR from "swr";

const Dashboard = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useSWR("/profile", fetchData);
  console.log(data)
  const [pData, setPData] = useState();
  const [profile, setProfile] = useState(null);
  const [topSkills, setTopSkills] = useState([]);

  useEffect(() => {
    if (data) {
      setPData(data);
      const formattedProfile = {
        name: data?.data?.name,
        email: data?.data?.email,
        education: data?.data?.education,
        workExperience: data?.data?.work || [],
        projects: data?.data?.projects || [],
        links: data?.data?.links || {},
      };

      setProfile(formattedProfile);
      setTopSkills(data?.data?.skills || []);
    }
  }, [data]);

  if (isLoading || !profile) {
    return (
      <div className="dashboard-loader">
        <div className="loader"></div>
      </div>
    );
  }
  const getLinkIcon = (type) => {
    switch (type) {
      case "github":
        return <Github className="icon" />;
      case "linkedin":
        return <Linkedin className="icon" />;
      case "portfolio":
        return <ExternalLink className="icon" />;
      default:
        return <ExternalLink className="icon" />;
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div
          className="back-box"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            cursor: "pointer",
            position: "absolute",
            left: "1rem",
            top: "0.6rem",
          }}
          onClick={() => navigate("/")}
        >
          <CircleChevronLeft />
        </div>

        <div className="card header-card">
          <div className="header-banner"></div>
          <div className="header-content">
            <div className="avatar-box">
              <User className="avatar" />
            </div>
            <div className="header-actions">
              <button
                className="btn edit"
                onClick={() => navigate("/updateProfile")}
              >
                <Edit /> Edit Profile
              </button>
            </div>
          </div>
          <h1>{profile.name}</h1>
          <p className="email">
            <Mail /> {profile.email}
          </p>
        </div>

        <div className="grid">
      
          <div className="left">
      
            <div className="card">
              <h2>
                <GraduationCap /> Education
              </h2>
              <p>{profile.education || "Not added yet"}</p>
            </div>

            {/* Projects */}
            <div className="card">
              <h2>
                <Briefcase /> My Projects
              </h2>
              {profile.projects.length > 0 ? (
                profile.projects.map((project, index) => (
                  <div key={index} className="project">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>

                    {project.link?.length > 0 && (
                      <div className="links">
                        {project.link.map((l, i) => (
                          <a key={i} href={l} target="_blank" rel="noreferrer">
                            {l}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>No projects added yet.</p>
              )}
            </div>

            {/* Work */}
            <div className="card">
              <h2>
                <Briefcase /> Work Experience
              </h2>
              {profile.workExperience.length > 0 ? (
                profile.workExperience.map((job, index) => (
                  <div key={index} className="job">
                    <p className="company">{job}</p>
                  </div>
                ))
              ) : (
                <p>No work experience added yet.</p>
              )}
            </div>
          </div>

          {/* Right */}
          <div className="right">
            {/* Skills */}
            <div className="card">
              <h2>Top Skills</h2>
              {topSkills.length > 0 ? (
                topSkills.map((skill, i) => (
                  <div key={i} className="skill">
                    <div className="skill-header">
                      <span>{skill}</span>
                    </div>
                    <div className="skill-bar">
                      <div style={{ width: "83%" }}></div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No skills added yet.</p>
              )}
            </div>

            {/* Links */}
            <div className="card">
              <h2>Links</h2>
              {Object.keys(profile.links).length > 0 ? (
                Object.entries(profile.links).map(([type, url]) =>
                  url ? (
                    <a
                      key={type}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link"
                    >
                      {getLinkIcon(type)}{" "}
                      <span>{url.replace("https://", "")}</span>
                    </a>
                  ) : null
                )
              ) : (
                <p>No links available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

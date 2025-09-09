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
  Trash2,
  MapPin,
  Calendar,
  CircleChevronLeft,
} from "lucide-react";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [topSkills, setTopSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    const mockProfile = {
      name: "Alex Johnson",
      email: "alex.johnson@email.com",
      education: "Master's in Computer Science, Stanford University",
      workExperience: [
        {
          id: 1,
          company: "Tech Solutions Inc.",
          position: "Senior Software Engineer",
          duration: "2021 - Present",
          location: "San Francisco, CA",
        },
        {
          id: 2,
          company: "Digital Innovations",
          position: "Full Stack Developer",
          duration: "2019 - 2021",
          location: "New York, NY",
        },
      ],
      projects: [
        {
          id: 1,
          title: "E-Commerce Platform",
          description:
            "Developed a scalable online shopping platform with product catalog, cart, payment gateway integration, and admin dashboard.",
          skills: [
            "React.js",
            "Node.js",
            "Express.js",
            "MongoDB",
            "Stripe API",
          ],
        },
        {
          id: 2,
          title: "Authentication System (Authify)",
          description:
            "Built a secure authentication system with JWT, role-based access control, and MongoDB integration.",
          skills: ["Node.js", "Express.js", "MongoDB", "JWT", "React.js"],
        },
        {
          id: 3,
          title: "Portfolio Website",
          description:
            "Personal portfolio showcasing projects, skills, and experience with responsive UI and animations.",
          skills: ["Next.js", "Tailwind CSS", "Framer Motion"],
        },
      ],
      links: {
        github: "https://github.com/alexjohnson",
        linkedin: "https://linkedin.com/in/alexjohnson",
        portfolio: "https://alexjohnson.dev",
      },
    };

    const mockTopSkills = [
      { name: "React", level: 95 },
      { name: "Node.js", level: 88 },
      { name: "TypeScript", level: 85 },
    ];

    setTimeout(() => {
      setProfile(mockProfile);
      setTopSkills(mockTopSkills);
      setEditFormData(mockProfile);
      setLoading(false);
    }, 1000);
  }, []);

  const handleEditProfile = () => {
    setProfile(editFormData);
    setShowEditForm(false);
    alert("Profile updated successfully!");
  };

  const handleDeleteProfile = () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      alert("Profile deleted successfully!");
    }
  };
  const navigate = useNavigate();

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

  if (loading) {
    return (
      <div className="dashboard-loader">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Header */}
        <div
          className="back-box"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            cursor: "pointer",
            position: "absolute",
            left: "1rem",
            top:"0.6rem"
          }}
        >
          <div onClick={() => navigate("/")}>
            <CircleChevronLeft />
          </div>
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
          {/* Left Side */}
          <div className="left">
            {/* Education */}
            <div className="card">
              <h2>
                <GraduationCap /> Education
              </h2>
              <p>{profile.education}</p>
            </div>

            {/* Projects */}
            <div className="card">
              <h2>
                <Briefcase /> My Projects
              </h2>
              {profile.projects.map((project) => (
                <div key={project.id} className="project">
                  <h3>{project.title}</h3>
                  <p className="description">{project.description}</p>
                  <div className="skills">
                    {project.skills.map((skill, i) => (
                      <span key={i} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Work Experience */}
            <div className="card">
              <h2>
                <Briefcase /> Work Experience
              </h2>
              {profile.workExperience.map((job) => (
                <div key={job.id} className="job">
                  <h3>{job.position}</h3>
                  <p className="company">{job.company}</p>
                  <p className="details">
                    <Calendar /> {job.duration} | <MapPin /> {job.location}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="right">
            {/* Top Skills */}
            <div className="card">
              <h2>Top Skills</h2>
              {topSkills.map((skill, i) => (
                <div key={i} className="skill">
                  <div className="skill-header">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Links */}
            <div className="card">
              <h2>Links</h2>
              {Object.entries(profile.links).map(([type, url]) => (
                <a
                  key={type}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  {getLinkIcon(type)} <span>{url.replace("https://", "")}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

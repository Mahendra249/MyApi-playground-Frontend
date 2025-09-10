import React, { useState, useEffect } from "react";
import {
  User,
  Code,
  Briefcase,
  Github,
  Linkedin,
  Globe,
  Plus,
  X,
  CircleChevronLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchData, postData, updateData } from "../api/ClientFunction";
import useSWR from "swr";
import { toast } from "react-toastify";
import "../styles/UpdateProfile.css"; // <-- CSS file

const UpdateProfile = () => {
  const { data:profiledata } = useSWR(`/profile`, fetchData);
  const [isLoading, setIsLoading] = useState(false);
  const [showEditForm, setShowEditForm] = useState(true);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    education: "",
    skills: [""],
    projects: [{ title: "", description: "", link: [""] }],
    work: [""],
    links: { github: "", linkedin: "", portfolio: "" },
  });
  const data = profiledata?.data;

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setEditFormData({
        name: data.name || "",
        email: data.email || "",
        education: data.education || "",
        skills: data.skills?.length ? data.skills : [""],
        projects: data.projects?.length
          ? data.projects
          : [{ title: "", description: "", link: [""] }],
        work: data.work?.length ? data.work : [""],
        links: {
          github: data.links?.github || "",
          linkedin: data.links?.linkedin || "",
          portfolio: data.links?.portfolio || "",
        },
      });
    }
  }, [data]);

  const handleEditProfile = async () => {
    setIsLoading(true);
    const response = await updateData("/updateProfile", editFormData);
    if (response?.success) {
      toast.success(response.message || "Profile Updated");
      navigate("/dashboard");
    } else {
      toast.error(response?.message || "Failed to update profile");
    }
    setIsLoading(false);
  };

  
  const handleSkillChange = (i, v) => {
    const s = [...editFormData.skills];
    s[i] = v;
    setEditFormData({ ...editFormData, skills: s });
  };
  const addSkill = () =>
    setEditFormData({ ...editFormData, skills: [...editFormData.skills, ""] });
  const removeSkill = (i) =>
    setEditFormData({
      ...editFormData,
      skills: editFormData.skills.filter((_, idx) => idx !== i),
    });

  const handleWorkChange = (i, v) => {
    const w = [...editFormData.work];
    w[i] = v;
    setEditFormData({ ...editFormData, work: w });
  };
  const addWork = () =>
    setEditFormData({ ...editFormData, work: [...editFormData.work, ""] });
  const removeWork = (i) =>
    setEditFormData({
      ...editFormData,
      work: editFormData.work.filter((_, idx) => idx !== i),
    });


  const handleProjectChange = (pi, f, v) => {
    const p = [...editFormData.projects];
    p[pi][f] = v;
    setEditFormData({ ...editFormData, projects: p });
  };
  const addProject = () =>
    setEditFormData({
      ...editFormData,
      projects: [
        ...editFormData.projects,
        { title: "", description: "", link: [""] },
      ],
    });

  const removeProject = (i) =>
    setEditFormData({
      ...editFormData,
      projects: editFormData.projects.filter((_, idx) => idx !== i),
    });

  const handleProjectLinkChange = (pi, li, v) => {
    const p = [...editFormData.projects];
    p[pi].link[li] = v;
    setEditFormData({ ...editFormData, projects: p });
  };

  const addProjectLink = (pi) => {
    const p = [...editFormData.projects];
    p[pi].link.push("");
    setEditFormData({ ...editFormData, projects: p });
  };

  const removeProjectLink = (pi, li) => {
    const p = [...editFormData.projects];
    p[pi].link.splice(li, 1);
    setEditFormData({ ...editFormData, projects: p });
  };

  const handleLinksChange = (t, v) => {
    setEditFormData({
      ...editFormData,
      links: { ...editFormData.links, [t]: v },
    });
  };

  if (!showEditForm) return <div>Edit form closed</div>;

  return (
    <div className="updateProfile">
      <div className="updateProfile-header">
        <div className="back-btn" onClick={() => navigate("/dashboard")}>
          <CircleChevronLeft size={22} /> Back
        </div>
        <h2>
          <User size={22} /> Edit Profile
        </h2>
      </div>

      <div className="updateProfile-body">
        <div className="form-grid">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={editFormData.name}
              onChange={(e) =>
                setEditFormData({ ...editFormData, name: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={editFormData.email}
              onChange={(e) =>
                setEditFormData({ ...editFormData, email: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Education</label>
            <input
              type="text"
              value={editFormData.education}
              onChange={(e) =>
                setEditFormData({ ...editFormData, education: e.target.value })
              }
            />
          </div>
        </div>

        {/* Skills */}
        <div className="card">
          <h3>
            <Code size={18} /> Skills
          </h3>
          {editFormData.skills.map((skill, i) => (
            <div key={i} className="inline-input">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(i, e.target.value)}
                placeholder="Enter skill"
              />
              {editFormData.skills.length > 1 && (
                <button onClick={() => removeSkill(i)}>
                  <X size={14} />
                </button>
              )}
            </div>
          ))}
          <button className="add-btn" onClick={addSkill}>
            <Plus size={14} /> Add Skill
          </button>
        </div>

        {/* Projects */}
        <div className="card">
          <h3>
            <Code size={18} /> Projects
          </h3>
          {editFormData.projects.map((p, pi) => (
            <div key={pi} className="nested-card">
              <input
                type="text"
                value={p.title}
                onChange={(e) =>
                  handleProjectChange(pi, "title", e.target.value)
                }
                placeholder="Project title"
              />
              <textarea
                value={p.description}
                onChange={(e) =>
                  handleProjectChange(pi, "description", e.target.value)
                }
                placeholder="Project description"
              />
              {p.link.map((l, li) => (
                <div key={li} className="inline-input">
                  <input
                    type="url"
                    value={l}
                    onChange={(e) =>
                      handleProjectLinkChange(pi, li, e.target.value)
                    }
                    placeholder="Project link"
                  />
                  {p.link.length > 1 && (
                    <button onClick={() => removeProjectLink(pi, li)}>
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
              <button
                className="add-btn small"
                onClick={() => addProjectLink(pi)}
              >
                <Plus size={12} /> Add Link
              </button>
              {editFormData.projects.length > 1 && (
                <button
                  className="remove-btn"
                  onClick={() => removeProject(pi)}
                >
                  <X size={14} /> Remove Project
                </button>
              )}
            </div>
          ))}
          <button className="add-btn" onClick={addProject}>
            <Plus size={14} /> Add Project
          </button>
        </div>

        {/* Work */}
        <div className="card">
          <h3>
            <Briefcase size={18} /> Work Experience
          </h3>
          {editFormData.work.map((w, i) => (
            <div key={i} className="inline-input">
              <input
                type="text"
                value={w}
                onChange={(e) => handleWorkChange(i, e.target.value)}
                placeholder="Work experience"
              />
              {editFormData.work.length > 1 && (
                <button onClick={() => removeWork(i)}>
                  <X size={14} />
                </button>
              )}
            </div>
          ))}
          <button className="add-btn" onClick={addWork}>
            <Plus size={14} /> Add Work
          </button>
        </div>

        {/* Links */}
        <div className="card">
          <h3>Social Links</h3>
          <div className="form-grid">
            <input
              type="url"
              value={editFormData.links.github}
              onChange={(e) => handleLinksChange("github", e.target.value)}
              placeholder="GitHub"
            />
            <input
              type="url"
              value={editFormData.links.linkedin}
              onChange={(e) => handleLinksChange("linkedin", e.target.value)}
              placeholder="LinkedIn"
            />
            <input
              type="url"
              value={editFormData.links.portfolio}
              onChange={(e) => handleLinksChange("portfolio", e.target.value)}
              placeholder="Portfolio"
            />
          </div>
        </div>

        {/* Action */}
        <div className="actions">
          <button className="cancel-btn" onClick={() => setShowEditForm(false)}>
            Cancel
          </button>
          <button
            className="save-btn"
            onClick={handleEditProfile}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;

import React, { useState } from "react";
import {
  User,
  GraduationCap,
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

const UpdateProfile = () => {
  const [showEditForm, setShowEditForm] = useState(true);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    education: "",
    skills: [""],
    projects: [{ title: "", description: "", link: [""] }],
    work: [""],
    links: {
      github: "",
      linkedin: "",
      portfolio: "",
    },
  });
  const navigate = useNavigate();

  const handleEditProfile = () => {
    console.log("Updated Profile Data:", editFormData);
    // Here you would send the data to your backend API
    alert("Profile updated successfully!");
    setShowEditForm(false);
  };

  // Handle skills array changes
  const handleSkillChange = (index, value) => {
    const updatedSkills = editFormData.skills.map((skill, i) =>
      i === index ? value : skill
    );
    setEditFormData({ ...editFormData, skills: updatedSkills });
  };

  const addSkill = () => {
    setEditFormData({
      ...editFormData,
      skills: [...editFormData.skills, ""],
    });
  };

  const removeSkill = (index) => {
    const updatedSkills = editFormData.skills.filter((_, i) => i !== index);
    setEditFormData({ ...editFormData, skills: updatedSkills });
  };

  // Handle work array changes
  const handleWorkChange = (index, value) => {
    const updatedWork = editFormData.work.map((workItem, i) =>
      i === index ? value : workItem
    );
    setEditFormData({ ...editFormData, work: updatedWork });
  };

  const addWork = () => {
    setEditFormData({
      ...editFormData,
      work: [...editFormData.work, ""],
    });
  };

  const removeWork = (index) => {
    const updatedWork = editFormData.work.filter((_, i) => i !== index);
    setEditFormData({ ...editFormData, work: updatedWork });
  };

  // Handle project changes
  const handleProjectChange = (projectIndex, field, value) => {
    const updatedProjects = editFormData.projects.map((project, i) =>
      i === projectIndex ? { ...project, [field]: value } : project
    );
    setEditFormData({ ...editFormData, projects: updatedProjects });
  };

  const handleProjectLinkChange = (projectIndex, linkIndex, value) => {
    const updatedProjects = editFormData.projects.map((project, i) =>
      i === projectIndex
        ? {
            ...project,
            link: project.link.map((link, j) =>
              j === linkIndex ? value : link
            ),
          }
        : project
    );
    setEditFormData({ ...editFormData, projects: updatedProjects });
  };

  const addProject = () => {
    setEditFormData({
      ...editFormData,
      projects: [
        ...editFormData.projects,
        { title: "", description: "", link: [""] },
      ],
    });
  };

  const removeProject = (index) => {
    const updatedProjects = editFormData.projects.filter((_, i) => i !== index);
    setEditFormData({ ...editFormData, projects: updatedProjects });
  };

  const addProjectLink = (projectIndex) => {
    const updatedProjects = editFormData.projects.map((project, i) =>
      i === projectIndex ? { ...project, link: [...project.link, ""] } : project
    );
    setEditFormData({ ...editFormData, projects: updatedProjects });
  };

  const removeProjectLink = (projectIndex, linkIndex) => {
    const updatedProjects = editFormData.projects.map((project, i) =>
      i === projectIndex
        ? { ...project, link: project.link.filter((_, j) => j !== linkIndex) }
        : project
    );
    setEditFormData({ ...editFormData, projects: updatedProjects });
  };

  // Handle social links changes
  const handleLinksChange = (linkType, value) => {
    setEditFormData({
      ...editFormData,
      links: { ...editFormData.links, [linkType]: value },
    });
  };

  if (!showEditForm) {
    return <div>Edit form is closed</div>;
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
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
        >
          <div onClick={() => navigate("/dashboard")}>
            <CircleChevronLeft />
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-black text-white p-6">
            <h2 className="text-2xl font-bold flex items-center">
              <User className="mr-3" size={24} />
              Edit Profile
            </h2>
          </div>

          <div className="p-8 space-y-8">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={editFormData.name || ""}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={editFormData.email || ""}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Education
                </label>
                <input
                  type="text"
                  value={editFormData.education || ""}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      education: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  placeholder="Your educational background"
                />
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
                <Code className="mr-2" size={20} />
                Skills
              </h3>
              <div className="space-y-3">
                {editFormData.skills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => handleSkillChange(index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      placeholder="Enter a skill"
                    />
                    {editFormData.skills.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSkill}
                  className="flex items-center text-black hover:text-gray-700 transition-colors text-sm"
                >
                  <Plus size={16} className="mr-1" />
                  Add Skill
                </button>
              </div>
            </div>

            {/* Projects Section */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
                <Code className="mr-2" size={20} />
                Projects
              </h3>
              <div className="space-y-6">
                {editFormData.projects.map((project, projectIndex) => (
                  <div
                    key={projectIndex}
                    className="bg-gray-50 p-4 rounded-lg border"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium text-gray-800">
                        Project {projectIndex + 1}
                      </h4>
                      {editFormData.projects.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeProject(projectIndex)}
                          className="text-gray-500 hover:text-red-600 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>

                    <div className="space-y-3">
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) =>
                          handleProjectChange(
                            projectIndex,
                            "title",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                        placeholder="Project title"
                      />

                      <textarea
                        value={project.description}
                        onChange={(e) =>
                          handleProjectChange(
                            projectIndex,
                            "description",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                        rows={2}
                        placeholder="Project description"
                      />

                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Project Links
                        </label>
                        {project.link.map((link, linkIndex) => (
                          <div
                            key={linkIndex}
                            className="flex items-center space-x-2 mb-2"
                          >
                            <input
                              type="url"
                              value={link}
                              onChange={(e) =>
                                handleProjectLinkChange(
                                  projectIndex,
                                  linkIndex,
                                  e.target.value
                                )
                              }
                              className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                              placeholder="Project link URL"
                            />
                            {project.link.length > 1 && (
                              <button
                                type="button"
                                onClick={() =>
                                  removeProjectLink(projectIndex, linkIndex)
                                }
                                className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                              >
                                <X size={12} />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addProjectLink(projectIndex)}
                          className="flex items-center text-xs text-black hover:text-gray-700 transition-colors"
                        >
                          <Plus size={12} className="mr-1" />
                          Add Link
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addProject}
                  className="flex items-center text-black hover:text-gray-700 transition-colors"
                >
                  <Plus size={16} className="mr-1" />
                  Add Project
                </button>
              </div>
            </div>

            {/* Work Experience Section */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
                <Briefcase className="mr-2" size={20} />
                Work Experience
              </h3>
              <div className="space-y-3">
                {editFormData.work.map((workItem, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={workItem}
                      onChange={(e) => handleWorkChange(index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      placeholder="Work experience"
                    />
                    {editFormData.work.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeWork(index)}
                        className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addWork}
                  className="flex items-center text-black hover:text-gray-700 transition-colors text-sm"
                >
                  <Plus size={16} className="mr-1" />
                  Add Work Experience
                </button>
              </div>
            </div>

            {/* Social Links Section */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-black mb-4">
                Social Links
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Github size={16} className="mr-2" />
                    GitHub
                  </label>
                  <input
                    type="url"
                    value={editFormData.links.github || ""}
                    onChange={(e) =>
                      handleLinksChange("github", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="GitHub profile URL"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Linkedin size={16} className="mr-2" />
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    value={editFormData.links.linkedin || ""}
                    onChange={(e) =>
                      handleLinksChange("linkedin", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="LinkedIn profile URL"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Globe size={16} className="mr-2" />
                    Portfolio
                  </label>
                  <input
                    type="url"
                    value={editFormData.links.portfolio || ""}
                    onChange={(e) =>
                      handleLinksChange("portfolio", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="Portfolio website URL"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setShowEditForm(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                onClick={handleEditProfile}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;

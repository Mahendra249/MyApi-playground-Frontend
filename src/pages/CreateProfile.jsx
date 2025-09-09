import React, { useState } from "react";
import {
  User,
  Mail,
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

const CreateProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleProjectChange = (projectIndex, field, value) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((project, i) =>
        i === projectIndex ? { ...project, [field]: value } : project
      ),
    }));
  };

  const handleProjectLinkChange = (projectIndex, linkIndex, value) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((project, i) =>
        i === projectIndex
          ? {
              ...project,
              link: project.link.map((link, j) =>
                j === linkIndex ? value : link
              ),
            }
          : project
      ),
    }));
  };

  const handleLinksChange = (linkType, value) => {
    setFormData((prev) => ({
      ...prev,
      links: {
        ...prev.links,
        [linkType]: value,
      },
    }));
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, { title: "", description: "", link: [""] }],
    }));
  };

  const removeProject = (index) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const addProjectLink = (projectIndex) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((project, i) =>
        i === projectIndex
          ? { ...project, link: [...project.link, ""] }
          : project
      ),
    }));
  };

  const removeProjectLink = (projectIndex, linkIndex) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((project, i) =>
        i === projectIndex
          ? { ...project, link: project.link.filter((_, j) => j !== linkIndex) }
          : project
      ),
    }));
  };

  const handleSubmit = () => {
    console.log("Profile Data:", formData);
    alert("Profile created successfully!");
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div
        className="back-box"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          cursor: "pointer",
        }}
      >
        <div onClick={()=>navigate("/")}>
          <CircleChevronLeft />
        </div>
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">
            Create Your Profile
          </h1>
          <p className="text-gray-600 text-lg">
            Build your professional presence
          </p>
        </div>

        <div className="space-y-8">
          {/* Basic Information */}
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-black mb-6 flex items-center">
              <User className="mr-3 text-gray-700" size={24} />
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
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
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-black mb-6 flex items-center">
              <GraduationCap className="mr-3 text-gray-700" size={24} />
              Education
            </h2>

            <textarea
              value={formData.education}
              onChange={(e) => handleInputChange("education", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              rows={3}
              placeholder="Your educational background..."
            />
          </div>

          {/* Skills */}
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-black mb-6 flex items-center">
              <Code className="mr-3 text-gray-700" size={24} />
              Skills
            </h2>

            <div className="space-y-3">
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) =>
                      handleArrayChange("skills", index, e.target.value)
                    }
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="Enter a skill"
                  />
                  {formData.skills.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem("skills", index)}
                      className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={() => addArrayItem("skills")}
                className="flex items-center text-black hover:text-gray-700 transition-colors"
              >
                <Plus size={20} className="mr-2" />
                Add Skill
              </button>
            </div>
          </div>

          {/* Projects */}
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-black mb-6 flex items-center">
              <Code className="mr-3 text-gray-700" size={24} />
              Projects
            </h2>

            <div className="space-y-6">
              {formData.projects.map((project, projectIndex) => (
                <div
                  key={projectIndex}
                  className="bg-white p-6 rounded-lg border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium text-black">
                      Project {projectIndex + 1}
                    </h3>
                    {formData.projects.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProject(projectIndex)}
                        className="text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      rows={3}
                      placeholder="Project description"
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Links
                      </label>
                      {project.link.map((link, linkIndex) => (
                        <div
                          key={linkIndex}
                          className="flex items-center space-x-3 mb-2"
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
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                            placeholder="Project link URL"
                          />
                          {project.link.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                removeProjectLink(projectIndex, linkIndex)
                              }
                              className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                            >
                              <X size={16} />
                            </button>
                          )}
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => addProjectLink(projectIndex)}
                        className="flex items-center text-sm text-black hover:text-gray-700 transition-colors mt-2"
                      >
                        <Plus size={16} className="mr-1" />
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
                <Plus size={20} className="mr-2" />
                Add Project
              </button>
            </div>
          </div>

          {/* Work Experience */}
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-black mb-6 flex items-center">
              <Briefcase className="mr-3 text-gray-700" size={24} />
              Work Experience
            </h2>

            <div className="space-y-3">
              {formData.work.map((workItem, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={workItem}
                    onChange={(e) =>
                      handleArrayChange("work", index, e.target.value)
                    }
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="Work experience"
                  />
                  {formData.work.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem("work", index)}
                      className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={() => addArrayItem("work")}
                className="flex items-center text-black hover:text-gray-700 transition-colors"
              >
                <Plus size={20} className="mr-2" />
                Add Work Experience
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-black mb-6">
              Social Links
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Github size={16} className="mr-2" />
                  GitHub
                </label>
                <input
                  type="url"
                  value={formData.links.github}
                  onChange={(e) => handleLinksChange("github", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
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
                  value={formData.links.linkedin}
                  onChange={(e) =>
                    handleLinksChange("linkedin", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
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
                  value={formData.links.portfolio}
                  onChange={(e) =>
                    handleLinksChange("portfolio", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  placeholder="Portfolio website URL"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-8">
            <button
              onClick={handleSubmit}
              className="bg-black text-white px-12 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Create Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;

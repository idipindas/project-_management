const projectHelper = require("../../helpers/project/project.helper");
const userModel = require("../../models/user.model");

const {
  createProjectHelper,
  deleteProjectHelper,
  singleProjectHelper,
  updateProjectHelper,
  getAllprojectHelper,
  
} = projectHelper();

const projectController = () => {
  const createProject = async (req, res) => {
    const { name, status, userId, members } = req.body;
    try {
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const projectData = {
        name,
        status,
        userId,
        members,
      };

      const project = await createProjectHelper(projectData);

      res.status(201).json(project);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const getAllProjects = async (req, res) => {
    try {
      const projects = await getAllprojectHelper();
      res.status(200).json(projects);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const getProjectById = async (req, res) => {
    const projectId = req.params.id;
    try {
      const project = await singleProjectHelper(projectId);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.status(200).json(project);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const updateProject = async (req, res) => {
    const projectId = req.params.id;
    const { name, status, userId, members } = req.body;
    try {
      const updatedProject = await updateProjectHelper(projectId, {
        name,
        status,
        userId,
        members,
      });
      res.status(200).json(updatedProject);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const deleteProject = async (req, res) => {
    const projectId = req.params.id;
    try {
      const deletedProject = await deleteProjectHelper(projectId);
      if (!deletedProject) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.status(200).json({ message: "Project deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  return {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
  };
};

module.exports = projectController;

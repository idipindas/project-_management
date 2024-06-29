const projectModel = require("../../models/project.model");

const projectHelper = () => {
  const createProjectHelper = async (data) => {
    try {
      const project = await projectModel.create(data);
      return project;
    } catch (error) {
      throw error;
    }
  };
  const updateProjectHelper = async (id, data) => {
    try {
      const project = await projectModel.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true } // This option returns the updated document
      );
      console.log(id, data, project);

      const resp = await projectModel.findById(id);
      return resp;
    } catch (error) {
      throw error;
    }
  };

  const singleProjectHelper = async (id) => {
    try {
      const project = await projectModel.findById(id);
      return project;
    } catch (error) {
      throw error;
    }
  };
  const getAllprojectHelper = async () => {
    try {
      const projects = await projectModel.find();
      return projects;
    } catch (error) {
      throw error;
    }
  };

  const deleteProjectHelper = async (id) => {
    try {
      const project = await projectModel.findByIdAndDelete(id);
      return project;
    } catch (error) {
      throw error;
    }
  };

  return {
    createProjectHelper,
    singleProjectHelper,
    updateProjectHelper,
    deleteProjectHelper,
    getAllprojectHelper,
  };
};
module.exports = projectHelper;

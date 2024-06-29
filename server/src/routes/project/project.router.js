const express = require("express");
const projectController = require("../../controllers/project/project.controller");
const authMiddleware = require("../../middleware/authMiddleware");

const router = express.Router();

const {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} = projectController();

router.use(authMiddleware)
router.post("/", createProject);
router.get("/", getAllProjects);
router.get("/:id", getProjectById);

router.patch("/:id", updateProject);
router.delete("/:id", deleteProject);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getTaskCategories,
  postCreateTaskCatogory,
} = require("../controllers/taskCategory.controllers");

router.get("/:workspaceId/get", getTaskCategories);
router.post("/:workspaceId/create", postCreateTaskCatogory);

module.exports = router;

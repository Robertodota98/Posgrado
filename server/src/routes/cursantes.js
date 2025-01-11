const express = require("express");
const router = express.Router();
const {
  getCursante,
  getCursanteById,
  createCursante,
  updateCursante,
  deleteCursante
} = require("../controllers/cursantes");

// Protected routes with role-based authorization
router.get("/", getCursante);
router.get("/:id", getCursanteById);
router.post("/", createCursante);
router.put("/:id", updateCursante);
router.delete("/:id", deleteCursante);

module.exports = router;

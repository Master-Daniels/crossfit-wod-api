const express = require("express");

const memberController = require("../../controllers/memberController");

const router = express.Router();

router.get("/", memberController.getAllMembers);
router.get("/:memberId", memberController.getMember);

router.post("/", memberController.createMember);
router.patch("/:memberId", memberController.updateMember);
router.delete("/:memberId", memberController.deleteMember);

module.exports = router;

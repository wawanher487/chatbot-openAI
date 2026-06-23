const express = require("express");
const router = express.Router();
const { index, sendMessage } = require("../controllers/chatController");

router.get("/", index);
router.post("/chat", sendMessage);

module.exports = router;

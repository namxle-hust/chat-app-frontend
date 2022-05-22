const router = require("express").Router();
const Message = require("../models/Message");

// get all messages (for testing on postman only)
router.get("/getAll", async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages)
  } catch (err) {
    res.status(500).json(err);
  }
});

//add

router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

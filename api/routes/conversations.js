const router = require("express").Router();
const Conversation = require("../models/Conversation");

// get all conversations (for testing on postman only)
router.get("/getAll", async (req, res) => {

  try {
    const conversations = await Conversation.find();
    console.log(conversations);
    res.status(200).json(conversations)
  } catch (err) {
    res.status(500).json(err);
  }
});


//new conversation

router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conversations of a user to display all conversations on the left side bar

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conversation includes two userId so client can display the messages on main chat screen

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;

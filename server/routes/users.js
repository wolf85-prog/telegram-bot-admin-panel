const {UserBot} = require("../models/models");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//get a user
router.get("/", async (req, res) => {
    const chatId = req.query.chatId;
    const username = req.query.username;
    try {
      const user = chatId
        ? await UserBot.findById(chatId)
        : await UserBot.findOne({ username: username });
      //const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
});

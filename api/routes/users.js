const express = require("express");
const { generateToken } = require("../auth/tokens");
const { validateAuth } = require("../middlewares/validateAuht");
const User = require("../model");
const router = express.Router();

router.post("/register", (req, res) => {
  User.create(req.body).then((user) => {
    res.send(user).status(201);
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ where: { email } }).then((user) => {
    if (!user) return res.sendStatus(401);
    user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);

      const payload = {
        name: user.name,
        email: user.email,
      };

      const token = generateToken(payload);

      res.cookie("token", token);
      res.send(payload);
    });
  });
});

router.get("/me", validateAuth, (req, res) => {
  res.send(req.user);
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");

  res.sendStatus(204);
});

module.exports = router;


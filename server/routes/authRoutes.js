import express from "express";
import User from "../models/User.js";
import jsonwebtoken from "jsonwebtoken";

const accessTokenSecret = "somerandomaccesstoken";
const refreshTokenSecret = "somerandomrefreshtoken";
const refreshTokens = [];

const router = express.Router();

// Endpoint for login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(200)
        .json("User does not exist, please create an account");
    }

    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        console.log(err);
        const message = "Passwords did not match";
        return res.json(message);
      }

      if (isMatch) {
        const accessToken = jsonwebtoken.sign(
          {
            username: user.username,
            id: user._id,
            email: user.email,
            password: user.password,
            balance: user.balance,
          }, // token
          accessTokenSecret, // secret used to sign the token
          { expiresIn: "24h" } // token details
        );

        const refreshToken = jsonwebtoken.sign(
          {
            username: user.username,
            id: user._id,
            email: user.email,
            password: user.password,
            balance: user.balance,
          }, // token
          refreshTokenSecret
        );

        const decodedUser = jsonwebtoken.verify(accessToken, accessTokenSecret);
        refreshTokens.push(refreshToken);
        const message = `${user.username} successfully logged in`;
        res.json({
          accessToken,
          refreshToken,
          decodedUser,
          message,
        });
      }
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

// Middleware to authenticate requests
const authenticate = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authorization.split("Bearer ")[1];

  // Verify the access token
  jsonwebtoken.verify(token, accessTokenSecret, (err, decoded) => {
    if (err) {
      // Access token verification failed
      return res
        .status(401)
        .json({ message: "Access token expired or invalid" });
    }

    // Access token is valid
    req.user = decoded;
    next();
  });
};

// Endpoint for deposit
router.post("/deposit", authenticate, async (req, res) => {
  const { amount } = req.body;
  const { user } = req;

  try {
    // Find the user email and update the balance
    const updatedUser = await User.findOneAndUpdate(
      { email: user.email },
      { $inc: { balance: amount } },
      { new: true },
      { readPreference: 'primary' }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ balance: updatedUser.balance });
  } catch (error) {
    console.error("Error depositing funds:", error);
    res.status(500).json({ message: "Error depositing funds" });
  }
});

// Endpoint for withdrawal
router.post("/withdraw", authenticate, async (req, res) => {
  const { amount } = req.body;
  const { user } = req;

  try {
    // Find the user by email
    const foundUser = await User.findOne({ email: user.email });

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has sufficient balance
    if (foundUser.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Update the user's balance
    foundUser.balance -= amount;

    // Save the updated user to the database
    const updatedUser = await foundUser.save();

    res.json({ balance: updatedUser.balance });
  } catch (error) {
    console.error("Error withdrawing funds:", error);
    res.status(500).json({ message: "Error withdrawing funds" });
  }
});

// Endpoint for logout to remove the refreshtoken from the list of valid tokens
router.post("/logout", authenticate, (req, res) => {
  // Check if user is authenticated
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  // Access the authenticated user from the request object
  const user = req.user;

  // Access the refresh token from the request body
  const { refreshToken } = req.body;

  // Remove the refresh token from the list of valid tokens
  const index = refreshTokens.indexOf(refreshToken);
  if (index !== -1) {
    refreshTokens.splice(index, 1);
  }

  // Send a response indicating successful logout
  res.status(200).json({ message: "Logout successful" });
});

// Endpoint for retrieving current user's balance
router.get("/balance", authenticate, (req, res) => {
  const { username, email, balance } = req.user;
  console.log(req.user);
  res.json({ username: username, email: email, balance: balance });
});

export default router;

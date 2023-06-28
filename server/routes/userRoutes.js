import express from 'express';
import User from '../models/User.js';

const router = express.Router();

//create acount
router.post('/createaccount', (req, res) => {
  const { username, email, password, balance } = req.body;
  // Save User to our Mongo DB
  User.findOne({ username: username })
    .then((existingUser) => {
      if (existingUser) {
        res.status(500).send('User Already Exists');
      } else {
        User.create({
          username: username,
          email: email,
          password: password,
          balance: balance
        })
          .then(() => {
            res.send('User successfully created. Please login');
          })
          .catch((userError) => {
            console.log(userError);
            res.status(500).send('User was not successfully created. Please try again.');
          });
      }
    })
    .catch((error) => {
      console.error('Error finding user:', error);
      res.status(500).send('Error creating user');
    });
});


// logout
// app.post('/logout', (req, res) => {
//     // Assuming the token is sent in the request headers as 'Authorization'
//     const token = req.headers.authorization;
  
//     // Check if the token exists
//     if (!token) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }
  
//     try {
//       // Remove the token from the client 
//       localStorage.removeItem('accessToken');
//       localStorage.removeItem('refreshToken');
  
//       // Return a success response
//       res.json({ message: 'Logout successful' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Server error' });
//     }
//   });

export default router;
import admin   from 'firebase-admin';
import express from 'express';
import  User   from '../models/User.js';
import bcrypt from 'bcrypt';

// Initialize Firebase Admin SDK
const serviceAccount = {
  "type": "service_account",
  "project_id": "authentication-f945c",
  "private_key_id": "5ab19473039375df2c08f8094fdc40766282e342",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDfjYtLnMuZFsZN\nINPDiVQh9+glRNTaR5+wT+y4flRGausiXvI5CtqDGzoLdr3MHQ+bF0wEmyPydesO\nky0JtDZzVj/jb69m5rGl9WBa8dSaSRITaAbM4YT5/M/x+4Vb4y4scrFh6xhdS3GE\nHZ/Ur3hWHMADI8+RVu+zw3eNCqFhvM5wDwdYCudRfX3fuf8Q5pzYCycOkXjFH7Th\nMCiB1NeVRhdF+q+nb5EpfPCEl3j3vRGLgzqFwCo7jVrf7u66/tFxQyUNUL7rFt+F\n3YAHuuTir/CM4Ljuk8vyTHKEJGLqIMPsXYNiA9CkDs6M7pszJ9AEhIC8whnii3Hq\nQqT02kC7AgMBAAECggEAV6SY91Bl+8NThDp5+z+URer4zt+w6VDKOOfkwSH57U+O\nlr+NjDKGn37ln0fyuhqsmxujmGywR6bWPDUUI6lM7aPjUUnghOGtxQgxugX0WXaL\nSSNwAxPpO87TQaXfzzn+SLvAckimmTDyNJ8eodYXQf9sge6gunTQbfQUoy2HPpb4\n68cS3HZdHGbRg/uZ9QbohHdWEZ9xpVB2vHDieFnp4DFaXOSRVrUo5Doxz5scdTgx\nLbNtEtWbLfQ71NBShr7mNSfx+b/PmqjzWl2CMbcdysIWIvtRk2BtA0oHIXewbxsO\n1ygRWhKrUp4oVYrjNZzHmMZ/RbQvU7eBeWTjjuOgZQKBgQDxkalJXPfXTrnvy2Um\n7aVavLQLaJEoQjtcyUq5Mv4G3xmOnoGYwXPefwyDScMo5xePqJ/9yrw5icewxOaq\nqTk1JyPRFTNOuzNBlH3zRdPuK4aideG1CdshJWtnA2r9J54IbLozhOVlyC1H0qha\nI1LOuPPwRd0/F9rIIn6YQ7IodQKBgQDs6FxwkCrstkn1vieuCkmWXYUf5LJ2Dnxs\nVJQRX6nxII2ajSZb+nLOkKR8dMiQpVZCAXMxlq+wEyhFf2EWjMxfDDO2VT857jak\nwoLCuRx33rkbGvjaJiHnaCRAEiUXFEg3d/oR7G7D107QByV9xSZheS1bLpkzXoWW\nr6KkXskebwKBgEpvWbxzWyMK7RxIjhiarZLyBoBlbiT7k5MZq165qbCwWg2qJcDO\nC0gJ2e8ycWJPIuFvUi0/pRQNsmxzn6gCkNAiCVVJtQ+Te02/1bd6Ur1WyBuTO0Mv\nkEf8YcXSNctfw8BQ0GdDkfP05I73CE0OCVwNfY0R2gSw8wcsKdn9Mg5pAoGAUBHA\nnHK9bz+1A49/Tb1AXcfB5KOhBXGj7+EuIikZANwlv+SQ4GlnQBV24nF+EBUxcCGZ\nU1tAidwPsl147OwtbrprB+cL9YJjiZAMLc/upTzrhxO4o9JbhyCVj+oSCxjZx5WP\nOVuVnC86/ehMbZOigzM3dyfqs4fw0psN90vp4ZUCgYAnj5b2yuyDgBrYYh7qS+Nj\nLn0o3cMPaGMhZt/Ip3YzzXO292Z6RV8H2nOGoS9qstFQdvNX7J2JbBfToopTixdl\n7CI0TLM9g2LD35i0gKG0RjjnGk1/nRViGRBmas49/MDpb/Qji9qVPPoU9TCj5mP3\nDV+trGCeu7/VHkutfWTmBA==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-5cnvg@authentication-f945c.iam.gserviceaccount.com",
  "client_id": "104770703230712917046",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5cnvg%40authentication-f945c.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const router = express.Router();

// router.post('/login', (req, res) => {
//   const { email, password } = req.body;

//   admin
//     .auth()
//     .getUserByEmail(email)
//     .then((userCredential) => {
//       // User authentication succeeded
//       const user = userCredential.user;

//       // Find the user in the MongoDB database
//       User.findOne({ email: user.email })
//         .then((dbUser) => {
//           if (!dbUser) {
//             return res.status(401).json({ message: 'User not found' });
//           }

//           // Respond with the user details or any other required data
//           res.json({ message: 'Login successful', user: dbUser });
//         })
//         .catch((error) => {
//           console.error('Error finding user:', error);
//           res.status(500).json({ message: 'Error finding user' });
//         });
//     })
//     .catch((error) => {
//       console.error('Error logging in:', error);
//       res.status(401).json({ message: 'Invalid credentials' });
//     });
// });


  // Protected route that requires authentication
// router.get('/login', authenticate, (req, res) => {
//     res.json({ message: 'Authentication succeeded!' });
//   });
  

//   // Logout route
// router.post('/logout', (req, res) => {
//     const { token } = req.body;
  
//     // Revoke the Firebase ID token
//     admin
//       .auth()
//       .revokeRefreshTokens(token)
//       .then(() => {
//         // Respond with a success message
//         res.json({ message: 'Logout successful' });
//       })
//       .catch((error) => {
//         console.error('Error revoking Firebase ID token:', error);
//         res.status(500).json({ message: 'Logout failed' });
//       });
//   });


//Log in route using email & password or Firebase google sign-in method
router.post('/login', async (req, res) => {
  const { email, password, useFirebase } = req.body;

  try {
    let user;

    if (useFirebase) {
      // Authenticate using Firebase
      const firebaseUser = await admin.auth().getUserByEmail(email);
      
      if (!firebaseUser) {
        return res.status(401).json({ message: 'User not found' });
      }
      // Set the user object with the Firebase email
      user = { email: firebaseUser.email };

      // Create a new instance of the User model using the retrieved user data
      const newUser = new User(user);
      // Save the user to the MongoDB database
      await newUser.save();
    } else {
      // Authenticate using email/password from the Mongoose database
      user = await User.findOne({ email }).exec();
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }
    }

    // Login successful
    const idToken = await admin.auth().createCustomToken(email);
    res.status(200).json({ message: 'Login successful', user, idToken});
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

// Middleware to authenticate requests
const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authorization.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email } = decodedToken;

    // Find the user in the MongoDB database
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // User authenticated successfully
    req.user = user;
    next();
  } catch (error) {
    console.error('Error verifying Firebase ID token:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

  // Endpoint for deposit
  router.post('/deposit', authenticate, (req, res) => {
    const { amount } = req.body;
    const { user } = req;
  
    // Perform deposit logic and update user balance
    user.balance += amount;
  
    // Save the updated user balance to the MongoDB database
    user.save((err, updatedUser) => {
      if (err) {
        return res.status(500).json({ message: 'Error updating balance' });
      }
      res.json({ balance: updatedUser.balance });
    });
  });
  
  // Endpoint for withdrawal
router.post('/withdraw', authenticate, (req, res) => {
    const { amount } = req.body;
    const { user } = req;
  
    if (user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }
  
    // Perform withdrawal logic and update user balance
    user.balance -= amount;
  
    // Save the updated user balance to the MongoDB database
    user.save((err, updatedUser) => {
      if (err) {
        return res.status(500).json({ message: 'Error updating balance' });
      }
      res.json({ balance: updatedUser.balance });
    });
  });

  // Endpoint for retrieving user balance
   router.get('/balance', authenticate, (req, res) => {
    const { balance } = req.user;
    res.json({ balance });
});

export default router;
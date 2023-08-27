require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const http = require('http');
const User = require('./model/user.model');
const accountController = require('./controllers/accountController');
const path = require('path');

// Create Express app
const app = express();

// Enable Cross-Origin Resource Sharing
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static('dist'));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL || 'mongodb+srv://CanTek:CanTek123@cantekcluster.uujud7m.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Set up session middleware
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport local strategy for authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: 'Incorrect email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect email or password' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).lean().exec();
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// User registration endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Validation checks
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Please fill in all the required fields' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email, username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password and create a new user
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// User login endpoint
app.post('/api/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Login successful' });
});

// User logout endpoint
app.get('/api/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.json({ status: 'ok', message: 'Logout successful' });
});

// Check user authentication status endpoint
app.get('/api/checkAuth', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ status: 'ok', message: 'User is authenticated' });
  } else {
    return res.json({ status: 'error', message: 'User is not authenticated' });
  }
});

// Default route
app.get('/authenticated', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('Hello, user is authenticated!');
  } else {
    res.send('Hello, user is not authenticated!');
  }
});

// Serve static files from the built React app
app.use(express.static(path.join(__dirname, '../dist')));

// Handle any request that doesn't go to our api routes
app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, '../FrontEnd/dist/index.html'));
});

// // Route for handling all other requests
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../FrontEnd/dist/index.html'));
// });

// Start the server and listen on the specified port
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

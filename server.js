

const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'voteee'
});

db.connect(err => {
  if (err) {
    console.log('Database connection failed:', err.message);
    process.exit(1); // Exit if DB connection fails
  }
  console.log('MySQL connected...');
});

// Session configuration
app.use(session({
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

const JWT_SECRET = 'your_jwt_secret_key';

// User Signup
app.post('/signup', async (req, res, next) => {
  const { cnic, email, password } = req.body;

  try {
    db.query('SELECT * FROM users WHERE cnic = ?', [cnic], async (err, results) => {
      if (err) {
        console.log('Database error during signup.');
        return next({ message: 'Database error occurred.' });
      }

      if (results.length > 0) {
        console.log('Signup attempt: CNIC already registered.');
        return next({ message: 'CNIC is already registered.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      db.query('INSERT INTO users (cnic, email, password_hash) VALUES (?, ?, ?)', [cnic, email, hashedPassword], (err) => {
        if (err) {
          console.log('Error inserting user into the database.');
          return next({ message: 'Failed to register user.' });
        }

        console.log('User registered successfully.');
        res.json({ message: 'User registered successfully.' });
      });
    });
  } catch (err) {
    console.log('Unexpected error during signup.');
    next({ message: 'An unexpected error occurred.' });
  }
});

// User Login
app.post('/login', (req, res, next) => {
  const { cnic, password } = req.body;
  db.query('SELECT * FROM users WHERE cnic = ?', [cnic], async (err, results) => {
    if (err) {
      console.log('Error checking user login credentials.');
      return next({ message: 'Database error occurred.' });
    }
    if (results.length === 0) {
      console.log('Login attempt: CNIC not registered.');
      return next({ message: 'CNIC not registered.' });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      console.log('Invalid login attempt: Incorrect password.');
      return next({ message: 'Invalid password.' });
    }

    req.session.role = user.role;
    const token = jwt.sign({ userId: user.id, cnic: user.cnic }, JWT_SECRET);
    console.log('User logged in successfully.');
    res.json({ token, role: user.role });
  });
});

// Middleware to verify JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    console.log('Authentication failed: No token provided.');
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Authentication failed: Invalid token.');
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

// Party Registration with Image Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

app.post('/parties', upload.single('image'), (req, res, next) => {
  const { name } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

  db.query('INSERT INTO parties (name, image_path) VALUES (?, ?)', [name, imagePath], (err) => {
    if (err) {
      console.log('Error registering party.');
      return next({ message: 'Failed to register party.' });
    }

    console.log('Party registered successfully.');
    res.json({ message: 'Party registered successfully!' });
  });
});

// Fetch All Registered Parties
app.get('/parties', (req, res, next) => {
  db.query('SELECT * FROM parties', (err, results) => {
    if (err) {
      console.log('Failed to fetch parties.');
      return next({ message: 'Unable to fetch parties at this time.' });
    }

    console.log('Fetched all registered parties.');
    res.json(results); // Send the result
  });
});






app.post('/vote', authenticateJWT, (req, res) => {
  const { userId } = req.user; // Extract user ID from JWT
  const { candidate } = req.body; // Candidate selected by the user

  if (!candidate) {
      return res.status(400).json({ error: 'Candidate selection is required' });
  }

  // Check if the user has already voted
  db.query('SELECT * FROM votes WHERE user_id = ?', [userId], (err, voteResults) => {
      if (err) {
          console.error('Database error:', err.message);
          return res.status(500).json({ error: 'Database error' });
      }

      if (voteResults.length > 0) {
          return res.status(400).json({ error: 'You have already voted.' });
      }

      // Retrieve the user's CNIC
      db.query('SELECT cnic FROM users WHERE id = ?', [userId], (err, userResults) => {
          if (err) {
              console.error('Database error:', err.message);
              return res.status(500).json({ error: 'Database error' });
          }

          if (userResults.length === 0) {
              return res.status(404).json({ error: 'User not found.' });
          }

          const userCnic = userResults[0].cnic;

          // Check if the CNIC exists in the cnic_data table
          db.query('SELECT * FROM cnic_data WHERE cnic = ?', [userCnic], (err, cnicResults) => {
              if (err) {
                  console.error('Database error:', err.message);
                  return res.status(500).json({ error: 'Database error' });
              }

              if (cnicResults.length === 0) {
                  return res.status(400).json({ error: 'You are not eligible to vote.' });
              }

              // Get the party_name from the candidates table
              db.query('SELECT party_name FROM candidates WHERE name = ?', [candidate], (err, candidateResults) => {
                  if (err) {
                      console.error('Database error:', err.message);
                      return res.status(500).json({ error: 'Database error' });
                  }

                  if (candidateResults.length === 0) {
                      return res.status(400).json({ error: 'Candidate not found.' });
                  }

                  const partyName = candidateResults[0].party_name;

                  // Insert the vote into the votes table
                  db.query('INSERT INTO votes (user_id, party_name) VALUES (?, ?)', [userId, partyName], (err) => {
                      if (err) {
                          console.error('Database error:', err.message);
                          return res.status(500).json({ error: 'Database error' });
                      }

                      res.status(201).json({ message: 'Vote recorded successfully' });
                  });
              });
          });
      });
  });
});



app.post('/votee', authenticateJWT, (req, res) => {
  const { userId } = req.user; // Extract user ID from JWT
  const { candidate } = req.body; // Candidate selected by the user

  if (!candidate) {
      return res.status(400).json({ error: 'Candidate selection is required' });
  }

  // Check if the user has already voted
  db.query('SELECT * FROM votess WHERE userr_id = ?', [userId], (err, voteResults) => {
      if (err) {
          console.error('Database error:', err.message);
          return res.status(500).json({ error: 'Database error' });
      }

      if (voteResults.length > 0) {
          return res.status(400).json({ error: 'You have already voted.' });
      }

      // Retrieve the user's CNIC
      db.query('SELECT cnic FROM users WHERE id = ?', [userId], (err, userResults) => {
          if (err) {
              console.error('Database error:', err.message);
              return res.status(500).json({ error: 'Database error' });
          }

          if (userResults.length === 0) {
              return res.status(404).json({ error: 'User not found.' });
          }

          const userCnic = userResults[0].cnic;

          // Check if the CNIC exists in the cnic_data table
          db.query('SELECT * FROM cnic_data WHERE cnic = ?', [userCnic], (err, cnicResults) => {
              if (err) {
                  console.error('Database error:', err.message);
                  return res.status(500).json({ error: 'Database error' });
              }

              if (cnicResults.length === 0) {
                  return res.status(400).json({ error: 'You are not eligible to vote.' });
              }

              // Get the party_name from the candidates table
              db.query('SELECT party_name FROM mna WHERE name = ?', [candidate], (err, candidateResults) => {
                  if (err) {
                      console.error('Database error:', err.message);
                      return res.status(500).json({ error: 'Database error' });
                  }

                  if (candidateResults.length === 0) {
                      return res.status(400).json({ error: 'Candidate not found.' });
                  }

                  const partyName = candidateResults[0].party_name;

                  // Insert the vote into the votes table
                  db.query('INSERT INTO votess (userr_id, party_name) VALUES (?, ?)', [userId, partyName], (err) => {
                      if (err) {
                          console.error('Database error:', err.message);
                          return res.status(500).json({ error: 'Database error' });
                      }

                      res.status(201).json({ message: 'Vote recorded successfully' });
                  });
              });
          });
      });
  });
});





// Backend - Check if the user has already voted
app.get('/has-voted', authenticateJWT, (req, res) => {
  const { userId } = req.user;

  db.query('SELECT * FROM votes WHERE user_id = ?', [userId], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length > 0) {
          return res.status(200).json({
              hasVoted: true,
              candidate: results[0].party
          });
      }
      res.status(200).json({ hasVoted: false });
  });
});
// Backend - Check if the user has already voted
app.get('/has-votedd', authenticateJWT, (req, res) => {
  const { userId } = req.user;

  db.query('SELECT * FROM votess WHERE userr_id = ?', [userId], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length > 0) {
          return res.status(200).json({
              hasVoted: true,
              candidate: results[0].party
          });
      }
      res.status(200).json({ hasVoted: false });
  });
});


// Voting Status (Check if voting is open or closed)
let votingStatus = false;

app.get('/voting-status', (req, res) => {
  res.json({ votingStatus });
});

// Start Voting
app.post('/start-voting', (req, res, next) => {
  db.query('UPDATE voting_status SET status = TRUE WHERE id = 1', (err) => {
    if (err) {
      console.log('Error starting voting.');
      return next({ message: 'Failed to start voting.' });
    }

    votingStatus = true;
    console.log('Voting has started.');
    res.json({ message: 'Voting has started.' });
  });
});

// Stop Voting
app.post('/stop-voting', (req, res, next) => {
  db.query('UPDATE voting_status SET status = FALSE WHERE id = 1', (err) => {
    if (err) {
      console.log('Error stopping voting.');
      return next({ message: 'Failed to stop voting.' });
    }

    votingStatus = false;
    console.log('Voting has stopped.');
    res.json({ message: 'Voting has stopped.' });
  });
});



// Global error handler (to catch errors from routes)
app.use((err, req, res, next) => {
  console.log('Error occurred:', err.message);
  res.status(500).json({
    message: 'An unexpected error occurred. Please try again later.',
  });
});





// POST - Add Candidate
app.post('/add-candidate', (req, res) => {
  const { candidate, party_name } = req.body;

  if (!candidate || !party_name) {
    return res.status(400).json({ error: 'Candidate name and party name are required' });
  }

  const query = 'INSERT INTO candidates (name, party_name) VALUES (?, ?)';
  db.query(query, [candidate, party_name], (err, result) => {
    if (err) {
      console.error('Error adding candidate:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'Candidate added successfully' });
  });
});

// GET - Get Candidates
app.get('/candidates', (req, res) => {
  db.query('SELECT name, party_name FROM candidates', (err, results) => {
    if (err) {
      console.error('Error fetching candidates:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ candidates: results });
  });
});

// DELETE - Delete Candidate
app.delete('/delete-candidate/:name', (req, res) => {
  const { name } = req.params;

  const query = 'DELETE FROM candidates WHERE name = ?';
  db.query(query, [name], (err, result) => {
    if (err) {
      console.error('Error deleting candidate:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    res.status(200).json({ message: 'Candidate deleted successfully' });
  });
});





// POST - Add Candidate
app.post('/add-candidates', (req, res) => {
  const { candidate, party_name } = req.body;

  if (!candidate || !party_name) {
    return res.status(400).json({ error: 'Candidate name and party name are required' });
  }

  const query = 'INSERT INTO mna (name, party_name) VALUES (?, ?)';
  db.query(query, [candidate, party_name], (err, result) => {
    if (err) {
      console.error('Error adding candidate:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'Candidate added successfully' });
  });
});

// GET - Get Candidates
app.get('/candidatess', (req, res) => {
  db.query('SELECT name, party_name FROM mna', (err, results) => {
    if (err) {
      console.error('Error fetching candidates:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ candidates: results });
  });
});

// DELETE - Delete Candidate
app.delete('/delete-candidates/:name', (req, res) => {
  const { name } = req.params;

  const query = 'DELETE FROM mna WHERE name = ?';
  db.query(query, [name], (err, result) => {
    if (err) {
      console.error('Error deleting candidate:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    res.status(200).json({ message: 'Candidate deleted successfully' });
  });
});









app.get('/votes', (req, res) => {
  const query = `
      SELECT 
          MIN(id) AS example_vote_id, 
          party_name, 
          COUNT(user_id) AS total_votes
      FROM votes
      GROUP BY party_name;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching votes:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json(results);
  });
});
app.get('/votess', (req, res) => {
  const query = `
      SELECT 
          MIN(id) AS example_vote_id, 
          party_name, 
          COUNT(userr_id) AS total_votes
      FROM votess
      GROUP BY party_name;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching votes:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json(results);
  });
});




// Multer static for serving image uploads
app.use('/uploads', express.static('uploads'));

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});


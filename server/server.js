require('dotenv').config();
const PORT = process.env.PORT ?? 8000
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')
const app = express()
const pool = require('./db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const rateLimit = require('express-rate-limit')

/* ~*~*~*~*~*~ adding middleware ~*~*~*~*~*~ */

app.use(cors())
app.use(express.json())

/* ~*~*~*~*~*~ rate limiting in case brute-force attacks/crazy requests, apply 100 per 15min to all routes ~*~*~*~*~*~ */

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
});
app.use(limiter);

/* ~*~*~*~*~*~ just checking we good ~*~*~*~*~*~ */

app.get('/', (req,res) =>{
    res.send('Yoooo!')
})

/* ~*~*~*~*~*~ Middleware for token auth, 401 no token, 403 not allowed ~*~*~*~*~*~ */

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorised' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Verboten' });
    }
    req.user = user;
    next();
  });
};

/* ~*~*~*~*~*~ GET req for todos of particular user via their email param if token good ~*~*~*~*~*~ */

app.get('/todos/:userEmail', authenticateToken, async (req, res) => {
    const { userEmail } = req.params
    try {
      const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail])
      res.json(todos.rows)
    } catch (err) {
      console.error(err);
      // res.status(500).json({ error: 'Internal Server Error' }); check? 
    }
  })

/* ~*~*~*~*~*~ POST req to create new todo in database from their bits 'n' bobs sent in body of req ~*~*~*~*~*~ */

app.post('/todos', async(req, res) => {
    const { user_email, title, progress, date, category, username} = req.body
    const id = uuidv4()
    try {
      const newToDo = await pool.query(`INSERT INTO todos(id, user_email, title, progress, date, category, username) VALUES($1, $2, $3, $4, $5, $6, $7)`,
        [id, user_email, title, progress, date, category, username])
      res.json(newToDo)
    } catch (err) {
      console.error(err)
    }
  })

/* ~*~*~*~*~*~ DELETE req to database using id param ~*~*~*~*~*~ */

app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params
    try {
      const deleteToDo = await pool.query('DELETE FROM todos WHERE id = $1;', [id])
      res.json(deleteToDo)
    } catch (err) {
      console.error(err)
    }
  })

/* ~*~*~*~*~*~ PUT req (edit req) to database using id param to update entry ~*~*~*~*~*~ */

app.put('/todos/:id', async (req, res) => {
    const { id } = req.params
    const { user_email, title, progress, date, category, username } = req.body
    try {
      const editToDo =
        await pool.query('UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4, category = $5, username = $6 WHERE id = $7;',
        [user_email, title, progress, date, category, username, id])
      res.json(editToDo)
    } catch (err) {
      console.error(err)
    }
  })

/* ~*~*~*~*~*~ POST req route handler to signup endpoint using their entries, salt and hash for security, generate JWT token ~*~*~*~*~*~ */

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
  
    try {
      const signUp = await pool.query(`INSERT INTO users (username, email, hashed_password) VALUES($1, $2, $3)`,
        [username, email, hashedPassword])
    
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1hr' });

      
      res.json({ username, email, token })
    } catch (err) {
      console.error(err)
      if (err) {
        res.json({ detail: err.detail})
      }
    }
  })

  /* ~*~*~*~*~*~ POST req to login endpoint with their entries, compare to hashed password in db, give token if there & give username for welcome msg ~*~*~*~*~*~ */

app.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
      const users = await pool.query('SELECT * FROM users WHERE email = $1', [email])
  
      if (!users.rows.length) return res.json({ detail: 'Soz, never heard of you?' })
      
      const success = await bcrypt.compare(password, users.rows[0].hashed_password)
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1hr' });
  
      if (success) {
        const username = users.rows[0].username;
        res.json({ username, email: users.rows[0].email, token });
      } else {
        res.json({ detail: 'Login failed' });
      }
    } catch (err) {
      console.error(err);
    }
  })




app.listen(PORT, () => console.log(`Server running on port ${PORT} so we all gooood`))


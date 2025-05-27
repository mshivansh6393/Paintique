// server.js

const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Order route
app.post('/order', (req, res) => {
  const order = req.body;

  let orders = [];
  if (fs.existsSync('orders.json')) {
    const data = fs.readFileSync('orders.json');
    orders = JSON.parse(data);
  }

  orders.push(order);

  fs.writeFileSync('orders.json', JSON.stringify(orders, null, 2));
  console.log('New Order:', order);

  res.status(200).json({ message: 'Order saved successfully' });
});


// Login route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  fs.readFile('users.txt', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }

    const users = data.trim().split('\n');
    const user = users.find(line => {
      return line.includes(`Email: ${email}`) && line.includes(`Password: ${password}`);
    });

    if (user) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Login failed' });
    }
  });
});


// ✅ Signup route — should be above app.listen
app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const userData = `Name: ${name}, Email: ${email}, Password: ${password}\n`;

  fs.appendFile('users.txt', userData, (err) => {
    if (err) {
      console.error('❌ Error saving user:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    console.log('✅ New user signed up:', userData);
    res.status(200).json({ message: 'Signup successful' });
  });
});

// ✅ Start server AFTER defining all routes
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});


// Login apis 
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  fs.readFile('users.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading users:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    const users = data.split('\n').filter(line => line.trim() !== '');
    const foundUser = users.find(user => {
      return user.includes(`Email: ${email}`) && user.includes(`Password: ${password}`);
    });

    if (foundUser) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Login failed. Invalid email or password' });
    }
  });
});


app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  fs.readFile('users.txt', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }

    const users = data.trim().split('\n');
    const user = users.find(line => {
      return line.includes(`Email: ${email}`) && line.includes(`Password: ${password}`);
    });

    if (user) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Login failed' });
    }
  });
});

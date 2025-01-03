// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS to allow the frontend to access the backend
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Simulate a simple database with an in-memory array
let bookings = [
  { id: 1, name: "John Doe", date: "2025-01-10", time: "18:00", table: 5 },
  { id: 2, name: "Jane Smith", date: "2025-01-11", time: "19:00", table: 2 }
];

// Route to get all bookings
app.get('/booking', (req, res) => {
  res.json(bookings);
});

// Route to create a new booking
app.post('/booking', (req, res) => {
  const { name, date, time, table } = req.body;
  const newBooking = {
    id: bookings.length + 1,
    name,
    date,
    time,
    table
  };
  bookings.push(newBooking);
  res.status(201).json(newBooking);
});

// Route to delete a booking by ID
app.delete('/booking/:id', (req, res) => {
  const { id } = req.params;
  bookings = bookings.filter(booking => booking.id !== parseInt(id));
  res.status(200).json({ message: 'Booking deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

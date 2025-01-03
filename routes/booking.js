const express = require('express');
const router = express.Router();

// Temporary in-memory storage (replace with DB later if needed)
const bookings = [];

// 1. Create a booking
router.post('/', (req, res) => {
  const { name, date, time, guests, contact } = req.body;

  if (!name || !date || !time || !guests || !contact) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const newBooking = {
    id: bookings.length + 1,
    name,
    date,
    time,
    guests,
    contact
  };

  bookings.push(newBooking);
  res.status(201).json({ message: 'Booking created successfully!', booking: newBooking });
});

// 2. Get all bookings
router.get('/', (req, res) => {
  res.status(200).json(bookings);
});

// 3. Delete a booking by ID
router.delete('/:id', (req, res) => {
  const bookingId = parseInt(req.params.id);

  const bookingIndex = bookings.findIndex(b => b.id === bookingId);

  if (bookingIndex === -1) {
    return res.status(404).json({ message: 'Booking not found.' });
  }

  bookings.splice(bookingIndex, 1);
  res.status(200).json({ message: 'Booking deleted successfully.' });
});

module.exports = router;

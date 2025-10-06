// --- Imports ---
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');

// --- Initialization ---
const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

// --- Middleware ---
app.use(express.json());
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// --- JWT Middleware (Authentication) ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// --- Seed the Database ---
const seedTrains = async () => {
    try {
        const existingTrains = await prisma.train.findMany();
        if (existingTrains.length === 0) {
            const trains = [
                { name: "Superfast Express", source: "Mumbai", destination: "Bangalore", totalSeats: 20, availableSeats: 20, time: "08:00 AM" },
                { name: "Intercity Express", source: "Pune", destination: "Mumbai", totalSeats: 50, availableSeats: 50, time: "09:30 AM" },
                { name: "Chennai Mail", source: "Bangalore", destination: "Chennai", totalSeats: 35, availableSeats: 35, time: "11:00 AM" },
                { name: "Lucknow Express", source: "New Delhi", destination: "Lucknow", totalSeats: 40, availableSeats: 40, time: "01:45 PM" },
                { name: "Gujarat Queen", source: "Mumbai", destination: "Ahmedabad", totalSeats: 60, availableSeats: 60, time: "06:20 PM" },
                { name: "Pune Junction", source: "Pune", destination: "Nagpur", totalSeats: 25, availableSeats: 25, time: "07:30 PM" }
            ];
            await prisma.train.createMany({ data: trains });
            console.log("Database seeded with initial train data.");
        } else {
            console.log("Database already contains trains. Skipping seed.");
        }
    } catch (e) {
        console.error("Error seeding database:", e);
    }
};

// --- API Endpoints ---

// Get current server time
app.get('/api/time', (req, res) => {
    res.json({ currentTime: new Date().toLocaleTimeString() });
});

// User Registration
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({ data: { email, password: hashedPassword } });
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (e) {
        if (e.code === 'P2002') { // Prisma unique constraint error
            return res.status(409).json({ error: 'User with this email already exists.' });
        }
        res.status(500).json({ error: 'Something went wrong.' });
    }
});

// User Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(400).json({ error: 'Invalid credentials.' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({ error: 'Invalid credentials.' });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, message: 'Login successful!' });
});

// Add a new user (for administrative purposes, protected route)
app.post('/api/users', authenticateToken, async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({ data: { email, password: hashedPassword } });
        res.status(201).json({ message: 'User added successfully!' });
    } catch (e) {
        if (e.code === 'P2002') {
            return res.status(409).json({ error: 'User with this email already exists.' });
        }
        res.status(500).json({ error: 'Something went wrong.' });
    }
});

// Delete a user (protected route)
app.delete('/api/users/:id', authenticateToken, async (req, res) => {
    const userIdToDelete = parseInt(req.params.id);
    const authenticatedUserId = req.user.id;
    try {
        if (userIdToDelete !== authenticatedUserId) {
            return res.status(403).json({ error: 'You do not have permission to delete this user.' });
        }
        // Delete related bookings first due to foreign key constraints
        await prisma.booking.deleteMany({ where: { userId: authenticatedUserId } });
        await prisma.user.delete({ where: { id: authenticatedUserId } });
        res.json({ message: 'User deleted successfully.' });
    } catch (e) {
        if (e.code === 'P2025') { // Prisma record not found error
            return res.status(404).json({ error: 'User not found.' });
        }
        res.status(500).json({ error: 'An error occurred during user deletion.' });
    }
});

// Add a new train (for administrative purposes, protected route)
app.post('/api/trains', authenticateToken, async (req, res) => {
    const { name, source, destination, totalSeats, time } = req.body;
    try {
        const newTrain = await prisma.train.create({
            data: {
                name,
                source,
                destination,
                totalSeats,
                availableSeats: totalSeats,
                time
            }
        });
        res.status(201).json({ message: 'Train added successfully!', train: newTrain });
    } catch (e) {
        res.status(500).json({ error: 'An error occurred while adding the train.' });
    }
});

// Delete a train (for administrative purposes, protected route)
app.delete('/api/trains/:id', authenticateToken, async (req, res) => {
    const trainId = parseInt(req.params.id);
    try {
        await prisma.$transaction(async (tx) => {
            // Delete related bookings first due to foreign key constraints
            await tx.booking.deleteMany({ where: { trainId: trainId } });
            await tx.train.delete({ where: { id: trainId } });
        });
        res.json({ message: 'Train deleted successfully.' });
    } catch (e) {
        if (e.code === 'P2025') {
            return res.status(404).json({ error: 'Train not found.' });
        }
        res.status(500).json({ error: 'An error occurred while deleting the train.' });
    }
});

// Get all trains (protected)
app.get('/api/trains', authenticateToken, async (req, res) => {
    const trains = await prisma.train.findMany();
    res.json(trains);
});

// Get user's bookings (protected)
app.get('/api/bookings', authenticateToken, async (req, res) => {
    const bookings = await prisma.booking.findMany({ where: { userId: req.user.id } });
    res.json(bookings);
});

// Book a seat (protected)
app.post('/api/trains/:id/book', authenticateToken, async (req, res) => {
    const trainId = parseInt(req.params.id);
    const userId = req.user.id;

    try {
        await prisma.$transaction(async (tx) => {
            const train = await tx.train.findUnique({ where: { id: trainId } });
            const existingBooking = await tx.booking.findFirst({ where: { userId, trainId } });

            if (!train) {
                return res.status(404).json({ error: 'Train not found.' });
            }

            if (existingBooking) {
                return res.status(409).json({ error: 'Seat already booked for this train.' });
            }

            if (train.availableSeats > 0) {
                await tx.train.update({
                    where: { id: trainId },
                    data: { availableSeats: { decrement: 1 } }
                });
                const booking = await tx.booking.create({ data: { userId, trainId } });
                res.status(201).json({ message: 'Seat booked successfully!', booking });
            } else {
                res.status(409).json({ error: 'No seats available.' });
            }
        });
    } catch (e) {
        res.status(500).json({ error: 'An error occurred during booking.' });
    }
});

// Cancel a booking (protected)
app.delete('/api/bookings/:id', authenticateToken, async (req, res) => {
    const bookingId = parseInt(req.params.id);
    const userId = req.user.id;

    try {
        await prisma.$transaction(async (tx) => {
            const booking = await tx.booking.findUnique({ where: { id: bookingId } });

            if (!booking || booking.userId !== userId) {
                return res.status(404).json({ error: 'Booking not found or you do not have permission to cancel it.' });
            }

            const train = await tx.train.findUnique({ where: { id: booking.trainId } });

            await tx.booking.delete({ where: { id: bookingId } });
            await tx.train.update({
                where: { id: train.id },
                data: { availableSeats: { increment: 1 } }
            });

            res.json({ message: 'Booking canceled successfully!' });
        });
    } catch (e) {
        res.status(500).json({ error: 'An error occurred during cancellation.' });
    }
});

// --- Server Startup ---
const startServer = async () => {
    await seedTrains();
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

startServer();

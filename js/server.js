const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { connectToDatabase } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());


// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, '..', 'assets', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Static file serving for uploaded files
app.use('/assets/uploads', express.static(uploadDir));
app.use(express.static(path.join(__dirname, '..')));

// Multer storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

app.use(bodyParser.json());
let db;

app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await db.collection('users').findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.collection('users').insertOne({ name, email, password: hashedPassword });

        res.status(201).json({ message: 'User registered', userId: result.insertedId });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await db.collection('users').findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // If valid
        res.status(200).json({
            message: 'Login successful',
            userId: user._id,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Handle pet submission with image upload
app.post('/rehome', upload.single('image'), async (req, res) => {
    try {
        const { name, age, type, breed, location, gender, uploaderName, uploaderEmail } = req.body;
        const imageFile = req.file ? req.file.filename : null;
        const imageUrl = imageFile ? `/assets/uploads/${imageFile}` : null;

        // Save the pet data into the database (or perform another action)
        const petData = {
            name,
            age,
            type,
            breed,
            location,
            gender,
            imageUrl, // Saving the image filename to the DB
            uploaderName,
            uploaderEmail
        };

        // Assume you save this data in your MongoDB database
        await db.collection('pets').insertOne(petData);
        res.status(201).json({ message: 'Pet successfully posted for adoption!' });
    } catch (err) {
        console.error('Error while uploading pet:', err);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
});

app.get('/pets', async (req, res) => {
    try {
        // Fetch all pets from the database
        const pets = await db.collection('pets').find().toArray();

        // Respond with the pet data in JSON format
        res.status(200).json(pets);
    } catch (error) {
        console.error('Error fetching pets:', error);
        res.status(500).json({ message: 'Failed to fetch pets' });
    }
});

const { ObjectId } = require('mongodb');

app.get('/pets/:id', async (req, res) => {
    try {
        // Correctly convert the parameter to ObjectId for MongoDB
        const pet = await db.collection('pets').findOne({ _id: new ObjectId(req.params.id) });

        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        // If uploaderName and uploaderEmail are arrays, you might want to handle them like this
        pet.uploaderName = pet.uploaderName ? pet.uploaderName.join(', ') : 'No uploader name';
        pet.uploaderEmail = pet.uploaderEmail ? pet.uploaderEmail.join(', ') : 'No uploader email';

        // Send the pet data as a response
        res.json(pet);
    } catch (error) {
        console.error('Error fetching pet details:', error);
        res.status(500).json({ message: 'Error fetching pet details' });
    }
});

async function startServer() {
    db = await connectToDatabase();
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}

startServer();

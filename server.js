const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const Memory = require('./models/Memory');

const app = express();
app.use(cors());
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'));

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/memory', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    const { title, description } = req.body;

    const result = await cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      async (error, result) => {
        if (error) return res.status(500).send(error);

        const memory = new Memory({
          title,
          description,
          imageUrl: result.secure_url
        });
        await memory.save();
        res.status(201).json(memory);
      }
    );
    result.end(file.buffer);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/memories', async (req, res) => {
  const memories = await Memory.find().sort({ _id: -1 });
  res.json(memories);
});

app.listen(5000, () => console.log('Server running on port 5000'));